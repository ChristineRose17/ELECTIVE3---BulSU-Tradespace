/**
 * meetup.js
 *
 * Domain logic for meetup scheduling in Asia/Manila (UTC+8):
 * - Allowed date window (tomorrow up to +3 days)
 * - Allowed 30-minute time slots (08:00 to 17:00)
 * - XSS sanitization & input validation
 * - Asia/Manila date/time formatting ("Mon, Oct 12 · 2:00 PM")
 * - Expiration calculation
 */

'use strict';

const MANILA_TIMEZONE = 'Asia/Manila';

/**
 * Returns current Manila date components and ISO-like strings.
 * @param {Date} [now]
 * @returns {{ dateString: string, timeString: string, manilaDate: Date, parts: { year: number, month: number, day: number, hours: number, minutes: number, seconds: number } }}
 */
function getManilaDateTime(now = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: MANILA_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = {};
  for (const part of formatter.formatToParts(now)) {
    if (part.type !== 'literal') {
      parts[part.type] = parseInt(part.value, 10);
    }
  }

  // Handle midnight/24hr quirk in some environments
  const hours = parts.hour === 24 ? 0 : parts.hour;
  const year = parts.year;
  const month = parts.month;
  const day = parts.day;
  const minutes = parts.minute;
  const seconds = parts.second;

  const pad = (n) => String(n).padStart(2, '0');
  const dateString = `${year}-${pad(month)}-${pad(day)}`;
  const timeString = `${pad(hours)}:${pad(minutes)}`;

  // Construct a UTC Date representing the exact instant in Manila
  return {
    dateString,
    timeString,
    parts: { year, month, day, hours, minutes, seconds },
  };
}

/**
 * Helper to compute next N calendar days in Manila timezone.
 * @param {Date} [now]
 * @returns {Array<{ date: string, label: string, weekday: string, fullLabel: string }>}
 */
function getAllowedMeetupDates(now = new Date(), daysAhead = 30) {
  const { parts } = getManilaDateTime(now);
  const baseManilaUtc = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));

  const allowedDates = [];
  // Upcoming calendar days starting tomorrow up to daysAhead
  for (let offset = 1; offset <= daysAhead; offset++) {
    const target = new Date(baseManilaUtc.getTime() + offset * 86400000);
    const y = target.getUTCFullYear();
    const m = String(target.getUTCMonth() + 1).padStart(2, '0');
    const d = String(target.getUTCDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;

    const labelFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    // Use target date formatted
    const label = labelFormatter.format(target);

    const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      weekday: 'short',
    });
    const weekday = weekdayFormatter.format(target);

    allowedDates.push({
      date: dateStr,
      label, // e.g. "Mon, Oct 12"
      weekday,
      offsetDays: offset,
    });
  }

  return allowedDates;
}

/**
 * Generate 30-minute time slots between 08:00 and 17:00 (8:00 AM to 5:00 PM).
 * @returns {Array<{ value: string, label: string }>}
 */
function getAllowedTimeSlots() {
  const slots = [];
  for (let hour = 8; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 17 && minute > 0) break; // 17:00 is the final slot
      const hh = String(hour).padStart(2, '0');
      const mm = String(minute).padStart(2, '0');
      const value = `${hh}:${mm}`;

      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const label = `${displayHour}:${mm} ${ampm}`;

      slots.push({ value, label });
    }
  }
  return slots;
}

const ALLOWED_TIME_SLOT_VALUES = new Set(getAllowedTimeSlots().map((s) => s.value));

/**
 * Strips HTML tags and script elements, trims whitespace.
 * @param {string} str
 * @returns {string}
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validates meetup location.
 * Must be free text, required, trimmed, 3 to 100 characters.
 * @param {any} rawLocation
 * @returns {{ valid: boolean, error?: string, sanitized?: string }}
 */
function validateLocation(rawLocation) {
  if (typeof rawLocation !== 'string' || !rawLocation.trim()) {
    return { valid: false, error: 'Meetup location is required.' };
  }
  const sanitized = sanitizeInput(rawLocation);
  if (sanitized.length < 3) {
    return { valid: false, error: 'Meetup location must be at least 3 characters long.' };
  }
  if (sanitized.length > 100) {
    return { valid: false, error: 'Meetup location cannot exceed 100 characters.' };
  }
  return { valid: true, sanitized };
}

/**
 * Validates meetup date against the allowed Manila window (tomorrow to +3 days).
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {Date} [now]
 * @returns {{ valid: boolean, error?: string }}
 */
function validateMeetupDate(dateStr, now = new Date()) {
  if (!dateStr || typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { valid: false, error: 'Invalid date format. Expected YYYY-MM-DD.' };
  }

  const [y, m, d] = dateStr.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(y, m - 1, d));
  if (
    parsedDate.getUTCFullYear() !== y ||
    parsedDate.getUTCMonth() !== m - 1 ||
    parsedDate.getUTCDate() !== d
  ) {
    return { valid: false, error: 'Invalid calendar date.' };
  }

  const { dateString: todayManila } = getManilaDateTime(now);
  if (dateStr <= todayManila) {
    return {
      valid: false,
      error: 'Meetup date must be an upcoming date (tomorrow or later in Manila time).',
    };
  }

  return { valid: true };
}

/**
 * Validates meetup time slot.
 * Must be between 08:00 and 17:00 on valid 30-minute intervals.
 * @param {string} timeStr - "HH:mm"
 * @returns {{ valid: boolean, error?: string }}
 */
function validateMeetupTime(timeStr) {
  if (!timeStr || typeof timeStr !== 'string' || !/^\d{2}:\d{2}$/.test(timeStr)) {
    return { valid: false, error: 'Invalid time format. Expected HH:mm.' };
  }

  if (!ALLOWED_TIME_SLOT_VALUES.has(timeStr)) {
    return {
      valid: false,
      error: 'Meetup time must be between 8:00 AM and 5:00 PM on 30-minute intervals (e.g. 08:00, 08:30).',
    };
  }

  return { valid: true };
}

/**
 * Validates notes (optional, max 300 chars).
 * @param {any} rawNotes
 * @returns {{ valid: boolean, error?: string, sanitized: string }}
 */
function validateNotes(rawNotes) {
  if (!rawNotes) return { valid: true, sanitized: '' };
  if (typeof rawNotes !== 'string') {
    return { valid: false, error: 'Notes must be text.' };
  }
  const sanitized = sanitizeInput(rawNotes);
  if (sanitized.length > 300) {
    return { valid: false, error: 'Notes cannot exceed 300 characters.' };
  }
  return { valid: true, sanitized };
}

/**
 * Converts a Manila "YYYY-MM-DD" and "HH:mm" into a UTC Date object.
 * Manila is UTC+8: subtract 8 hours from Manila time to get UTC.
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {string} timeStr - "HH:mm"
 * @returns {Date}
 */
function parseManilaToUtcDate(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  // Date.UTC(y, m - 1, d, hh - 8, mm, 0)
  return new Date(Date.UTC(y, m - 1, d, hh - 8, mm, 0));
}

/**
 * Calculates the expiration DateTime for a new or countered request:
 * Expires 24 hours after proposal or at the meetup date/time, whichever is earlier.
 * @param {string} meetupDate - "YYYY-MM-DD"
 * @param {string} meetupTime - "HH:mm"
 * @param {Date} [createdAt]
 * @returns {Date}
 */
function calculateExpirationDate(meetupDate, meetupTime, createdAt = new Date()) {
  const meetupUtc = parseManilaToUtcDate(meetupDate, meetupTime);
  const twentyFourHoursLater = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

  // Whichever is earlier
  return meetupUtc < twentyFourHoursLater ? meetupUtc : twentyFourHoursLater;
}

/**
 * Formats a Manila date and time into: "Mon, Oct 12 · 2:00 PM"
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {string} timeStr - "HH:mm"
 * @returns {string}
 */
function formatMeetupDateTime(dateStr, timeStr) {
  try {
    const utcDate = parseManilaToUtcDate(dateStr, timeStr);
    const dateFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(utcDate);

    const timeFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(utcDate);

    return `${dateFormatted} · ${timeFormatted}`;
  } catch {
    return `${dateStr} ${timeStr}`;
  }
}

/**
 * Checks if a request is expired based on current Manila time and its expiresAt.
 * @param {{ expiresAt: Date | string | null, meetupDate: string, meetupTime: string }} request
 * @param {Date} [now]
 * @returns {boolean}
 */
function isRequestExpired(request, now = new Date()) {
  if (!request) return false;
  if (request.expiresAt) {
    const expiry = new Date(request.expiresAt);
    if (now >= expiry) return true;
  }
  if (request.meetupDate && request.meetupTime) {
    const meetupUtc = parseManilaToUtcDate(request.meetupDate, request.meetupTime);
    if (now >= meetupUtc) return true;
  }
  return false;
}

/**
 * Checks if a meetup date has arrived or passed (Manila calendar day).
 * Used to determine if "Mark as Completed" is enabled.
 * @param {string} meetupDateStr - "YYYY-MM-DD"
 * @param {Date} [now]
 * @returns {boolean}
 */
function isMeetupDateReached(meetupDateStr, now = new Date()) {
  const { dateString: todayManila } = getManilaDateTime(now);
  return todayManila >= meetupDateStr;
}

/**
 * Computes 30-minute end time for a given start time (e.g. 08:00 -> 08:30)
 * @param {string} startTime - "HH:mm"
 * @returns {string}
 */
function calculateEndTime(startTime) {
  if (!startTime) return '08:30';
  const [h, m] = startTime.split(':').map(Number);
  let totalMin = h * 60 + m + 30;
  const endH = Math.floor(totalMin / 60);
  const endM = totalMin % 60;
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
}

/**
 * Filters seller availability slots to only include active ones
 * within next 1 to 3 days (Asia/Manila) and between 08:00 and 17:00.
 * Past or expired slots are automatically ignored.
 * @param {Array<{ date: string, startTime: string }>} slots
 * @param {Date} [now]
 * @returns {Array<object>}
 */
function filterActiveAvailability(slots = [], now = new Date()) {
  if (!Array.isArray(slots)) return [];
  const { dateString: todayManila } = getManilaDateTime(now);

  return slots.filter((slot) => {
    if (!slot || !slot.date || !slot.startTime) return false;
    if (slot.date <= todayManila) return false;
    if (!ALLOWED_TIME_SLOT_VALUES.has(slot.startTime)) return false;
    return true;
  });
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Validates seller schedule input.
 * Schedule input: days 0-6 only, times within 08:00 to 17:00, end after start,
 * preferred_location trimmed, 3 to 100 chars, XSS-sanitized.
 * Supports both validateScheduleInput({ days, startTime, ... }) and validateScheduleInput(days, startTime, ...)
 */
function validateScheduleInput(daysOrObj, startTimeArg, endTimeArg, preferredLocationArg) {
  let days, startTime, endTime, preferredLocation;
  if (daysOrObj && typeof daysOrObj === 'object' && !Array.isArray(daysOrObj)) {
    days = daysOrObj.days;
    startTime = daysOrObj.startTime;
    endTime = daysOrObj.endTime;
    preferredLocation = daysOrObj.preferredLocation;
  } else {
    days = daysOrObj;
    startTime = startTimeArg;
    endTime = endTimeArg;
    preferredLocation = preferredLocationArg;
  }

  let sanitizedLoc = null;
  if (preferredLocation !== undefined && preferredLocation !== null) {
    const trimmed = typeof preferredLocation === 'string' ? preferredLocation.trim() : '';
    if (trimmed.length > 0) {
      if (trimmed.length < 3) {
        return { valid: false, error: 'Preferred location must be at least 3 characters long.' };
      }
      if (trimmed.length > 100) {
        return { valid: false, error: 'Preferred location cannot exceed 100 characters.' };
      }
      sanitizedLoc = sanitizeInput(trimmed);
    }
  }

  // Fallback to empty default schedule if nothing schedule-related is supplied
  const hasScheduleInput = days !== undefined || startTime !== undefined || endTime !== undefined;
  if (!hasScheduleInput || (days === undefined && !startTime && !endTime)) {
    return {
      valid: true,
      sanitizedLoc,
      preferredLocation: sanitizedLoc,
      emptySchedule: true,
      rules: [],
      schedules: [],
    };
  }

  if (!days || !Array.isArray(days)) {
    return { valid: false, error: 'Please provide available days as an array.' };
  }

  if (days.length === 0) {
    return { valid: false, error: 'Please select at least one available day.' };
  }

  const validDays = [];
  for (const d of days) {
    const num = Number(d);
    if (!Number.isInteger(num) || num < 0 || num > 6) {
      return { valid: false, error: 'Days of week must be integers between 0 (Sunday) and 6 (Saturday).' };
    }
    if (!validDays.includes(num)) validDays.push(num);
  }

  if (!startTime || !endTime) {
    return { valid: false, error: 'Start time and end time are required when selecting available days.' };
  }

  if (!ALLOWED_TIME_SLOT_VALUES.has(startTime)) {
    return { valid: false, error: 'Start time must be in 30-minute steps between 8:00 AM and 5:00 PM (08:00 to 16:30).' };
  }
  const allowedEndTimes = new Set([...ALLOWED_TIME_SLOT_VALUES, '17:00']);
  if (!allowedEndTimes.has(endTime)) {
    return { valid: false, error: 'End time must be in 30-minute steps between 8:00 AM and 5:00 PM.' };
  }

  if (endTime <= startTime) {
    return { valid: false, error: 'End time must be strictly after start time.' };
  }

  const rules = validDays.map((dayOfWeek) => ({
    dayOfWeek,
    startTime,
    endTime,
  }));

  return {
    valid: true,
    sanitizedLoc,
    preferredLocation: sanitizedLoc,
    emptySchedule: false,
    rules,
    schedules: rules,
    validDays,
    startTime,
    endTime,
  };
}

/**
 * Generates concrete 30-minute time slot values between startTime and endTime
 */
function generateTimeSlotsBetween(startTime, endTime) {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;

  const slots = [];
  for (let min = startTotal; min < endTotal; min += 30) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    const label = `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
    slots.push({ value, label, endTime: calculateEndTime(value) });
  }
  return slots;
}

/**
 * Generates concrete bookable slots for upcoming days in Asia/Manila,
 * from weekly recurring rules. Excludes slots already booked by an accepted request.
 */
function generateBookableSlots({ weeklyRules = [], acceptedRequests = [], now = new Date(), daysAhead = 30 }) {
  const defaultDates = getAllowedMeetupDates(now, daysAhead);
  const hasRules = Array.isArray(weeklyRules) && weeklyRules.length > 0;
  const standardSlots = getAllowedTimeSlots();

  const bookedSet = new Set(
    (acceptedRequests || []).map((r) => `${r.meetupDate}_${r.meetupTime}`)
  );

  const dateMap = {};
  const matchingDates = [];
  const allSlots = [];

  for (const dateObj of defaultDates) {
    const { date } = dateObj;
    const [y, m, d] = date.split('-').map(Number);
    const dayOfWeek = new Date(Date.UTC(y, m - 1, d)).getUTCDay();

    let daySlots = [];
    if (!hasRules) {
      daySlots = standardSlots.map((s) => ({
        value: s.value,
        label: s.label,
        endTime: calculateEndTime(s.value),
      }));
    } else {
      const matchedRules = weeklyRules.filter((r) => r.dayOfWeek === dayOfWeek);
      for (const rule of matchedRules) {
        const slotsForRule = generateTimeSlotsBetween(rule.startTime, rule.endTime);
        for (const s of slotsForRule) {
          if (!daySlots.some((existing) => existing.value === s.value)) {
            daySlots.push(s);
          }
        }
      }
    }

    if (daySlots.length > 0) {
      daySlots.sort((a, b) => a.value.localeCompare(b.value));

      const processedSlots = daySlots.map((s) => {
        const isBooked = bookedSet.has(`${date}_${s.value}`);
        return {
          date,
          time: s.value,
          label: s.label,
          endTime: s.endTime,
          booked: isBooked,
        };
      });

      dateMap[date] = processedSlots;
      matchingDates.push({
        ...dateObj,
        dayOfWeek,
        slotCount: processedSlots.length,
        availableSlotCount: processedSlots.filter((s) => !s.booked).length,
      });

      processedSlots.forEach((ps) => allSlots.push(ps));
    }
  }

  return {
    hasSellerSchedule: hasRules,
    matchingDays: matchingDates,
    slotsByDate: dateMap,
    allSlots,
    hasAvailableSlots: matchingDates.some((d) => d.availableSlotCount > 0),
    defaultDates,
    standardSlots: standardSlots.map((s) => ({ value: s.value, label: s.label })),
  };
}

/**
 * Validates a buyer's meetup proposal slot against seller's rules & bookings.
 */
function validateTradeRequestSlot({ meetupDate, meetupTime, customTime = false, weeklyRules = [], acceptedRequests = [], now = new Date() }) {
  const dateVal = validateMeetupDate(meetupDate, now);
  if (!dateVal.valid) return dateVal;

  const timeVal = validateMeetupTime(meetupTime);
  if (!timeVal.valid) return timeVal;

  const isBooked = (acceptedRequests || []).some(
    (r) => r.meetupDate === meetupDate && r.meetupTime === meetupTime
  );
  if (isBooked) {
    return {
      valid: false,
      error: 'The selected date and time slot is already booked for another confirmed meetup.',
    };
  }

  if (customTime) {
    return { valid: true };
  }

  if (!weeklyRules || weeklyRules.length === 0) {
    return { valid: true };
  }

  const [y, m, d] = meetupDate.split('-').map(Number);
  const dayOfWeek = new Date(Date.UTC(y, m - 1, d)).getUTCDay();

  const matchingRule = weeklyRules.find((rule) => {
    if (rule.dayOfWeek !== dayOfWeek) return false;
    return meetupTime >= rule.startTime && meetupTime < rule.endTime;
  });

  if (!matchingRule) {
    return {
      valid: false,
      error: 'The selected date and time slot does not match the seller’s available schedule.',
    };
  }

  return { valid: true };
}

module.exports = {
  MANILA_TIMEZONE,
  DAY_NAMES,
  getManilaDateTime,
  getAllowedMeetupDates,
  getAllowedTimeSlots,
  sanitizeInput,
  validateLocation,
  validateMeetupDate,
  validateMeetupTime,
  validateNotes,
  validateScheduleInput,
  generateTimeSlotsBetween,
  generateBookableSlots,
  validateTradeRequestSlot,
  parseManilaToUtcDate,
  calculateExpirationDate,
  formatMeetupDateTime,
  isRequestExpired,
  isMeetupDateReached,
  calculateEndTime,
  filterActiveAvailability,
};


