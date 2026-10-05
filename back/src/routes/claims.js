const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');

// GET /api/claims - Get claims for the logged-in user (🔒 JWT required)
router.get('/', verifyToken, async (req, res, next) => {
  try {
    // Look up the Prisma profile from the JWT
    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const { role } = req.query;

    // Show claims where this user is either the claimant OR the seller
    const where = role === 'seller'
      ? { listing: { sellerId: profile.id } }
      : { claimantId: profile.id };

    const claims = await prisma.claim.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        listing: {
          select: {
            id: true, title: true, price: true, type: true,
            images: true, campus: true, status: true,
            seller: { select: { id: true, name: true, email: true, phone: true } },
          },
        },
        claimant: {
          select: { id: true, name: true, email: true, studentId: true, campus: true, phone: true },
        },
      },
    });

    res.json(claims);
  } catch (error) {
    next(error);
  }
});

// POST /api/claims - Create a claim/offer on an item (🔒 JWT required)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { listingId, notes } = req.body;

    if (!listingId) {
      return res.status(400).json({ error: 'listingId is required.' });
    }

    // Resolve claimantId from JWT — never trust the client to supply this
    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    // Prevent claiming your own listing
    const listing = await prisma.listing.findUnique({ where: { id: parseInt(listingId, 10) } });
    if (!listing) return res.status(404).json({ error: 'Listing not found.' });
    if (listing.sellerId === profile.id) {
      return res.status(400).json({ error: "You can't claim your own listing." });
    }

    const claim = await prisma.claim.create({
      data: {
        listingId:  parseInt(listingId, 10),
        claimantId: profile.id,
        notes:      notes || '',
        status:     'pending',
      },
      include: {
        listing: true,
        claimant: { select: { id: true, name: true, email: true } },
      },
    });

    res.status(201).json(claim);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/claims/:id/status - Update claim status (🔒 JWT required)
router.patch('/:id/status', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: 'Status is required.' });

    const VALID = ['pending', 'accepted', 'declined', 'completed', 'cancelled'];
    if (!VALID.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID.join(', ')}.` });
    }

    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const claim = await prisma.claim.findUnique({
      where: { id },
      include: { listing: true },
    });
    if (!claim) return res.status(404).json({ error: 'Claim not found.' });

    // Only seller or claimant can update claim status
    if (claim.claimantId !== profile.id && claim.listing.sellerId !== profile.id) {
      return res.status(403).json({ error: 'You are not authorized to update this claim.' });
    }

    const updated = await prisma.claim.update({ where: { id }, data: { status } });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/claims/:id - Cancel or delete a claim (🔒 JWT required)
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const profile = await prisma.user.findUnique({ where: { supabaseId: req.supabaseUser.id } });
    if (!profile) return res.status(403).json({ error: 'User profile not found.' });

    const claim = await prisma.claim.findUnique({
      where: { id },
      include: { listing: true },
    });
    if (!claim) return res.status(404).json({ error: 'Claim not found.' });

    if (claim.claimantId !== profile.id && claim.listing.sellerId !== profile.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this claim.' });
    }

    await prisma.claim.delete({ where: { id } });
    res.json({ message: 'Claim removed successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
