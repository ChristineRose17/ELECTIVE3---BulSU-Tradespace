import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SquarePen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyListings, removeListing, setListingStatus, softRemoveListing } from '../lib/api';
import { priceText, filterUserListings, calculateListingCounts } from '../lib/listing';

export default function MyListings() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [allListings, setAllListings] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'sold' | 'draft'
  const [toast, setToast] = useState('');

  // Modals
  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [removingId, setRemovingId] = useState(null);


  const refresh = async () => {
    try {
      const list = await getMyListings();
      setAllListings(list);
    } catch (err) {
      say('Failed to load listings. Please try again.');
    }
  };

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener('tradespace:listings-updated', handleUpdate);
    return () => window.removeEventListener('tradespace:listings-updated', handleUpdate);
  }, []);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Listings created by current user using shared filter
  const myListings = useMemo(() => {
    return filterUserListings(allListings, user);
  }, [allListings, user]);

  const counts = useMemo(() => {
    return calculateListingCounts(myListings);
  }, [myListings]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return myListings;
    if (activeTab === 'active') return myListings.filter((p) => p.status === 'active' || p.status === 'reserved');
    return myListings.filter((p) => p.status === activeTab);
  }, [myListings, activeTab]);

  const handleToggleSold = async (item) => {
    try {
      const nextStatus = item.status === 'sold' ? 'active' : 'sold';
      const ok = await setListingStatus(item.id, nextStatus);
      if (!ok) {
        say('Failed to update listing status.');
        return;
      }
      await refresh();
      say(nextStatus === 'sold' ? 'Marked as completed / sold!' : 'Re-listed as active item.');
    } catch {
      say('Error updating listing status.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    try {
      const ok = await removeListing(deleteItem.id);
      if (!ok) {
        say('Failed to delete listing.');
        return;
      }
      setDeleteItem(null);
      await refresh();
      say('Listing has been deleted.');
    } catch {
      say('Error deleting listing.');
    }
  };

  const handleConfirmRemove = async () => {
    if (!removeItem) return;
    const targetId = removeItem.id;
    setRemovingId(targetId);
    try {
      const res = await softRemoveListing(targetId);
      if (res.ok) {
        setAllListings((prev) => prev.filter((item) => item.id !== targetId));
        setRemoveItem(null);
        say('Listing removed');
      } else {
        say(res.error || 'Failed to remove listing');
      }
    } catch {
      say('Failed to remove listing');
    } finally {
      setRemovingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="page-container">
      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#8b1023',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 8,
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontWeight: 600,
          fontSize: 14
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1>My Listings</h1>
          <p>Manage your published textbooks, supplies, swap offers, and campus services.</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => nav('/create-listing')}
        >
          <Plus size={16} />
          <span>Create Listing</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon maroon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <div className="stat-details">
            <span>Total Listings</span>
            <strong>{counts.all}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="stat-details">
            <span>Active Listings</span>
            <strong>{counts.active}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <i className="fa-solid fa-handshake-simple"></i>
          </div>
          <div className="stat-details">
            <span>Completed / Sold</span>
            <strong>{counts.sold}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fa-regular fa-file-lines"></i>
          </div>
          <div className="stat-details">
            <span>Drafts</span>
            <strong>{counts.draft}</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="subnav-tabs">
        <button
          className={'subnav-tab' + (activeTab === 'all' ? ' active' : '')}
          onClick={() => setActiveTab('all')}
        >
          All Listings <span className="tab-badge">{counts.all}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'active' ? ' active' : '')}
          onClick={() => setActiveTab('active')}
        >
          Active <span className="tab-badge">{counts.active}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'sold' ? ' active' : '')}
          onClick={() => setActiveTab('sold')}
        >
          Completed / Sold <span className="tab-badge">{counts.sold}</span>
        </button>
        <button
          className={'subnav-tab' + (activeTab === 'draft' ? ' active' : '')}
          onClick={() => setActiveTab('draft')}
        >
          Drafts <span className="tab-badge">{counts.draft}</span>
        </button>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <i className="fa-solid fa-store-slash"></i>
          </div>
          <h3>Your marketplace is empty.</h3>
          <p>Create your first listing and start trading with fellow BulSU students.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => nav('/create-listing')}
          >
            <Plus size={16} />
            <span>Create Listing</span>
          </button>
        </div>
      )}

      {/* Listings Grid */}
      <div className="my-listings-grid">
        {filtered.map((p) => {
          const coverImg = p.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';
          const isSold = p.status === 'sold';
          const isReserved = p.status === 'reserved';
          const completedReq = p.tradeRequests?.find((r) => r.status === 'completed');
          const completionDate = completedReq?.completedAt || p.updatedAt;

          return (
            <article className="my-listing-card" key={p.id}>
              <div
                className="my-listing-media"
                style={{ backgroundImage: `url('${coverImg}')` }}
              >
                <span className={'my-listing-status ' + (p.status || 'active')}>
                  {isSold ? 'Sold' : isReserved ? 'Reserved' : p.status === 'draft' ? 'Draft' : 'Active'}
                </span>
                <span className="my-listing-price">
                  {priceText(p.type, p.price)}
                </span>
              </div>

              <div className="my-listing-content">
                <div className="my-listing-meta-row">
                  <span>{p.category} &middot; {p.category !== 'Food' && p.category !== 'Services' ? p.condition : p.type}</span>
                  {isSold ? (
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>Completed {formatDate(completionDate)}</span>
                  ) : (
                    <span>{formatDate(p.createdAt)}</span>
                  )}
                </div>

                <h3>{p.title}</h3>
                <p>{p.description || 'No description added yet.'}</p>

                <div className="my-listing-actions">
                  {/* View Action - always available */}
                  <button
                    type="button"
                    className="btn-action-sm"
                    onClick={() => setViewItem(p)}
                    title="View item details"
                  >
                    <i className="fa-regular fa-eye"></i> View
                  </button>

                  {/* Actions for Non-Sold listings */}
                  {!isSold && (
                    <>
                      {/* Edit Action */}
                      <button
                        type="button"
                        className="btn-action-sm"
                        onClick={() => nav(`/create-listing?edit=${p.id}`)}
                        title="Edit listing details"
                      >
                        <i className="fa-regular fa-pen-to-square"></i> Edit
                      </button>

                      {/* Mark as Completed */}
                      {!isReserved && (
                        <button
                          type="button"
                          className="btn-action-sm primary"
                          onClick={() => handleToggleSold(p)}
                          title="Mark as completed / sold"
                        >
                          <i className="fa-solid fa-check"></i>
                          <span>Complete</span>
                        </button>
                      )}

                      {/* Delete Action */}
                      {!isReserved && (
                        <button
                          type="button"
                          className="btn-action-sm danger"
                          onClick={() => setDeleteItem(p)}
                          title="Delete listing"
                        >
                          <i className="fa-regular fa-trash-can"></i> Delete
                        </button>
                      )}
                    </>
                  )}

                  {/* Actions for Completed / Sold listings */}
                  {isSold && (
                    <button
                      type="button"
                      className="btn-action-sm danger"
                      onClick={() => setRemoveItem(p)}
                      title="Remove this completed listing"
                    >
                      <i className="fa-regular fa-trash-can"></i> Remove
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Item View Modal */}
      {viewItem && (
        <div className="modal-backdrop" onClick={() => setViewItem(null)}>
          <div className="modal-card" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="campus-badge">{viewItem.category}</span>
                <h3>{viewItem.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setViewItem(null)}>&times;</button>
            </div>
            <div className="modal-body">
              {viewItem.images?.[0] && (
                <div
                  style={{
                    height: 220,
                    borderRadius: 10,
                    background: `#e2e8f0 url('${viewItem.images[0]}') center/cover no-repeat`,
                    marginBottom: 16
                  }}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#8b1023' }}>
                  {priceText(viewItem.type, viewItem.price)}
                </span>
                <span className={'my-listing-status ' + (viewItem.status || 'active')}>
                  {viewItem.status === 'sold' ? 'Completed / Sold' : viewItem.status === 'draft' ? 'Draft' : 'Active'}
                </span>
              </div>
              <p style={{ color: '#334155', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                {viewItem.description || 'No description provided.'}
              </p>
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, fontSize: 13, color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div><strong>Condition:</strong> {viewItem.condition}</div>
                <div><strong>College/Dept:</strong> {viewItem.college || 'General'}</div>
                <div><strong>Campus:</strong> {viewItem.campus || 'Meneses Campus'}</div>
                <div><strong>Posted Date:</strong> {formatDate(viewItem.createdAt)}</div>
                <div><strong>Transaction Type:</strong> {viewItem.type}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={() => setViewItem(null)}>Close</button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  const id = viewItem.id;
                  setViewItem(null);
                  nav(`/create-listing?edit=${id}`);
                }}
              >
                <SquarePen size={16} />
                <span>Edit Listing</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Delete Dialog */}
      {deleteItem && (
        <div className="modal-backdrop" onClick={() => setDeleteItem(null)}>
          <div className="modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="modal-close-btn" onClick={() => setDeleteItem(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>
                Are you sure you want to delete <strong>&ldquo;{deleteItem.title}&rdquo;</strong>? This item will be permanently removed from BulSU TradeSpace.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={() => setDeleteItem(null)}>
                Cancel
              </button>
              <button className="btn-modal-danger" onClick={handleConfirmDelete}>
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Remove Dialog */}
      {removeItem && (
        <div className="modal-backdrop" onClick={() => !removingId && setRemoveItem(null)}>
          <div className="modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Remove this listing?</h3>
              <button
                className="modal-close-btn"
                disabled={Boolean(removingId)}
                onClick={() => setRemoveItem(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>
                Are you sure you want to remove <strong>&ldquo;{removeItem.title}&rdquo;</strong> from your listings?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-outline"
                disabled={Boolean(removingId)}
                onClick={() => setRemoveItem(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-danger"
                disabled={Boolean(removingId)}
                onClick={handleConfirmRemove}
                style={{ opacity: removingId ? 0.7 : 1, cursor: removingId ? 'not-allowed' : 'pointer' }}
              >
                {removingId === removeItem.id ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
