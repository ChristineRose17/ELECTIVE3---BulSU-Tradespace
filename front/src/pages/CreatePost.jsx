import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ClipboardList, Store, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListings, upsertListing, removeListing, setListingStatus } from '../lib/api';
import { shrink } from '../lib/image';
import { BTN, priceText, CATS, CAMPUSES, COLLEGES, CONDITIONS, TYPES } from '../lib/listing';

const CATEGORIES = CATS.filter((c) => c !== 'All');
const BLANK = {
  title: '',
  category: CATEGORIES[0],
  college: COLLEGES[0],
  campus: 'Meneses Campus',
  condition: CONDITIONS[0],
  price: '',
  desc: ''
};
const STATUS = { active: 'Active', sold: 'Sold', draft: 'Draft' };
const MAX_FILES = 5, MAX_MB = 5;

export default function CreatePost() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [f, setF] = useState(BLANK);
  const [type, setType] = useState('For Sale');
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [bad, setBad] = useState({});
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState('');
  const [over, setOver] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const fileRef = useRef(null);
  const timer = useRef(null);

  const urls = useMemo(() => files.map((x) => URL.createObjectURL(x)), [files]);
  useEffect(() => () => urls.forEach(URL.revokeObjectURL), [urls]);

  const refresh = async () => setPosts(await getListings());

  useEffect(() => {
    refresh();
  }, []);

  // Check if edit query parameter is passed
  useEffect(() => {
    if (editId) {
      getListings().then((all) => {
        const item = all.find((p) => String(p.id) === String(editId));
        if (item) {
          setEditingId(item.id);
          setF({
            title: item.title,
            category: item.category || CATEGORIES[0],
            college: item.college || COLLEGES[0],
            campus: item.campus || 'Meneses Campus',
            condition: item.condition || CONDITIONS[0],
            price: item.price ? String(item.price) : '',
            desc: item.description || ''
          });
          setType(item.type || 'For Sale');
          setExistingImages(item.images || []);
        }
      });
    }
  }, [editId]);

  useEffect(() => {
    if (hash === '#myPosts') {
      document.getElementById('myPosts')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash, posts.length]);

  const say = (m) => {
    setToast(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 3000);
  };

  const field = (k) => ({
    value: f[k],
    onChange: (e) => setF({ ...f, [k]: e.target.value })
  });

  const addFiles = (list) => {
    const next = [...files];
    for (const x of list) {
      if (next.length + existingImages.length >= MAX_FILES) {
        say('Maximum of 5 images allowed.');
        break;
      }
      if (!x.type.startsWith('image/')) continue;
      if (x.size > MAX_MB * 1024 * 1024) {
        say(x.name + ' is over 5MB limit.');
        continue;
      }
      next.push(x);
    }
    setFiles(next);
    if (fileRef.current) fileRef.current.value = '';
  };

  const validate = (publish) => {
    const b = {
      title: f.title.trim().length < (publish ? 5 : 1),
      price: publish && type === 'For Sale' && !(Number(f.price) > 0),
      photo: publish && files.length === 0 && existingImages.length === 0
    };
    setBad(b);
    return !Object.values(b).some(Boolean);
  };

  const reset = () => {
    setF(BLANK);
    setType('For Sale');
    setFiles([]);
    setExistingImages([]);
    setBad({});
    setEditingId(null);
  };

  const submit = async (status) => {
    if (!validate(status === 'active')) {
      return say('Please complete the required fields marked in red.');
    }

    const newShrunkImages = await Promise.all(files.map(shrink));
    const combinedImages = [...existingImages, ...newShrunkImages];

    const item = {
      id: editingId ? Number(editingId) : Date.now(),
      status,
      title: f.title.trim(),
      category: f.category,
      college: f.college,
      campus: f.campus || user?.campus || 'Meneses Campus',
      condition: f.condition,
      description: f.desc.trim(),
      type,
      price: type === 'Giveaway' ? 0 : Number(f.price) || 0,
      images: combinedImages.length > 0 ? combinedImages : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
      seller: user?.name || 'Juan Dela Cruz',
      createdAt: new Date().toISOString()
    };

    const saved = await upsertListing(item);
    if (!saved) {
      return say('Storage is full. Please remove some photos or old listings.');
    }

    reset();
    await refresh();
    setSuccessDialog(true);
  };

  const act = async (p, a) => {
    if (a === 'del') {
      if (!window.confirm(`Delete "${p.title}"?`)) return;
      await removeListing(p.id);
      say('Listing removed.');
    } else if (a === 'sold') {
      await setListingStatus(p.id, p.status === 'sold' ? 'active' : 'sold');
      say(p.status === 'sold' ? 'Listing marked as active.' : 'Listing marked as completed/sold.');
    } else {
      setEditingId(p.id);
      setF({
        title: p.title,
        category: p.category,
        college: p.college || COLLEGES[0],
        campus: p.campus || 'Meneses Campus',
        condition: p.condition,
        price: p.price ? String(p.price) : '',
        desc: p.description || ''
      });
      setType(p.type);
      setExistingImages(p.images || []);
      setFiles([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    refresh();
  };

  const previewImage = urls[0] || existingImages[0];

  return (
    <div className="cp">
      <div className="cp-head">
        <div className="cp-crumbs">Marketplace &rsaquo; Create Listing</div>
        <span className="campus-badge">OFFICIAL STUDENT P2P EXCHANGE</span>
        <h1>{editingId ? 'Edit Campus Listing' : 'Create a Campus Listing'}</h1>
        <p>Offer or barter textbooks, laboratory uniforms, scientific gear, or academic services with fellow BulSUans.</p>
      </div>

      <div className="cp-grid">
        <form noValidate onSubmit={(e) => { e.preventDefault(); submit('active'); }}>
          {/* Section 1: Photos */}
          <section className={'cp-card' + (bad.photo ? ' invalid' : '')}>
            <h2><span className="cp-num">1</span> Photos &amp; Proof of Item</h2>
            <div
              className={'cp-drop' + (over ? ' over' : '')}
              onDragEnter={(e) => { e.preventDefault(); setOver(true); }}
              onDragOver={(e) => { e.preventDefault(); setOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setOver(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                addFiles(e.dataTransfer.files);
              }}
            >
              <i className="fa-regular fa-image"></i><br />
              Drag &amp; drop item photos here, or{' '}
              <a role="button" tabIndex={0} onClick={() => fileRef.current.click()}>
                browse campus files
              </a>
              <small>PNG, JPG or WEBP. Max 5 images, 5MB each.</small>
              <input
                type="file"
                ref={fileRef}
                accept="image/png,image/jpeg,image/webp"
                multiple
                hidden
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>
            <div className="cp-err">Add at least one photo of the item.</div>

            {/* Thumbnails */}
            <div className="cp-thumbs">
              {existingImages.map((u, i) => (
                <div className="cp-thumb" key={'ex-' + i}>
                  <img src={u} alt="" />
                  <button
                    type="button"
                    className="x"
                    aria-label="Remove photo"
                    onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))}
                  >
                    &times;
                  </button>
                  {i === 0 && <span className="cover">COVER</span>}
                </div>
              ))}
              {urls.map((u, i) => (
                <div className="cp-thumb" key={u}>
                  <img src={u} alt="" />
                  <button
                    type="button"
                    className="x"
                    aria-label="Remove photo"
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  >
                    &times;
                  </button>
                  {existingImages.length === 0 && i === 0 && <span className="cover">COVER</span>}
                </div>
              ))}
              {(files.length + existingImages.length > 0) && (files.length + existingImages.length < MAX_FILES) && (
                <button type="button" className="cp-addmore" onClick={() => fileRef.current.click()}>
                  + Add More
                </button>
              )}
            </div>
          </section>

          {/* Section 2: Specifications */}
          <section className="cp-card">
            <h2><span className="cp-num">2</span> Listing Specifications</h2>
            <div className={'cp-field' + (bad.title ? ' invalid' : '')}>
              <label htmlFor="title">Item or Service Title * <span>{f.title.length} / 80</span></label>
              <input
                id="title"
                maxLength={80}
                placeholder="e.g. Casio Scientific Calculator fx-991EX PLUS"
                {...field('title')}
              />
              <div className="cp-err">Enter a title of at least 5 characters.</div>
            </div>

            <div className="cp-row">
              <div className="cp-field">
                <label htmlFor="category">Category *</label>
                <select id="category" {...field('category')}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="cp-field">
                <label htmlFor="campus">Campus *</label>
                <select id="campus" {...field('campus')}>
                  {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="cp-row">
              <div className="cp-field">
                <label htmlFor="college">College / Dept</label>
                <select id="college" {...field('college')}>
                  {COLLEGES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="cp-field">
                <label htmlFor="condition">Condition</label>
                <select id="condition" {...field('condition')}>
                  {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="cp-row">
              <div className={'cp-field' + (bad.price ? ' invalid' : '')}>
                <label htmlFor="price">
                  Price (PHP) {type === 'Giveaway' ? '(Free)' : '*'}
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  placeholder="550"
                  disabled={type === 'Giveaway'}
                  {...field('price')}
                />
                <div className="cp-err">Enter a valid price for items that are for sale.</div>
              </div>
              <div className="cp-field">
                <label>Transaction Type *</label>
                <div className="cp-seg">
                  {TYPES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={type === t ? 'active' : ''}
                      onClick={() => setType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="cp-field">
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                rows="3"
                placeholder="Tell fellow BulSUans about the item: age, inclusions, reason for trading, and preferred campus meetup area."
                {...field('desc')}
              />
            </div>
          </section>

          <div className="cp-actions">
            {editingId && (
              <button type="button" className="cp-btn ghost" onClick={reset}>
                Cancel Edit
              </button>
            )}
            <button type="button" className="cp-btn ghost" onClick={() => submit('draft')}>
              Save Draft
            </button>
            <button type="submit" className="cp-btn primary">
              {editingId ? 'Update Listing' : 'Publish Listing'}
            </button>
          </div>
        </form>

        {/* Live Card Preview */}
        <aside className="cp-side">
          <div className="cp-pv-head">
            <b>Live Card Preview</b>
            <span>Real-time sync</span>
          </div>
          <div className="product-card">
            <div
              className="product-img"
              style={previewImage ? { backgroundImage: `url(${previewImage})` } : undefined}
            >
              <span className="product-tag">{f.category || 'General'}</span>
              <span className="product-price">{priceText(type, f.price)}</span>
            </div>
            <div className="product-body">
              <small>{(f.category !== 'Food' && f.category !== 'Services') ? f.condition : type} &middot; {f.campus}</small>
              <h3>{f.title || 'Your listing title will appear here'}</h3>
              <p>{f.desc || 'Item description and details will appear here.'}</p>
              <div className="product-seller">{user?.name || 'Juan Dela Cruz'} &middot; {f.campus}</div>
              <button type="button" className="product-action">
                {BTN[type] || 'Request Item'}
              </button>
            </div>
          </div>
        </aside>

        {/* Recent Listings Section with link to full My Listings */}
        <section className="cp-myposts" id="myPosts">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2>My Recent Listings</h2>
            <button
              type="button"
              className="btn-outline"
              onClick={() => nav('/my-listings')}
              style={{ width: 'auto', padding: '6px 14px', fontSize: 12 }}
            >
              <ClipboardList size={15} />
              <span>Open Full My Listings</span>
            </button>
          </div>
          <div className="cp-posts">
            {!posts.filter((p) => (p.sellerId && user?.id && p.sellerId === user.id) || (typeof p.seller === 'object' ? p.seller?.name : p.seller) === user?.name).length && (
              <div className="cp-empty">
                No active listings yet. Fill in the form above to publish your first listing.
              </div>
            )}
            {posts
              .filter((p) => (p.sellerId && user?.id && p.sellerId === user.id) || (typeof p.seller === 'object' ? p.seller?.name : p.seller) === user?.name)
              .map((p) => (
                <div className="cp-post" key={p.id}>
                  <img src={p.images?.[0] || ''} alt="" />
                  <div className="b">
                    <h4>{p.title}</h4>
                    <div className="meta">
                      {p.type === 'For Sale' ? '\u20B1 ' + p.price : p.type} &middot; {p.condition} &middot; {p.campus}
                    </div>
                    <span className={'cp-status ' + p.status}>{STATUS[p.status]}</span>
                    <div className="btns">
                      <button onClick={() => act(p, 'edit')}>Edit</button>
                      {p.status !== 'draft' && (
                        <button onClick={() => act(p, 'sold')}>
                          {p.status === 'sold' ? 'Relist' : 'Mark Sold'}
                        </button>
                      )}
                      <button onClick={() => act(p, 'del')}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>

      {/* Success Dialog Modal */}
      {successDialog && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: 440, textAlign: 'center' }}>
            <div className="modal-body" style={{ padding: '32px 24px' }}>
              <div className="empty-state-icon" style={{ background: '#dcfce7', color: '#16a34a', margin: '0 auto 16px' }}>
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 style={{ fontSize: 20, color: '#0f172a', marginBottom: 8 }}>
                Listing Published!
              </h3>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                Your listing is now live in the <strong>Marketplace</strong> and saved to <strong>My Listings</strong>. Fellow BulSUans can now view and request trades.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => { setSuccessDialog(false); nav('/my-listings'); }}
                >
                  Go to My Listings
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => { setSuccessDialog(false); nav('/marketplace'); }}
                >
                  <Store size={16} />
                  <span>View in Marketplace</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
