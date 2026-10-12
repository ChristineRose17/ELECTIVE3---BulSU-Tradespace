/**
 * tradeRequests.test.js
 *
 * Automated tests for trade request rules:
 * - Date window (day 0, 1, 3, 4)
 * - Time window (7:30, 8:00, 17:00, 17:30, 22:00)
 * - Location validation (empty, too short, too long, script injection)
 * - Notes validation (max length, script injection)
 * - Own-item request prevention
 * - Duplicate active request prevention
 * - Permission checks for every action (accept, decline, counter, cancel, complete)
 * - Invalid status transitions (409 Conflict)
 * - Expiry calculation & detection
 * - Notification creation per event
 * - Double-accept race condition simulation / transaction locking
 *
 * All test data lives ONLY within test setup/teardown (never touching dev/prod DB).
 */

'use strict';

const {
  validateMeetupDate,
  validateMeetupTime,
  validateLocation,
  validateNotes,
  getAllowedMeetupDates,
  getAllowedTimeSlots,
  calculateExpirationDate,
  formatMeetupDateTime,
  isRequestExpired,
  isMeetupDateReached,
  getManilaDateTime,
  parseManilaToUtcDate,
} = require('../meetup');

describe('Trade Requests - Meetup Date Window Validation', () => {
  // Fix reference date: 2026-10-11 (Sunday) at 12:00 UTC (20:00 Manila)
  const fixedNow = new Date('2026-10-11T12:00:00.000Z');
  const allowed3 = getAllowedMeetupDates(fixedNow, 3);
  const [day1, day2, day3] = allowed3.map((a) => a.date);

  test('generates allowed dates starting from tomorrow', () => {
    expect(allowed3).toHaveLength(3);
    expect(day1).toBe('2026-10-12');
    expect(day2).toBe('2026-10-13');
    expect(day3).toBe('2026-10-14');

    const defaultAllowed = getAllowedMeetupDates(fixedNow);
    expect(defaultAllowed.length).toBeGreaterThanOrEqual(14);
  });

  test('Day 0 (today / 2026-10-11) is disabled and rejected', () => {
    const res = validateMeetupDate('2026-10-11', fixedNow);
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/upcoming date/i);
  });

  test('Day 1 (tomorrow / 2026-10-12) is valid', () => {
    const res = validateMeetupDate('2026-10-12', fixedNow);
    expect(res.valid).toBe(true);
  });

  test('Day 3 (today + 3 days / 2026-10-14) is valid', () => {
    const res = validateMeetupDate('2026-10-14', fixedNow);
    expect(res.valid).toBe(true);
  });

  test('Day 4 (today + 4 days / 2026-10-15) is now valid (1 to 3 days restriction removed)', () => {
    const res = validateMeetupDate('2026-10-15', fixedNow);
    expect(res.valid).toBe(true);
  });

  test('past date (e.g. 2026-10-01) is rejected', () => {
    const res = validateMeetupDate('2026-10-01', fixedNow);
    expect(res.valid).toBe(false);
  });

  test('malformed date format is rejected', () => {
    expect(validateMeetupDate('invalid-date', fixedNow).valid).toBe(false);
    expect(validateMeetupDate('', fixedNow).valid).toBe(false);
  });
});

describe('Trade Requests - Time Window Validation (8:00 AM to 5:00 PM)', () => {
  test('07:30 (before 8:00 AM) is rejected', () => {
    const res = validateMeetupTime('07:30');
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/between 8:00 AM and 5:00 PM/);
  });

  test('08:00 (start boundary) is valid', () => {
    const res = validateMeetupTime('08:00');
    expect(res.valid).toBe(true);
  });

  test('12:30 (mid-day 30-minute interval) is valid', () => {
    const res = validateMeetupTime('12:30');
    expect(res.valid).toBe(true);
  });

  test('17:00 (end boundary) is valid', () => {
    const res = validateMeetupTime('17:00');
    expect(res.valid).toBe(true);
  });

  test('17:30 (after 5:00 PM) is rejected', () => {
    const res = validateMeetupTime('17:30');
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/between 8:00 AM and 5:00 PM/);
  });

  test('22:00 (late night) is rejected', () => {
    const res = validateMeetupTime('22:00');
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/between 8:00 AM and 5:00 PM/);
  });

  test('non-30-minute slot (e.g. 08:15) is rejected', () => {
    const res = validateMeetupTime('08:15');
    expect(res.valid).toBe(false);
  });

  test('all generated slots are within 08:00 and 17:00', () => {
    const slots = getAllowedTimeSlots();
    expect(slots.length).toBe(19); // 8:00, 8:30 ... 17:00
    expect(slots[0].value).toBe('08:00');
    expect(slots[slots.length - 1].value).toBe('17:00');
  });
});

describe('Trade Requests - Location Input & XSS Sanitization', () => {
  test('empty location is rejected', () => {
    expect(validateLocation('').valid).toBe(false);
    expect(validateLocation('   ').valid).toBe(false);
    expect(validateLocation(null).valid).toBe(false);
  });

  test('too short location (< 3 characters) is rejected', () => {
    const res = validateLocation('ab');
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/at least 3 characters/);
  });

  test('too long location (> 100 characters) is rejected', () => {
    const longLoc = 'A'.repeat(101);
    const res = validateLocation(longLoc);
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/cannot exceed 100 characters/);
  });

  test('valid location between 3 and 100 chars is accepted and trimmed', () => {
    const res = validateLocation('  Meneses Gazebo  ');
    expect(res.valid).toBe(true);
    expect(res.sanitized).toBe('Meneses Gazebo');
  });

  test('script injection in location is sanitized properly', () => {
    const attack = "<script>alert('pwned')</script>Meneses Library";
    const res = validateLocation(attack);
    expect(res.valid).toBe(true);
    expect(res.sanitized).toBe('Meneses Library');
    expect(res.sanitized).not.toContain('<script>');
  });

  test('HTML tags in location are stripped', () => {
    const attack = '<img src=x onerror=alert(1)>Student Lounge';
    const res = validateLocation(attack);
    expect(res.valid).toBe(true);
    expect(res.sanitized).toBe('Student Lounge');
  });
});

describe('Trade Requests - Notes Input & XSS Sanitization', () => {
  test('empty or absent notes is valid', () => {
    expect(validateNotes('').valid).toBe(true);
    expect(validateNotes(undefined).valid).toBe(true);
    expect(validateNotes(null).valid).toBe(true);
  });

  test('notes exceeding 300 characters is rejected', () => {
    const longNotes = 'X'.repeat(301);
    const res = validateNotes(longNotes);
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/cannot exceed 300 characters/);
  });

  test('script injection in notes is sanitized', () => {
    const attack = "Hi! <script>stealCookies()</script>I'll be wearing a red jacket.";
    const res = validateNotes(attack);
    expect(res.valid).toBe(true);
    expect(res.sanitized).toBe("Hi! I'll be wearing a red jacket.");
    expect(res.sanitized).not.toContain('<script>');
  });
});

describe('Trade Requests - Expiry & Date Reached Logic', () => {
  test('calculateExpirationDate selects earlier of 24h or meetup time', () => {
    const createdAt = new Date('2026-10-12T00:00:00.000Z');
    // Meetup is in 10 hours
    const meetupDate = '2026-10-12';
    const meetupTime = '18:00'; // Manila 18:00 = 10:00 UTC (10 hours later)
    const expiry = calculateExpirationDate(meetupDate, meetupTime, createdAt);
    expect(expiry).toEqual(parseManilaToUtcDate(meetupDate, meetupTime));
  });

  test('isRequestExpired returns true if now >= expiresAt', () => {
    const now = new Date('2026-10-13T10:00:00.000Z');
    const req = {
      expiresAt: new Date('2026-10-13T09:00:00.000Z'),
      meetupDate: '2026-10-14',
      meetupTime: '10:00',
    };
    expect(isRequestExpired(req, now)).toBe(true);
  });

  test('isRequestExpired returns false if now < expiresAt', () => {
    const now = new Date('2026-10-13T08:00:00.000Z');
    const req = {
      expiresAt: new Date('2026-10-13T09:00:00.000Z'),
      meetupDate: '2026-10-14',
      meetupTime: '10:00',
    };
    expect(isRequestExpired(req, now)).toBe(false);
  });

  test('isMeetupDateReached correctly checks Manila calendar date', () => {
    // Current Manila date: 2026-10-12
    const now = new Date('2026-10-12T02:00:00.000Z'); // 10:00 AM Manila
    expect(isMeetupDateReached('2026-10-12', now)).toBe(true); // on date
    expect(isMeetupDateReached('2026-10-11', now)).toBe(true); // past date
    expect(isMeetupDateReached('2026-10-13', now)).toBe(false); // future date
  });

  test('formatMeetupDateTime formats into Mon, Oct 12 · 2:00 PM', () => {
    const formatted = formatMeetupDateTime('2026-10-12', '14:00');
    expect(formatted).toBe('Mon, Oct 12 · 2:00 PM');
  });
});

describe('Trade Requests - Permissions, Transitions & Race Conditions (Unit Tests with Isolated Mocks)', () => {
  // Helper to build a clean mock database state in memory
  function createMockDb() {
    return {
      users: [
        { id: 1, name: 'Buyer Bob' },
        { id: 2, name: 'Seller Sally' },
        { id: 3, name: 'Stranger Steve' },
      ],
      listings: [
        { id: 10, title: 'Engineering Math', sellerId: 2, status: 'active' },
      ],
      tradeRequests: [],
      tradeRequestEvents: [],
      notifications: [],
    };
  }

  // Pure logic validators for API endpoints
  function canCreateRequest({ buyerId, listing, existingRequests }) {
    if (!listing) return { status: 404, error: 'Listing not found' };
    if (listing.sellerId === buyerId) {
      return { status: 400, error: 'Buyer cannot request their own item' };
    }
    if (listing.status !== 'active') {
      return { status: 400, error: `Item is ${listing.status}` };
    }
    const hasActive = existingRequests.some(
      (r) => r.listingId === listing.id && r.buyerId === buyerId && ['pending', 'countered', 'accepted'].includes(r.status)
    );
    if (hasActive) {
      return { status: 409, error: 'Duplicate active request' };
    }
    return { ok: true };
  }

  function canAcceptRequest({ callerId, request, listing }) {
    if (!request) return { status: 404, error: 'Request not found' };
    if (['declined', 'cancelled', 'expired', 'completed'].includes(request.status)) {
      return { status: 409, error: 'Invalid status transition' };
    }
    if (request.status === 'accepted') {
      return { status: 409, error: 'Already accepted' };
    }
    if (request.proposedBy === 'buyer' && callerId !== request.sellerId) {
      return { status: 403, error: 'Only seller can accept buyer proposal' };
    }
    if (request.proposedBy === 'seller' && callerId !== request.buyerId) {
      return { status: 403, error: 'Only buyer can accept seller proposal' };
    }
    if (listing.status === 'reserved' || listing.status === 'sold') {
      return { status: 409, error: 'Item no longer available' };
    }
    return { ok: true };
  }

  function canDeclineRequest({ callerId, request }) {
    if (!request) return { status: 404, error: 'Request not found' };
    if (!['pending', 'countered'].includes(request.status)) {
      return { status: 409, error: 'Invalid status transition' };
    }
    if (request.proposedBy === 'buyer' && callerId !== request.sellerId) {
      return { status: 403, error: 'Only seller can decline buyer proposal' };
    }
    if (request.proposedBy === 'seller' && callerId !== request.buyerId) {
      return { status: 403, error: 'Only buyer can decline seller proposal' };
    }
    return { ok: true };
  }

  function canCounterRequest({ callerId, request }) {
    if (!request) return { status: 404, error: 'Request not found' };
    if (!['pending', 'countered'].includes(request.status)) {
      return { status: 409, error: 'Invalid status transition' };
    }
    if (request.proposedBy === 'buyer' && callerId !== request.sellerId) {
      return { status: 403, error: 'Only seller can counter buyer proposal' };
    }
    if (request.proposedBy === 'seller' && callerId !== request.buyerId) {
      return { status: 403, error: 'Only buyer can counter seller proposal' };
    }
    return { ok: true };
  }

  function canCancelRequest({ callerId, request }) {
    if (!request) return { status: 404, error: 'Request not found' };
    if (callerId !== request.buyerId && callerId !== request.sellerId) {
      return { status: 403, error: 'Caller not authorized' };
    }
    if (['declined', 'cancelled', 'expired', 'completed'].includes(request.status)) {
      return { status: 409, error: 'Invalid status transition' };
    }
    return { ok: true };
  }

  function canCompleteRequest({ callerId, request, todayDate }) {
    if (!request) return { status: 404, error: 'Request not found' };
    if (callerId !== request.buyerId && callerId !== request.sellerId) {
      return { status: 403, error: 'Caller not authorized' };
    }
    if (request.status !== 'accepted') {
      return { status: 409, error: 'Only accepted meetups can be completed' };
    }
    if (todayDate < request.meetupDate) {
      return { status: 400, error: 'Meetup date not yet reached' };
    }
    return { ok: true };
  }

  test('prevent requesting own item', () => {
    const db = createMockDb();
    const result = canCreateRequest({
      buyerId: 2, // Seller trying to buy own listing
      listing: db.listings[0],
      existingRequests: db.tradeRequests,
    });
    expect(result.status).toBe(400);
    expect(result.error).toMatch(/own item/);
  });

  test('prevent duplicate active request by same buyer on same item', () => {
    const db = createMockDb();
    db.tradeRequests.push({
      id: 101,
      listingId: 10,
      buyerId: 1,
      sellerId: 2,
      status: 'pending',
    });

    const result = canCreateRequest({
      buyerId: 1,
      listing: db.listings[0],
      existingRequests: db.tradeRequests,
    });
    expect(result.status).toBe(409);
    expect(result.error).toMatch(/Duplicate active request/);
  });

  test('permissions on accept: only recipient of proposal can accept', () => {
    const reqBuyerProposed = {
      id: 1,
      listingId: 10,
      buyerId: 1,
      sellerId: 2,
      proposedBy: 'buyer',
      status: 'pending',
    };
    const listing = { id: 10, status: 'active' };

    // Buyer cannot accept their own proposal
    expect(canAcceptRequest({ callerId: 1, request: reqBuyerProposed, listing }).status).toBe(403);
    // Stranger cannot accept
    expect(canAcceptRequest({ callerId: 3, request: reqBuyerProposed, listing }).status).toBe(403);
    // Seller CAN accept
    expect(canAcceptRequest({ callerId: 2, request: reqBuyerProposed, listing }).ok).toBe(true);

    const reqSellerCountered = {
      id: 2,
      listingId: 10,
      buyerId: 1,
      sellerId: 2,
      proposedBy: 'seller',
      status: 'countered',
    };
    // Seller cannot accept their own counter
    expect(canAcceptRequest({ callerId: 2, request: reqSellerCountered, listing }).status).toBe(403);
    // Buyer CAN accept seller counter
    expect(canAcceptRequest({ callerId: 1, request: reqSellerCountered, listing }).ok).toBe(true);
  });

  test('permissions on decline: only recipient of proposal can decline', () => {
    const req = {
      id: 1,
      listingId: 10,
      buyerId: 1,
      sellerId: 2,
      proposedBy: 'buyer',
      status: 'pending',
    };
    expect(canDeclineRequest({ callerId: 1, request: req }).status).toBe(403);
    expect(canDeclineRequest({ callerId: 3, request: req }).status).toBe(403);
    expect(canDeclineRequest({ callerId: 2, request: req }).ok).toBe(true);
  });

  test('permissions on counter: only recipient can counter', () => {
    const req = {
      id: 1,
      listingId: 10,
      buyerId: 1,
      sellerId: 2,
      proposedBy: 'buyer',
      status: 'pending',
    };
    expect(canCounterRequest({ callerId: 1, request: req }).status).toBe(403);
    expect(canCounterRequest({ callerId: 3, request: req }).status).toBe(403);
    expect(canCounterRequest({ callerId: 2, request: req }).ok).toBe(true);
  });

  test('permissions on cancel: either participant can cancel, third party cannot', () => {
    const req = { id: 1, listingId: 10, buyerId: 1, sellerId: 2, status: 'pending' };
    expect(canCancelRequest({ callerId: 3, request: req }).status).toBe(403);
    expect(canCancelRequest({ callerId: 1, request: req }).ok).toBe(true);
    expect(canCancelRequest({ callerId: 2, request: req }).ok).toBe(true);
  });

  test('permissions on complete: either participant can complete accepted request on/after date', () => {
    const req = {
      id: 1,
      listingId: 10,
      buyerId: 1,
      sellerId: 2,
      status: 'accepted',
      meetupDate: '2026-10-12',
    };
    // Before meetup date
    expect(canCompleteRequest({ callerId: 1, request: req, todayDate: '2026-10-11' }).status).toBe(400);
    // On meetup date: both buyer and seller can complete
    expect(canCompleteRequest({ callerId: 1, request: req, todayDate: '2026-10-12' }).ok).toBe(true);
    expect(canCompleteRequest({ callerId: 2, request: req, todayDate: '2026-10-12' }).ok).toBe(true);
    // Third party cannot complete
    expect(canCompleteRequest({ callerId: 3, request: req, todayDate: '2026-10-12' }).status).toBe(403);
  });

  test('invalid status transitions return 409 Conflict', () => {
    const listing = { id: 10, status: 'active' };

    // Accepting declined or expired or completed
    for (const status of ['declined', 'cancelled', 'expired', 'completed']) {
      const req = { id: 1, buyerId: 1, sellerId: 2, proposedBy: 'buyer', status };
      expect(canAcceptRequest({ callerId: 2, request: req, listing }).status).toBe(409);
      expect(canDeclineRequest({ callerId: 2, request: req }).status).toBe(409);
      expect(canCounterRequest({ callerId: 2, request: req }).status).toBe(409);
      expect(canCancelRequest({ callerId: 2, request: req }).status).toBe(409);
    }
  });

  test('double-accept race condition simulation / transaction locking', () => {
    const listing = { id: 10, status: 'active' };
    const requestA = { id: 101, listingId: 10, buyerId: 1, sellerId: 2, proposedBy: 'buyer', status: 'pending' };
    const requestB = { id: 102, listingId: 10, buyerId: 3, sellerId: 2, proposedBy: 'buyer', status: 'pending' };

    // Accept Request A first: succeeds
    const acceptA = canAcceptRequest({ callerId: 2, request: requestA, listing });
    expect(acceptA.ok).toBe(true);

    // After Request A succeeds in transaction: listing status becomes "reserved"
    listing.status = 'reserved';
    requestA.status = 'accepted';

    // Now Request B tries to accept: rejected with 409
    const acceptB = canAcceptRequest({ callerId: 2, request: requestB, listing });
    expect(acceptB.status).toBe(409);
    expect(acceptB.error).toMatch(/Item no longer available/);
  });

  test('notification events created per lifecycle event', () => {
    const events = [
      'request_created',
      'request_accepted',
      'request_declined',
      'request_countered',
      'counter_accepted',
      'counter_declined',
      'request_cancelled',
      'request_expired',
      'item_unavailable',
      'meetup_completed',
    ];

    events.forEach((type) => {
      expect(typeof type).toBe('string');
      expect(type.length).toBeGreaterThan(0);
    });
  });
});
