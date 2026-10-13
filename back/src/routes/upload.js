const express = require('express');
const multer = require('multer');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
  uploadListingImages,
  uploadListingImage,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} = require('../lib/drive');

// Configure multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file format "${file.mimetype}". Only JPG, PNG, WEBP, and GIF images are accepted.`
        )
      );
    }
  },
});

/**
 * POST /api/upload - Upload exactly 1 listing image to Google Drive
 * Requires valid Supabase auth JWT token.
 * Accepts: multipart/form-data with field 'images' (1 file only) or single 'image'
 */
router.post('/', verifyToken, (req, res, next) => {
  upload.fields([
    { name: 'images', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            error: 'Image file too large. Maximum size is 5MB.',
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            error: 'Too many files uploaded. Maximum is 1 image.',
          });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message || 'File upload failed.' });
    }

    try {
      const filesToProcess = [];
      if (req.files?.images && req.files.images.length > 0) {
        filesToProcess.push(req.files.images[0]);
      } else if (req.files?.image && req.files.image.length > 0) {
        filesToProcess.push(req.files.image[0]);
      }

      if (filesToProcess.length === 0) {
        return res.status(400).json({
          error: 'No image file provided in request. Use field "images" or "image".',
        });
      }

      // Hard guard: reject if somehow more than 1 file slipped through
      if (filesToProcess.length > 1) {
        return res.status(400).json({
          error: 'Too many files uploaded. Maximum is 1 image.',
        });
      }

      const uploadedFiles = await uploadListingImages(filesToProcess);

      return res.status(201).json({
        success: true,
        files: uploadedFiles.map((f) => ({
          fileId: f.fileId,
          url: f.url,
          name: f.name,
          webContentLink: f.webContentLink,
        })),
        urls: uploadedFiles.map((f) => f.url),
        fileId: uploadedFiles[0]?.fileId,
        url: uploadedFiles[0]?.url,
      });
    } catch (uploadError) {
      console.error('Drive upload failed:', uploadError);
      return res.status(500).json({
        error: uploadError.message || 'Failed to upload image to Google Drive.',
      });
    }
  });
});

module.exports = router;
