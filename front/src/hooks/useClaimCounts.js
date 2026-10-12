/**
 * useClaimCounts.js
 *
 * Shared hook for tracking trade request attention counts:
 * - myRequestsCount: requests sent by current user that need action or have updates
 *   (seller counter-proposal, seller accepted meetup, seller declined)
 * - incomingCount: requests received by current user (as seller) waiting for response
 *   (pending or buyer counter-proposal)
 * - totalCount: myRequestsCount + incomingCount
 *
 * Features:
 * - Shared singleton state across components (Sidebar, MyClaims tabs, etc.) to prevent duplicate API requests
 * - 30-second polling (pauses when browser tab is inactive)
 * - Instant updates via 'tradespace:claims-updated' CustomEvent (when accept/decline/counter/cancel/seen happens)
 * - Optional Supabase Realtime subscription fallback
 * - Client-side "seen" deduction
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyTradeRequests, getIncomingTradeRequests } from '../lib/api';
import { isRequestSeen, markRequestSeen, notifyClaimsUpdated } from '../lib/claimSeenStorage';
import { supabase } from '../lib/supabase';

// Shared singleton store across all hook instances
let sharedState = {
  myRequestsCount: 0,
  incomingCount: 0,
  totalCount: 0,
  loading: true,
  error: null,
  cachedMine: [],
  cachedIncoming: [],
};

const subscribers = new Set();
let activeUserId = null;
let pollTimer = null;
let realtimeChannel = null;
let isFetching = false;

function emitChange() {
  subscribers.forEach((callback) => callback(sharedState));
}

/**
 * Calculates current badge counts from cached requests and seen records.
 */
function calculateCounts(userId, mine = [], incoming = []) {
  if (!userId) {
    return { myRequestsCount: 0, incomingCount: 0, totalCount: 0 };
  }

  // 1. My Requests (sent by current user)
  // Needs action or has update:
  // - seller countered (proposedBy === 'seller')
  // - seller accepted
  // - seller declined
  // Excludes completed and cancelled
  const myRequestsCount = mine.filter((r) => {
    if (!r || !r.status) return false;
    const s = r.status.toLowerCase();
    if (s === 'completed' || s === 'cancelled' || s === 'expired') {
      return false;
    }

    const needsAttention =
      (s === 'countered' && r.proposedBy === 'seller') ||
      s === 'accepted' ||
      s === 'declined';

    if (!needsAttention) return false;

    // Check if user has already seen this update
    const seen = isRequestSeen(
      userId,
      r.id,
      r.status,
      r.updatedAt || r.respondedAt || r.createdAt
    );

    return !seen;
  }).length;

  // 2. Incoming Requests (sent to current user as seller)
  // Waiting for seller's response:
  // - pending
  // - buyer countered (proposedBy === 'buyer')
  // Excludes completed, cancelled, declined, expired
  const incomingCount = incoming.filter((r) => {
    if (!r || !r.status) return false;
    const s = r.status.toLowerCase();
    if (s === 'completed' || s === 'cancelled' || s === 'declined' || s === 'expired') {
      return false;
    }

    const waitingForSeller =
      s === 'pending' ||
      (s === 'countered' && r.proposedBy === 'buyer');

    if (!waitingForSeller) return false;

    // Check if user has already opened/seen this pending request
    const seen = isRequestSeen(
      userId,
      r.id,
      r.status,
      r.updatedAt || r.createdAt
    );

    return !seen;
  }).length;

  return {
    myRequestsCount,
    incomingCount,
    totalCount: myRequestsCount + incomingCount,
  };
}

async function fetchAllCounts(userId) {
  if (!userId || isFetching) return;
  isFetching = true;

  try {
    const [mineRes, incomingRes] = await Promise.all([
      getMyTradeRequests({ status: 'all', limit: 50 }).catch(() => ({ requests: [] })),
      getIncomingTradeRequests({ status: 'all', limit: 50 }).catch(() => ({ requests: [] })),
    ]);

    const mine = mineRes?.requests || [];
    const incoming = incomingRes?.requests || [];

    const computed = calculateCounts(userId, mine, incoming);

    sharedState = {
      ...sharedState,
      ...computed,
      cachedMine: mine,
      cachedIncoming: incoming,
      loading: false,
      error: null,
    };
  } catch (err) {
    sharedState = {
      ...sharedState,
      loading: false,
      error: err.message || 'Failed to fetch trade counts',
    };
  } finally {
    isFetching = false;
    emitChange();
  }
}

function startSubscription(userId) {
  if (!userId) {
    sharedState = {
      myRequestsCount: 0,
      incomingCount: 0,
      totalCount: 0,
      loading: false,
      error: null,
      cachedMine: [],
      cachedIncoming: [],
    };
    emitChange();
    return;
  }

  activeUserId = userId;
  fetchAllCounts(userId);

  // Set up 30s polling
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(() => {
    if (typeof document !== 'undefined' && document.hidden) return;
    fetchAllCounts(activeUserId);
  }, 30000);

  // Set up Supabase realtime channel (if supported and configured)
  try {
    if (supabase && typeof supabase.channel === 'function') {
      const channelName = `claims_counts_${userId}`;
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
      }
      realtimeChannel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'trade_requests' },
          () => {
            fetchAllCounts(activeUserId);
          }
        )
        .subscribe();
    }
  } catch {
    /* Fallback to polling & custom events */
  }
}

function stopSubscription() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  if (realtimeChannel && supabase) {
    try {
      supabase.removeChannel(realtimeChannel);
    } catch {
      /* ignore */
    }
    realtimeChannel = null;
  }
}

// Global event listener for instant local sync (accept/counter/decline/seen)
if (typeof window !== 'undefined') {
  window.addEventListener('tradespace:claims-updated', () => {
    if (!activeUserId) return;
    // Immediately re-evaluate with cached data for instant badge decrease
    const computed = calculateCounts(
      activeUserId,
      sharedState.cachedMine,
      sharedState.cachedIncoming
    );
    sharedState = { ...sharedState, ...computed };
    emitChange();

    // Then background fetch for full server sync
    fetchAllCounts(activeUserId);
  });

  window.addEventListener('visibilitychange', () => {
    if (!document.hidden && activeUserId) {
      fetchAllCounts(activeUserId);
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('tradespace_seen_claims_') && activeUserId) {
      const computed = calculateCounts(
        activeUserId,
        sharedState.cachedMine,
        sharedState.cachedIncoming
      );
      sharedState = { ...sharedState, ...computed };
      emitChange();
    }
  });
}

/**
 * Shared React hook
 */
export function useClaimCounts() {
  const { user } = useAuth();
  const userId = user?.id || null;
  const [state, setState] = useState(sharedState);

  useEffect(() => {
    const handleUpdate = (nextState) => {
      setState({ ...nextState });
    };

    subscribers.add(handleUpdate);

    // If user changed or not yet initialized
    if (userId !== activeUserId) {
      startSubscription(userId);
    }

    return () => {
      subscribers.delete(handleUpdate);
      if (subscribers.size === 0) {
        stopSubscription();
        activeUserId = null;
      }
    };
  }, [userId]);

  const refreshCounts = useCallback(() => {
    if (userId) {
      return fetchAllCounts(userId);
    }
  }, [userId]);

  const markAsSeen = useCallback(
    (requestId, status, updatedAt) => {
      if (!userId || !requestId) return;
      markRequestSeen(userId, requestId, status, updatedAt);
    },
    [userId]
  );

  return {
    myRequestsCount: state.myRequestsCount,
    incomingCount: state.incomingCount,
    totalCount: state.totalCount,
    loading: state.loading,
    error: state.error,
    refreshCounts,
    markAsSeen,
  };
}

export default useClaimCounts;
