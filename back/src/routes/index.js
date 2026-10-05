const express = require('express');
const router = express.Router();

const listingsRouter = require('./listings');
const authRouter = require('./auth');
const claimsRouter = require('./claims');

router.use('/listings', listingsRouter);
router.use('/auth', authRouter);
router.use('/claims', claimsRouter);

module.exports = router;
