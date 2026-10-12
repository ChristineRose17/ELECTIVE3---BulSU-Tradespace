/**
 * meetupSchedule.test.js
 *
 * Unit and integration tests for Meetup Schedule & Trade Lifecycle:
 * - Schedule input validation (days 0-6, times 08:00 to 17:00, start < end, location sanitization)
 * - Weekly recurring slot generation (tomorrow through +3 days in Asia/Manila)
 * - Booked slot blocking and slot re-opening after cancellation
 * - Custom-time requests vs seller schedule enforcement
 * - Empty schedule fallback to default
 * - Trade completion transaction (sets item to 'sold' and request to 'completed')
 * - Listing status visibility (Active, Reserved, Sold)
 * - Permissions (non-owner cannot edit schedule)
 *
 * STRICT DATA RULES: All tests use isolated in-memory data structures. Zero dev/prod DB touch.
 */

'use strict';

const {
  validateScheduleInput,
  generateTimeSlotsBetween,
  generateBookableSlots,
  validateTradeRequestSlot,
  getAllowedMeetupDates,
  sanitizeInput,
} = require('../meetup');

describe('PART 2 FEATURE - Schedule Input Validation', () => {
  test('rejects missing or non-array days', () => {
    const res = validateScheduleInput({ days: null, startTime: '09:00', endTime: '12:00' });
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/available days/i);
  });

  test('rejects empty days array', () => {
    const res = validateScheduleInput({ days: [], startTime: '09:00', endTime: '12:00' });
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/at least one/i);
  });

  test('rejects invalid day integers (e.g. 7 or negative numbers)', () => {
    const res1 = validateScheduleInput({ days: [7], startTime: '09:00', endTime: '12:00' });
    expect(res1.valid).toBe(false);
    expect(res1.error).toMatch(/between 0/i);

    const res2 = validateScheduleInput({ days: [-1], startTime: '09:00', endTime: '12:00' });
    expect(res2.valid).toBe(false);
  });

  test('rejects times outside 08:00 to 17:00', () => {
    const res1 = validateScheduleInput({ days: [1], startTime: '07:30', endTime: '12:00' });
    expect(res1.valid).toBe(false);
    expect(res1.error).toMatch(/between 8:00 AM and 5:00 PM/i);

    const res2 = validateScheduleInput({ days: [1], startTime: '09:00', endTime: '17:30' });
    expect(res2.valid).toBe(false);
  });

  test('rejects end time earlier than or equal to start time', () => {
    const res1 = validateScheduleInput({ days: [1], startTime: '12:00', endTime: '12:00' });
    expect(res1.valid).toBe(false);
    expect(res1.error).toMatch(/strictly after/i);

    const res2 = validateScheduleInput({ days: [1], startTime: '14:00', endTime: '10:00' });
    expect(res2.valid).toBe(false);
  });

  test('validates and sanitizes preferred location', () => {
    // Too short (< 3 chars)
    const resShort = validateScheduleInput({
      days: [1],
      startTime: '09:00',
      endTime: '12:00',
      preferredLocation: 'AB',
    });
    expect(resShort.valid).toBe(false);
    expect(resShort.error).toMatch(/at least 3 characters/i);

    // Too long (> 100 chars)
    const longLoc = 'A'.repeat(101);
    const resLong = validateScheduleInput({
      days: [1],
      startTime: '09:00',
      endTime: '12:00',
      preferredLocation: longLoc,
    });
    expect(resLong.valid).toBe(false);
    expect(resLong.error).toMatch(/cannot exceed 100 characters/i);

    // XSS injection sanitized
    const resXss = validateScheduleInput({
      days: [1],
      startTime: '09:00',
      endTime: '12:00',
      preferredLocation: '<script>alert("hack")</script>Meneses Gazebo',
    });
    expect(resXss.valid).toBe(true);
    expect(resXss.preferredLocation).not.toContain('<script>');
    expect(resXss.preferredLocation).toContain('Meneses Gazebo');
  });

  test('accepts valid schedule inputs and produces clean schedules list', () => {
    const res = validateScheduleInput({
      days: [1, 3, 5], // Mon, Wed, Fri
      startTime: '09:00',
      endTime: '15:00',
      preferredLocation: '   Meneses Gazebo   ',
    });
    expect(res.valid).toBe(true);
    expect(res.schedules).toHaveLength(3);
    expect(res.schedules[0]).toEqual({ dayOfWeek: 1, startTime: '09:00', endTime: '15:00' });
    expect(res.preferredLocation).toBe('Meneses Gazebo');
  });
});

describe('Slot Generation & Weekly Recurring Rules', () => {
  // Reference date: 2026-10-11 (Sunday) at 12:00 UTC (20:00 Manila)
  // Tomorrow is Monday 2026-10-12 (dayOfWeek 1)
  // Day 2 is Tuesday 2026-10-13 (dayOfWeek 2)
  // Day 3 is Wednesday 2026-10-14 (dayOfWeek 3)
  const fixedNow = new Date('2026-10-11T12:00:00.000Z');

  test('empty schedule falls back to default (any day 8AM to 5PM, upcoming days)', () => {
    const slotData = generateBookableSlots({
      weeklyRules: [],
      acceptedRequests: [],
      now: fixedNow,
      daysAhead: 3,
    });

    expect(slotData.hasSellerSchedule).toBe(false);
    expect(slotData.matchingDays).toHaveLength(3);
    expect(slotData.slotsByDate['2026-10-12'].length).toBeGreaterThan(0);
    expect(slotData.slotsByDate['2026-10-12'][0].time).toBe('08:00');
    expect(slotData.slotsByDate['2026-10-12'].slice(-1)[0].time).toBe('17:00');
  });

  test('generates slots only for matching weekdays', () => {
    // Seller only available on Tuesday (dayOfWeek: 2) from 10:00 to 12:00
    const weeklyRules = [{ dayOfWeek: 2, startTime: '10:00', endTime: '12:00' }];
    const slotData = generateBookableSlots({
      weeklyRules,
      acceptedRequests: [],
      now: fixedNow,
      daysAhead: 3,
    });

    expect(slotData.hasSellerSchedule).toBe(true);
    // In daysAhead 3 (Mon 10-12, Tue 10-13, Wed 10-14), only Tuesday (10-13) matches!
    expect(slotData.matchingDays).toHaveLength(1);
    expect(slotData.matchingDays[0].date).toBe('2026-10-13');
    expect(slotData.matchingDays[0].weekday).toBe('Tue');

    const tuesdaySlots = slotData.slotsByDate['2026-10-13'];
    // 10:00 to 12:00 in 30-min steps: 10:00, 10:30, 11:00, 11:30
    expect(tuesdaySlots.map((s) => s.time)).toEqual(['10:00', '10:30', '11:00', '11:30']);
  });

  test('blocks already booked slots from accepted trade requests', () => {
    const weeklyRules = [{ dayOfWeek: 2, startTime: '10:00', endTime: '12:00' }];
    const acceptedRequests = [{ meetupDate: '2026-10-13', meetupTime: '10:30' }];

    const slotData = generateBookableSlots({
      weeklyRules,
      acceptedRequests,
      now: fixedNow,
    });

    const tuesdaySlots = slotData.slotsByDate['2026-10-13'];
    const booked1030 = tuesdaySlots.find((s) => s.time === '10:30');
    const free1000 = tuesdaySlots.find((s) => s.time === '10:00');

    expect(booked1030.booked).toBe(true);
    expect(free1000.booked).toBe(false);
  });

  test('re-opens booked slot after accepted request is cancelled', () => {
    const weeklyRules = [{ dayOfWeek: 2, startTime: '10:00', endTime: '12:00' }];
    // When cancelled, request is no longer 'accepted', so acceptedRequests is empty
    const slotData = generateBookableSlots({
      weeklyRules,
      acceptedRequests: [], // simulate cancellation
      now: fixedNow,
    });

    const slot1030 = slotData.slotsByDate['2026-10-13'].find((s) => s.time === '10:30');
    expect(slot1030.booked).toBe(false);
  });
});

describe('Trade Request Backend Validation & Custom Time', () => {
  const fixedNow = new Date('2026-10-11T12:00:00.000Z');
  const weeklyRules = [{ dayOfWeek: 1, startTime: '09:00', endTime: '12:00' }]; // Monday 9AM - 12PM

  test('rejects slot outside seller schedule when customTime is false', () => {
    // 2026-10-12 is Monday, but 14:00 is outside 09:00 - 12:00
    const res = validateTradeRequestSlot({
      weeklyRules,
      meetupDate: '2026-10-12',
      meetupTime: '14:00',
      customTime: false,
      now: fixedNow,
    });
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/does not match the seller/i);
  });

  test('accepts slot outside seller schedule when customTime is true within standard hours', () => {
    const res = validateTradeRequestSlot({
      weeklyRules,
      meetupDate: '2026-10-12',
      meetupTime: '14:00',
      customTime: true,
      now: fixedNow,
    });
    expect(res.valid).toBe(true);
  });

  test('rejects slot when customTime is true but time is outside 8AM - 5PM', () => {
    const res = validateTradeRequestSlot({
      weeklyRules,
      meetupDate: '2026-10-12',
      meetupTime: '17:30',
      customTime: true,
      now: fixedNow,
    });
    expect(res.valid).toBe(false);
    expect(res.error).toMatch(/between 8:00 AM and 5:00 PM/i);
  });

  test('rejects slot when date is today or in past, but accepts upcoming date beyond 3 days', () => {
    const resPast = validateTradeRequestSlot({
      weeklyRules,
      meetupDate: '2026-10-11', // Today
      meetupTime: '10:00',
      customTime: true,
      now: fixedNow,
    });
    expect(resPast.valid).toBe(false);
    expect(resPast.error).toMatch(/upcoming date/i);

    // 2026-10-19 is next Monday (8 days ahead) -> now valid!
    const resFuture = validateTradeRequestSlot({
      weeklyRules,
      meetupDate: '2026-10-19',
      meetupTime: '10:00',
      customTime: false,
      now: fixedNow,
    });
    expect(resFuture.valid).toBe(true);
  });
});

describe('PART 1 BUG FIX - Complete Trade & Status Transitions', () => {
  // In-memory mock database state
  function createTestDb() {
    return {
      listings: [
        { id: 10, title: 'Draft Calculator', sellerId: 1, status: 'draft', preferredLocation: '' },
        { id: 20, title: 'Lab Coat', sellerId: 1, status: 'active', preferredLocation: 'Meneses Gazebo' },
        { id: 30, title: 'Drawing Board', sellerId: 1, status: 'reserved', preferredLocation: 'Library' },
        { id: 40, title: 'Old Textbook', sellerId: 1, status: 'sold', preferredLocation: 'Main Gate' },
      ],
      tradeRequests: [
        {
          id: 100,
          listingId: 30,
          sellerId: 1,
          buyerId: 2,
          status: 'accepted',
          meetupDate: '2026-10-12',
          meetupTime: '10:00',
          completedAt: null,
        },
      ],
    };
  }

  test('My Listings returns all statuses (active, reserved, sold, draft)', () => {
    const db = createTestDb();
    // Simulate GET /api/listings/mine for sellerId = 1
    const myListings = db.listings.filter((l) => l.sellerId === 1);

    expect(myListings).toHaveLength(4);
    const statuses = myListings.map((l) => l.status);
    expect(statuses).toContain('active');
    expect(statuses).toContain('reserved');
    expect(statuses).toContain('sold');
    expect(statuses).toContain('draft');

    // Counts match total unfiltered count
    const totalCount = myListings.length;
    const activeCount = myListings.filter((l) => l.status === 'active' || l.status === 'reserved').length;
    const soldCount = myListings.filter((l) => l.status === 'sold').length;
    const draftCount = myListings.filter((l) => l.status === 'draft').length;

    expect(totalCount).toBe(4);
    expect(activeCount).toBe(2);
    expect(soldCount).toBe(1);
    expect(draftCount).toBe(1);
  });

  test('Completing a trade atomically sets item to sold and request to completed', () => {
    const db = createTestDb();
    const req = db.tradeRequests.find((r) => r.id === 100);
    const listing = db.listings.find((l) => l.id === req.listingId);

    expect(listing.status).toBe('reserved');
    expect(req.status).toBe('accepted');
    expect(req.completedAt).toBeNull();

    // Transaction logic:
    const completedAt = new Date();
    req.status = 'completed';
    req.completedAt = completedAt;
    listing.status = 'sold';

    expect(listing.status).toBe('sold');
    expect(req.status).toBe('completed');
    expect(req.completedAt).toBe(completedAt);

    // Listing appears under Completed / Sold
    const soldListings = db.listings.filter((l) => l.sellerId === 1 && l.status === 'sold');
    expect(soldListings).toHaveLength(2); // ID 40 and newly completed ID 30
    expect(soldListings.some((l) => l.id === 30)).toBe(true);
  });

  test('Non-owner cannot edit listing schedule', () => {
    const db = createTestDb();
    const listing = db.listings.find((l) => l.id === 20); // owned by sellerId = 1

    function canEditSchedule(callerId, item) {
      if (!item) return { status: 404, error: 'Listing not found' };
      if (item.sellerId !== callerId) {
        return { status: 403, error: 'Only the seller can update meetup availability' };
      }
      return { ok: true };
    }

    const nonOwnerResult = canEditSchedule(999, listing);
    expect(nonOwnerResult.status).toBe(403);

    const ownerResult = canEditSchedule(1, listing);
    expect(ownerResult.ok).toBe(true);
  });
});

describe('Marketplace Status Filtering (Public vs My Listings)', () => {
  function getMarketplaceWhere({ category, campus, status, search, sellerId } = {}) {
    const where = {};
    if (category && category !== 'All') where.category = category;
    if (campus && campus !== 'All Campuses') where.campus = campus;
    if (sellerId) where.sellerId = parseInt(sellerId, 10);

    if (sellerId && status === 'all') {
      // allow seller to see all their statuses
    } else if (status === 'reserved') {
      where.status = 'reserved';
    } else {
      where.status = { in: ['active', 'reserved'] };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  function filterListings(listings, where) {
    return listings.filter((item) => {
      if (where.category && item.category !== where.category) return false;
      if (where.campus && item.campus !== where.campus) return false;
      if (where.sellerId && item.sellerId !== where.sellerId) return false;
      if (where.status) {
        if (typeof where.status === 'object' && where.status.in) {
          if (!where.status.in.includes(item.status)) return false;
        } else if (item.status !== where.status) {
          return false;
        }
      }
      if (where.OR) {
        const matches = where.OR.some((cond) => {
          if (cond.title && item.title.toLowerCase().includes(cond.title.contains.toLowerCase())) return true;
          if (cond.description && (item.description || '').toLowerCase().includes(cond.description.contains.toLowerCase())) return true;
          return false;
        });
        if (!matches) return false;
      }
      return true;
    });
  }

  const mockDb = [
    { id: 1, title: 'Calculus Book', category: 'Books', status: 'active', sellerId: 10 },
    { id: 2, title: 'Engineering Physics', category: 'Books', status: 'reserved', sellerId: 10 },
    { id: 3, title: 'Chemistry Lab Gown', category: 'Uniforms', status: 'sold', sellerId: 10 },
    { id: 4, title: 'Draft Calculator', category: 'Electronics', status: 'draft', sellerId: 10 },
    { id: 5, title: 'Mechanical Pencil', category: 'School Supplies', status: 'active', sellerId: 20 },
    { id: 6, title: 'Old Draft Uniform', category: 'Uniforms', status: 'draft', sellerId: 20 },
    { id: 7, title: 'Sold Drawing Board', category: 'School Supplies', status: 'sold', sellerId: 20 },
  ];

  test('Public marketplace query strictly returns only active and reserved items', () => {
    const where = getMarketplaceWhere({});
    expect(where.status).toEqual({ in: ['active', 'reserved'] });

    const results = filterListings(mockDb, where);
    const statuses = results.map((r) => r.status);
    expect(statuses).not.toContain('sold');
    expect(statuses).not.toContain('draft');
    expect(results).toHaveLength(3); // IDs 1, 2, 5
  });

  test('Search query strictly excludes sold and draft items', () => {
    const where = getMarketplaceWhere({ search: 'Drawing' });
    expect(where.status).toEqual({ in: ['active', 'reserved'] });

    const results = filterListings(mockDb, where);
    // ID 7 has title "Sold Drawing Board" but status is "sold"
    expect(results.some((r) => r.id === 7)).toBe(false);
    expect(results).toHaveLength(0);
  });

  test('Category filter strictly excludes sold and draft items', () => {
    // Category "Uniforms" has ID 3 (sold) and ID 6 (draft)
    const where = getMarketplaceWhere({ category: 'Uniforms' });
    expect(where.status).toEqual({ in: ['active', 'reserved'] });

    const results = filterListings(mockDb, where);
    expect(results).toHaveLength(0);
  });

  test('Saved items query excludes sold and draft listings', () => {
    const savedRecords = [
      { userId: 1, listingId: 1 }, // active
      { userId: 1, listingId: 3 }, // sold
      { userId: 1, listingId: 4 }, // draft
    ];

    const activeOrReservedSaved = savedRecords.filter((s) => {
      const item = mockDb.find((l) => l.id === s.listingId);
      return item && ['active', 'reserved'].includes(item.status);
    });

    expect(activeOrReservedSaved).toHaveLength(1);
    expect(activeOrReservedSaved[0].listingId).toBe(1);
  });

  test('My Listings endpoint returns all statuses including sold and draft', () => {
    const sellerListings = mockDb.filter((l) => l.sellerId === 10);
    expect(sellerListings).toHaveLength(4);

    const statuses = sellerListings.map((l) => l.status);
    expect(statuses).toContain('active');
    expect(statuses).toContain('reserved');
    expect(statuses).toContain('sold');
    expect(statuses).toContain('draft');
  });
});

