const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');

// All saved-item routes require a valid JWT
router.use(verifyToken);

// Helper: get the Prisma user from the verified JWT
async function getUser(supabaseId) {
  return prisma.user.findUnique({ where: { supabaseId } });
}

// ─── GET /api/saved — list saved listing IDs for the current user ─────────────
router.get('/', async (req, res, next) => {
  try {
    const user = await getUser(req.supabaseUser.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const saved = await prisma.savedItem.findMany({
      where: { userId: user.id },
      select: { listingId: true },
    });
    res.json({ ids: saved.map((s) => s.listingId) });
  } catch (err) {
    next(err);
  }
});

// ─── POST /api/saved/:listingId — toggle save/unsave ─────────────────────────
router.post('/:listingId', async (req, res, next) => {
  try {
    const listingId = parseInt(req.params.listingId, 10);
    if (isNaN(listingId)) return res.status(400).json({ error: 'Invalid listing ID.' });

    const user = await getUser(req.supabaseUser.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const existing = await prisma.savedItem.findUnique({
      where: { userId_listingId: { userId: user.id, listingId } },
    });

    if (existing) {
      await prisma.savedItem.delete({
        where: { userId_listingId: { userId: user.id, listingId } },
      });
    } else {
      await prisma.savedItem.create({
        data: { userId: user.id, listingId },
      });
    }

    // Return updated list of saved IDs
    const saved = await prisma.savedItem.findMany({
      where: { userId: user.id },
      select: { listingId: true },
    });
    res.json({ ids: saved.map((s) => s.listingId) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
