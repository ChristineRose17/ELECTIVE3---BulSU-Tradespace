import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Heart,
  SearchX,
  HeartOff,
  PackageOpen,
  LayoutGrid,
  List,
  Sparkles,
  User,
  MapPin,
  Tag,
  X,
  Check,
  ShieldCheck,
  ArrowLeftRight,
  Gift,
  Store,
  Clock,
  Layers,
  Plus
} from 'lucide-react';
import { getListings, getSavedListingIds, toggleSaveListing, createClaim } from '../lib/api';
import { CATS, BTN, priceText } from '../lib/listing';
import { useAuth } from '../context/AuthContext';

export default function Marketplace() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const [all, setAll] = useState([]);
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [toast, setToast] = useState('');
  const [failedImages, setFailedImages] = useState({});

  // Modals
  const [claimTarget, setClaimTarget] = useState(null);
  const [claimNote, setClaimNote] = useState('');
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    getListings().then((l) => setAll(l.filter((p) => p.status !== 'draft')));
    getSavedListingIds().then(setSavedIds);
  }, []);

  // Update query state if URL param changes
  useEffect(() => {
    const urlQ = searchParams.get('q');
    if (urlQ !== null) setQ(urlQ);
    else setQ('');
  }, [searchParams]);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggleFavorite = async (e, id) => {
    e.stopPropagation();
    const next = await toggleSaveListing(id);
    setSavedIds(next);
    say(next.includes(id) ? 'Saved to your favorites!' : 'Removed from favorites.');
  };

  const handleOpenClaim = (e, item) => {
    e.stopPropagation();
    if (item.seller === user?.name) {
      nav('/my-listings');
      return;
    }
    setClaimTarget(item);
    setClaimNote(`Hi ${item.seller}! I'm interested in this item. Can we meetup at the BulSU Meneses Gazebo?`);
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    if (!claimTarget) return;

    await createClaim({
      listingId: claimTarget.id,
      listingTitle: claimTarget.title,
      listingImage: claimTarget.images?.[0] || '',
      price: claimTarget.price,
      type: claimTarget.type,
      seller: claimTarget.seller,
      campus: claimTarget.campus || 'Meneses Campus',
      claimant: user?.name || 'Juan Dela Cruz',
      notes: claimNote.trim()
    });

    setClaimTarget(null);
    say('Claim request submitted! You can track it under My Claims.');
  };

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Check if a category is physical goods
  const isPhysicalGoods = (category) => {
    return category !== 'Food' && category !== 'Services';
  };

  // Free and Swap listings for the highlight strip
  const freeAndSwapItems = useMemo(() => {
    return all.filter((p) => p.type === 'Giveaway' || p.type === 'Item Swap');
  }, [all]);

  // Filter & Sort Logic
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return all.filter((p) => {
      // Category filter
      if (cat !== 'All' && p.category !== cat) return false;
      // Transaction type filter
      if (filterType !== 'All' && p.type !== filterType) return false;
      // Saved only filter
      if (onlySaved && !savedIds.includes(p.id)) return false;
      // Search query
      if (s) {
        const text = `${p.title} ${p.description || ''} ${p.category} ${p.college || ''} ${p.campus || ''} ${p.seller || ''}`.toLowerCase();
        if (!text.includes(s)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // 'recent' by default
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : b.id;
      return dateB - dateA;
    });
  }, [all, cat, q, filterType, onlySaved, savedIds, sortBy]);

  const clearAllFilters = () => {
    setQ('');
    setCat('All');
    setFilterType('All');
    setOnlySaved(false);
    setSearchParams({});
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Giveaway':
        return 'type-badge giveaway';
      case 'Item Swap':
        return 'type-badge swap';
      case 'Service':
        return 'type-badge service';
      default:
        return 'type-badge sale';
    }
  };

  return (
    <div className="marketplace-container">
      {/* Compact Hero Section */}
      <section className="marketplace-hero">
        <span className="campus-badge">BULSU MENESES CAMPUS HUB</span>
        <h1 className="hero-title">Student Marketplace</h1>
        <p className="hero-description">
          Buy, sell, swap, and donate study materials and campus essentials safely at BulSU Meneses Campus.
        </p>
      </section>

      {/* Category Pills directly under Hero */}
      <nav className="categories" aria-label="Filter listings by category">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            className={'category-chip' + (cat === c ? ' active' : '')}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </nav>

      {/* Free & Swap Corner Highlight Strip */}
      {freeAndSwapItems.length > 0 && !onlySaved && (
        <section className="swap-corner-section" aria-label="Free and Swap Corner">
          <div className="swap-corner-header">
            <div className="swap-corner-title-group">
              <span className="swap-corner-icon-box">
                <Sparkles size={16} />
              </span>
              <h3>Free &amp; Swap Corner</h3>
              <span className="swap-corner-pill">Zero-Cost Campus Exchange</span>
            </div>
            <button
              type="button"
              className="swap-corner-quick-filter"
              onClick={() => {
                if (filterType === 'Giveaway') setFilterType('All');
                else setFilterType('Giveaway');
              }}
            >
              {filterType === 'Giveaway' ? 'Show All Types' : 'Filter Giveaways'}
            </button>
          </div>

          <div className="swap-corner-strip">
            {freeAndSwapItems.map((item) => {
              const isItemSaved = savedIds.includes(item.id);
              const isGiveaway = item.type === 'Giveaway';
              const hasFailedImg = failedImages[item.id] || !item.images?.[0];

              return (
                <div
                  key={`corner-${item.id}`}
                  className={`swap-strip-card ${isGiveaway ? 'corner-giveaway' : 'corner-swap'}`}
                  onClick={() => setQuickView(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setQuickView(item); }}
                >
                  <div className="strip-media-wrap">
                    {!hasFailedImg ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="strip-media-img"
                        loading="lazy"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="strip-placeholder">
                        {isGiveaway ? <Gift size={24} /> : <ArrowLeftRight size={24} />}
                      </div>
                    )}
                    <span className={`strip-badge ${isGiveaway ? 'giveaway' : 'swap'}`}>
                      {isGiveaway ? 'Free Item' : 'Swap Offer'}
                    </span>
                    <button
                      type="button"
                      className={'strip-fav-btn' + (isItemSaved ? ' active' : '')}
                      onClick={(e) => handleToggleFavorite(e, item.id)}
                      aria-label="Save listing"
                    >
                      <Heart size={14} fill={isItemSaved ? '#dc2626' : 'none'} color={isItemSaved ? '#dc2626' : '#64748b'} />
                    </button>
                  </div>
                  <div className="strip-body">
                    <h4 className="strip-title">{item.title}</h4>
                    <div className="strip-meta">
                      <span className="strip-college">{item.college || 'BulSU Meneses'}</span>
                      <strong className={`strip-price ${isGiveaway ? 'free-text' : 'swap-text'}`}>
                        {isGiveaway ? 'FREE' : 'Swap'}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Listings Header & Interactive Controls */}
      <section className="listings-header">
        <div className="listing-title">
          <h2>
            {onlySaved ? 'Saved Items' : cat === 'All' ? 'Campus Listings' : cat}
          </h2>
          <span className="items-count-badge">
            {filtered.length} item{filtered.length === 1 ? '' : 's'}
          </span>
          {q && (
            <span className="search-query-tag">
              query: &ldquo;{q}&rdquo;
              <button type="button" onClick={() => { setQ(''); setSearchParams({}); }} aria-label="Clear search">
                <X size={12} />
              </button>
            </span>
          )}
        </div>

        <div className="listing-controls-wrapper">
          {/* Saved Items Filter Toggle */}
          <button
            type="button"
            className={'btn-filter-saved' + (onlySaved ? ' active' : '')}
            onClick={() => setOnlySaved(!onlySaved)}
            title="Show saved listings only"
          >
            <Heart size={15} fill={onlySaved ? 'currentColor' : 'none'} />
            <span>Saved ({savedIds.length})</span>
          </button>

          {/* Type Filter */}
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by transaction type"
            >
              <option value="All">All Types</option>
              <option value="For Sale">For Sale</option>
              <option value="Item Swap">Item Swap</option>
              <option value="Giveaway">Giveaway / Free</option>
              <option value="Service">Services</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="select-wrapper">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort listings"
            >
              <option value="recent">Sort: Most Recent</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Title: A &ndash; Z</option>
            </select>
          </div>

          {/* Grid / List View Toggles */}
          <div className="view-mode-toggle" role="group" aria-label="View layout switch">
            <button
              type="button"
              className={'view-mode-btn' + (viewMode === 'grid' ? ' active' : '')}
              onClick={() => setViewMode('grid')}
              title="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid size={15} />
              <span>Grid</span>
            </button>

            <button
              type="button"
              className={'view-mode-btn' + (viewMode === 'list' ? ' active' : '')}
              onClick={() => setViewMode('list')}
              title="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List size={15} />
              <span>List</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Product Grid / List */}
      <section className={'product-list' + (viewMode === 'list' ? ' list-view' : '')} id="product-list">
        {/* Contextual Empty States */}
        {filtered.length === 0 && (
          <div className="empty-state-box">
            {onlySaved ? (
              <>
                <div className="empty-state-icon rose">
                  <HeartOff size={36} strokeWidth={1.75} />
                </div>
                <h3>No saved items yet</h3>
                <p>Click the heart icon on any listing to bookmark it to your personal favorites.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setOnlySaved(false)}
                >
                  <Store size={16} />
                  <span>Browse All Listings</span>
                </button>
              </>
            ) : q ? (
              <>
                <div className="empty-state-icon maroon">
                  <SearchX size={36} strokeWidth={1.75} />
                </div>
                <h3>No listings found</h3>
                <p>No results matched your search term &ldquo;{q}&rdquo;. Try another keyword or clear filters.</p>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={clearAllFilters}
                >
                  <X size={16} />
                  <span>Clear Search &amp; Filters</span>
                </button>
              </>
            ) : cat !== 'All' ? (
              <>
                <div className="empty-state-icon gold">
                  <PackageOpen size={36} strokeWidth={1.75} />
                </div>
                <h3>No listings in {cat}</h3>
                <p>Be the first student to post an item in this category!</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => nav('/create-listing')}
                >
                  <Plus size={16} />
                  <span>Create Listing in {cat}</span>
                </button>
              </>
            ) : (
              <>
                <div className="empty-state-icon maroon">
                  <Store size={36} strokeWidth={1.75} />
                </div>
                <h3>Your marketplace is empty</h3>
                <p>Create your first listing and start trading with fellow BulSU students.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => nav('/create-listing')}
                >
                  <Plus size={16} />
                  <span>Create Listing</span>
                </button>
              </>
            )}
          </div>
        )}

        {filtered.map((p) => {
          const isSaved = savedIds.includes(p.id);
          const isOwn = p.seller === user?.name;
          const isPhysical = isPhysicalGoods(p.category);
          // Show condition ONLY for physical goods; show listing type for Food/Services
          const conditionOrType = isPhysical ? (p.condition || 'Good') : p.type;
          const isGiveaway = p.type === 'Giveaway';
          const isSwap = p.type === 'Item Swap';
          const hasImgError = failedImages[p.id] || !p.images?.[0];

          return (
            <article
              className={`product-card ${viewMode === 'list' ? 'row-card' : ''} ${isGiveaway ? 'card-giveaway' : isSwap ? 'card-swap' : ''}`}
              key={p.id}
              onClick={() => setQuickView(p)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') setQuickView(p); }}
            >
              {/* Media column / top */}
              <div className="product-media-col">
                <div className="product-img-wrapper">
                  {!hasImgError ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="product-img-element"
                      loading="lazy"
                      onError={() => handleImageError(p.id)}
                    />
                  ) : (
                    <div className="product-img-placeholder">
                      <PackageOpen size={36} strokeWidth={1.5} className="placeholder-icon" />
                      <span className="placeholder-label">{p.category}</span>
                    </div>
                  )}

                  {/* Favorite Heart Button */}
                  <button
                    type="button"
                    className={'card-fav-btn' + (isSaved ? ' saved' : '')}
                    onClick={(e) => handleToggleFavorite(e, p.id)}
                    title={isSaved ? 'Remove from saved' : 'Save to favorites'}
                    aria-label="Save listing"
                  >
                    <Heart size={16} fill={isSaved ? '#dc2626' : 'none'} color={isSaved ? '#dc2626' : '#475569'} />
                  </button>

                  {/* Type Badge on Media */}
                  <span className={getTypeBadgeClass(p.type)}>
                    {p.type}
                  </span>

                  {p.status === 'sold' && <div className="product-sold">SOLD</div>}
                </div>
              </div>

              {/* Details column / body */}
              <div className="product-details-col">
                <div className="product-meta-header">
                  <span className="product-category-tag">{p.category}</span>
                  <span className="product-meta-sep">&middot;</span>
                  <span className="product-condition-tag">{conditionOrType}</span>
                  <span className="product-meta-sep">&middot;</span>
                  <span className="product-college-tag">{p.college || 'BulSU Meneses'}</span>
                </div>

                <h3 className="product-title" title={p.title}>
                  {p.title}
                </h3>

                <p className="product-description-snippet">
                  {p.description}
                </p>

                <div className="product-seller-footer">
                  <User size={13} className="seller-icon" />
                  <span className="seller-name">{p.seller}</span>
                  <span className="seller-sep">&middot;</span>
                  <span className="seller-campus">{p.campus || 'Meneses Campus'}</span>
                </div>
              </div>

              {/* Actions column (Grid: bottom row, List: right column) */}
              <div className="product-actions-col">
                <div className={`product-price-display ${isGiveaway ? 'price-free' : isSwap ? 'price-swap' : ''}`}>
                  {isGiveaway ? 'Free' : isSwap ? 'Swap' : priceText(p.type, p.price)}
                </div>

                <button
                  type="button"
                  className={`product-action-btn ${isGiveaway ? 'btn-giveaway' : isSwap ? 'btn-swap' : ''}`}
                  disabled={p.status === 'sold'}
                  onClick={(e) => handleOpenClaim(e, p)}
                >
                  {p.status === 'sold' ? 'Sold Out' : isOwn ? 'My Listing (Manage)' : (BTN[p.type] || 'Request Item')}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Claim / Trade Modal */}
      {claimTarget && (
        <div className="modal-backdrop" onClick={() => setClaimTarget(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="campus-badge">CAMPUS TRADE REQUEST</span>
                <h3>{claimTarget.type === 'Giveaway' ? 'Claim Free Item' : 'Request Trade / Purchase'}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setClaimTarget(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitClaim}>
              <div className="modal-body">
                <div style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'center' }}>
                  {claimTarget.images?.[0] && !failedImages[claimTarget.id] ? (
                    <img
                      src={claimTarget.images[0]}
                      alt=""
                      style={{ width: 68, height: 68, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    <div style={{ width: 68, height: 68, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PackageOpen size={24} color="#64748b" />
                    </div>
                  )}
                  <div>
                    <strong style={{ fontSize: 15, color: '#1e293b', display: 'block' }}>{claimTarget.title}</strong>
                    <span style={{ fontSize: 14, color: claimTarget.type === 'Giveaway' ? '#059669' : '#8b1023', fontWeight: 800 }}>
                      {claimTarget.type === 'Giveaway' ? 'Free' : priceText(claimTarget.type, claimTarget.price)}
                    </span>
                    <small style={{ display: 'block', color: '#64748b', marginTop: 2 }}>
                      Seller: {claimTarget.seller} &middot; {claimTarget.campus}
                    </small>
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="claim-note">Proposed Campus Meetup &amp; Notes</label>
                  <textarea
                    id="claim-note"
                    rows="3"
                    value={claimNote}
                    onChange={(e) => setClaimNote(e.target.value)}
                    placeholder="Enter your preferred time and campus meetup spot (e.g. Student Gazebo, Library)..."
                    required
                  />
                </div>
                <small style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <ShieldCheck size={16} color="#15803d" />
                  All trades are conducted on-campus for student safety and verification.
                </small>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setClaimTarget(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm &amp; Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Item Details Modal */}
      {quickView && (
        <div className="modal-backdrop" onClick={() => setQuickView(null)}>
          <div className="modal-card" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="campus-badge">{quickView.category}</span>
                <h3>{quickView.title}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setQuickView(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {quickView.images?.[0] && !failedImages[quickView.id] ? (
                <div style={{
                  height: 240,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#f1f5f9',
                  marginBottom: 16
                }}>
                  <img
                    src={quickView.images[0]}
                    alt={quickView.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{
                  height: 160,
                  borderRadius: 12,
                  background: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 16,
                  color: '#64748b'
                }}>
                  <PackageOpen size={36} />
                  <span>No image provided</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: quickView.type === 'Giveaway' ? '#059669' : '#8b1023'
                }}>
                  {quickView.type === 'Giveaway' ? 'Free' : priceText(quickView.type, quickView.price)}
                </span>
                <span className={`claim-status-badge ${quickView.type === 'Giveaway' ? 'completed' : 'accepted'}`}>
                  {isPhysicalGoods(quickView.category) ? (quickView.condition || 'Good') : quickView.type}
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 16 }}>
                {quickView.description || 'No description provided.'}
              </p>
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, fontSize: 13, color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div><strong>Listing Type:</strong> {quickView.type}</div>
                <div><strong>College / Dept:</strong> {quickView.college || 'General'}</div>
                <div><strong>Seller:</strong> {quickView.seller}</div>
                <div><strong>Campus:</strong> {quickView.campus || 'Meneses Campus'}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-outline" onClick={() => setQuickView(null)}>Close</button>
              {quickView.seller !== user?.name ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    const item = quickView;
                    setQuickView(null);
                    handleOpenClaim({ stopPropagation: () => { } }, item);
                  }}
                >
                  {BTN[quickView.type] || 'Request Item'}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => nav('/my-listings')}
                >
                  Manage in My Listings
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
