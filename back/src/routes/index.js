const express = require('express');
const router = express.Router();

const listingsRouter = require('./listings');
const authRouter = require('./auth');
const claimsRouter = require('./claims');
const savedRouter = require('./saved');
const notificationsRouter = require('./notifications');

router.use('/listings', listingsRouter);
router.use('/auth', authRouter);
router.use('/claims', claimsRouter);
router.use('/saved', savedRouter);
router.use('/notifications', notificationsRouter);

module.exports = router;
