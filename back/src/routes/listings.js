const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');
const { createNotification } = require('../lib/notifications');
const { cleanupListingImages } = require('../lib/drive');

async function notifySavedUsers(listingId, actorId, type, message) {
  try {
    const saved = await prisma.savedItem.findMany({ where: { listingId } });
    for (const item of saved) {
      if (item.userId !== actorId) {
        await createNotification({
          userId: item.userId,
          actorId,
          type,
          listingId,
          message,
        });
      }
    }
  } catch (err) {
    console.error('Failed to notify saved users:', err);
  }
}

// GET /api/listings/mine - Get all listings of the current user (🔒 JWT required)
router.get('/mine', verifyToken, async (req, res, next) => {
  try {
    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const { status } = req.query;
    const where = { sellerId: profile.id };
    if (status && status !== 'all') {
      if (status === 'active') {
        // Active tab shows both active and reserved listings
        where.status = { in: ['active', 'reserved'] };
      } else {
        where.status = status;
      }
    }

    const listings = await prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
            campus: true,
            college: true,
            avatar: true,
            phone: true,
          },
        },
        availabilities: true,
        tradeRequests: {
          select: {
            id: true,
            status: true,
            completedAt: true,
            meetupDate: true,
            meetupTime: true,
          },
        },
      },
    });

    res.json(listings);
  } catch (error) {
    next(error);
  }
});

// GET /api/listings - Get all listings (with optional filters)
router.get('/', async (req, res, next) => {
  try {
    const { category, campus, status, search, sellerId } = req.query;

    const where = {};
    if (category && category !== 'All') where.category = category;
    if (campus && campus !== 'All Campuses') where.campus = campus;
    if (sellerId) where.sellerId = parseInt(sellerId, 10);

    // Marketplace rule: Public marketplace, category filters, and search queries must return
    // ONLY listings with status 'active' and 'reserved'.
    // Sold and draft items must NEVER appear in the public marketplace.
    // Non-active listings can only be returned if explicitly querying a specific sellerId with status='all'
    if (sellerId && status === 'all') {
      // allow seller to see all their statuses
    } else if (status === 'reserved') {
      where.status = 'reserved';
    } else {
      // Default for public marketplace, categories, and search:
      where.status = { in: ['active', 'reserved'] };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const listings = await prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
            campus: true,
            college: true,
            avatar: true,
            phone: true,
          },
        },
        availabilities: true,
      },
    });

    res.json(listings);
  } catch (error) {
    next(error);
  }
});

// GET /api/listings/:id/availability - Get seller availability for this listing
router.get('/:id/availability', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid listing ID' });

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        availabilities: true,
        tradeRequests: {
          where: { status: 'accepted' },
          select: { meetupDate: true, meetupTime: true },
        },
      },
    });

    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const { generateBookableSlots } = require('../lib/meetup');
    const slotData = generateBookableSlots({
      weeklyRules: listing.availabilities || [],
      acceptedRequests: listing.tradeRequests || [],
    });

    res.json({
      listingId: id,
      preferredLocation: listing.preferredLocation || '',
      hasSellerSchedule: slotData.hasSellerSchedule,
      matchingDays: slotData.matchingDays,
      slotsByDate: slotData.slotsByDate,
      allSlots: slotData.allSlots,
      hasAvailableSlots: slotData.hasAvailableSlots,
      defaultDates: slotData.defaultDates,
      standardSlots: slotData.standardSlots,
      weeklyRules: (listing.availabilities || []).map((a) => ({
        id: a.id,
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
      })),
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/listings/:id/availability - Set seller availability (🔒 JWT required, must be owner)
router.put('/:id/availability', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid listing ID' });

    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) return res.status(404).json({ error: 'Listing not found.' });

    if (listing.sellerId !== profile.id) {
      return res.status(403).json({ error: 'Only the seller can update availability for this listing.' });
    }

    const { preferredLocation, days, startTime, endTime } = req.body;
    const { validateScheduleInput } = require('../lib/meetup');

    const scheduleVal = validateScheduleInput(days, startTime, endTime, preferredLocation);
    if (!scheduleVal.valid) {
      return res.status(400).json({ error: scheduleVal.error });
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.listing.update({
        where: { id },
        data: { preferredLocation: scheduleVal.sanitizedLoc },
      });

      await tx.listingAvailability.deleteMany({ where: { listingId: id } });

      if (scheduleVal.rules.length > 0) {
        await tx.listingAvailability.createMany({
          data: scheduleVal.rules.map((r) => ({
            listingId: id,
            dayOfWeek: r.dayOfWeek,
            startTime: r.startTime,
            endTime: r.endTime,
          })),
        });
      }

      return tx.listing.findUnique({
        where: { id },
        include: { availabilities: true },
      });
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// GET /api/listings/:id - Get listing details
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            campus: true,
            college: true,
            avatar: true,
            phone: true,
          },
        },
        availabilities: true,
      },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    next(error);
  }
});

// POST /api/listings - Create new listing (🔒 JWT required)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const {
      title,
      category,
      college,
      campus,
      condition,
      description,
      type,
      price,
      images,
      preferredLocation,
      schedule,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required.' });
    }

    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const { validateScheduleInput } = require('../lib/meetup');
    let scheduleRules = [];
    let sanitizedLoc = null;

    if (preferredLocation || schedule) {
      const days = schedule?.days || [];
      const startTime = schedule?.startTime || null;
      const endTime = schedule?.endTime || null;
      const loc = preferredLocation || schedule?.preferredLocation;

      const schedVal = validateScheduleInput(days, startTime, endTime, loc);
      if (!schedVal.valid) {
        return res.status(400).json({ error: schedVal.error });
      }
      scheduleRules = schedVal.rules || [];
      sanitizedLoc = schedVal.sanitizedLoc;
    }

    const newListing = await prisma.$transaction(async (tx) => {
      const listing = await tx.listing.create({
        data: {
          title,
          category,
          college:           college           || 'All Colleges',
          campus:            campus            || 'Meneses Campus',
          condition:         condition         || 'Good',
          description:       description       || '',
          type:              type              || 'For Sale',
          price:             price ? parseFloat(price) : 0,
          images:            Array.isArray(images) ? images : [],
          preferredLocation: sanitizedLoc,
          sellerId:          profile.id,
        },
      });

      if (scheduleRules.length > 0) {
        await tx.listingAvailability.createMany({
          data: scheduleRules.map((r) => ({
            listingId: listing.id,
            dayOfWeek: r.dayOfWeek,
            startTime: r.startTime,
            endTime: r.endTime,
          })),
        });
      }

      return tx.listing.findUnique({
        where: { id: listing.id },
        include: { availabilities: true },
      });
    });

    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
});

// PUT /api/listings/:id - Update listing (🔒 JWT required, must be owner)
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existing.sellerId !== profile.id) {
      return res.status(403).json({ error: 'Only the listing owner can edit this listing.' });
    }

    const {
      title,
      category,
      college,
      campus,
      condition,
      description,
      type,
      price,
      images,
      status,
      preferredLocation,
      schedule,
    } = req.body;

    const { validateScheduleInput } = require('../lib/meetup');
    let hasScheduleUpdate = false;
    let scheduleRules = [];
    let sanitizedLoc = existing.preferredLocation;

    if (preferredLocation !== undefined || schedule !== undefined) {
      hasScheduleUpdate = true;
      const days = schedule?.days || [];
      const startTime = schedule?.startTime || null;
      const endTime = schedule?.endTime || null;
      const loc = preferredLocation !== undefined ? preferredLocation : schedule?.preferredLocation;

      const schedVal = validateScheduleInput(days, startTime, endTime, loc);
      if (!schedVal.valid) {
        return res.status(400).json({ error: schedVal.error });
      }
      scheduleRules = schedVal.rules || [];
      sanitizedLoc = schedVal.sanitizedLoc;
    }

    const updated = await prisma.$transaction(async (tx) => {
      const listing = await tx.listing.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(category && { category }),
          ...(college && { college }),
          ...(campus && { campus }),
          ...(condition && { condition }),
          ...(description !== undefined && { description }),
          ...(type && { type }),
          ...(price !== undefined && { price: parseFloat(price) }),
          ...(images && { images }),
          ...(status && { status }),
          ...(hasScheduleUpdate && { preferredLocation: sanitizedLoc }),
        },
      });

      if (hasScheduleUpdate) {
        await tx.listingAvailability.deleteMany({ where: { listingId: id } });
        if (scheduleRules.length > 0) {
          await tx.listingAvailability.createMany({
            data: scheduleRules.map((r) => ({
              listingId: id,
              dayOfWeek: r.dayOfWeek,
              startTime: r.startTime,
              endTime: r.endTime,
            })),
          });
        }
      }

      return tx.listing.findUnique({
        where: { id },
        include: { availabilities: true },
      });
    });

    // Notify users who saved the listing if status became unavailable
    if (status && status !== 'active' && existing.status === 'active') {
      await notifySavedUsers(id, existing.sellerId, 'listing_unavailable', `"${existing.title}" that you saved is now marked as ${status}`);
    }

    // Notify users who saved the listing if price changed
    if (price !== undefined && parseFloat(price) !== existing.price) {
      await notifySavedUsers(id, existing.sellerId, 'listing_price_changed', `"${existing.title}" that you saved updated its price to ₱${parseFloat(price).toLocaleString()}`);
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/listings/:id/status - Update listing status (🔒 JWT required)
router.patch('/:id/status', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { status },
    });

    // Notify users who saved the listing if status became unavailable
    if (status !== 'active' && existing.status === 'active') {
      await notifySavedUsers(id, existing.sellerId, 'listing_unavailable', `"${existing.title}" that you saved is now marked as ${status}`);
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/listings/:id - Delete listing (🔒 JWT required, must be owner)
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Verify ownership — the requester must be the seller
    const profile = await prisma.user.findUnique({
      where: { supabaseId: req.supabaseUser.id },
      select: { id: true },
    });
    if (!profile || profile.id !== existing.sellerId) {
      return res.status(403).json({ error: 'You do not have permission to delete this listing.' });
    }

    // Capture image URLs before DB deletion (Cascade will remove related rows)
    const imageUrls = Array.isArray(existing.images) ? [...existing.images] : [];

    // Notify users who saved the listing before deletion
    await notifySavedUsers(id, existing.sellerId, 'listing_unavailable', `"${existing.title}" that you saved has been removed`);

    // Delete from database — Cascade handles Claims, SavedItems, Notifications
    await prisma.listing.delete({ where: { id } });

    // Respond immediately so the user isn’t waiting on Drive API calls
    res.json({ message: 'Listing deleted successfully' });

    // Best-effort Drive cleanup (after response is sent)
    // Each file is only deleted if no other listing still references its URL.
    if (imageUrls.length > 0) {
      cleanupListingImages(imageUrls, prisma, id)
        .then((result) => {
          const { deleted, skipped, failed } = result;
          console.log(
            `[Drive cleanup] listing ${id}: deleted=${deleted.length}, skipped=${skipped.length}, failed=${failed.length}`
          );
          if (failed.length > 0) {
            console.error(
              `[Drive cleanup] listing ${id}: ${failed.length} file(s) failed to delete from Drive:`,
              failed
            );
          }
        })
        .catch((err) => {
          console.error(`[Drive cleanup] listing ${id}: unexpected error during cleanup:`, err);
        });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
