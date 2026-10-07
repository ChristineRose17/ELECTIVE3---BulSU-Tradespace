import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCheck, Bell, Handshake, Package, Tag, ArrowRight } from 'lucide-react';
import Avatar from './Avatar';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../lib/api';

function timeAgo(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
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

function renderNotificationText(notif) {
  const actorName = notif.actor?.name;
  const msg = notif.message || '';
  if (actorName && msg.startsWith(actorName)) {
    return (
      <span>
        <strong>{actorName}</strong>
        {msg.slice(actorName.length)}
      </span>
    );
  }
  return <span>{msg}</span>;
}

function getNotificationIcon(type) {
  switch (type) {
    case 'claim_created':
      return <Handshake size={14} className="notif-type-icon maroon" />;
    case 'claim_accepted':
      return <Check size={14} className="notif-type-icon green" />;
    case 'claim_declined':
    case 'claim_cancelled':
      return <Tag size={14} className="notif-type-icon gray" />;
    case 'claim_completed':
      return <CheckCheck size={14} className="notif-type-icon gold" />;
    case 'listing_price_changed':
      return <Tag size={14} className="notif-type-icon blue" />;
    case 'listing_unavailable':
      return <Package size={14} className="notif-type-icon gray" />;
    default:
      return <Bell size={14} className="notif-type-icon maroon" />;
  }
}

export default function NotificationDropdown({ onClose, onUnreadCountChange, unreadCount }) {
  const nav = useNavigate();
  const [tab, setTab] = useState('all'); // 'all' | 'unread'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async (currentTab) => {
    setLoading(true);
    const data = await getNotifications(currentTab);
    setItems(data.notifications || []);
    if (typeof data.unreadCount === 'number') {
      onUnreadCountChange(data.unreadCount);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList(tab);
  }, [tab]);

  const handleMarkAll = async () => {
    const res = await markAllNotificationsRead();
    if (res?.ok) {
      setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
      onUnreadCountChange(0);
    }
  };

  const handleClickItem = async (notif) => {
    if (!notif.isRead) {
      await markNotificationRead(notif.id);
      setItems((prev) =>
        prev.map((item) => (item.id === notif.id ? { ...item, isRead: true } : item))
      );
      onUnreadCountChange(Math.max(0, unreadCount - 1));
    }
    onClose();

    if (notif.type.startsWith('claim_') || notif.claimId) {
      nav('/my-claims');
    } else if (notif.type.startsWith('listing_') || notif.listingId) {
      if (notif.listing?.title) {
        nav(`/marketplace?q=${encodeURIComponent(notif.listing.title)}`);
      } else {
        nav('/marketplace');
      }
    } else {
      nav('/my-claims');
    }
  };

  return (
    <div className="notif-dropdown" role="region" aria-label="Notifications panel">
      {/* Header */}
      <div className="notif-header">
        <div className="notif-header-title">
          <h3>Notifications</h3>
          {unreadCount > 0 && <span className="notif-header-badge">{unreadCount} unread</span>}
        </div>
        {unreadCount > 0 && (
          <button type="button" className="notif-mark-all-btn" onClick={handleMarkAll}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs: All / Unread */}
      <div className="notif-tabs">
        <button
          type="button"
          className={'notif-tab' + (tab === 'all' ? ' active' : '')}
          onClick={() => setTab('all')}
        >
          All
        </button>
        <button
          type="button"
          className={'notif-tab' + (tab === 'unread' ? ' active' : '')}
          onClick={() => setTab('unread')}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* List */}
      <div className="notif-list">
        {loading ? (
          <div className="notif-empty">
            <div className="notif-loading-spinner" />
            <p>Loading notifications...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="notif-empty">
            <div className="notif-empty-icon">
              {tab === 'unread' ? <Check size={28} /> : <Bell size={28} />}
            </div>
            <h4>{tab === 'unread' ? "You're all caught up" : 'No notifications yet'}</h4>
            <p>
              {tab === 'unread'
                ? 'Check the "All" tab to view past notifications.'
                : 'Activity regarding your listings and claims will show up here.'}
            </p>
          </div>
        ) : (
          items.map((notif) => {
            const unread = !notif.isRead;
            return (
              <div
                key={notif.id}
                className={'notif-item' + (unread ? ' unread' : '')}
                onClick={() => handleClickItem(notif)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClickItem(notif);
                  }
                }}
              >
                {/* Avatar / Icon */}
                <div className="notif-avatar-col">
                  <Avatar name={notif.actor?.name || 'User'} size="sm" />
                  <div className="notif-badge-icon-wrap">
                    {getNotificationIcon(notif.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="notif-content-col">
                  <div className="notif-msg">{renderNotificationText(notif)}</div>
                  <div className="notif-time">{timeAgo(notif.createdAt)}</div>
                </div>

                {/* Unread indicator dot */}
                {unread && <div className="notif-unread-dot" title="Unread notification" />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
