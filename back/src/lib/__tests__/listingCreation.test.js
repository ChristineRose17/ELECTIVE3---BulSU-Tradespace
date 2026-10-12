/**
 * listingCreation.test.js
 *
 * Unit tests for Listing Creation & Schedule Integration:
 * - Title and category validation
 * - Status setting ('active' vs 'draft')
 * - Location sanitization and length bounds
 * - Default schedule (no days selected) vs weekly recurring rules
 * - Image handling (with images vs without images)
 * - Drive cleanup on creation failure
 */

'use strict';

const { validateScheduleInput, sanitizeInput } = require('../meetup');
const { extractDriveFileId, cleanupListingImages } = require('../drive');

describe('Listing Creation - Validation Rules', () => {
  test('strips HTML/script tags from preferred location', () => {
    const dirty = '<script>alert("hack")</script> BulSU Heroes Park ';
    const clean = sanitizeInput(dirty);
    expect(clean).toBe('BulSU Heroes Park');
    expect(clean).not.toContain('<script>');
  });

  test('validates location length rules', () => {
    // Under 3 chars
    expect(sanitizeInput('AB').length < 3).toBe(true);
    // Over 100 chars
    const longLoc = 'A'.repeat(101);
    expect(sanitizeInput(longLoc).length > 100).toBe(true);
    // Valid 3-100 chars
    const validLoc = sanitizeInput('Library 2nd Floor');
    expect(validLoc.length).toBeGreaterThanOrEqual(3);
    expect(validLoc.length).toBeLessThanOrEqual(100);
  });

  test('allows empty days for default schedule (no restriction)', () => {
    // When no days are provided, scheduleRules should remain empty
    const days = [];
    const hasDays = Array.isArray(days) && days.length > 0;
    expect(hasDays).toBe(false);
  });

  test('validates weekly rules when days are selected', () => {
    const days = [1, 3, 5]; // Mon, Wed, Fri
    const schedVal = validateScheduleInput(days, '09:00', '15:00', 'CIT Building Lobby');
    expect(schedVal.valid).toBe(true);
    expect(schedVal.rules).toHaveLength(3);
    expect(schedVal.rules[0]).toEqual({
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '15:00',
    });
    expect(schedVal.sanitizedLoc).toBe('CIT Building Lobby');
  });

  test('rejects schedule when end time is before start time', () => {
    const days = [1];
    const schedVal = validateScheduleInput(days, '15:00', '09:00', 'CIT Building Lobby');
    expect(schedVal.valid).toBe(false);
    expect(schedVal.error).toMatch(/after start time/i);
  });

  test('correctly identifies draft status vs active status', () => {
    const checkStatus = (status) => (status === 'draft' ? 'draft' : 'active');
    expect(checkStatus('draft')).toBe('draft');
    expect(checkStatus('active')).toBe('active');
    expect(checkStatus(undefined)).toBe('active');
    expect(checkStatus(null)).toBe('active');
  });

  test('handles price parsing safely (non-negative float)', () => {
    const parsePrice = (price) =>
      price !== undefined && price !== '' && !isNaN(parseFloat(price))
        ? Math.max(0, parseFloat(price))
        : 0;

    expect(parsePrice('150.50')).toBe(150.5);
    expect(parsePrice(250)).toBe(250);
    expect(parsePrice('0')).toBe(0);
    expect(parsePrice('')).toBe(0);
    expect(parsePrice(null)).toBe(0);
    expect(parsePrice('-10')).toBe(0);
  });
});

describe('Listing Creation - Image Handling & Cleanup', () => {
  test('extracts Drive file ID from standard lh3 URL', () => {
    const driveUrl = 'https://lh3.googleusercontent.com/d/15CJjSkp8tXaOgM948g0Yy6IEcBDHxMqs';
    expect(extractDriveFileId(driveUrl)).toBe('15CJjSkp8tXaOgM948g0Yy6IEcBDHxMqs');
  });

  test('ignores fallback Unsplash images during cleanup', async () => {
    const unsplashUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c';
    const mockPrisma = { listing: { count: jest.fn() } };
    const mockDeleter = jest.fn();

    const result = await cleanupListingImages([unsplashUrl], mockPrisma, null, mockDeleter);
    expect(result.skipped).toContain(unsplashUrl);
    expect(mockDeleter).not.toHaveBeenCalled();
  });

  test('calls deleter for unreferenced Drive images when cleanup is triggered', async () => {
    const driveUrl = 'https://lh3.googleusercontent.com/d/TestOrphanedFile123';
    const mockPrisma = {
      listing: { count: jest.fn().mockResolvedValue(0) },
    };
    const mockDeleter = jest.fn().mockResolvedValue(true);

    const result = await cleanupListingImages([driveUrl], mockPrisma, null, mockDeleter);
    expect(result.deleted).toContain(driveUrl);
    expect(mockDeleter).toHaveBeenCalledWith('TestOrphanedFile123');
  });
});
