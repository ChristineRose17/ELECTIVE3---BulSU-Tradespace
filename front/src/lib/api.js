// ─── Data layer — BulSU TradeSpace ──────────────────────────────────────────
// All data is fetched from the Express backend via /api/*.
// In development, Vite proxies /api → http://localhost:7171 so the real
// backend URL is never visible in browser DevTools.
// In production, set VITE_API_URL in your hosting environment.

// Session stored in localStorage — only non-sensitive user info (no password)
const SESSION = 'bulsu_current_user';
const TOKEN   = 'bulsu_access_token'; // Supabase JWT
const SAVED   = 'ts_saved_items';     // saved item IDs remain local for instant UI

// ─── Internal HTTP helpers ───────────────────────────────────────────────────

const BASE = '/api'; // always relative — goes through Vite proxy in dev

async function http(method, path, body) {
  const token = localStorage.getItem(TOKEN);
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // If the server says the token is expired, clear it automatically
    if (res.status === 401) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(SESSION);
    }
    const fallbackMsg = res.status === 500
      ? 'Backend server is unreachable or offline. Please make sure the backend is running (npm run dev).'
      : `HTTP ${res.status}`;
    const err = new Error(data.error || fallbackMsg);
    err.field  = data.field  || null;
    err.status = res.status;
    throw err;
  }
  return data;
}

const api = {
  get:    (path)        => http('GET',    path),
  post:   (path, body)  => http('POST',   path, body),
  put:    (path, body)  => http('PUT',    path, body),
  patch:  (path, body)  => http('PATCH',  path, body),
  delete: (path)        => http('DELETE', path),
};

// ─── Local session helpers ───────────────────────────────────────────────────

function readSession() {
  try { return JSON.parse(localStorage.getItem(SESSION)); } catch { return null; }
}

function writeSession(u) {
  if (u) localStorage.setItem(SESSION, JSON.stringify(u));
  else    localStorage.removeItem(SESSION);
}

// ─── AUTH / USER SESSION ─────────────────────────────────────────────────────

export const getSession = () => readSession();

export const setSession = (u, token) => {
  if (u)     localStorage.setItem(SESSION, JSON.stringify(u));
  else       localStorage.removeItem(SESSION);
  if (token) localStorage.setItem(TOKEN, token);
  else       localStorage.removeItem(TOKEN);
  return u;
};

/**
 * Login — matches Login.jsx: { email, password }
 * Returns the user object or null on failure.
 * Stores the JWT access token for use in subsequent requests.
 */
export const authenticate = async (email, password) => {
  try {
    const { user, access_token } = await api.post('/auth/login', { email, password });
    if (user && access_token) {
      // user already contains emailVerified from backend
      setSession(user, access_token);
    }
    return user || null;
  } catch {
    return null;
  }
};

/**
 * verifyEmailOtp — submits the 6-digit OTP the user received by email.
 * Returns { ok, user, access_token } or { error }.
 */
export const verifyEmailOtp = async (email, token) => {
  try {
    const data = await api.post('/auth/verify-otp', { email, token });
    if (data.user && data.access_token) {
      // Store session with emailVerified: true
      setSession({ ...data.user, emailVerified: true }, data.access_token);
    }
    return { ok: true, user: data.user, access_token: data.access_token };
  } catch (err) {
    return { error: err.message || 'Verification failed.' };
  }
};

/**
 * resendEmailOtp — triggers Supabase to re-send the 6-digit OTP.
 * Returns { ok: true } or { error }.
 */
export const resendEmailOtp = async (email) => {
  try {
    await api.post('/auth/resend-otp', { email });
    return { ok: true };
  } catch (err) {
    return { error: err.message || 'Failed to resend code.' };
  }
};

/**
 * requestRecoveryCode — Step 1 of forgot-password flow.
 * Calls the backend which checks if the email exists in Supabase Auth (admin),
 * then calls resetPasswordForEmail only if found.
 * Returns { ok: true } or { error: string }.
 */
export const requestRecoveryCode = async (email) => {
  try {
    await api.post('/auth/forgot-password', { email });
    return { ok: true };
  } catch (err) {
    return { error: err.message || 'Something went wrong. Please try again.' };
  }
};

/**
 * resendRecoveryCode — Resend button in the code step.
 * Same email-existence guard as requestRecoveryCode.
 * Returns { ok: true } or { error: string }.
 */
export const resendRecoveryCode = async (email) => {
  try {
    await api.post('/auth/resend-recovery', { email });
    return { ok: true };
  } catch (err) {
    return { error: err.message || 'Failed to resend recovery code.' };
  }
};

/**
 * Signup — matches Signup.jsx: { name, email, password }
 * Returns { ok: true } on success or { error: string } on failure.
 */
export const registerUser = async ({ name, email, password }) => {
  try {
    await api.post('/auth/signup', { name, email, password });
    return { ok: true };
  } catch (err) {
    return { error: err.message || 'exists' };
  }
};

/**
 * Update profile — matches Profile.jsx form fields.
 * Merges remote update into local session and returns { ok, user } or { error, field }.
 */
export const updateUserProfile = async (updates) => {
  const session = readSession();
  if (!session?.id) {
    // Offline fallback — just persist locally
    const merged = { ...session, ...updates };
    writeSession(merged);
    return { ok: true, user: merged };
  }

  try {
    const { user } = await api.put(`/auth/profile/${session.id}`, updates);
    writeSession(user);
    return { ok: true, user };
  } catch (err) {
    if (err.status && err.status < 500) {
      return { error: err.message, field: err.field || null };
    }
    // Graceful degradation — save locally if backend is unreachable
    const merged = { ...session, ...updates };
    writeSession(merged);
    return { ok: true, user: merged };
  }
};

// ─── LISTINGS ────────────────────────────────────────────────────────────────

/**
 * Fetch all active listings from the backend.
 * Optionally pass { category, campus, search } as query params.
 */
export const getListings = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.set('category', filters.category);
    if (filters.campus   && filters.campus   !== 'All Campuses') params.set('campus', filters.campus);
    if (filters.search)  params.set('search', filters.search);
    // Default: show all statuses so CreatePost/MyListings can filter client-side
    params.set('status', filters.status || '');

    const qs = params.toString() ? `?${params}` : '';
    const listings = await api.get(`/listings${qs}`);
    return Array.isArray(listings) ? listings : [];
  } catch {
    return [];
  }
};

/**
 * Create or update a listing.
 * item.id present → update (PUT), otherwise → create (POST).
 * Maps frontend shape { desc, seller, ... } → backend shape { description, sellerId }.
 */
export const upsertListing = async (item) => {
  const session = readSession();
  const sellerId = session?.id;

  // Normalise field names the frontend uses
  const payload = {
    title:       item.title,
    category:    item.category,
    college:     item.college,
    campus:      item.campus,
    condition:   item.condition,
    description: item.desc || item.description || '',
    type:        item.type,
    price:       item.price,
    images:      item.images || [],
    status:      item.status || 'active',
    sellerId,
  };

  try {
    if (item.id) {
      await api.put(`/listings/${item.id}`, payload);
    } else {
      await api.post('/listings', payload);
    }
    return true;
  } catch {
    return false;
  }
};

export const removeListing = async (id) => {
  try {
    await api.delete(`/listings/${id}`);
    return true;
  } catch {
    return false;
  }
};

export const setListingStatus = async (id, status) => {
  try {
    await api.patch(`/listings/${id}/status`, { status });
    return true;
  } catch {
    return false;
  }
};

/**
 * Upload image files to Google Drive via backend Express /api/upload.
 * Returns array of direct public image URLs.
 */
export const uploadImages = async (files) => {
  if (!files || files.length === 0) return [];
  const token = localStorage.getItem(TOKEN);
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }

  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload images.');
  }

  return data.urls || (data.url ? [data.url] : []);
};

// ─── SAVED / FAVORITES (DB-backed, per-user) ─────────────────────────────────

/**
 * Fetches the list of saved listing IDs for the current user from the backend.
 * Returns [] if the user is not logged in or on error.
 */
export const getSavedListingIds = async () => {
  const session = readSession();
  if (!session?.id) return [];
  try {
    const { ids } = await api.get('/saved');
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
};

/**
 * Toggles save/unsave for a listing via the backend.
 * Returns the updated array of saved listing IDs.
 */
export const toggleSaveListing = async (id) => {
  try {
    const { ids } = await api.post(`/saved/${id}`);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return await getSavedListingIds();
  }
};

// ─── CLAIMS ──────────────────────────────────────────────────────────────────

export const getClaims = async () => {
  const session = readSession();
  const userId = session?.id;

  try {
    const qs = userId ? `?userId=${userId}` : '';
    const claims = await api.get(`/claims${qs}`);

    // Flatten nested shape from backend to match what MyClaims.jsx expects:
    // { listingTitle, listingImage, price, type, seller, campus, claimant }
    return (Array.isArray(claims) ? claims : []).map((c) => ({
      id:           c.id,
      listingId:    c.listingId,
      listingTitle: c.listing?.title         || '',
      listingImage: c.listing?.images?.[0]   || '',
      price:        c.listing?.price         ?? 0,
      type:         c.listing?.type          || 'For Sale',
      seller:       c.listing?.seller?.name  || '',
      campus:       c.listing?.campus        || 'Meneses Campus',
      claimant:     c.claimant?.name         || '',
      claimDate:    c.claimDate?.split('T')[0] || c.createdAt?.split('T')[0] || '',
      status:       c.status,
      notes:        c.notes || '',
    }));
  } catch {
    return [];
  }
};

/**
 * createClaim — matches Marketplace.jsx's handleSubmitClaim call:
 * { listingId, listingTitle, listingImage, price, type, seller, campus, claimant, notes }
 */
export const createClaim = async (claimData) => {
  const session = readSession();
  const claimantId = session?.id;

  try {
    const result = await api.post('/claims', {
      listingId:  claimData.listingId,
      claimantId,
      notes:      claimData.notes || '',
    });
    return result;
  } catch {
    return null;
  }
};

export const updateClaimStatus = async (id, status) => {
  try {
    await api.patch(`/claims/${id}/status`, { status });
    return true;
  } catch {
    return false;
  }
};

export const removeClaim = async (id) => {
  try {
    await api.delete(`/claims/${id}`);
    return true;
  } catch {
    return false;
  }
};

// ─── Notification APIs ────────────────────────────────────────────────────────

export const getNotifications = async (filter = 'all', page = 1) => {
  try {
    return await api.get(`/notifications?filter=${encodeURIComponent(filter)}&page=${page}`);
  } catch {
    return { notifications: [], unreadCount: 0 };
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const res = await api.get('/notifications/unread-count');
    return res.count || 0;
  } catch {
    return 0;
  }
};

export const markNotificationRead = async (id) => {
  try {
    return await api.patch(`/notifications/${id}/read`);
  } catch {
    return null;
  }
};

export const markAllNotificationsRead = async () => {
  try {
    return await api.patch('/notifications/read-all');
  } catch {
    return null;
  }
};
