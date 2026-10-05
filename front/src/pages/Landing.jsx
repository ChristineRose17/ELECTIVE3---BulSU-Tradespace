import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Brand from '../components/Brand';
import { Sparkle, Arrow, Check, User } from '../components/Icons';

const LINKS = [['how-it-works', 'How It Works'], ['community', 'Community'], ['about', 'About']];
const TRUST = ['BulSU GSuite verified', 'Campus meetups', 'Student-to-student'];
const STEPS = [
  ['1', 'List Your Items', 'Snap a photo, set a student-friendly price, and publish to the Meneses campus directory in seconds.'],
  ['2', 'Chat with BulSUans', 'Communicate directly with verified students to discuss item conditions, availability, and pickup.'],
  ['3', 'Meet & Trade on Campus', 'Meet safely at designated campus zones like the student gazebo, library, or canteen to complete trades.'],
];
const COMMUNITY = [
  ['fa-book', 'Textbooks & Reviewers', 'Pass down major textbooks, reviewers, and engineering notes to junior batches affordably.'],
  ['fa-shirt', 'Uniforms & Lab Attire', 'Find pre-loved department shirts, lab coats, and PE uniforms in great condition.'],
  ['fa-gear', 'Tools & Gadgets', 'Buy or borrow drafting tools, scientific calculators, T-squares, and electronics hardware.'],
];

const Cards = ({ items, icons }) => (
  <div className="grid-cards">
    {items.map(([i, t, d]) => (
      <div className="feature-card" key={t}>
        <div className="feature-icon">{icons ? <i className={'fa-solid ' + i}></i> : i}</div>
        <h3>{t}</h3>
        <p>{d}</p>
      </div>
    ))}
  </div>
);

const Section = ({ id, title, sub, children }) => (
  <section className="content-section" id={id}>
    <div className="container">
      <div className="section-header"><h2>{title}</h2><p>{sub}</p></div>
      {children}
    </div>
  </section>
);

export default function Landing() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const header = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    const onClick = (e) => { if (!header.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      io.disconnect();
    };
  }, []);

  const first = (user?.name || 'Student').split(' ')[0];
  const guest = (
    <>
      <Link to="/login" className="btn btn-nav-login">Login</Link>
      <Link to="/signup" className="btn btn-primary btn-nav-signup">Sign Up</Link>
    </>
  );

  return (
    <div id="top">
      <header className={'navbar' + (scrolled ? ' scrolled' : '')} ref={header}>
        <div className="navbar-container">
          <div className="brand-group"><Brand /></div>

          <nav className={'nav-menu' + (open ? ' active' : '')}>
            {LINKS.map(([id, label]) => (
              <a key={id} href={'#' + id} className={'nav-link' + (active === id ? ' active' : '')} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <div className="mobile-only">
              <div className="mobile-auth-group">
                {user ? (
                  <>
                    <Link to="/marketplace" className="btn btn-primary">Marketplace ({first})</Link>
                    <button type="button" className="btn btn-nav-login" onClick={logout}>Log Out</button>
                  </>
                ) : guest}
              </div>
            </div>
          </nav>

          <div className="navbar-actions">
            {user ? (
              <>
                <Link to="/marketplace" className="nav-user-chip" title="Go to Meneses Marketplace"><User cls="user-chip-icon" /><span>{first}</span></Link>
                <button type="button" className="btn-logout" onClick={logout}>Log Out</button>
              </>
            ) : guest}
            <button className={'nav-toggle' + (open ? ' active' : '')} aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span className="hamburger-line"></span><span className="hamburger-line"></span><span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="hero">
          {[['1', 'md'], ['2', 'xs'], ['3', 'md'], ['4', 'sm']].map(([n, s]) => (
            <div key={n} className={`hero-sparkle hero-sparkle-${n}`} aria-hidden="true"><Sparkle cls={'icon-sparkle-' + s} /></div>
          ))}
          <div className="container">
            <div className="hero-top-badge">
              <span className="badge-sparkle"><Sparkle cls="icon-sparkle-xs" /></span>
              <span>FOR BULSUANS, BY BULSUANS</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-title-white">Need it? Find it.</span>
              <span className="hero-title-gold">
                <span className="have-word-wrap">
                  Have it?
                  <svg className="have-swoosh" viewBox="0 0 144 20" aria-hidden="true"><path d="M 4 16 Q 72 4 140 16" /></svg>
                </span>
                <span className="share-word-wrap">
                  Share it.
                  <span className="inline-sparkle" aria-hidden="true"><Sparkle cls="icon-sparkle-sm" /></span>
                </span>
              </span>
            </h1>
            <p className="hero-subtitle">Your campus marketplace for items, giveaways, and services from fellow BulSU students.</p>
            <div className="hero-cta-group">
              <Link to="/marketplace" className="btn btn-hero-primary"><span>Explore Marketplace</span><Arrow cls="btn-arrow" /></Link>
              <a href="#how-it-works" className="btn btn-hero-secondary">
                <span className="btn-circle-icon">
                  <svg className="icon-info-circle" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#ffffff" />
                    <path d="M12 8v5M12 16h.01" stroke="#2a0508" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span>How It Works</span>
              </a>
            </div>
            <div className="hero-trust-row">
              {TRUST.map((t) => (
                <div className="hero-trust-badge" key={t}><span className="trust-check"><Check /></span><span>{t}</span></div>
              ))}
            </div>
          </div>
        </section>

        <Section id="how-it-works" title="How It Works" sub="Simple, trusted, and verified peer-to-peer exchanges on campus.">
          <Cards items={STEPS} />
        </Section>
        <Section id="community" title="Student Community" sub="Designed exclusively for the students, faculty, and organizations of Meneses Campus.">
          <Cards items={COMMUNITY} icons />
        </Section>
        <Section id="about" title="About BulSU TradeSpace" sub="Building a sustainable, economical, and connected student community.">
          <div className="feature-card feature-card-center">
            <p>BulSU TradeSpace Meneses is a student-centered initiative that promotes affordability and reduces waste by giving pre-loved school items a second life. Designed with safety, convenience, and campus camaraderie at its heart.</p>
          </div>
        </Section>
      </main>
    </div>
  );
}
