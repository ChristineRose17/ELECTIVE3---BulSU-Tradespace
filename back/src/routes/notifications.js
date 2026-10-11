const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');

// All notification routes require authentication
router.use(verifyToken);

// Helper to resolve the database User profile from JWT
async function getCurrentUser(supabaseId) {
  return prisma.user.findUnique({ where: { supabaseId } });
}

// ─── GET /api/notifications ──────────────────────────────────────────────────
// Returns notifications for the authenticated user (newest first)
// Query params: filter=all|unread (default: all), page=1, limit=30
router.get('/', async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.supabaseUser.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const filter = req.query.filter === 'unread' ? 'unread' : 'all';
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 30));
    const skip = (page - 1) * limit;

    const where = {
      userId: user.id,
      ...(filter === 'unread' ? { isRead: false } : {}),
    };

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          actor: {
            select: { id: true, name: true, avatar: true },
          },
          listing: {
            select: { id: true, title: true, images: true, type: true, price: true, status: true },
          },
          claim: {
            select: { id: true, status: true },
          },
          relatedRequest: {
            select: {
              id: true,
              status: true,
              meetupLocation: true,
              meetupDate: true,
              meetupTime: true,
              listingId: true,
            },
          },
        },
      }),
      prisma.notification.count({
        where: { userId: user.id, isRead: false },
      }),
    ]);

    res.json({
      notifications,
      unreadCount,
      page,
      limit,
    });
  } catch (error) {
    next(error);
  }
});

// ─── GET /api/notifications/unread-count ─────────────────────────────────────
router.get('/unread-count', async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.supabaseUser.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const count = await prisma.notification.count({
      where: { userId: user.id, isRead: false },
    });

    res.json({ count });
  } catch (error) {
    next(error);
  }
});

// Helper for mark-all-read
async function handleReadAll(req, res, next) {
  try {
    const user = await getCurrentUser(req.supabaseUser.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    await prisma.notification.updateMany({
      where: { userId: user.id, isRead: false },
      data: { isRead: true },
    });

    res.json({ ok: true, unreadCount: 0 });
  } catch (error) {
    next(error);
  }
}

// ─── POST & PATCH /api/notifications/read-all ────────────────────────────────
router.post('/read-all', handleReadAll);
router.patch('/read-all', handleReadAll);

// Helper for single mark-as-read
async function handleSingleRead(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid notification ID.' });

    const user = await getCurrentUser(req.supabaseUser.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const notification = await prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) return res.status(404).json({ error: 'Notification not found.' });

    if (notification.userId !== user.id) {
      return res.status(403).json({ error: 'You are not authorized to update this notification.' });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    const unreadCount = await prisma.notification.count({
      where: { userId: user.id, isRead: false },
    });

    res.json({ ok: true, notification: updated, unreadCount });
  } catch (error) {
    next(error);
  }
}

// ─── POST & PATCH /api/notifications/:id/read ────────────────────────────────
router.post('/:id/read', handleSingleRead);
router.patch('/:id/read', handleSingleRead);

module.exports = router;

