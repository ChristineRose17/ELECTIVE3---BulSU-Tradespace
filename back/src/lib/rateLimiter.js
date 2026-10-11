/**
 * rateLimiter.js
 *
 * Sliding-window rate limiter for trade request creation.
 * Default: 10 requests per hour per user.
 */

'use strict';

const userRequestTimestamps = new Map();

/**
 * Creates rate limiter middleware.
 * @param {object} options
 * @param {number} options.max - Max allowed requests per window
 * @param {number} options.windowMs - Time window in milliseconds
 */
function createRateLimiter({ max = 10, windowMs = 60 * 60 * 1000 } = {}) {
  return function tradeRequestRateLimiter(req, res, next) {
    const userId = req.currentUser?.id || req.supabaseUser?.id;
    if (!userId) {
      return next();
    }

    const now = Date.now();
    const timestamps = userRequestTimestamps.get(userId) || [];

    // Filter out timestamps older than the window
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= max) {
      const oldest = recent[0];
      const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        error: `Rate limit exceeded. You can only create up to ${max} trade requests per hour. Please try again later.`,
        retryAfter: retryAfterSeconds,
      });
    }

    recent.push(now);
    userRequestTimestamps.set(userId, recent);

    // Periodic cleanup of stale entries if map grows large
    if (userRequestTimestamps.size > 2000) {
      for (const [key, list] of userRequestTimestamps.entries()) {
        const valid = list.filter((t) => now - t < windowMs);
        if (valid.length === 0) {
          userRequestTimestamps.delete(key);
        } else {
          userRequestTimestamps.set(key, valid);
        }
      }
    }

    next();
  };
}

module.exports = {
  createRateLimiter,
  userRequestTimestamps, // exported for testing/resetting
};
