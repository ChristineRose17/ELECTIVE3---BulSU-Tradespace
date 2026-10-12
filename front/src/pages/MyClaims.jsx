/**
 * MyClaims.jsx
 *
 * Trade Requests & Meetup Dashboard:
 * - Dual Mode: "My Requests" (Buyer / Sent) vs. "Incoming Requests" (Seller / Received)
 * - Filter Tabs: Pending, Accepted, All
 * - Live real API data from backend
 * - Status badges: Pending, Counter-proposed, Accepted, Declined, Cancelled, Expired, Completed
 * - Seller Actions: Accept, Decline (dialog w/ reason), Propose another time/place (Counter)
 * - Buyer Actions: Accept counter, Decline counter, Cancel pending
 * - Confirmed meetup card with "Mark as Completed" on/after date
 * - Loading skeletons, empty states, error retry, toasts, accessible modals
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Store,
  Clock,
  Handshake,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
  Calendar,
  MapPin,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Ban,
  PackageOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getMyTradeRequests,
  getIncomingTradeRequests,
  acceptTradeRequest,
  declineTradeRequest,
  cancelTradeRequest,
} from '../lib/api';
import { priceText } from '../lib/listing';
import { formatMeetupDateTime, timeAgo } from '../lib/dateTime';
import Avatar from '../components/Avatar';
import CounterProposalModal from '../components/CounterProposalModal';
import ConfirmDialog from '../components/ConfirmDialog';
import MeetupConfirmedCard from '../components/MeetupConfirmedCard';
import CountBadge from '../components/CountBadge';
import { useClaimCounts } from '../hooks/useClaimCounts';
import { isRequestSeen, markMultipleRequestsSeen, notifyClaimsUpdated } from '../lib/claimSeenStorage';

export default function MyClaims() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { myRequestsCount, incomingCount, markAsSeen, refreshCounts } = useClaimCounts();

  // Mode: 'mine' (buyer / sent) | 'incoming' (seller / received)
  const currentView = searchParams.get('view') === 'incoming' ? 'incoming' : 'mine';
  // Filter tab: 'all' | 'pending' | 'accepted'
  const currentFilter = searchParams.get('filter') || 'all';
  const targetReqId = searchParams.get('req') ? parseInt(searchParams.get('req'), 10) : null;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState('');

  // Modals
  const [counterTarget, setCounterTarget] = useState(null);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const fetcher = currentView === 'incoming' ? getIncomingTradeRequests : getMyTradeRequests;
      const res = await fetcher({ status: 'all' });
      setRequests(res.requests || []);
    } catch (err) {
      console.error('Failed to fetch trade requests:', err);
      setErrorMsg('Failed to load trade requests. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [currentView]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Mark target deep-linked request as seen when opened
  useEffect(() => {
    if (targetReqId && user?.id) {
      markAsSeen(targetReqId);
    }
  }, [targetReqId, user?.id, markAsSeen]);

  const switchView = (newView) => {
    const next = new URLSearchParams(searchParams);
    next.set('view', newView);
    next.delete('req');
    setSearchParams(next);
  };

  const switchFilter = (newFilter) => {
    const next = new URLSearchParams(searchParams);
    next.set('filter', newFilter);
    setSearchParams(next);
  };

  // Status counts for stat cards (computed over full unfiltered list)
  const stats = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'pending' || r.status === 'countered').length,
      accepted: requests.filter((r) => r.status === 'accepted').length,
      completed: requests.filter((r) => r.status === 'completed').length,
    };
  }, [requests]);

  // Client-side filtering by tab
  const filteredRequests = useMemo(() => {
    if (currentFilter === 'all') return requests;
    if (currentFilter === 'pending') return requests.filter((r) => r.status === 'pending' || r.status === 'countered');
    if (currentFilter === 'accepted') return requests.filter((r) => r.status === 'accepted');
    if (currentFilter === 'completed') return requests.filter((r) => r.status === 'completed');
    return requests.filter((r) => r.status === currentFilter);
  }, [requests, currentFilter]);

  // Status badge config
  const getStatusBadge = (status, proposedBy) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          className: 'req-badge-pending',
          icon: <Clock size={13} />,
        };
      case 'countered':
        return {
          label: proposedBy === (currentView === 'mine' ? 'seller' : 'buyer') ? 'Counter-Proposed' : 'Counter Sent',
          className: 'req-badge-countered',
          icon: <ArrowRightLeft size={13} />,
        };
      case 'accepted':
        return {
          label: 'Accepted Meetup',
          className: 'req-badge-accepted',
          icon: <Check size={13} />,
        };
      case 'declined':
        return {
          label: 'Declined',
          className: 'req-badge-declined',
          icon: <XCircle size={13} />,
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          className: 'req-badge-cancelled',
          icon: <Ban size={13} />,
        };
      case 'expired':
        return {
          label: 'Expired',
          className: 'req-badge-expired',
          icon: <Clock size={13} />,
        };
      case 'completed':
        return {
          label: 'Completed',
          className: 'req-badge-completed',
          icon: <CheckCircle2 size={13} />,
        };
      default:
        return {
          label: status,
          className: 'req-badge-default',
          icon: <Tag size={13} />,
        };
    }
  };

  // Action: Accept request
  const handleAccept = async (req) => {
    setActionLoading(true);
    try {
      await acceptTradeRequest(req.id);
      markAsSeen(req.id, 'accepted');
      notifyClaimsUpdated();
      say('Meetup request accepted! Confirmed details are shown below.');
      await fetchRequests();
      refreshCounts();
    } catch (err) {
      say(err.message || 'Failed to accept request.');
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Confirm Decline
  const handleConfirmDecline = async (reason) => {
    if (!declineTarget) return;
    try {
      await declineTradeRequest(declineTarget.id, reason);
      markAsSeen(declineTarget.id, 'declined');
      notifyClaimsUpdated();
      say('Request has been declined.');
      setDeclineTarget(null);
      await fetchRequests();
      refreshCounts();
    } catch (err) {
      say(err.message || 'Failed to decline request.');
      throw err;
    }
  };

  // Action: Confirm Cancel
  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    try {
      await cancelTradeRequest(cancelTarget.id);
      markAsSeen(cancelTarget.id, 'cancelled');
      notifyClaimsUpdated();
      say('Request has been cancelled.');
      setCancelTarget(null);
      await fetchRequests();
      refreshCounts();
    } catch (err) {
      say(err.message || 'Failed to cancel request.');
      throw err;
    }
  };

  return (
    <div className="page-container tr-page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>Campus Trade Requests</h1>
          <p>Schedule, manage, and confirm verified on-campus meetups with students.</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => nav('/marketplace')}
        >
          <Store size={16} />
          <span>Explore Marketplace</span>
        </button>
      </div>

      {/* Role View Tabs: My Requests (Buyer) vs Incoming Requests (Seller) */}
      <div className="tr-role-tabs-wrap">
        <div className="tr-role-tabs">
          <button
            type="button"
            className={`tr-role-tab ${currentView === 'mine' ? 'active' : ''}`}
            onClick={() => switchView('mine')}
          >
            <Handshake size={17} />
            <span>My Requests</span>
            <CountBadge count={myRequestsCount} />
          </button>
          <button
            type="button"
            className={`tr-role-tab ${currentView === 'incoming' ? 'active' : ''}`}
            onClick={() => switchView('incoming')}
          >
            <Clock size={17} />
            <span>Incoming Requests</span>
            <CountBadge count={incomingCount} />
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon gold">
            <Clock size={20} />
          </div>
          <div className="stat-details">
            <span>Pending &amp; Countered</span>
            <strong>{stats.pending}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Handshake size={20} />
          </div>
          <div className="stat-details">
            <span>Accepted Meetups</span>
            <strong>{stats.accepted}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon maroon">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-details">
            <span>Completed Trades</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs: All | Pending | Accepted */}
      <div className="tr-filter-bar">
        <div className="tr-filter-tabs">
          <button
            type="button"
            className={`tr-filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => switchFilter('all')}
          >
            All Requests
          </button>
          <button
            type="button"
            className={`tr-filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
            onClick={() => switchFilter('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            className={`tr-filter-btn ${currentFilter === 'accepted' ? 'active' : ''}`}
            onClick={() => switchFilter('accepted')}
          >
            Accepted Meetups
          </button>
          <button
            type="button"
            className={`tr-filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
            onClick={() => switchFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="tr-filter-actions">
          {((currentView === 'mine' && myRequestsCount > 0) ||
            (currentView === 'incoming' && incomingCount > 0)) && (
            <button
              type="button"
              className="tr-mark-read-btn"
              onClick={() => {
                markMultipleRequestsSeen(user?.id, requests);
                say('All requests in this view marked as seen.');
              }}
              title="Mark all requests in this view as seen"
            >
              <Check size={14} />
              <span>Mark All Seen</span>
            </button>
          )}

          <button
            type="button"
            className="tr-refresh-btn"
            onClick={() => {
              fetchRequests();
              refreshCounts();
            }}
            disabled={loading}
            title="Refresh requests"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        /* Loading Skeletons */
        <div className="tr-requests-list">
          {[1, 2, 3].map((n) => (
            <div key={n} className="tr-request-card skeleton-card">
              <div className="skeleton-thumb" />
              <div className="skeleton-lines">
                <div className="skeleton-line title" />
                <div className="skeleton-line half" />
                <div className="skeleton-line full" />
              </div>
            </div>
          ))}
        </div>
      ) : errorMsg ? (
        /* Error State with Retry */
        <div className="tr-error-state">
          <AlertCircle size={40} className="tr-error-icon" />
          <h3>Could not load requests</h3>
          <p>{errorMsg}</p>
          <button type="button" className="btn-primary" onClick={fetchRequests}>
            <RefreshCw size={15} />
            <span>Try Again</span>
          </button>
        </div>
      ) : filteredRequests.length === 0 ? (
        /* Empty State */
        <div className="tr-empty-state">
          <div className="tr-empty-icon-wrap">
            {currentFilter === 'completed' ? <CheckCircle2 size={36} /> : currentView === 'incoming' ? <Clock size={36} /> : <Handshake size={36} />}
          </div>
          <h3>
            {currentFilter === 'completed'
              ? 'No completed trades yet'
              : currentFilter === 'pending'
              ? 'No pending trade requests'
              : currentFilter === 'accepted'
              ? 'No accepted meetups'
              : currentView === 'incoming'
              ? 'No incoming trade requests yet'
              : 'No trade requests sent yet'}
          </h3>
          <p>
            {currentFilter === 'completed'
              ? 'Completed meetups will appear here once confirmed by either party.'
              : currentView === 'incoming'
              ? 'When buyers schedule meetups on your listings, their requests will appear here for you to accept, counter, or decline.'
              : 'Browse the campus marketplace to find textbooks, uniforms, or gear, then schedule a safe on-campus meetup!'}
          </p>
          {currentView === 'mine' && currentFilter !== 'completed' && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => nav('/marketplace')}
              style={{ marginTop: 12 }}
            >
              <Store size={16} />
              <span>Browse Marketplace</span>
            </button>
          )}
        </div>
      ) : (
        /* Requests List */
        <div className="tr-requests-list">
          {filteredRequests.map((req) => {
            const isHighlighted = targetReqId === req.id;
            const badge = getStatusBadge(req.status, req.proposedBy);
            const otherPerson = currentView === 'incoming' ? req.buyer : req.seller;
            const otherPersonRole = currentView === 'incoming' ? 'Buyer' : 'Seller';
            const isPendingOrCountered = req.status === 'pending' || req.status === 'countered';

            // Check who needs to respond
            const isWaitingForCurrentUser =
              (req.status === 'pending' && currentView === 'incoming') ||
              (req.status === 'countered' && req.proposedBy !== (currentView === 'mine' ? 'buyer' : 'seller'));

            // Check if this request represents an unviewed update needing attention
            const isUnseenBuyerUpdate =
              currentView === 'mine' &&
              ((req.status === 'countered' && req.proposedBy === 'seller') ||
                req.status === 'accepted' ||
                req.status === 'declined') &&
              !isRequestSeen(user?.id, req.id, req.status, req.updatedAt || req.respondedAt || req.createdAt);

            const isUnseenSellerPending =
              currentView === 'incoming' &&
              (req.status === 'pending' || (req.status === 'countered' && req.proposedBy === 'buyer')) &&
              !isRequestSeen(user?.id, req.id, req.status, req.updatedAt || req.createdAt);

            const needsAttention = isUnseenBuyerUpdate || isUnseenSellerPending;

            return (
              <div
                key={req.id}
                id={`request-${req.id}`}
                className={`tr-request-card ${isHighlighted ? 'highlighted' : ''} ${needsAttention ? 'has-attention' : ''}`}
                onClick={() => {
                  if (needsAttention) {
                    markAsSeen(req.id, req.status, req.updatedAt || req.respondedAt || req.createdAt);
                  }
                }}
              >
                {/* Card Top: Item & Status */}
                <div className="tr-card-top">
                  <div className="tr-card-item-row">
                    {req.listing?.images?.[0] ? (
                      <img
                        src={req.listing.images[0]}
                        alt=""
                        className="tr-card-item-thumb"
                      />
                    ) : (
                      <div className="tr-card-item-placeholder">
                        <PackageOpen size={24} color="#8b1023" />
                      </div>
                    )}
                    <div className="tr-card-item-info">
                      <div className="tr-card-item-header">
                        <h3 className="tr-card-title">{req.listing?.title || 'Campus Item'}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          <span className={`req-badge ${badge.className}`}>
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                          {needsAttention && (
                            <span className="tr-attention-dot" title="New update needing your attention (click card to dismiss)">
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} />
                              <span>Needs Attention</span>
                            </span>
                          )}
                          {currentView === 'incoming' && req.status === 'pending' && (
                            <span
                              className="req-schedule-badge"
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: 12,
                                background: req.customTime ? '#fef3c7' : '#ecfdf5',
                                color: req.customTime ? '#92400e' : '#065f46',
                                border: `1px solid ${req.customTime ? '#fde68a' : '#a7f3d0'}`,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              <ShieldCheck size={12} />
                              <span>{req.customTime ? 'Outside your schedule' : 'Matches your schedule'}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="tr-card-price-row">
                        <span className="tr-card-price">
                          {req.listing?.type === 'Giveaway' ? 'Free Giveaway' : priceText(req.listing?.type, req.listing?.price)}
                        </span>
                        <span className="tr-card-meta-dot">&bull;</span>
                        <span className="tr-card-campus">{req.listing?.campus || 'Meneses Campus'}</span>
                        <span className="tr-card-meta-dot">&bull;</span>
                        <span className="tr-card-time-ago" title={req.createdAt}>
                          Sent {timeAgo(req.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Person and Proposed Schedule Info */}
                <div className="tr-card-middle">
                  <div className="tr-card-person-cell">
                    <Avatar name={otherPerson?.name || 'Student'} size="md" />
                    <div className="tr-card-person-details">
                      <small>{otherPersonRole}</small>
                      <strong>{otherPerson?.name || 'BulSU Student'}</strong>
                      {otherPerson?.campus && <small>{otherPerson.campus}</small>}
                    </div>
                  </div>

                  <div className="tr-card-schedule-box">
                    <div className="tr-sched-row">
                      <MapPin size={15} className="tr-sched-icon maroon" />
                      <span>
                        Location: <strong>{req.meetupLocation}</strong>
                      </span>
                    </div>
                    <div className="tr-sched-row">
                      <Calendar size={15} className="tr-sched-icon maroon" />
                      <span>
                        Meetup: <strong>{formatMeetupDateTime(req.meetupDate, req.meetupTime)}</strong>
                      </span>
                    </div>
                    {req.proposedBy === 'seller' && (
                      <div className="tr-counter-flag">
                        <ArrowRightLeft size={13} />
                        <span>Proposed by Seller (Counter-Offer)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes or Decline Reason */}
                {req.notes && (
                  <div className="tr-card-notes-bubble">
                    <MessageSquare size={14} className="tr-notes-icon" />
                    <div>
                      <small>Proposed Notes:</small>
                      <p>"{req.notes}"</p>
                    </div>
                  </div>
                )}

                {req.status === 'declined' && req.declineReason && (
                  <div className="tr-card-decline-bubble">
                    <XCircle size={14} className="tr-decline-icon" />
                    <div>
                      <small>Reason for decline:</small>
                      <p>{req.declineReason}</p>
                    </div>
                  </div>
                )}

                {/* If Accepted: Render Confirmed Meetup Card */}
                {req.status === 'accepted' && (
                  <div style={{ marginTop: 14 }}>
                    <MeetupConfirmedCard
                      request={req}
                      currentUserId={user?.id}
                      onCompleted={() => {
                        say('Trade marked as completed! Congratulations.');
                        markAsSeen(req.id, 'completed');
                        notifyClaimsUpdated();
                        switchFilter('completed');
                        fetchRequests();
                        refreshCounts();
                      }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="tr-card-actions">
                  {/* Action row when current user needs to respond (Seller on pending OR Buyer on countered) */}
                  {isWaitingForCurrentUser && isPendingOrCountered && (
                    <div className="tr-action-buttons-group">
                      <button
                        type="button"
                        className="btn-primary tr-btn-accept"
                        disabled={actionLoading}
                        onClick={() => handleAccept(req)}
                      >
                        <Check size={16} />
                        <span>Accept Meetup</span>
                      </button>

                      <button
                        type="button"
                        className="btn-outline tr-btn-counter"
                        disabled={actionLoading}
                        onClick={() => setCounterTarget(req)}
                      >
                        <ArrowRightLeft size={16} />
                        <span>Propose Another Time/Place</span>
                      </button>

                      <button
                        type="button"
                        className="btn-danger-outline"
                        disabled={actionLoading}
                        onClick={() => setDeclineTarget(req)}
                      >
                        <XCircle size={16} />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}

                  {/* Buyer waiting for seller response */}
                  {!isWaitingForCurrentUser && req.status === 'pending' && currentView === 'mine' && (
                    <div className="tr-action-waiting-row">
                      <div className="tr-waiting-hint">
                        <Clock size={15} />
                        <span>Waiting for seller's response...</span>
                      </div>
                      <button
                        type="button"
                        className="btn-outline-danger"
                        onClick={() => setCancelTarget(req)}
                      >
                        Cancel Request
                      </button>
                    </div>
                  )}

                  {/* Seller waiting for buyer response on counter */}
                  {!isWaitingForCurrentUser && req.status === 'countered' && currentView === 'incoming' && (
                    <div className="tr-action-waiting-row">
                      <div className="tr-waiting-hint">
                        <Clock size={15} />
                        <span>Counter-proposal sent. Waiting for buyer's response...</span>
                      </div>
                      <button
                        type="button"
                        className="btn-outline-danger"
                        onClick={() => setCancelTarget(req)}
                      >
                        Cancel Counter-Offer
                      </button>
                    </div>
                  )}

                  {/* Either party can cancel an accepted request if plans change */}
                  {req.status === 'accepted' && (
                    <div className="tr-card-cancel-meetup-row">
                      <button
                        type="button"
                        className="tr-cancel-meetup-link"
                        onClick={() => setCancelTarget(req)}
                      >
                        Need to cancel this confirmed meetup?
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Counter-Proposal Modal */}
      {counterTarget && (
        <CounterProposalModal
          request={counterTarget}
          onClose={() => setCounterTarget(null)}
          onSuccess={() => {
            say('Counter-proposal sent! The other party has been notified.');
            markAsSeen(counterTarget.id, 'countered');
            notifyClaimsUpdated();
            fetchRequests();
            refreshCounts();
          }}
        />
      )}

      {/* Decline Confirmation Dialog */}
      {declineTarget && (
        <ConfirmDialog
          title="Decline Meetup Request?"
          description={`Are you sure you want to decline this request for "${declineTarget.listing?.title}"?`}
          confirmLabel="Decline Request"
          danger={true}
          withReason={true}
          reasonPlaceholder="e.g. Item already promised to a classmate, or unavailable."
          onConfirm={handleConfirmDecline}
          onClose={() => setDeclineTarget(null)}
        />
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelTarget && (
        <ConfirmDialog
          title="Cancel Trade Request?"
          description={
            cancelTarget.status === 'accepted'
              ? `Are you sure you want to cancel this confirmed meetup? The listing will be returned to active status.`
              : `Are you sure you want to cancel this request for "${cancelTarget.listing?.title}"?`
          }
          confirmLabel="Yes, Cancel Request"
          danger={true}
          withReason={false}
          onConfirm={handleConfirmCancel}
          onClose={() => setCancelTarget(null)}
        />
      )}

      {/* Toast Alert */}
      <div className={`cp-toast ${toast ? 'show' : ''}`} role="alert">
        {toast}
      </div>
    </div>
  );
}
