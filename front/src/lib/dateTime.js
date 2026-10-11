/**
 * dateTime.js
 *
 * Client-side date and time formatting utilities in Asia/Manila timezone.
 */

export const MANILA_TIMEZONE = 'Asia/Manila';

/**
 * Format a YYYY-MM-DD and HH:mm into "Mon, Oct 12 · 2:00 PM"
 * @param {string} dateStr - YYYY-MM-DD
 * @param {string} timeStr - HH:mm
 * @returns {string}
 */
export function formatMeetupDateTime(dateStr, timeStr) {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm] = (timeStr || '00:00').split(':').map(Number);
    // Construct UTC timestamp corresponding to Manila local time (UTC+8)
    const utcDate = new Date(Date.UTC(y, m - 1, d, hh - 8, mm, 0));

    const dateFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(utcDate);

    if (!timeStr) return dateFormatted;

    const timeFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(utcDate);

    return `${dateFormatted} · ${timeFormatted}`;
  } catch {
    return `${dateStr} ${timeStr || ''}`.trim();
  }
}

/**
 * Checks if current Manila date has reached or passed the given meetup date.
 * @param {string} meetupDateStr - YYYY-MM-DD
 * @returns {boolean}
 */
export function isMeetupDateReachedClient(meetupDateStr) {
  if (!meetupDateStr) return false;
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: MANILA_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const todayManila = formatter.format(new Date());
    return todayManila >= meetupDateStr;
  } catch {
    return false;
  }
}

/**
 * Relative time ago formatted nicely
 * @param {string | Date} dateValue
 * @returns {string}
 */
export function timeAgo(dateValue) {
  if (!dateValue) return '';
  const now = new Date();
  const date = new Date(dateValue);
  const diffSec = Math.max(0, Math.floor((now - date) / 1000));

  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
