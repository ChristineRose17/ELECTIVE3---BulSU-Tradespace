import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ClipboardList, Store, Check, Calendar, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyListings, getListing, getListingAvailability, upsertListing, removeListing, setListingStatus, uploadImages, notifyListingsUpdated } from '../lib/api';
import { BTN, priceText, formatPeso, CATS, CAMPUSES, COLLEGES, CONDITIONS, TYPES, filterUserListings } from '../lib/listing';

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
const MAX_FILES = 1, MAX_MB = 5;

const WEEKDAYS = [
  { day: 1, label: 'Mon' },
  { day: 2, label: 'Tue' },
  { day: 3, label: 'Wed' },
  { day: 4, label: 'Thu' },
  { day: 5, label: 'Fri' },
  { day: 6, label: 'Sat' },
  { day: 0, label: 'Sun' },
];

const TIME_OPTIONS = [
  { value: '08:00', label: '8:00 AM' },
  { value: '08:30', label: '8:30 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '09:30', label: '9:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
  { value: '17:00', label: '5:00 PM' },
];

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
  const [uploading, setUploading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [editError, setEditError] = useState(null); // error when loading a listing for edit

  // Meetup Schedule Fields
  const [selectedDays, setSelectedDays] = useState([]); // 0-6
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [preferredLocation, setPreferredLocation] = useState('');

  const fileRef = useRef(null);
  const timer = useRef(null);

  const urls = useMemo(() => files.map((x) => URL.createObjectURL(x)), [files]);
  useEffect(() => () => urls.forEach(URL.revokeObjectURL), [urls]);

  const refresh = async () => {
    try {
      const res = await getMyListings();
      setPosts(res);
    } catch {
      setPosts([]);
    }
  };

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener('tradespace:listings-updated', handleUpdate);
    return () => window.removeEventListener('tradespace:listings-updated', handleUpdate);
  }, []);

  const loadListingDetails = async (item) => {
    setEditingId(item.id);
    setF({
      title: item.title,
      category: item.category || CATEGORIES[0],
      college: item.college || COLLEGES[0],
      campus: item.campus || 'Meneses Campus',
      condition: item.condition || CONDITIONS[0],
      price: item.price ? Number(item.price).toLocaleString('en-PH') : '',
      desc: item.description || ''
    });
    setType(item.type || 'For Sale');
    setExistingImages(item.images?.length ? [item.images[0]] : []);
    setPreferredLocation(item.preferredLocation || '');

    try {
      const avail = await getListingAvailability(item.id);
      if (avail?.weeklyRules?.length) {
        const days = Array.from(new Set(avail.weeklyRules.map((r) => r.dayOfWeek)));
        setSelectedDays(days);
        setStartTime(avail.weeklyRules[0].startTime || '08:00');
        setEndTime(avail.weeklyRules[0].endTime || '17:00');
      } else {
        setSelectedDays([]);
        setStartTime('08:00');
        setEndTime('17:00');
      }
    } catch {
      setSelectedDays([]);
    }
  };

  // Check if edit query parameter is passed — fetch the single listing by ID
  useEffect(() => {
    if (!editId) return;

    const numId = parseInt(editId, 10);
    if (isNaN(numId)) {
      setEditError('Invalid listing ID. Please go back to My Listings and try again.');
      return;
    }

    (async () => {
      const item = await getListing(numId);

      if (!item) {
        setEditError('This listing could not be found. It may have been deleted.');
        return;
      }

      // Ownership guard — the current user must be the seller
      const currentUserId = user?.id;
      const sellerId = item.seller?.id ?? item.sellerId;
      if (currentUserId && sellerId && String(currentUserId) !== String(sellerId)) {
        setEditError('You do not have permission to edit this listing.');
        return;
      }

      setEditError(null);
      loadListingDetails(item);
    })();
  }, [editId, user?.id]);

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

  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/,/g, '');
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      const parts = raw.split('.');
      const intPart = parts[0] ? Number(parts[0]).toLocaleString('en-PH') : '';
      const formatted = parts.length > 1 ? `${intPart}.${parts[1]}` : intPart;
      setF((prev) => ({ ...prev, price: formatted }));
      if (bad.price) {
        setBad((prev) => ({ ...prev, price: false }));
      }
    }
  };

  const toggleDay = (dayNum) => {
    if (selectedDays.includes(dayNum)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayNum));
    } else {
      setSelectedDays([...selectedDays, dayNum].sort((a, b) => a - b));
    }
  };

  const scheduleSummary = useMemo(() => {
    const formatTime = (t) => {
      const opt = TIME_OPTIONS.find((o) => o.value === t);
      return opt ? opt.label : t;
    };

    const dayLabels = WEEKDAYS.filter((w) => selectedDays.includes(w.day)).map((w) => w.label);
    const daysText = dayLabels.length > 0 ? dayLabels.join(', ') : 'Any day (Default)';
    const timeText = `${formatTime(startTime)} to ${formatTime(endTime)}`;
    const locText = preferredLocation.trim() || 'On-campus';

    return `${daysText} · ${timeText} · ${locText}`;
  }, [selectedDays, startTime, endTime, preferredLocation]);

  const addFiles = (list) => {
    if (!list || list.length === 0) return;
    if (list.length > 1) {
      say('Only 1 image is allowed for a listing.');
      return;
    }
    const x = list[0];
    if (!x.type.startsWith('image/')) {
      say('Please select an image file (PNG, JPG, or WEBP).');
      return;
    }
    if (x.size > MAX_MB * 1024 * 1024) {
      say(x.name + ' is over 5MB limit.');
      return;
    }
    setFiles([x]);
    setExistingImages([]);
    if (bad.photo) {
      setBad((prev) => ({ ...prev, photo: false }));
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const validate = (publish) => {
    const locTrimmed = preferredLocation.trim();
    const locInvalid = locTrimmed.length > 0 && locTrimmed.length < 3;
    const timeInvalid = endTime <= startTime;
    const numPrice = Number(String(f.price).replace(/,/g, ''));

    const b = {
      title: f.title.trim().length < (publish ? 5 : 1),
      price: publish && type === 'For Sale' && !(numPrice > 0),
      photo: publish && files.length === 0 && existingImages.length === 0,
      preferredLocation: locInvalid,
      timeWindow: timeInvalid,
    };
    setBad(b);

    if (locInvalid) {
      say('Preferred meetup place must be at least 3 characters.');
      return false;
    }
    if (timeInvalid) {
      say('Available end time must be after start time.');
      return false;
    }

    return !Object.values(b).some(Boolean);
  };

  const reset = () => {
    setF(BLANK);
    setType('For Sale');
    setFiles([]);
    setExistingImages([]);
    setBad({});
    setSelectedDays([]);
    setStartTime('08:00');
    setEndTime('17:00');
    setPreferredLocation('');
    setEditingId(null);
  };

  const submit = async (status) => {
    if (!validate(status === 'active')) {
      return say('Please complete the required fields marked in red.');
    }

    setUploading(true);
    let uploadedUrls = [];
    if (files.length > 0) {
      try {
        uploadedUrls = await uploadImages(files);
      } catch (err) {
        setUploading(false);
        return say(err.message || 'Failed to upload photo to Google Drive. Please try again.');
      }
    }

    const combinedImages = files.length > 0 ? uploadedUrls.slice(0, 1) : existingImages.slice(0, 1);

    const item = {
      ...(editingId ? { id: Number(editingId) } : {}),
      status,
      title: f.title.trim(),
      category: f.category,
      college: f.college,
      campus: f.campus || user?.campus || 'Meneses Campus',
      condition: f.condition,
      description: f.desc.trim(),
      type,
      price: type === 'Giveaway' ? 0 : Number(String(f.price).replace(/,/g, '')) || 0,
      images: combinedImages.length > 0 ? combinedImages : [],
      preferredLocation: preferredLocation.trim() || null,
      schedule: selectedDays.length > 0 ? {
        days: selectedDays,
        startTime,
        endTime,
      } : null,
      seller: user?.name || 'Juan Dela Cruz',
      createdAt: new Date().toISOString()
    };

    const wasEditing = !!editingId;
    const result = await upsertListing(item);
    setUploading(false);
    if (!result?.ok) {
      return say(result?.error || 'Failed to save listing. Please check connection and try again.');
    }

    reset();
    notifyListingsUpdated(); // refresh Marketplace, Profile, MyListings without manual reload
    await refresh();

    if (wasEditing) {
      // After a successful edit, go straight to My Listings
      nav('/my-listings');
      return;
    }

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
      loadListingDetails(p);
      setFiles([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    refresh();
  };

  const previewImage = urls[0] || existingImages[0];

  // Show a blocking error when the edit target can't be loaded
  if (editId && editError) {
    return (
      <div className="cp">
        <div className="cp-head">
          <div className="cp-crumbs">Marketplace &rsaquo; My Listings &rsaquo; Edit</div>
          <span className="campus-badge">BULSU STUDENT MARKETPLACE</span>
          <h1>Edit Campus Listing</h1>
        </div>
        <div style={{ padding: '40px 24px', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
          <div className="empty-state-icon" style={{ background: '#fee2e2', color: '#dc2626', margin: '0 auto 16px' }}>
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h3 style={{ fontSize: 18, color: '#0f172a', marginBottom: 8 }}>Unable to Load Listing</h3>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{editError}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => nav('/my-listings')}
          >
            &larr; Back to My Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cp">
      <div className="cp-head">
        <div className="cp-crumbs">Marketplace &rsaquo; {editId ? 'Edit Listing' : 'Create Listing'}</div>
        <span className="campus-badge">BULSU STUDENT MARKETPLACE</span>
        <h1>{editingId ? 'Edit Campus Listing' : 'Create a Campus Listing'}</h1>
        <p>Offer or sell textbooks, laboratory uniforms, scientific gear, or academic services with fellow BulSUans.</p>
      </div>

      <div className="cp-grid">
        <form noValidate onSubmit={(e) => { e.preventDefault(); submit('active'); }}>
          {/* Section 1: Photos */}
          <section className={'cp-card' + (bad.photo ? ' invalid' : '')}>
            <h2><span className="cp-num">1</span> Photo &amp; Proof of Item</h2>
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
              Drag &amp; drop item photo here, or{' '}
              <a role="button" tabIndex={0} onClick={() => fileRef.current.click()}>
                browse campus files
              </a>
              <small>PNG, JPG or WEBP. 1 image only, max 5MB.</small>
              <input
                type="file"
                ref={fileRef}
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>
            <div className="cp-err">Add a photo of the item.</div>

            {/* Thumbnail Preview */}
            <div className="cp-thumbs">
              {existingImages.slice(0, 1).map((u, i) => (
                <div className="cp-thumb" key={'ex-' + i}>
                  <img src={u} alt="" />
                  <button
                    type="button"
                    className="x"
                    aria-label="Remove photo"
                    onClick={() => setExistingImages([])}
                  >
                    &times;
                  </button>
                </div>
              ))}
              {urls.slice(0, 1).map((u) => (
                <div className="cp-thumb" key={u}>
                  <img src={u} alt="" />
                  <button
                    type="button"
                    className="x"
                    aria-label="Remove photo"
                    onClick={() => setFiles([])}
                  >
                    &times;
                  </button>
                </div>
              ))}
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
                  type="text"
                  inputMode="numeric"
                  placeholder="550"
                  disabled={type === 'Giveaway'}
                  value={f.price}
                  onChange={handlePriceChange}
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

          {/* Section 3: Meetup Schedule */}
          <section className="cp-card">
            <h2><span className="cp-num">3</span> Meetup Schedule</h2>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: -8, marginBottom: 16 }}>
              Buyers can only book within the days and times you set below.
            </p>

            {/* Available Days */}
            <div className="cp-field" style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Available Days</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  {selectedDays.length === 0 ? 'Any day (Default)' : `${selectedDays.length} day(s) selected`}
                </span>
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                {WEEKDAYS.map((w) => {
                  const isSelected = selectedDays.includes(w.day);
                  return (
                    <button
                      type="button"
                      key={w.day}
                      onClick={() => toggleDay(w.day)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: isSelected ? '1.5px solid #8b1023' : '1px solid #cbd5e1',
                        background: isSelected ? '#8b1023' : '#fff',
                        color: isSelected ? '#fff' : '#475569',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Time Window */}
            <div className="cp-row">
              <div className="cp-field">
                <label htmlFor="sched-start">Available Start Time</label>
                <select
                  id="sched-start"
                  value={startTime}
                  onChange={(e) => {
                    const newStart = e.target.value;
                    setStartTime(newStart);
                    if (newStart >= endTime) {
                      const nextIdx = TIME_OPTIONS.findIndex((o) => o.value === newStart);
                      if (nextIdx !== -1 && nextIdx + 1 < TIME_OPTIONS.length) {
                        setEndTime(TIME_OPTIONS[nextIdx + 1].value);
                      }
                    }
                  }}
                >
                  {TIME_OPTIONS.filter((o) => o.value !== '17:00').map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cp-field">
                <label htmlFor="sched-end">Available End Time</label>
                <select
                  id="sched-end"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {TIME_OPTIONS.filter((o) => o.value > startTime).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Meetup Place */}
            <div className="cp-field" style={{ marginTop: 12 }}>
              <label htmlFor="preferredLocation" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Preferred Meetup Place (Optional)</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>{preferredLocation.length} / 100</span>
              </label>
              <input
                id="preferredLocation"
                maxLength={100}
                placeholder="e.g. Meneses Gazebo"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
              />
              <small style={{ color: '#64748b', fontSize: 12, marginTop: 4, display: 'block' }}>
                All trades are conducted on-campus.
              </small>
            </div>

            {/* Schedule Summary under Section 3 */}
            <div style={{
              marginTop: 16,
              padding: '12px 16px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: '#334155'
            }}>
              <Clock size={16} color="#8b1023" />
              <div>
                <span style={{ fontWeight: 600, color: '#8b1023' }}>Schedule Preview: </span>
                <span>{scheduleSummary}</span>
              </div>
            </div>
          </section>

          <div className="cp-actions">
            {editingId && (
              <button type="button" className="cp-btn ghost" onClick={reset} disabled={uploading}>
                Cancel Edit
              </button>
            )}
            <button type="button" className="cp-btn ghost" onClick={() => submit('draft')} disabled={uploading}>
              Save Draft
            </button>
            <button type="submit" className="cp-btn primary" disabled={uploading}>
              {uploading ? 'Uploading...' : editingId ? 'Update Listing' : 'Publish Listing'}
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
              <div style={{ marginTop: 8, padding: '8px 10px', background: '#f8fafc', borderRadius: 6, fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={13} color="#8b1023" />
                <span style={{ fontWeight: 500, lineHeight: 1.3 }}>{scheduleSummary}</span>
              </div>
              <button type="button" className="product-action" style={{ marginTop: 10 }}>
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
            {!filterUserListings(posts, user).length && (
              <div className="cp-empty">
                No active listings yet. Fill in the form above to publish your first listing.
              </div>
            )}
            {filterUserListings(posts, user).map((p) => (
                <div className="cp-post" key={p.id}>
                  <img src={p.images?.[0] || ''} alt="" />
                  <div className="b">
                    <h4>{p.title}</h4>
                    <div className="meta">
                      {p.type === 'For Sale' ? '\u20B1 ' + formatPeso(p.price) : p.type} &middot; {p.condition} &middot; {p.campus}
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
