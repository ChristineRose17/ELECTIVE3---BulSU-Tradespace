import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListings } from '../lib/api';
import { CATS, BTN, priceText } from '../lib/listing';

export default function Marketplace() {
  const nav = useNavigate();
  const [all, setAll] = useState([]);
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');

  useEffect(() => { getListings().then((l) => setAll(l.filter((p) => p.status !== 'draft'))); }, []);

  const s = q.trim().toLowerCase();
  const list = all.filter((p) =>
    (cat === 'All' || p.category === cat) &&
    (!s || `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(s)));

  return (
    <>
      <section className="welcome-section">
        <span className="campus-badge">BULSU MENESES CAMPUS HUB</span>
        <h1>Welcome to BulSU TradeSpace</h1>
        <p>Buy, sell, swap, and donate study materials and essentials safely at BulSU Meneses Campus.</p>
      </section>

      <section className="search-section">
        <div className="main-search">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search textbooks, uniform, graphing calculator, snacks, review notes..." />
          <button type="button">Search</button>
        </div>
      </section>

      <section className="categories">
        {CATS.map((c) => (
          <button key={c} className={'category' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </section>

      <section className="listings-header">
        <div className="listing-title">
          <h2>Recent Listings</h2>
          <span>{list.length} listing{list.length === 1 ? '' : 's'}</span>
        </div>
        <div className="listing-controls">
          <button>Sort: Recent</button>
          <button>Filter</button>
          <button>Grid View</button>
          <button>List View</button>
          <button className="create-listing-button" onClick={() => nav('/create-post')}>Create Post</button>
        </div>
      </section>

      <section className="product-list" id="product-list">
        {!list.length && <div className="product-empty">No listings yet. Be the first to post something!</div>}
        {list.map((p) => (
          <article className="product-card" key={p.id}>
            <div className="product-img" style={p.images[0] ? { backgroundImage: `url('${p.images[0]}')` } : undefined}>
              <span className="product-tag">{p.category}</span>
              <span className="product-price">{priceText(p.type, p.price)}</span>
              {p.status === 'sold' && <div className="product-sold">SOLD</div>}
            </div>
            <div className="product-body">
              <small>{p.condition}</small>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="product-seller">{p.seller} &middot; {p.campus}</div>
              <button className="product-action" disabled={p.status === 'sold'}>{BTN[p.type]}</button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
