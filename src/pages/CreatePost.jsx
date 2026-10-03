import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getListings, upsertListing, removeListing, setListingStatus } from '../lib/api';
import { shrink } from '../lib/image';
import { BTN, priceText } from '../lib/listing';

const CATEGORIES = ['Books and Notes', 'School Supplies', 'Food', 'Services', 'Others'];
const COLLEGES = ['All colleges', 'CIT / Engineering', 'College of Education', 'College of Business'];
const CONDITIONS = ['Like New', 'Good', 'Fair'];
const TYPES = ['For Sale', 'Item Swap', 'Giveaway', 'Service'];
const BLANK = { title: '', category: CATEGORIES[0], college: COLLEGES[0], condition: CONDITIONS[0], price: '', desc: '' };
const STATUS = { active: 'Active', sold: 'Sold', draft: 'Draft' };
const MAX_FILES = 5, MAX_MB = 5;

export default function CreatePost() {
  const { user } = useAuth();
  const { hash } = useLocation();
  const [f, setF] = useState(BLANK);
  const [type, setType] = useState('For Sale');
  const [files, setFiles] = useState([]);
  const [bad, setBad] = useState({});
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState('');
  const [over, setOver] = useState(false);
  const fileRef = useRef(null);
  const timer = useRef(null);

  const urls = useMemo(() => files.map((x) => URL.createObjectURL(x)), [files]);
  useEffect(() => () => urls.forEach(URL.revokeObjectURL), [urls]);

  const refresh = async () => setPosts(await getListings());
  useEffect(() => { refresh(); }, []);
  useEffect(() => { if (hash === '#myPosts') document.getElementById('myPosts')?.scrollIntoView(); }, [hash, posts.length]);

  const say = (m) => { setToast(m); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(''), 2500); };
  const field = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });

  const addFiles = (list) => {
    const next = [...files];
    for (const x of list) {
      if (next.length >= MAX_FILES) { say('Maximum of 5 images.'); break; }
      if (!x.type.startsWith('image/')) continue;
      if (x.size > MAX_MB * 1024 * 1024) { say(x.name + ' is over 5MB.'); continue; }
      next.push(x);
    }
    setFiles(next);
    if (fileRef.current) fileRef.current.value = '';
  };

  const validate = (publish) => {
    const b = {
      title: f.title.trim().length < (publish ? 5 : 1),
      price: publish && type === 'For Sale' && !(Number(f.price) > 0),
      photo: publish && files.length === 0,
    };
    setBad(b);
    return !Object.values(b).some(Boolean);
  };

  const reset = () => { setF(BLANK); setType('For Sale'); setFiles([]); setBad({}); setEditingId(null); };

  const submit = async (status) => {
    if (!validate(status === 'active')) return say('Please fix the highlighted fields.');
    const item = {
      id: editingId || Date.now(), status, title: f.title.trim(), category: f.category, college: f.college,
      condition: f.condition, description: f.desc.trim(), type, price: Number(f.price) || 0,
      images: await Promise.all(files.map(shrink)), seller: user.name, campus: 'Meneses Campus',
      createdAt: new Date().toISOString(),
    };
    if (!(await upsertListing(item))) return say('Storage is full. Delete a post or use fewer photos.');
    reset();
    refresh();
    say(status === 'active' ? 'Listing published! It now shows in the marketplace.' : 'Draft saved.');
    document.getElementById('myPosts')?.scrollIntoView({ behavior: 'smooth' });
  };

  const act = async (p, a) => {
    if (a === 'del') {
      if (!window.confirm('Delete this post?')) return;
      await removeListing(p.id);
    } else if (a === 'sold') {
      await setListingStatus(p.id, p.status === 'sold' ? 'active' : 'sold');
    } else {
      setEditingId(p.id);
      setF({ title: p.title, category: p.category, college: p.college, condition: p.condition, price: p.price || '', desc: p.description || '' });
      setType(p.type);
      setFiles(await Promise.all(p.images.map(async (u, i) => new File([await (await fetch(u)).blob()], `photo${i}.jpg`, { type: 'image/jpeg' }))));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    refresh();
  };

  return (
    <div className="cp">
      <div className="cp-head">
        <div className="cp-crumbs">Marketplace &rsaquo; Create Listing</div>
        <span className="campus-badge">OFFICIAL STUDENT P2P EXCHANGE</span>
        <h1>Create a Campus Listing</h1>
        <p>Offer or barter textbooks, laboratory uniforms, scientific gear, or academic services with fellow BulSUans.</p>
      </div>

      <div className="cp-grid">
        <form noValidate onSubmit={(e) => { e.preventDefault(); submit('active'); }}>
          <section className={'cp-card' + (bad.photo ? ' invalid' : '')}>
            <h2><span className="cp-num">1</span> Photos &amp; Proof of Item</h2>
            <div className={'cp-drop' + (over ? ' over' : '')}
              onDragEnter={(e) => { e.preventDefault(); setOver(true); }}
              onDragOver={(e) => { e.preventDefault(); setOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setOver(false); }}
              onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}>
              <i className="fa-regular fa-image"></i><br />
              Drag &amp; drop item photos here, or <a role="button" tabIndex={0} onClick={() => fileRef.current.click()}>browse campus files</a>
              <small>PNG, JPG or WEBP. Max 5 images, 5MB each.</small>
              <input type="file" ref={fileRef} accept="image/png,image/jpeg,image/webp" multiple hidden onChange={(e) => addFiles(e.target.files)} />
            </div>
            <div className="cp-err">Add at least one photo of the item.</div>
            <div className="cp-thumbs">
              {urls.map((u, i) => (
                <div className="cp-thumb" key={u}>
                  <img src={u} alt="" />
                  <button type="button" className="x" aria-label="Remove photo" onClick={() => setFiles(files.filter((_, j) => j !== i))}>&times;</button>
                  {i === 0 && <span className="cover">COVER</span>}
                </div>
              ))}
              {files.length > 0 && files.length < MAX_FILES && (
                <button type="button" className="cp-addmore" onClick={() => fileRef.current.click()}>+ Add More</button>
              )}
            </div>
          </section>

          <section className="cp-card">
            <h2><span className="cp-num">2</span> Listing Specifications</h2>
            <div className={'cp-field' + (bad.title ? ' invalid' : '')}>
              <label htmlFor="title">Item or Service Title * <span>{f.title.length} / 80</span></label>
              <input id="title" maxLength={80} placeholder="e.g. Casio Scientific Calculator fx-570ES PLUS" {...field('title')} />
              <div className="cp-err">Enter a title of at least 5 characters.</div>
            </div>
            <div className="cp-row">
              <div className="cp-field">
                <label htmlFor="category">Category *</label>
                <select id="category" {...field('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
              <div className="cp-field">
                <label htmlFor="college">College / Dept</label>
                <select id="college" {...field('college')}>{COLLEGES.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
            </div>
            <div className="cp-row">
              <div className={'cp-field' + (bad.price ? ' invalid' : '')}>
                <label htmlFor="price">Price (PHP)</label>
                <input id="price" type="number" min="0" placeholder="550" {...field('price')} />
                <div className="cp-err">Enter a price for items that are for sale.</div>
              </div>
              <div className="cp-field">
                <label htmlFor="condition">Condition</label>
                <select id="condition" {...field('condition')}>{CONDITIONS.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
            </div>
            <div className="cp-field">
              <label htmlFor="desc">Description</label>
              <textarea id="desc" rows="3" placeholder="Tell buyers about the item: how old, what's included, where to meet." {...field('desc')} />
            </div>
            <div className="cp-field">
              <label>Transaction Type *</label>
              <div className="cp-seg">
                {TYPES.map((t) => (
                  <button type="button" key={t} className={type === t ? 'active' : ''} onClick={() => setType(t)}>{t}</button>
                ))}
              </div>
            </div>
          </section>

          <div className="cp-actions">
            <button type="button" className="cp-btn ghost" onClick={() => submit('draft')}>Save Draft</button>
            <button type="submit" className="cp-btn primary">{editingId ? 'Update Listing' : 'Publish Listing'}</button>
          </div>
        </form>

        <aside className="cp-side">
          <div className="cp-pv-head"><b>Live Card Preview</b><span>Real-time sync</span></div>
          <div className="product-card">
            <div className="product-img" style={urls[0] ? { backgroundImage: `url(${urls[0]})` } : undefined}>
              <span className="product-tag">{f.college}</span>
              <span className="product-price">{priceText(type, f.price)}</span>
            </div>
            <div className="product-body">
              <small>{f.condition}</small>
              <h3>{f.title || 'Your listing title'}</h3>
              <button type="button" className="product-action">{BTN[type]}</button>
            </div>
          </div>
        </aside>

        <section className="cp-myposts" id="myPosts">
          <h2>My Posts</h2>
          <div className="cp-posts">
            {!posts.length && <div className="cp-empty">No posts yet. Fill in the form above to publish your first listing.</div>}
            {posts.map((p) => (
              <div className="cp-post" key={p.id}>
                <img src={p.images[0] || ''} alt="" />
                <div className="b">
                  <h4>{p.title}</h4>
                  <div className="meta">{p.type === 'For Sale' ? '\u20B1 ' + p.price : p.type} &middot; {p.condition}</div>
                  <span className={'cp-status ' + p.status}>{STATUS[p.status]}</span>
                  <div className="btns">
                    <button onClick={() => act(p, 'edit')}>Edit</button>
                    {p.status !== 'draft' && <button onClick={() => act(p, 'sold')}>{p.status === 'sold' ? 'Relist' : 'Mark sold'}</button>}
                    <button onClick={() => act(p, 'del')}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
