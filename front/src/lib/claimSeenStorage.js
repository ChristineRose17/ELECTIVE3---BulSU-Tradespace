/**
 * claimSeenStorage.js
 *
 * Client-side persistence and tracking for "seen" trade requests per user.
 * Allows badges to decrement immediately when a user opens or interacts
 * with a trade request, even before a dedicated database column is migrated.
 */

const STORAGE_PREFIX = 'tradespace_seen_claims_';

function getStorageKey(userId) {
  return `${STORAGE_PREFIX}${userId || 'guest'}`;
}

export function getSeenMap(userId) {
  if (!userId) return {};
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isRequestSeen(userId, requestId, status, updatedAt) {
  if (!userId || !requestId) return false;
  const map = getSeenMap(userId);
  const entry = map[String(requestId)];
  if (!entry) return false;

  // If we recorded this status as seen and the status hasn't changed
  if (entry.lastStatus && status && entry.lastStatus === status) {
    return true;
  }

  // If timestamp of seeing is on or after the request's last update
  if (entry.seenAt && updatedAt) {
    const seenTime = new Date(entry.seenAt).getTime();
    const updateTime = new Date(updatedAt).getTime();
    if (!isNaN(seenTime) && !isNaN(updateTime) && seenTime >= updateTime) {
      return true;
    }
  }

  return Boolean(entry.seenAt);
}

export function markRequestSeen(userId, requestId, status, updatedAt) {
  if (!userId || !requestId) return;
  try {
    const map = getSeenMap(userId);
    map[String(requestId)] = {
      seenAt: new Date().toISOString(),
      lastStatus: status || null,
      updatedAt: updatedAt || null,
    };
    localStorage.setItem(getStorageKey(userId), JSON.stringify(map));
  } catch {
    /* ignore storage errors */
  }

  notifyClaimsUpdated();
}

export function markMultipleRequestsSeen(userId, requests = []) {
  if (!userId || !requests.length) return;
  try {
    const map = getSeenMap(userId);
    const now = new Date().toISOString();
    requests.forEach((req) => {
      if (req && req.id) {
        map[String(req.id)] = {
          seenAt: now,
          lastStatus: req.status || null,
          updatedAt: req.updatedAt || req.respondedAt || req.createdAt || null,
        };
      }
    });
    localStorage.setItem(getStorageKey(userId), JSON.stringify(map));
  } catch {
    /* ignore storage errors */
  }

  notifyClaimsUpdated();
}

export function notifyClaimsUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tradespace:claims-updated'));
  }
}
