/**
 * drive.cleanup.test.js
 *
 * Unit tests for:
 *  - extractDriveFileId(url)
 *  - cleanupListingImages(urls, prismaClient, excludeListingId, mockDeleter)
 *
 * The 4th argument of cleanupListingImages is an injectable deleter function,
 * so tests pass jest.fn() directly — no token.json or credentials needed.
 */

'use strict';

// --- Prevent drive.js from trying to load googleapis / token.json ------------
jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn().mockImplementation(() => ({ setCredentials: jest.fn() })),
    },
    drive: jest.fn(),
  },
}));

jest.mock('fs', () => {
  const realFs = jest.requireActual('fs');
  return { ...realFs, existsSync: jest.fn().mockReturnValue(false) };
});

// --- Import after mocks -------------------------------------------------------
const { extractDriveFileId, cleanupListingImages } = require('../drive');

// --- Helper: build a minimal Prisma mock -------------------------------------
function makePrisma(countResult = 0) {
  return {
    listing: {
      count: jest.fn().mockResolvedValue(countResult),
    },
  };
}

// =============================================================================
// extractDriveFileId
// =============================================================================
describe('extractDriveFileId', () => {
  test('extracts ID from a valid lh3 URL', () => {
    expect(extractDriveFileId('https://lh3.googleusercontent.com/d/ABC123XYZ')).toBe('ABC123XYZ');
  });

  test('handles trailing path segments gracefully', () => {
    expect(extractDriveFileId('https://lh3.googleusercontent.com/d/ABC123XYZ/view')).toBe('ABC123XYZ');
  });

  test('returns null for an Unsplash URL', () => {
    expect(extractDriveFileId('https://images.unsplash.com/photo-abc?w=600')).toBeNull();
  });

  test('returns null for a plain http URL', () => {
    expect(extractDriveFileId('http://example.com/image.jpg')).toBeNull();
  });

  test('returns null for null input', () => {
    expect(extractDriveFileId(null)).toBeNull();
  });

  test('returns null for empty string', () => {
    expect(extractDriveFileId('')).toBeNull();
  });

  test('returns null for a malformed string', () => {
    expect(extractDriveFileId('not-a-url')).toBeNull();
  });
});

// =============================================================================
// cleanupListingImages
// =============================================================================
describe('cleanupListingImages', () => {
  // Scenario 1: single Drive image, not shared
  test('deletes a single Drive image that is not shared', async () => {
    const url = 'https://lh3.googleusercontent.com/d/FILE001';
    const prisma = makePrisma(0);
    const mockDelete = jest.fn().mockResolvedValue(true);

    const result = await cleanupListingImages([url], prisma, 42, mockDelete);

    expect(prisma.listing.count).toHaveBeenCalledWith({
      where: { images: { has: url }, id: { not: 42 } },
    });
    expect(mockDelete).toHaveBeenCalledWith('FILE001');
    expect(result.deleted).toEqual([url]);
    expect(result.skipped).toHaveLength(0);
    expect(result.failed).toHaveLength(0);
  });

  // Scenario 2: multiple Drive images, all unshared
  test('deletes multiple Drive images that are not shared', async () => {
    const urls = [
      'https://lh3.googleusercontent.com/d/FILE001',
      'https://lh3.googleusercontent.com/d/FILE002',
      'https://lh3.googleusercontent.com/d/FILE003',
    ];
    const prisma = makePrisma(0);
    const mockDelete = jest.fn().mockResolvedValue(true);

    const result = await cleanupListingImages(urls, prisma, 7, mockDelete);

    expect(mockDelete).toHaveBeenCalledTimes(3);
    expect(result.deleted).toEqual(urls);
    expect(result.skipped).toHaveLength(0);
    expect(result.failed).toHaveLength(0);
  });

  // Scenario 3: listing has no images
  test('returns empty result arrays when urls is empty', async () => {
    const prisma = makePrisma(0);
    const mockDelete = jest.fn();

    const result = await cleanupListingImages([], prisma, 1, mockDelete);

    expect(mockDelete).not.toHaveBeenCalled();
    expect(prisma.listing.count).not.toHaveBeenCalled();
    expect(result.deleted).toHaveLength(0);
    expect(result.skipped).toHaveLength(0);
    expect(result.failed).toHaveLength(0);
  });

  // Scenario 4: shared image — another listing uses the same URL
  test('skips a Drive image still referenced by another listing', async () => {
    const sharedUrl = 'https://lh3.googleusercontent.com/d/SHARED_FILE';
    const prisma = makePrisma(1); // 1 other listing still uses this URL
    const mockDelete = jest.fn();

    const result = await cleanupListingImages([sharedUrl], prisma, 99, mockDelete);

    expect(prisma.listing.count).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
    expect(result.skipped).toEqual([sharedUrl]);
    expect(result.deleted).toHaveLength(0);
    expect(result.failed).toHaveLength(0);
  });

  // Scenario 5: Drive API deletion failure
  test('records failed URL when Drive deletion returns false', async () => {
    const url = 'https://lh3.googleusercontent.com/d/BAD_FILE';
    const prisma = makePrisma(0);
    const mockDelete = jest.fn().mockResolvedValue(false);

    const result = await cleanupListingImages([url], prisma, 55, mockDelete);

    expect(mockDelete).toHaveBeenCalledWith('BAD_FILE');
    expect(result.failed).toEqual([url]);
    expect(result.deleted).toHaveLength(0);
    expect(result.skipped).toHaveLength(0);
  });

  // Bonus: non-Drive URL silently skipped without any DB or Drive call
  test('skips non-Drive URLs without hitting Drive API or Prisma', async () => {
    const unsplashUrl = 'https://images.unsplash.com/photo-abc?w=600&auto=format';
    const prisma = makePrisma(0);
    const mockDelete = jest.fn();

    const result = await cleanupListingImages([unsplashUrl], prisma, 10, mockDelete);

    expect(prisma.listing.count).not.toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
    expect(result.skipped).toEqual([unsplashUrl]);
  });

  // Mixed: one unique Drive image, one Unsplash, one shared Drive image
  test('handles mixed array: deletes unique, skips non-Drive and shared', async () => {
    const driveUrl    = 'https://lh3.googleusercontent.com/d/FILE_UNIQUE';
    const unsplashUrl = 'https://images.unsplash.com/photo-xyz';
    const sharedUrl   = 'https://lh3.googleusercontent.com/d/FILE_SHARED';

    const mockPrisma = {
      listing: {
        count: jest.fn()
          .mockResolvedValueOnce(0)  // driveUrl — not shared
          .mockResolvedValueOnce(1), // sharedUrl — still used
      },
    };
    const mockDelete = jest.fn().mockResolvedValue(true);

    const result = await cleanupListingImages(
      [driveUrl, unsplashUrl, sharedUrl],
      mockPrisma,
      20,
      mockDelete
    );

    expect(result.deleted).toEqual([driveUrl]);
    expect(result.skipped).toEqual(expect.arrayContaining([unsplashUrl, sharedUrl]));
    expect(result.failed).toHaveLength(0);
    // delete was only called once (for the unique Drive image)
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith('FILE_UNIQUE');
  });
});
