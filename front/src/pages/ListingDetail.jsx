import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertCircle,
  Heart,
  MapPin,
  User,
  ShieldCheck,
  PackageOpen,
  Loader2,
  Calendar,
  Building2,
  Tag
} from 'lucide-react';
import { getListing, getSavedListingIds, toggleSaveListing } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { priceText, BTN } from '../lib/listing';
import TradeRequestModal from '../components/TradeRequestModal';

export default function ListingDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    let isMounted = true;
    async function loadItem() {
      try {
        setLoading(true);
        setError('');
        const item = await getListing(id);
        if (!isMounted) return;
        if (!item) {
          setError('Listing not found or has been removed.');
        } else {
          setListing(item);
        }
      } catch (err) {
        if (isMounted) setError('Failed to load listing details.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadItem();
    getSavedListingIds().then((ids) => {
      if (isMounted) setSavedIds(ids || []);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!user) {
      say('Log in to save listings to your favorites.');
      return;
    }
    const next = await toggleSaveListing(id);
    setSavedIds(next);
    say(next.includes(Number(id)) ? 'Saved to your favorites!' : 'Removed from favorites.');
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', maxWidth: 900, minHeight: '60vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 14 }}>
          <Loader2 size={36} className="animate-spin maroon" />
          <p style={{ color: '#64748b', fontSize: 15 }}>Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container" style={{ padding: '40px 20px', maxWidth: 900 }}>
        <button
          type="button"
          className="btn-outline"
          onClick={() => nav('/marketplace')}
          style={{ marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <ArrowLeft size={16} /> Back to Marketplace
        </button>
        <div className="tr-warning-card" style={{ borderRadius: 12, padding: 32, textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <AlertCircle size={44} className="tr-warn-icon" />
          <h3 style={{ margin: '14px 0 6px 0', fontSize: 18, fontWeight: 800 }}>Listing Unavailable</h3>
          <p style={{ color: '#64748b', maxWidth: 450, margin: '0 auto 20px auto' }}>
            {error || 'This listing does not exist or may have been deleted.'}
          </p>
          <button type="button" className="btn-primary" onClick={() => nav('/marketplace')}>
            Browse Marketplace
          </button>
        </div>
      </div>
    );
  }

  const isSold = listing.status === 'sold';
  const isReserved = listing.status === 'reserved';
  const isOwnItem = Boolean(
    (listing.sellerId && user?.id && listing.sellerId === user.id) ||
    (listing.seller?.id && user?.id && listing.seller.id === user.id) ||
    (listing.seller?.email && user?.email && listing.seller.email === user.email)
  );
  const isSaved = savedIds.includes(Number(listing.id));
  const sellerName = (typeof listing.seller === 'object' ? listing.seller?.name : listing.seller) || 'BulSU Student';

  return (
    <div className="container" style={{ padding: '30px 20px', maxWidth: 980 }}>
      {/* Navigation breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <button
          type="button"
          className="btn-outline"
          onClick={() => nav('/marketplace')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px' }}
        >
          <ArrowLeft size={16} /> Back to Marketplace
        </button>
        {user && (
          <button
            type="button"
            className={'btn-filter-saved' + (isSaved ? ' active' : '')}
            onClick={handleToggleFavorite}
            title={isSaved ? 'Remove from saved' : 'Save listing'}
          >
            <Heart size={16} fill={isSaved ? '#dc2626' : 'none'} color={isSaved ? '#dc2626' : 'currentColor'} />
            <span>{isSaved ? 'Saved' : 'Save Item'}</span>
          </button>
        )}
      </div>

      {/* Friendly banner if item is SOLD */}
      {isSold && (
        <div
          className="tr-warning-card"
          role="status"
          style={{
            borderRadius: 12,
            marginBottom: 24,
            padding: '18px 22px',
            background: '#fff1f2',
            border: '1.5px solid #fecdd3',
          }}
        >
          <AlertCircle size={28} style={{ color: '#e11d48', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#9f1239', fontWeight: 800, fontSize: 16 }}>
              This item is no longer available
            </h4>
            <p style={{ margin: 0, color: '#be123c', fontSize: 13.5, lineHeight: 1.5 }}>
              This listing has already been marked as completed and sold. Explore active campus listings on the marketplace!
            </p>
          </div>
        </div>
      )}

      {/* Reserved notice */}
      {isReserved && !isSold && (
        <div
          className="tr-warning-card"
          role="status"
          style={{
            borderRadius: 12,
            marginBottom: 24,
            padding: '16px 20px',
            background: '#f3f4f6',
            border: '1.5px solid #d1d5db',
          }}
        >
          <AlertCircle size={24} style={{ color: '#374151', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#111827', fontWeight: 800, fontSize: 15 }}>
              Item Currently Reserved
            </h4>
            <p style={{ margin: 0, color: '#4b5563', fontSize: 13.5 }}>
              An on-campus meetup has already been scheduled and accepted for this item.
            </p>
          </div>
        </div>
      )}

      {/* Main Item Card Layout */}
      <div
        className="card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 420px) 1fr',
          gap: 32,
          padding: 28,
          borderRadius: 16,
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Left Column: Image */}
        <div>
          <div
            style={{
              width: '100%',
              height: 380,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#f1f5f9',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {listing.images?.[0] ? (
              <img
                src={listing.images[0]}
                alt={listing.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <PackageOpen size={48} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                <span>No image provided</span>
              </div>
            )}
            {isReserved && !isSold && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(156, 163, 175, 0.78)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    color: '#111827',
                    fontWeight: 900,
                    letterSpacing: 2,
                    fontSize: 16,
                    textTransform: 'uppercase',
                  }}
                >
                  RESERVED
                </span>
              </div>
            )}
            {isSold && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(15, 23, 42, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    background: '#e11d48',
                    color: '#ffffff',
                    padding: '8px 24px',
                    borderRadius: 24,
                    fontWeight: 900,
                    letterSpacing: 2,
                    fontSize: 16,
                  }}
                >
                  SOLD OUT
                </span>
              </div>
            )}
          </div>

          {/* Safety badge */}
          <div className="tr-safety-note" style={{ marginTop: 14 }}>
            <ShieldCheck size={16} color="#15803d" />
            <span>All trades are conducted on-campus for student safety and verification.</span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Tags row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="campus-badge">{listing.category}</span>
            <span className="product-condition-tag">{listing.condition || listing.type}</span>
            <span className="tr-item-type-chip">{listing.type}</span>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0' }}>
            {listing.title}
          </h1>

          {/* Price display */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: listing.type === 'Giveaway' ? '#059669' : '#8b1023',
              }}
            >
              {listing.type === 'Giveaway' ? 'Free Giveaway' : priceText(listing.type, listing.price)}
            </span>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: '#64748b', fontWeight: 800, margin: '0 0 6px 0' }}>
              Description
            </h4>
            <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
              {listing.description || 'No additional description provided.'}
            </p>
          </div>

          {/* Item Details Box */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: 13,
              color: '#475569',
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={15} className="seller-icon" />
              <span>Seller: <strong>{sellerName}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building2 size={15} />
              <span>College: <strong>{listing.college || 'General BulSU'}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={15} />
              <span>Campus: <strong>{listing.campus || 'Meneses Campus'}</strong></span>
            </div>
            {listing.preferredLocation && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={15} color="#8b1023" />
                <span>Preferred Meetup Place: <strong>{listing.preferredLocation}</strong></span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div style={{ marginTop: 'auto', paddingTop: 16 }}>
            {isSold ? (
              /* SOLD State: show friendly no-longer-available indicator instead of request button */
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-outline"
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed', background: '#f1f5f9' }}
                >
                  This item is no longer available
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => nav('/marketplace')}
                >
                  Browse Available Items
                </button>
              </div>
            ) : isOwnItem ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => nav('/my-listings')}
                style={{ padding: '12px 24px', fontSize: 14 }}
              >
                Manage in My Listings
              </button>
            ) : !user ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => nav('/login')}
                style={{ padding: '12px 24px', fontSize: 14 }}
              >
                Log In to Request Meetup
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                disabled={isReserved}
                onClick={() => setTradeModalOpen(true)}
                style={{ padding: '12px 24px', fontSize: 14 }}
              >
                {isReserved
                  ? 'Reserved for Meetup'
                  : listing.type === 'Giveaway'
                  ? 'Claim Free Item'
                  : (BTN[listing.type] || 'Schedule Meetup & Request')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trade Request Scheduling Modal */}
      {tradeModalOpen && (
        <TradeRequestModal
          item={listing}
          user={user}
          onClose={() => setTradeModalOpen(false)}
          onSuccess={() => {
            say('Trade request sent successfully! Track it under My Claims.');
            nav('/my-claims');
          }}
        />
      )}

      {/* Toast Alert */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
