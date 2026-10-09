const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { google } = require('googleapis');

// Allowed image MIME types and maximum file size (5MB)
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Resolves the path to the OAuth token.json file.
 * Checks back/token.json, root token.json, or an explicit env path.
 */
function resolveTokenPath() {
  if (process.env.GOOGLE_TOKEN_PATH && fs.existsSync(process.env.GOOGLE_TOKEN_PATH)) {
    return process.env.GOOGLE_TOKEN_PATH;
  }

  const backToken = path.resolve(__dirname, '../../token.json');
  if (fs.existsSync(backToken)) return backToken;

  const rootToken = path.resolve(__dirname, '../../../token.json');
  if (fs.existsSync(rootToken)) return rootToken;

  return null;
}

/**
 * Creates and returns an authenticated Google Drive client using stored OAuth credentials.
 */
let cachedDriveClient = null;

function getDriveClient() {
  if (cachedDriveClient) return cachedDriveClient;

  const tokenPath = resolveTokenPath();
  if (!tokenPath) {
    throw new Error(
      'Google Drive OAuth token not found. Please run the authorization flow to generate token.json.'
    );
  }

  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));

  if (!tokenData.client_id || !tokenData.client_secret || !tokenData.refresh_token) {
    throw new Error('Invalid token.json: client_id, client_secret, or refresh_token is missing.');
  }

  const oAuth2Client = new google.auth.OAuth2(
    tokenData.client_id,
    tokenData.client_secret
  );

  oAuth2Client.setCredentials({
    refresh_token: tokenData.refresh_token,
    access_token: tokenData.access_token,
    expiry_date: tokenData.expiry_date,
  });

  cachedDriveClient = google.drive({ version: 'v3', auth: oAuth2Client });
  return cachedDriveClient;
}

/**
 * Reads and validates the destination folder ID from environment.
 */
function getDestinationFolderId() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId || !folderId.trim()) {
    throw new Error(
      'GOOGLE_DRIVE_FOLDER_ID environment variable is missing in backend configuration.'
    );
  }
  return folderId.trim();
}

/**
 * Validates an image file's MIME type and size.
 */
function validateImageFile(file) {
  if (!file || !file.buffer) {
    throw new Error('No image file data provided.');
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new Error(
      `Invalid file type "${file.mimetype}". Allowed types: JPG, PNG, WEBP, GIF.`
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds the 5MB limit.`
    );
  }
}

/**
 * Uploads a single validated image buffer to the designated Google Drive folder,
 * grants public read-only permission, and returns file ID and public URLs.
 *
 * @param {Object} file - Object with { buffer, originalname, mimetype, size }
 * @returns {Promise<{fileId: string, url: string, webContentLink: string, webViewLink: string, name: string}>}
 */
async function uploadListingImage(file) {
  validateImageFile(file);

  const drive = getDriveClient();
  const folderId = getDestinationFolderId();

  // Create sanitized unique file name
  const safeName = (file.originalname || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueName = `${Date.now()}_${safeName}`;

  const fileMetadata = {
    name: uniqueName,
    parents: [folderId],
  };

  const media = {
    mimeType: file.mimetype,
    body: Readable.from(file.buffer),
  };

  // 1. Upload file to destination folder
  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, name, webViewLink, webContentLink',
    supportsAllDrives: true,
  });

  const fileId = response.data.id;

  // 2. Grant public read-only access (anyone can view without signing in to Google)
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  // Direct CDN URL that browsers can embed directly in <img> tags without Google sign-in
  const directPublicUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

  return {
    fileId,
    url: directPublicUrl,
    webContentLink: response.data.webContentLink,
    webViewLink: response.data.webViewLink,
    name: response.data.name,
  };
}

/**
 * Uploads multiple validated image files.
 *
 * @param {Array<Object>} files
 * @returns {Promise<Array<{fileId: string, url: string, name: string}>>}
 */
async function uploadListingImages(files) {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  const results = [];
  for (const file of files) {
    const result = await uploadListingImage(file);
    results.push(result);
  }
  return results;
}

/**
 * Optionally deletes a file from Google Drive by file ID.
 */
async function deleteListingImage(fileId) {
  if (!fileId) return false;
  try {
    const drive = getDriveClient();
    await drive.files.delete({ fileId, supportsAllDrives: true });
    return true;
  } catch (err) {
    console.error(`Failed to delete Drive file ${fileId}:`, err.message);
    return false;
  }
}

/**
 * Extracts the Google Drive file ID from a public lh3 URL.
 * Supports: https://lh3.googleusercontent.com/d/FILE_ID
 * Returns null for any other URL format (Unsplash fallbacks, etc.).
 *
 * @param {string} url
 * @returns {string|null}
 */
function extractDriveFileId(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    const parsed = new URL(url);
    // Match https://lh3.googleusercontent.com/d/<fileId>
    if (
      parsed.hostname === 'lh3.googleusercontent.com' &&
      parsed.pathname.startsWith('/d/')
    ) {
      const fileId = parsed.pathname.slice(3).split('/')[0].trim();
      return fileId.length > 0 ? fileId : null;
    }
  } catch {
    // Malformed URL — ignore
  }
  return null;
}

/**
 * Deletes Drive files for a set of image URLs that belonged to a now-deleted
 * (or about-to-be-deleted) listing, but only if no other listing still
 * references the same URL.
 *
 * - Non-Drive URLs (Unsplash, etc.) are silently skipped.
 * - Shared images (used by another listing) are skipped.
 * - Drive API errors per file are logged but never thrown — the DB deletion
 *   has already committed and must not be rolled back for a cleanup failure.
 *
 * @param {string[]}  urls             - Image URLs from the listing being deleted
 * @param {object}    prismaClient     - Prisma client instance (passed in to stay testable)
 * @param {number}    excludeListingId - The listing ID being deleted
 * @param {Function}  [_deleteFile]    - Injectable deleter; defaults to deleteListingImage.
 *                                       Pass a jest.fn() in tests to avoid token.json reads.
 * @returns {Promise<{deleted: string[], skipped: string[], failed: string[]}>}
 */
async function cleanupListingImages(urls, prismaClient, excludeListingId, _deleteFile) {
  const deleter = typeof _deleteFile === 'function' ? _deleteFile : deleteListingImage;
  const result = { deleted: [], skipped: [], failed: [] };

  if (!Array.isArray(urls) || urls.length === 0) return result;

  for (const url of urls) {
    const fileId = extractDriveFileId(url);
    if (!fileId) {
      // Not a Drive URL — skip silently
      result.skipped.push(url);
      continue;
    }

    // Check whether any OTHER listing still references this exact URL
    try {
      const sharingCount = await prismaClient.listing.count({
        where: {
          images: { has: url },
          ...(excludeListingId ? { id: { not: excludeListingId } } : {}),
        },
      });

      if (sharingCount > 0) {
        // Another listing uses this image — do not delete
        result.skipped.push(url);
        continue;
      }
    } catch (dbErr) {
      console.error(
        `[Drive cleanup] DB check failed for file ${fileId} (${url}):`,
        dbErr.message
      );
      result.failed.push(url);
      continue;
    }

    // Safe to delete from Drive
    const deleted = await deleter(fileId);
    if (deleted) {
      result.deleted.push(url);
    } else {
      result.failed.push(url);
    }
  }

  return result;
}

module.exports = {
  getDestinationFolderId,
  uploadListingImage,
  uploadListingImages,
  deleteListingImage,
  extractDriveFileId,
  cleanupListingImages,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
};
