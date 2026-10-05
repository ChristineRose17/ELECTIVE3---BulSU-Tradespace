import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { getClaims, updateClaimStatus, removeClaim } from '../lib/api';
import { priceText } from '../lib/listing';

export default function MyClaims() {
  const nav = useNavigate();
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'accepted' | 'declined' | 'completed'
  const [toast, setToast] = useState('');

  // Modals
  const [detailModal, setDetailModal] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);

  const refresh = async () => {
    const data = await getClaims();
    setClaims(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const counts = useMemo(() => {
    return {
      all: claims.length,
      pending: claims.filter((c) => c.status === 'pending').length,
      accepted: claims.filter((c) => c.status === 'accepted').length,
      declined: claims.filter((c) => c.status === 'declined' || c.status === 'cancelled').length,
      completed: claims.filter((c) => c.status === 'completed').length
    };
  }, [claims]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return claims;
    if (activeTab === 'declined') {
      return claims.filter((c) => c.status === 'declined' || c.status === 'cancelled');
    }
    return claims.filter((c) => c.status === activeTab);
  }, [claims, activeTab]);

  // Action handlers
  const handleMarkCompleted = async (claim) => {
    await updateClaimStatus(claim.id, 'completed');
    await refresh();
    say('Claim marked as completed! Trade finished successfully.');
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    await updateClaimStatus(cancelTarget.id, 'cancelled');
    setCancelTarget(null);
    await refresh();
    say('Claim request has been cancelled.');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <span className="campus-badge">STUDENT TRADE REQUESTS</span>
          <h1>My Claims</h1>
          <p>Track your pending item requests, accepted meetups, and completed campus exchanges.</p>
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

      {/* Stats row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon gold">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div className="stat-details">
            <span>Pending Requests</span>
            <strong>{counts.pending}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fa-solid fa-handshake"></i>
          </div>
          <div className="stat-details">
            <span>Accepted Meetups</span>
            <strong>{counts.accepted}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon maroon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="stat-details">
            <span>Completed Trades</span>
            <strong>{counts.completed}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fa-solid fa-file-circle-xmark"></i>
          </div>
          <div className="stat-details">
            <span>Declined / Cancelled</span>
            <strong>{counts.declined}</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="subnav-tabs">
        <button
          className={'subnav-tab' + (activeTab === 'all' ? ' active' : '')}
          onClick={() => setActiveTab('all')}
        >
          All Requests <span className="tab-badge">{counts.all}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'pending' ? ' active' : '')}
          onClick={() => setActiveTab('pending')}
        >
          Pending <span className="tab-badge">{counts.pending}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'accepted' ? ' active' : '')}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted <span className="tab-badge">{counts.accepted}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'declined' ? ' active' : '')}
          onClick={() => setActiveTab('declined')}
        >
          Declined <span className="tab-badge">{counts.declined}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'completed' ? ' active' : '')}
          onClick={() => setActiveTab('completed')}
        >
          Completed <span className="tab-badge">{counts.completed}</span>
        </button>
      </div>

      {/* Contextual Empty State */}
      {filtered.length === 0 && (
        <div className="empty-state-box">
          <div className="empty-state-icon maroon">
            <i className="fa-solid fa-handshake" style={{ fontSize: 32 }}></i>
          </div>
          <h3>No claims in this category</h3>
          <p>
            {activeTab === 'pending'
              ? 'You do not have any pending claims awaiting seller approval.'
              : activeTab === 'accepted'
                ? 'No accepted claims right now. When a seller accepts your request, it will appear here.'
                : activeTab === 'completed'
                  ? 'You have not completed any item claims yet.'
                  : 'Browse the campus marketplace to find textbooks, supplies, or items to claim.'}
          </p>
          <button type="button" className="btn-primary" onClick={() => nav('/marketplace')}>
            <Store size={16} />
            <span>Explore Marketplace</span>
          </button>
        </div>
      )}

      {/* Claims List */}
      <div className="claims-list">
        {filtered.map((c) => {
          const img = c.listingImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
          const isPending = c.status === 'pending';
          const isAccepted = c.status === 'accepted';
          const isDeclined = c.status === 'declined' || c.status === 'cancelled';
          const isCompleted = c.status === 'completed';

          return (
            <article className="claim-card" key={c.id}>
              <div
                className="claim-thumbnail"
                style={{ backgroundImage: `url('${img}')` }}
              />

              <div className="claim-info">
                <div className="claim-info-top">
                  <span className={'claim-status-badge ' + (c.status || 'pending')}>
                    {c.status === 'cancelled' ? 'Cancelled' : c.status}
                  </span>
                  <span className="claim-date">
                    Requested on {formatDate(c.claimDate)}
                  </span>
                </div>

                <h3 className="claim-title">{c.listingTitle}</h3>

                <div className="claim-meta-details">
                  <span className="claim-price">
                    {priceText(c.type || 'For Sale', c.price)}
                  </span>
                  <span>
                    <i className="fa-solid fa-user-tag" style={{ marginRight: 4 }}></i>
                    Seller: <strong>{c.seller?.name || (typeof c.seller === 'string' ? c.seller : 'BulSU Student')}</strong>
                  </span>
                  <span>
                    <i className="fa-solid fa-location-dot" style={{ marginRight: 4 }}></i>
                    {c.campus || 'Meneses Campus'}
                  </span>
                </div>

                {c.notes && (
                  <div className="claim-note">
                    <strong>Meetup Note:</strong> {c.notes}
                  </div>
                )}
              </div>

              {/* Functional Actions based on Status */}
              <div className="claim-actions">
                {isPending && (
                  <button
                    type="button"
                    className="btn-action-sm danger"
                    onClick={() => setCancelTarget(c)}
                  >
                    <i className="fa-solid fa-xmark"></i> Cancel Claim
                  </button>
                )}

                {isAccepted && (
                  <>
                    <button
                      type="button"
                      className="btn-action-sm primary"
                      onClick={() => handleMarkCompleted(c)}
                    >
                      <i className="fa-solid fa-check-double"></i> Mark Completed
                    </button>
                    <button
                      type="button"
                      className="btn-action-sm"
                      onClick={() => setDetailModal(c)}
                    >
                      <i className="fa-regular fa-eye"></i> View Details
                    </button>
                  </>
                )}

                {isDeclined && (
                  <button
                    type="button"
                    className="btn-action-sm"
                    onClick={() => setDetailModal(c)}
                  >
                    <i className="fa-regular fa-eye"></i> View Details
                  </button>
                )}

                {isCompleted && (
                  <button
                    type="button"
                    className="btn-action-sm"
                    onClick={() => setDetailModal(c)}
                  >
                    <i className="fa-regular fa-circle-check"></i> Trade Summary
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Details Modal */}
      {detailModal && (
        <div className="modal-backdrop" onClick={() => setDetailModal(null)}>
          <div className="modal-card" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className={'claim-status-badge ' + (detailModal.status || 'pending')}>
                  {detailModal.status}
                </span>
                <h3>Claim Details</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setDetailModal(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                {detailModal.listingImage && (
                  <img
                    src={detailModal.listingImage}
                    alt=""
                    style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: 8 }}
                  />
                )}
                <div>
                  <h4 style={{ fontSize: 16, color: '#1e293b', marginBottom: 4 }}>{detailModal.listingTitle}</h4>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#8b1023' }}>
                    {priceText(detailModal.type, detailModal.price)}
                  </div>
                  <small style={{ color: '#64748b' }}>
                    Seller: {detailModal.seller?.name || (typeof detailModal.seller === 'string' ? detailModal.seller : 'BulSU Student')} &middot; {detailModal.campus || 'Meneses Campus'}
                  </small>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, fontSize: 13, color: '#334155', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div><strong>Claim Date:</strong> {formatDate(detailModal.claimDate)}</div>
                <div><strong>Claimant:</strong> {detailModal.claimant?.name || (typeof detailModal.claimant === 'string' ? detailModal.claimant : 'BulSU Student')}</div>
                <div><strong>Meetup Notes / Offer:</strong></div>
                <div style={{ padding: '8px 12px', background: '#ffffff', borderRadius: 6, border: '1px solid #e2e8f0', color: '#475569' }}>
                  {detailModal.notes || 'No special notes recorded.'}
                </div>
              </div>

              {detailModal.status === 'accepted' && (
                <div style={{ marginTop: 14, padding: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, color: '#166534', fontSize: 12 }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: 6 }}></i>
                  <strong>Meetup Accepted:</strong> Please arrive on time at the designated campus area. Make sure to inspect the item in person before concluding.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={() => setDetailModal(null)}>Close</button>
              {detailModal.status === 'accepted' && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    handleMarkCompleted(detailModal);
                    setDetailModal(null);
                  }}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelTarget && (
        <div className="modal-backdrop" onClick={() => setCancelTarget(null)}>
          <div className="modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cancel Claim Request?</h3>
              <button className="modal-close-btn" onClick={() => setCancelTarget(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>
                Are you sure you want to cancel your request for <strong>&ldquo;{cancelTarget.listingTitle}&rdquo;</strong>? The seller will be notified that you are no longer interested.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={() => setCancelTarget(null)}>
                Keep Claim
              </button>
              <button className="btn-modal-danger" onClick={handleConfirmCancel}>
                Cancel Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
