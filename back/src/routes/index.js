const express = require('express');
const router = express.Router();

const listingsRouter = require('./listings');
const authRouter = require('./auth');
const claimsRouter = require('./claims');
const savedRouter = require('./saved');
const notificationsRouter = require('./notifications');
const uploadRouter = require('./upload');
const tradeRequestsRouter = require('./tradeRequests');
const { getAllowedMeetupDates, getAllowedTimeSlots } = require('../lib/meetup');

router.use('/listings', listingsRouter);
router.use('/auth', authRouter);
router.use('/claims', claimsRouter);
router.use('/saved', savedRouter);
router.use('/notifications', notificationsRouter);
router.use('/upload', uploadRouter);
router.use('/trade-requests', tradeRequestsRouter);

// GET /api/meetup-options
router.get('/meetup-options', (req, res) => {
  res.json({
    timezone: 'Asia/Manila',
    allowedDates: getAllowedMeetupDates(),
    allowedTimeSlots: getAllowedTimeSlots(),
  });
});

// Alias for GET /api/items/:id/my-request forwarding to trade-requests
router.get('/items/:id/my-request', (req, res, next) => {
  req.url = `/item/${req.params.id}/my-request`;
  tradeRequestsRouter(req, res, next);
});

module.exports = router;

