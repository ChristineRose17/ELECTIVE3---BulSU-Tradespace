import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Brand from './Brand';

// Each sidebar link: label, Font Awesome icon name, and where it goes.
// Links with no "to" are pages that are not built yet.
const LINKS = [
  { label: 'Home / Marketplace', icon: 'fa-store', to: '/marketplace' },
  { label: 'My Posts', icon: 'fa-clipboard-list', to: '/create-post#myPosts' },
  { label: 'My Claims', icon: 'fa-handshake' },
  { label: 'Profile', icon: 'fa-user' },
];

const readCollapsed = () => {
  try { return localStorage.getItem('sb_collapsed') === '1'; } catch { return false; }
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { pathname, hash } = useLocation();
  const [collapsed, setCollapsed] = useState(readCollapsed); // desktop: icons only
  const [drawer, setDrawer] = useState(false);               // phone: slide-in menu
  const initial = (user?.name || 'S')[0].toUpperCase();

  useEffect(() => { setDrawer(false); }, [pathname]);          // close drawer after navigating
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setDrawer(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('sb_collapsed', next ? '1' : '0'); } catch { /* ignore */ }
  };
  // A link is "current" when its path matches, and (if it has a #part) the #part matches too.
  const isCurrent = (to) => {
    const [path, h] = to.split('#');
    return pathname === path && (h ? hash === '#' + h : hash !== '#myPosts');
  };
  const onCreatePage = isCurrent('/create-post');

  const out = (e) => { e.preventDefault(); logout(); nav('/login?logout=true'); };
  const soon = (e) => e.preventDefault();

  return (
    <div className="main-tab">
      <aside className={'sidebar' + (collapsed ? ' collapsed' : '') + (drawer ? ' open' : '')}>
        <div className="sidebar-top">
          <div className="logo"><Brand /></div>

          <button className={'create-btn' + (onCreatePage ? ' active' : '')} onClick={() => nav('/create-post')} title="Create Post">
            <i className="fa-solid fa-plus"></i><span className="sb-label">Create Post</span>
          </button>

          <nav className="navigation">
            {LINKS.map((l) =>
              l.to ? (
                <Link key={l.label} to={l.to} title={l.label}
                  className={isCurrent(l.to) ? 'active' : ''}
                  aria-current={isCurrent(l.to) ? 'page' : undefined}>
                  <i className={'fa-solid ' + l.icon}></i><span className="sb-label">{l.label}</span>
                </Link>
              ) : (
                <a key={l.label} href="#" className="is-soon" title={l.label + ' (coming soon)'} onClick={soon}>
                  <i className={'fa-solid ' + l.icon}></i>
                  <span className="sb-label">{l.label}<em className="soon-tag">Soon</em></span>
                </a>
              )
            )}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="student-info" title={user?.name}>
            <div className="student-avatar">{initial}</div>
            <div className="sb-label"><strong>{user?.name}</strong><small>Authenticated Student</small></div>
          </div>
          <div className="sidebar-links">
            <a href="#" className="is-soon" title="Campus Hub (coming soon)" onClick={soon}>
              <i className="fa-solid fa-building-columns"></i><span className="sb-label">Campus Hub</span>
            </a>
            <a href="/login" title="Logout" onClick={out}>
              <i className="fa-solid fa-right-from-bracket"></i><span className="sb-label">Logout</span>
            </a>
          </div>
          <button className="sb-collapse" onClick={toggleCollapsed} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-label="Toggle sidebar width">
            <i className={'fa-solid ' + (collapsed ? 'fa-angles-right' : 'fa-angles-left')}></i>
            <span className="sb-label">Collapse</span>
          </button>
        </div>
      </aside>

      {drawer && <div className="sb-backdrop" onClick={() => setDrawer(false)}></div>}

      <main className="main-content">
        <header className="topbar">
          <div className="top-left">
            <button className="sb-burger" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <span className="site-name">BulSU TradeSpace</span>
          </div>
          <div className="top-search">
            <input type="text" placeholder="Search textbooks, uniform, course supplies..." />
          </div>
          <div className="top-right">
            <button className="notification-button" title="Notifications"><i className="fa-regular fa-bell"></i></button>
            <div className="user-profile">
              <div className="profile-picture">{initial}</div>
              <div className="profile-details"><strong>{user?.name}</strong><small>Meneses Campus</small></div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
