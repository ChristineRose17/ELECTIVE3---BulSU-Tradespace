/**
 * tradeRequests.js
 *
 * Routes for meetup scheduling, counter-proposals, status lifecycle,
 * and permissions between buyer and seller.
 */

'use strict';

const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');
const { createRateLimiter } = require('../lib/rateLimiter');
const { createNotification } = require('../lib/notifications');
const {
  getAllowedMeetupDates,
  getAllowedTimeSlots,
  validateLocation,
  validateMeetupDate,
  validateMeetupTime,
  validateNotes,
  validateTradeRequestSlot,
  calculateExpirationDate,
  formatMeetupDateTime,
  isRequestExpired,
  isMeetupDateReached,
  getManilaDateTime,
} = require('../lib/meetup');

// Apply rate limiter: 10 create requests per hour per user
const tradeCreationLimiter = createRateLimiter({ max: 10, windowMs: 60 * 60 * 1000 });

/**
 * Middleware helper to resolve the DB User record from the JWT supabaseUser
 */
async function attachUser(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { supabaseId: req.supabaseUser.id },
    });
    if (!user) {
      return res.status(403).json({ error: 'User profile not found.' });
    }
    req.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Helper to lazily check if a pending/countered request has expired.
 * If expired, transitions status to 'expired' and logs the event.
 */
async function checkAndExpireRequest(request) {
  if (!request) return request;
  if ((request.status === 'pending' || request.status === 'countered') && isRequestExpired(request)) {
    try {
      const updated = await prisma.tradeRequest.update({
        where: { id: request.id },
        data: { status: 'expired' },
      });
      await prisma.tradeRequestEvent.create({
        data: {
          requestId: request.id,
          actorId: request.buyerId,
          action: 'expired',
          snapshotLocation: request.meetupLocation,
          snapshotDate: request.meetupDate,
          snapshotTime: request.meetupTime,
          notes: 'Request expired automatically (24h or passed meetup time).',
        },
      });
      // Notify both parties of expiration
      const itemTitle = request.listing?.title || 'the item';
      await createNotification({
        userId: request.buyerId,
        type: 'request_expired',
        title: 'Meetup Request Expired',
        relatedRequestId: request.id,
        relatedItemId: request.listingId,
        message: `Your meetup request for "${itemTitle}" has expired.`,
      });
      await createNotification({
        userId: request.sellerId,
        type: 'request_expired',
        title: 'Meetup Request Expired',
        relatedRequestId: request.id,
        relatedItemId: request.listingId,
        message: `Meetup request from ${request.buyer?.name || 'buyer'} for "${itemTitle}" has expired.`,
      });
      return { ...request, status: 'expired' };
    } catch {
      return request;
    }
  }
  return request;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. GET /api/meetup-options (public or authenticated)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/meetup-options', (req, res) => {
  const allowedDates = getAllowedMeetupDates();
  const allowedTimeSlots = getAllowedTimeSlots();
  res.json({
    timezone: 'Asia/Manila',
    allowedDates,
    allowedTimeSlots,
  });
});

// All following routes require authentication
router.use(verifyToken);
router.use(attachUser);

// ─────────────────────────────────────────────────────────────────────────────
// 2. POST /api/trade-requests (Create request)
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', tradeCreationLimiter, async (req, res, next) => {
  try {
    const { listingId, meetupLocation, meetupDate, meetupTime, notes } = req.body;
    const buyerId = req.currentUser.id;

    // Validate listingId
    const parsedListingId = parseInt(listingId, 10);
    if (isNaN(parsedListingId)) {
      return res.status(400).json({ error: 'Valid listingId is required.' });
    }

    // Validate location
    const locationVal = validateLocation(meetupLocation);
    if (!locationVal.valid) {
      return res.status(400).json({ error: locationVal.error, field: 'meetupLocation' });
    }

    // Validate date
    const dateVal = validateMeetupDate(meetupDate);
    if (!dateVal.valid) {
      return res.status(400).json({ error: dateVal.error, field: 'meetupDate' });
    }

    // Validate time
    const timeVal = validateMeetupTime(meetupTime);
    if (!timeVal.valid) {
      return res.status(400).json({ error: timeVal.error, field: 'meetupTime' });
    }

    // Validate notes
    const notesVal = validateNotes(notes);
    if (!notesVal.valid) {
      return res.status(400).json({ error: notesVal.error, field: 'notes' });
    }

    const isCustomTime = Boolean(req.body.customTime);

    // Check listing existence, status, ownership, seller weekly rules, and accepted bookings
    const listing = await prisma.listing.findUnique({
      where: { id: parsedListingId },
      include: {
        seller: { select: { id: true, name: true, email: true } },
        availabilities: true,
        tradeRequests: {
          where: { status: 'accepted' },
          select: { meetupDate: true, meetupTime: true },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Item listing not found.' });
    }

    // Buyer cannot request their own item
    if (listing.sellerId === buyerId) {
      return res.status(400).json({ error: 'You cannot request your own listing.' });
    }

    // Item must be available
    if (listing.status === 'sold') {
      return res.status(400).json({ error: 'This item is already sold.' });
    }
    if (listing.status === 'reserved') {
      return res.status(400).json({ error: 'This item is currently reserved for another trade.' });
    }
    if (listing.status === 'draft') {
      return res.status(400).json({ error: 'This listing is not currently active.' });
    }

    // Validate request slot against seller schedule rules and already booked slots
    const slotCheck = validateTradeRequestSlot({
      meetupDate,
      meetupTime,
      customTime: isCustomTime,
      weeklyRules: listing.availabilities || [],
      acceptedRequests: listing.tradeRequests || [],
    });

    if (!slotCheck.valid) {
      return res.status(400).json({ error: slotCheck.error, field: 'meetupTime' });
    }

    // Check duplicate active requests by this buyer on this item
    const existingActive = await prisma.tradeRequest.findFirst({
      where: {
        listingId: parsedListingId,
        buyerId,
        status: { in: ['pending', 'countered', 'accepted'] },
      },
    });

    if (existingActive) {
      return res.status(409).json({
        error: `You already have an active request (${existingActive.status}) for this item.`,
        activeRequest: existingActive,
      });
    }

    const expiresAt = calculateExpirationDate(meetupDate, meetupTime);

    // Create the request and log the initial event
    const createdRequest = await prisma.$transaction(async (tx) => {
      const request = await tx.tradeRequest.create({
        data: {
          listingId: parsedListingId,
          buyerId,
          sellerId: listing.sellerId,
          meetupLocation: locationVal.sanitized,
          meetupDate,
          meetupTime,
          notes: notesVal.sanitized,
          status: 'pending',
          proposedBy: 'buyer',
          customTime: isCustomTime,
          expiresAt,
        },
        include: {
          listing: {
            select: { id: true, title: true, price: true, type: true, images: true, campus: true, status: true },
          },
          buyer: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
          },
          seller: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
          },
        },
      });

      await tx.tradeRequestEvent.create({
        data: {
          requestId: request.id,
          actorId: buyerId,
          action: 'created',
          snapshotLocation: locationVal.sanitized,
          snapshotDate: meetupDate,
          snapshotTime: meetupTime,
          notes: notesVal.sanitized,
        },
      });

      return request;
    });

    // Notify seller: "{buyer name} wants to buy '{item title}' — Meetup: {location}, {date} {time}"
    const formattedWhen = formatMeetupDateTime(meetupDate, meetupTime);
    await createNotification({
      userId: listing.sellerId,
      actorId: buyerId,
      type: 'request_created',
      title: 'New Meetup Request',
      relatedRequestId: createdRequest.id,
      relatedItemId: listing.id,
      message: `${req.currentUser.name} wants to buy "${listing.title}" — Meetup: ${locationVal.sanitized}, ${formattedWhen}`,
    });

    res.status(201).json(createdRequest);
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. GET /api/trade-requests/mine (Buyer requests)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/mine', async (req, res, next) => {
  try {
    const buyerId = req.currentUser.id;
    const { status, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where = { buyerId };
    if (status && status !== 'all') {
      where.status = status;
    }

    const [total, rawRequests] = await Promise.all([
      prisma.tradeRequest.count({ where }),
      prisma.tradeRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: {
          listing: {
            select: { id: true, title: true, price: true, type: true, images: true, campus: true, status: true },
          },
          seller: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
          },
          buyer: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
          },
        },
      }),
    ]);

    // Lazily evaluate expiration for pending/countered items
    const requests = await Promise.all(rawRequests.map(checkAndExpireRequest));

    res.json({
      requests,
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. GET /api/trade-requests/incoming (Seller requests)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/incoming', async (req, res, next) => {
  try {
    const sellerId = req.currentUser.id;
    const { status, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where = { sellerId };
    if (status && status !== 'all') {
      where.status = status;
    }

    const [total, rawRequests] = await Promise.all([
      prisma.tradeRequest.count({ where }),
      prisma.tradeRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: {
          listing: {
            select: { id: true, title: true, price: true, type: true, images: true, campus: true, status: true },
          },
          buyer: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
          },
          seller: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
          },
        },
      }),
    ]);

    // Lazily evaluate expiration
    const requests = await Promise.all(rawRequests.map(checkAndExpireRequest));

    res.json({
      requests,
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. GET /api/items/:id/my-request (Buyer's active request on a specific item)
// Note: Registered before /:id route so it doesn't collide
// ─────────────────────────────────────────────────────────────────────────────
router.get('/item/:id/my-request', async (req, res, next) => {
  try {
    const listingId = parseInt(req.params.id, 10);
    if (isNaN(listingId)) return res.status(400).json({ error: 'Invalid listing ID.' });

    const buyerId = req.currentUser.id;
    let request = await prisma.tradeRequest.findFirst({
      where: {
        listingId,
        buyerId,
        status: { in: ['pending', 'countered', 'accepted'] },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: {
          select: { id: true, title: true, price: true, type: true, images: true, campus: true, status: true },
        },
        seller: {
          select: { id: true, name: true, email: true, phone: true, avatar: true },
        },
      },
    });

    if (request) {
      request = await checkAndExpireRequest(request);
      if (['declined', 'cancelled', 'expired', 'completed'].includes(request.status)) {
        request = null;
      }
    }

    res.json({ activeRequest: request });
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. GET /api/trade-requests/:id (Single request details)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid request ID.' });

    let request = await prisma.tradeRequest.findUnique({
      where: { id },
      include: {
        listing: {
          select: { id: true, title: true, price: true, type: true, images: true, campus: true, status: true },
        },
        buyer: {
          select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
        },
        seller: {
          select: { id: true, name: true, email: true, phone: true, avatar: true, campus: true },
        },
        events: {
          orderBy: { createdAt: 'desc' },
          include: { actor: { select: { id: true, name: true, avatar: true } } },
        },
      },
    });

    if (!request) return res.status(404).json({ error: 'Trade request not found.' });

    // Only buyer or seller can view this request
    if (request.buyerId !== req.currentUser.id && request.sellerId !== req.currentUser.id) {
      return res.status(403).json({ error: 'You are not authorized to view this request.' });
    }

    request = await checkAndExpireRequest(request);

    res.json(request);
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. POST /api/trade-requests/:id/accept
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/accept', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid request ID.' });

    const currentUserId = req.currentUser.id;

    // Execute atomic transaction with lock/checks
    const result = await prisma.$transaction(async (tx) => {
      const request = await tx.tradeRequest.findUnique({
        where: { id },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true } },
          seller: { select: { id: true, name: true, email: true } },
        },
      });

      if (!request) {
        throw Object.assign(new Error('Trade request not found.'), { status: 404 });
      }

      // Check permissions:
      // If proposedBy is 'buyer', only the seller can accept
      // If proposedBy is 'seller', only the buyer can accept
      if (request.proposedBy === 'buyer' && request.sellerId !== currentUserId) {
        throw Object.assign(
          new Error('Only the seller can accept a request proposed by the buyer.'),
          { status: 403 }
        );
      }
      if (request.proposedBy === 'seller' && request.buyerId !== currentUserId) {
        throw Object.assign(
          new Error('Only the buyer can accept a counter-proposal from the seller.'),
          { status: 403 }
        );
      }

      // Check current request status
      if (isRequestExpired(request)) {
        await tx.tradeRequest.update({ where: { id }, data: { status: 'expired' } });
        throw Object.assign(new Error('This request has expired and cannot be accepted.'), { status: 409 });
      }

      if (request.status !== 'pending' && request.status !== 'countered') {
        throw Object.assign(
          new Error(`Cannot accept request in "${request.status}" status.`),
          { status: 409 }
        );
      }

      // Check listing status: must not already be sold or reserved
      if (request.listing.status === 'sold') {
        throw Object.assign(new Error('This item has already been sold.'), { status: 409 });
      }
      if (request.listing.status === 'reserved') {
        throw Object.assign(
          new Error('This item is already reserved for another accepted trade request.'),
          { status: 409 }
        );
      }

      // 1. Mark request accepted
      const updatedRequest = await tx.tradeRequest.update({
        where: { id },
        data: {
          status: 'accepted',
          respondedAt: new Date(),
        },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true, phone: true } },
          seller: { select: { id: true, name: true, email: true, phone: true } },
        },
      });

      // 2. Mark item reserved
      await tx.listing.update({
        where: { id: request.listingId },
        data: { status: 'reserved' },
      });

      // 3. Log event
      await tx.tradeRequestEvent.create({
        data: {
          requestId: id,
          actorId: currentUserId,
          action: 'accepted',
          snapshotLocation: request.meetupLocation,
          snapshotDate: request.meetupDate,
          snapshotTime: request.meetupTime,
          notes: 'Meetup proposal accepted.',
        },
      });

      // 4. Auto-decline all OTHER pending/countered requests on this item
      const conflictingRequests = await tx.tradeRequest.findMany({
        where: {
          listingId: request.listingId,
          id: { not: id },
          status: { in: ['pending', 'countered'] },
        },
      });

      if (conflictingRequests.length > 0) {
        await tx.tradeRequest.updateMany({
          where: {
            id: { in: conflictingRequests.map((r) => r.id) },
          },
          data: {
            status: 'declined',
            declineReason: 'Item reserved for another meetup request.',
            respondedAt: new Date(),
          },
        });

        // Log events for auto-declined requests
        for (const conf of conflictingRequests) {
          await tx.tradeRequestEvent.create({
            data: {
              requestId: conf.id,
              actorId: currentUserId,
              action: 'declined',
              snapshotLocation: conf.meetupLocation,
              snapshotDate: conf.meetupDate,
              snapshotTime: conf.meetupTime,
              notes: 'Auto-declined: listing reserved for another accepted meetup.',
            },
          });
        }
      }

      return { updatedRequest, conflictingRequests };
    });

    const { updatedRequest, conflictingRequests } = result;

    // Send notifications outside the transaction
    const formattedWhen = formatMeetupDateTime(updatedRequest.meetupDate, updatedRequest.meetupTime);
    const itemTitle = updatedRequest.listing.title;

    if (updatedRequest.proposedBy === 'buyer') {
      // Seller accepted buyer's proposal -> notify buyer
      await createNotification({
        userId: updatedRequest.buyerId,
        actorId: currentUserId,
        type: 'request_accepted',
        title: 'Meetup Confirmed!',
        relatedRequestId: updatedRequest.id,
        relatedItemId: updatedRequest.listingId,
        message: `${req.currentUser.name} accepted your meetup request for "${itemTitle}" — Meetup: ${updatedRequest.meetupLocation}, ${formattedWhen}`,
      });
    } else {
      // Buyer accepted seller's counter -> notify seller
      await createNotification({
        userId: updatedRequest.sellerId,
        actorId: currentUserId,
        type: 'counter_accepted',
        title: 'Counter-Proposal Accepted!',
        relatedRequestId: updatedRequest.id,
        relatedItemId: updatedRequest.listingId,
        message: `${req.currentUser.name} accepted your counter-proposal for "${itemTitle}" — Meetup: ${updatedRequest.meetupLocation}, ${formattedWhen}`,
      });
    }

    // Notify auto-declined buyers that item is no longer available
    for (const conf of conflictingRequests) {
      await createNotification({
        userId: conf.buyerId,
        actorId: currentUserId,
        type: 'item_unavailable',
        title: 'Item No Longer Available',
        relatedRequestId: conf.id,
        relatedItemId: updatedRequest.listingId,
        message: `The item "${itemTitle}" is no longer available as another request was accepted.`,
      });
    }

    res.json(updatedRequest);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. POST /api/trade-requests/:id/decline
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/decline', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid request ID.' });

    const currentUserId = req.currentUser.id;
    const { reason } = req.body;
    const sanitizedReason = reason ? validateNotes(reason).sanitized : null;

    const request = await prisma.tradeRequest.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } },
      },
    });

    if (!request) return res.status(404).json({ error: 'Trade request not found.' });

    // Permissions:
    // If proposedBy is 'buyer', seller declines
    // If proposedBy is 'seller', buyer declines
    if (request.proposedBy === 'buyer' && request.sellerId !== currentUserId) {
      return res.status(403).json({ error: 'Only the seller can decline a proposal from the buyer.' });
    }
    if (request.proposedBy === 'seller' && request.buyerId !== currentUserId) {
      return res.status(403).json({ error: 'Only the buyer can decline a counter-proposal from the seller.' });
    }

    if (request.status !== 'pending' && request.status !== 'countered') {
      return res.status(409).json({
        error: `Cannot decline a request that is already "${request.status}".`,
      });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const resReq = await tx.tradeRequest.update({
        where: { id },
        data: {
          status: 'declined',
          declineReason: sanitizedReason || 'Declined without a specific note.',
          respondedAt: new Date(),
        },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true } },
          seller: { select: { id: true, name: true, email: true } },
        },
      });

      await tx.tradeRequestEvent.create({
        data: {
          requestId: id,
          actorId: currentUserId,
          action: 'declined',
          snapshotLocation: request.meetupLocation,
          snapshotDate: request.meetupDate,
          snapshotTime: request.meetupTime,
          notes: sanitizedReason || '',
        },
      });

      return resReq;
    });

    // Notify the other party
    const itemTitle = request.listing.title;
    if (request.proposedBy === 'buyer') {
      await createNotification({
        userId: request.buyerId,
        actorId: currentUserId,
        type: 'request_declined',
        title: 'Request Declined',
        relatedRequestId: id,
        relatedItemId: request.listingId,
        message: `${req.currentUser.name} declined your meetup request for "${itemTitle}"${sanitizedReason ? `: "${sanitizedReason}"` : '.'}`,
      });
    } else {
      await createNotification({
        userId: request.sellerId,
        actorId: currentUserId,
        type: 'counter_declined',
        title: 'Counter-Proposal Declined',
        relatedRequestId: id,
        relatedItemId: request.listingId,
        message: `${req.currentUser.name} declined your counter-proposal for "${itemTitle}"${sanitizedReason ? `: "${sanitizedReason}"` : '.'}`,
      });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. POST /api/trade-requests/:id/counter
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/counter', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid request ID.' });

    const currentUserId = req.currentUser.id;
    const { meetupLocation, meetupDate, meetupTime, notes } = req.body;

    const request = await prisma.tradeRequest.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } },
      },
    });

    if (!request) return res.status(404).json({ error: 'Trade request not found.' });

    // Permissions:
    // If proposal was by buyer, seller counters
    // If proposal was by seller, buyer counters
    if (request.proposedBy === 'buyer' && request.sellerId !== currentUserId) {
      return res.status(403).json({ error: 'Only the seller can counter a buyer proposal.' });
    }
    if (request.proposedBy === 'seller' && request.buyerId !== currentUserId) {
      return res.status(403).json({ error: 'Only the buyer can counter a seller proposal.' });
    }

    if (request.status !== 'pending' && request.status !== 'countered') {
      return res.status(409).json({
        error: `Cannot counter-propose on a request with status "${request.status}".`,
      });
    }

    if (isRequestExpired(request)) {
      await prisma.tradeRequest.update({ where: { id }, data: { status: 'expired' } });
      return res.status(409).json({ error: 'This request has expired and cannot be countered.' });
    }

    // Validate new location, date, time, and notes
    const locationVal = validateLocation(meetupLocation);
    if (!locationVal.valid) {
      return res.status(400).json({ error: locationVal.error, field: 'meetupLocation' });
    }

    const dateVal = validateMeetupDate(meetupDate);
    if (!dateVal.valid) {
      return res.status(400).json({ error: dateVal.error, field: 'meetupDate' });
    }

    const timeVal = validateMeetupTime(meetupTime);
    if (!timeVal.valid) {
      return res.status(400).json({ error: timeVal.error, field: 'meetupTime' });
    }

    const notesVal = validateNotes(notes);
    if (!notesVal.valid) {
      return res.status(400).json({ error: notesVal.error, field: 'notes' });
    }

    const newProposedBy = currentUserId === request.sellerId ? 'seller' : 'buyer';
    const expiresAt = calculateExpirationDate(meetupDate, meetupTime);

    const updated = await prisma.$transaction(async (tx) => {
      const resReq = await tx.tradeRequest.update({
        where: { id },
        data: {
          meetupLocation: locationVal.sanitized,
          meetupDate,
          meetupTime,
          notes: notesVal.sanitized,
          proposedBy: newProposedBy,
          status: 'countered',
          expiresAt,
          respondedAt: new Date(),
        },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true, phone: true } },
          seller: { select: { id: true, name: true, email: true, phone: true } },
        },
      });

      await tx.tradeRequestEvent.create({
        data: {
          requestId: id,
          actorId: currentUserId,
          action: 'countered',
          snapshotLocation: locationVal.sanitized,
          snapshotDate: meetupDate,
          snapshotTime: meetupTime,
          notes: notesVal.sanitized,
        },
      });

      return resReq;
    });

    // Notify the other party
    const recipientId = newProposedBy === 'seller' ? request.buyerId : request.sellerId;
    const formattedWhen = formatMeetupDateTime(meetupDate, meetupTime);
    await createNotification({
      userId: recipientId,
      actorId: currentUserId,
      type: 'request_countered',
      title: 'New Meetup Proposal',
      relatedRequestId: id,
      relatedItemId: request.listingId,
      message: `${req.currentUser.name} proposed a new meetup for "${request.listing.title}" — Meetup: ${locationVal.sanitized}, ${formattedWhen}`,
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. POST /api/trade-requests/:id/cancel
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/cancel', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid request ID.' });

    const currentUserId = req.currentUser.id;

    const request = await prisma.tradeRequest.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } },
      },
    });

    if (!request) return res.status(404).json({ error: 'Trade request not found.' });

    // Either buyer or seller can cancel
    if (request.buyerId !== currentUserId && request.sellerId !== currentUserId) {
      return res.status(403).json({ error: 'You are not authorized to cancel this request.' });
    }

    if (['declined', 'cancelled', 'expired', 'completed'].includes(request.status)) {
      return res.status(409).json({
        error: `Cannot cancel a request that is already "${request.status}".`,
      });
    }

    const updated = await prisma.$transaction(async (tx) => {
      // If request was accepted, releasing the reservation returns listing to "active"
      if (request.status === 'accepted') {
        await tx.listing.update({
          where: { id: request.listingId },
          data: { status: 'active' },
        });
      }

      const resReq = await tx.tradeRequest.update({
        where: { id },
        data: {
          status: 'cancelled',
          respondedAt: new Date(),
        },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true } },
          seller: { select: { id: true, name: true, email: true } },
        },
      });

      await tx.tradeRequestEvent.create({
        data: {
          requestId: id,
          actorId: currentUserId,
          action: 'cancelled',
          snapshotLocation: request.meetupLocation,
          snapshotDate: request.meetupDate,
          snapshotTime: request.meetupTime,
          notes: 'Request cancelled by participant.',
        },
      });

      return resReq;
    });

    // Notify the other party
    const recipientId = currentUserId === request.buyerId ? request.sellerId : request.buyerId;
    await createNotification({
      userId: recipientId,
      actorId: currentUserId,
      type: 'request_cancelled',
      title: 'Meetup Cancelled',
      relatedRequestId: id,
      relatedItemId: request.listingId,
      message: `${req.currentUser.name} cancelled the meetup request for "${request.listing.title}".`,
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. POST /api/trade-requests/:id/complete
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/complete', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid request ID.' });

    const currentUserId = req.currentUser.id;

    const request = await prisma.tradeRequest.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } },
      },
    });

    if (!request) return res.status(404).json({ error: 'Trade request not found.' });

    // Either buyer or seller can mark complete
    if (request.buyerId !== currentUserId && request.sellerId !== currentUserId) {
      return res.status(403).json({ error: 'You are not authorized to complete this request.' });
    }

    // Must be in accepted status
    if (request.status !== 'accepted') {
      return res.status(409).json({
        error: `Cannot complete a request that is in "${request.status}" status. Only accepted meetups can be completed.`,
      });
    }

    // Enabled on or after the meetup date in Manila timezone
    if (!isMeetupDateReached(request.meetupDate)) {
      return res.status(400).json({
        error: `Meetup can only be marked as completed on or after the scheduled meetup date (${request.meetupDate}).`,
      });
    }

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Mark request completed
      const resReq = await tx.tradeRequest.update({
        where: { id },
        data: {
          status: 'completed',
          completedAt: new Date(),
        },
        include: {
          listing: true,
          buyer: { select: { id: true, name: true, email: true } },
          seller: { select: { id: true, name: true, email: true } },
        },
      });

      // 2. Mark item sold
      await tx.listing.update({
        where: { id: request.listingId },
        data: { status: 'sold' },
      });

      // 3. Log event
      await tx.tradeRequestEvent.create({
        data: {
          requestId: id,
          actorId: currentUserId,
          action: 'completed',
          snapshotLocation: request.meetupLocation,
          snapshotDate: request.meetupDate,
          snapshotTime: request.meetupTime,
          notes: 'Meetup marked completed successfully.',
        },
      });

      return resReq;
    });

    // Notify other party
    const recipientId = currentUserId === request.buyerId ? request.sellerId : request.buyerId;
    await createNotification({
      userId: recipientId,
      actorId: currentUserId,
      type: 'meetup_completed',
      title: 'Trade Completed!',
      relatedRequestId: id,
      relatedItemId: request.listingId,
      message: `${req.currentUser.name} marked your trade for "${request.listing.title}" as completed.`,
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
