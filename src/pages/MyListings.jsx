import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SquarePen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListings, removeListing, setListingStatus } from '../lib/api';
import { priceText } from '../lib/listing';

export default function MyListings() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [allListings, setAllListings] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'sold' | 'draft'
  const [toast, setToast] = useState('');

  // Modals
  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const currentUser = user?.name || 'Juan Dela Cruz';

  const refresh = async () => {
    const list = await getListings();
    setAllListings(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Listings created by current user
  const myListings = useMemo(() => {
    return allListings.filter((p) => p.seller === currentUser);
  }, [allListings, currentUser]);

  const counts = useMemo(() => {
    return {
      all: myListings.length,
      active: myListings.filter((p) => p.status === 'active').length,
      sold: myListings.filter((p) => p.status === 'sold').length,
      draft: myListings.filter((p) => p.status === 'draft').length
    };
  }, [myListings]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return myListings;
    return myListings.filter((p) => p.status === activeTab);
  }, [myListings, activeTab]);

  const handleToggleSold = async (item) => {
    const nextStatus = item.status === 'sold' ? 'active' : 'sold';
    await setListingStatus(item.id, nextStatus);
    await refresh();
    say(nextStatus === 'sold' ? 'Marked as completed / sold!' : 'Re-listed as active item.');
  };

  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    await removeListing(deleteItem.id);
    setDeleteItem(null);
    await refresh();
    say('Listing has been deleted.');
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
      {/* Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <span className="campus-badge">MY BULSU TRADESPACE HUB</span>
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

          return (
            <article className="my-listing-card" key={p.id}>
              <div
                className="my-listing-media"
                style={{ backgroundImage: `url('${coverImg}')` }}
              >
                <span className={'my-listing-status ' + (p.status || 'active')}>
                  {p.status === 'sold' ? 'Completed' : p.status === 'draft' ? 'Draft' : 'Active'}
                </span>
                <span className="my-listing-price">
                  {priceText(p.type, p.price)}
                </span>
              </div>

              <div className="my-listing-content">
                <div className="my-listing-meta-row">
                  <span>{p.category} &middot; {p.category !== 'Food' && p.category !== 'Services' ? p.condition : p.type}</span>
                  <span>{formatDate(p.createdAt)}</span>
                </div>

                <h3>{p.title}</h3>
                <p>{p.description || 'No description added yet.'}</p>

                <div className="my-listing-actions">
                  {/* View Action */}
                  <button
                    type="button"
                    className="btn-action-sm"
                    onClick={() => setViewItem(p)}
                    title="View item details"
                  >
                    <i className="fa-regular fa-eye"></i> View
                  </button>

                  {/* Edit Action */}
                  <button
                    type="button"
                    className="btn-action-sm"
                    onClick={() => nav(`/create-listing?edit=${p.id}`)}
                    title="Edit listing details"
                  >
                    <i className="fa-regular fa-pen-to-square"></i> Edit
                  </button>

                  {/* Mark as Completed / Relist */}
                  <button
                    type="button"
                    className="btn-action-sm primary"
                    onClick={() => handleToggleSold(p)}
                    title={p.status === 'sold' ? 'Relist as active' : 'Mark as completed'}
                  >
                    <i className={p.status === 'sold' ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check'}></i>
                    {p.status === 'sold' ? 'Relist' : 'Complete'}
                  </button>

                  {/* Delete Action */}
                  <button
                    type="button"
                    className="btn-action-sm danger"
                    onClick={() => setDeleteItem(p)}
                    title="Delete listing"
                  >
                    <i className="fa-regular fa-trash-can"></i> Delete
                  </button>
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
                <div><strong>College/Dept:</strong> {viewItem.college || 'CIT / Engineering'}</div>
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

      {/* Toast Notification */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
