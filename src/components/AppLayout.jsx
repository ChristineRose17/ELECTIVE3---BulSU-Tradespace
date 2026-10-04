import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Menu,
  X,
  Plus,
  Store,
  ClipboardList,
  Handshake,
  User,
  Building,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  ShieldCheck,
  BookOpen,
  Laptop
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Brand from './Brand';
import Avatar from './Avatar';

// Left sidebar navigation 
const LINKS = [
  { label: 'Marketplace', icon: Store, to: '/marketplace' },
  { label: 'My Listings', icon: ClipboardList, to: '/my-listings' },
  { label: 'My Claims', icon: Handshake, to: '/my-claims' },
  { label: 'Profile', icon: User, to: '/profile' },
];

const readCollapsed = () => {
  try { return localStorage.getItem('sb_collapsed') === '1'; } catch { return false; }
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(readCollapsed); // desktop: icons only
  const [drawer, setDrawer] = useState(false);               // for phone: slide-in menu
  const [hubModal, setHubModal] = useState(false);

  // Sync search input with URL search
  const [topSearch, setTopSearch] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setTopSearch(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => { setDrawer(false); }, [pathname]);        // close drawer after navigating
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDrawer(false);
        setHubModal(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('sb_collapsed', next ? '1' : '0'); } catch { /* ignore */ }
  };

  const isCurrent = (to) => pathname === to;
  const onCreatePage = pathname === '/create-listing' || pathname === '/create-post';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = topSearch.trim();
    if (trimmed) {
      nav(`/marketplace?q=${encodeURIComponent(trimmed)}`);
    } else {
      nav('/marketplace');
    }
  };

  const handleClearSearch = () => {
    setTopSearch('');
    if (pathname === '/marketplace') {
      nav('/marketplace');
    }
  };

  const out = (e) => {
    e.preventDefault();
    logout();
    nav('/login?logout=true');
  };

  return (
    <div className="main-tab">
      <aside className={'sidebar' + (collapsed ? ' collapsed' : '') + (drawer ? ' open' : '')}>
        <div className="sidebar-top">
          <div className="logo"><Brand /></div>

          {/* Prominent Create Listing button */}
          <button
            className={'create-btn' + (onCreatePage ? ' active' : '')}
            onClick={() => nav('/create-listing')}
            title="Create Listing"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="sb-label">Create Listing</span>
          </button>

          {/* Functional Sidebar Navigation */}
          <nav className="navigation">
            {LINKS.map((l) => {
              const IconComp = l.icon;
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  title={l.label}
                  className={isCurrent(l.to) ? 'active' : ''}
                  aria-current={isCurrent(l.to) ? 'page' : undefined}
                >
                  <IconComp size={18} className="sb-nav-icon" />
                  <span className="sb-label">{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div
            className="student-info"
            title="Click to view profile"
            onClick={() => nav('/profile')}
            style={{ cursor: 'pointer' }}
          >
            <Avatar name={user?.name || 'Juan Dela Cruz'} size="md" />
            <div className="sb-label">
              <strong>{user?.name || 'Juan Dela Cruz'}</strong>
              <small>{user?.campus || 'Meneses Campus'}</small>
            </div>
          </div>

          <div className="sidebar-links">
            <button
              type="button"
              className="sb-text-btn"
              title="BulSU Meneses Campus Hub"
              onClick={() => setHubModal(true)}
            >
              <Building size={16} />
              <span className="sb-label">Campus Hub</span>
            </button>
            <a href="/login" title="Logout" onClick={out}>
              <LogOut size={16} />
              <span className="sb-label">Logout</span>
            </a>
          </div>

          <button
            className="sb-collapse"
            onClick={toggleCollapsed}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar width"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            <span className="sb-label">{collapsed ? 'Expand' : 'Collapse'}</span>
          </button>
        </div>
      </aside>

      {drawer && <div className="sb-backdrop" onClick={() => setDrawer(false)}></div>}

      <main className="main-content">
        <header className="topbar">
          <div className="top-left">
            <button
              className="sb-burger"
              aria-label="Open menu"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
            >
              <Menu size={22} />
            </button>
          </div>

          <form className="top-search" onSubmit={handleSearchSubmit} role="search">
            <Search size={16} className="top-search-icon" />
            <input
              type="search"
              value={topSearch}
              onChange={(e) => {
                setTopSearch(e.target.value);
                if (pathname === '/marketplace') {
                  nav(`/marketplace${e.target.value ? `?q=${encodeURIComponent(e.target.value)}` : ''}`, { replace: true });
                }
              }}
              placeholder="Search textbooks, uniforms, course supplies, calculators..."
              aria-label="Search campus listings"
            />
            {topSearch && (
              <button
                type="button"
                className="top-search-clear"
                onClick={handleClearSearch}
                aria-label="Clear search input"
              >
                <X size={14} />
              </button>
            )}
          </form>

          <div className="top-right">
            <button
              className="notification-button"
              title="My Claims & Trade Requests"
              aria-label="My Claims & Trade Requests"
              onClick={() => nav('/my-claims')}
            >
              <Bell size={19} />
            </button>
            <div
              className="user-profile"
              onClick={() => nav('/profile')}
              style={{ cursor: 'pointer' }}
              title="View Student Profile"
            >
              <Avatar name={user?.name || 'Juan Dela Cruz'} size="md" />
              <div className="profile-details">
                <strong>{user?.name || 'Juan Dela Cruz'}</strong>
                <small>{user?.campus || 'Meneses Campus'}</small>
              </div>
            </div>
          </div>
        </header>

        <Outlet />
      </main>

      {/* Campus Hub Modal */}
      {hubModal && (
        <div className="modal-backdrop" onClick={() => setHubModal(false)}>
          <div className="modal-card campus-hub-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="campus-badge">CAMPUS DIRECTORY</span>
                <h3>BulSU Meneses Campus Hub</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setHubModal(false)} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>BulSU Meneses Campus (Matungao, Bulakan, Bulacan) designated safe trading zones &amp; key contacts:</p>
              <div className="hub-zones">
                <div className="hub-zone-item">
                  <Building size={20} color="#7b1113" />
                  <div>
                    <strong>Student Gazebo &amp; Canteen Quad</strong>
                    <small>Primary student meetup spot with benches and campus guard visibility.</small>
                  </div>
                </div>
                <div className="hub-zone-item">
                  <BookOpen size={20} color="#7b1113" />
                  <div>
                    <strong>Campus Library Lobby (2nd Floor)</strong>
                    <small>Quiet, secure area for inspecting academic books and calculators.</small>
                  </div>
                </div>
                <div className="hub-zone-item">
                  <Laptop size={20} color="#7b1113" />
                  <div>
                    <strong>CIT / Engineering Department Hallway</strong>
                    <small>Convenient for laboratory uniforms and technical drafting tools.</small>
                  </div>
                </div>
              </div>
              <div className="hub-help">
                <ShieldCheck size={18} color="#15803d" />
                <small>Campus Security Office: <strong>(044) 792-1234</strong> &middot; Mon-Fri 7:00 AM - 6:00 PM</small>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-primary" onClick={() => setHubModal(false)}>Close Hub</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
