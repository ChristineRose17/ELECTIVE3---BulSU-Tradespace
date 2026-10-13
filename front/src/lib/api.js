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
    if (filters.sellerId) params.set('sellerId', filters.sellerId);
    if (filters.status) params.set('status', filters.status);

    const qs = params.toString() ? `?${params}` : '';
    const listings = await api.get(`/listings${qs}`);
    return Array.isArray(listings) ? listings : [];
  } catch {
    return [];
  }
};

/**
 * Fetch a single listing by ID.
 * @param {number|string} id
 */
export const getListing = async (id) => {
  try {
    return await api.get(`/listings/${id}`);
  } catch (err) {
    return null;
  }
};

/**
 * Fetch all listings belonging to current authenticated user.
 * Optional { status: 'all' | 'active' | 'sold' | 'draft' }.
 */
export const getMyListings = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    const qs = params.toString() ? `?${params}` : '';
    const listings = await api.get(`/listings/mine${qs}`);
    return Array.isArray(listings) ? listings : [];
  } catch {
    // Fallback: try getListings with status=all
    return await getListings({ status: 'all' });
  }
};

/**
 * Fetch seller availability slots and schedule for a listing.
 */
export const getListingAvailability = async (listingId) => {
  try {
    return await api.get(`/listings/${listingId}/availability`);
  } catch {
    return null;
  }
};

/**
 * Update seller availability schedule and preferred meetup location for a listing.
 */
export const setListingAvailability = async (listingId, data) => {
  return await api.put(`/listings/${listingId}/availability`, data);
};

/**
 * Dispatches an event to notify components that listings have changed.
 */
export const notifyListingsUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tradespace:listings-updated'));
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
    title:             item.title,
    category:          item.category,
    college:           item.college,
    campus:            item.campus,
    condition:         item.condition,
    description:       item.desc || item.description || '',
    type:              item.type,
    price:             item.price,
    images:            item.images ? (Array.isArray(item.images) ? item.images.slice(0, 1) : [item.images]) : [],
    status:            item.status || 'active',
    preferredLocation: item.preferredLocation !== undefined ? item.preferredLocation : null,
    schedule:          item.schedule || null,
    sellerId,
  };

  try {
    let data;
    if (item.id) {
      data = await api.put(`/listings/${item.id}`, payload);
    } else {
      data = await api.post('/listings', payload);
    }
    notifyListingsUpdated();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || 'Failed to save listing.' };
  }
};

export const removeListing = async (id) => {
  try {
    await api.delete(`/listings/${id}`);
    notifyListingsUpdated();
    return true;
  } catch {
    return false;
  }
};

export const softRemoveListing = async (id) => {
  try {
    const data = await api.patch(`/listings/${id}/remove`);
    notifyListingsUpdated();
    return { ok: true, data };
  } catch (err) {
    return { error: err.message || 'Failed to remove listing.' };
  }
};

export const setListingStatus = async (id, status) => {
  try {
    await api.patch(`/listings/${id}/status`, { status });
    notifyListingsUpdated();
    return true;
  } catch {
    return false;
  }
};

/**
 * Upload image file to Google Drive via backend Express /api/upload.
 * Accepts exactly 1 image file. Returns array containing public image URL.
 */
export const uploadImages = async (files) => {
  if (!files || files.length === 0) return [];
  if (files.length > 1) {
    throw new Error('Too many files uploaded. Maximum is 1 image.');
  }
  const token = localStorage.getItem(TOKEN);
  const formData = new FormData();
  formData.append('images', files[0]);

  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload image.');
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
    return await api.post(`/notifications/${id}/read`);
  } catch {
    return null;
  }
};

export const markAllNotificationsRead = async () => {
  try {
    return await api.post('/notifications/read-all');
  } catch {
    return null;
  }
};

// ─── TRADE REQUESTS & MEETUP SCHEDULING ──────────────────────────────────────

/**
 * Fetch meetup date chips and time slots allowed by the backend (Asia/Manila).
 */
export const getMeetupOptions = async () => {
  try {
    return await api.get('/meetup-options');
  } catch {
    return {
      timezone: 'Asia/Manila',
      allowedDates: [],
      allowedTimeSlots: [],
    };
  }
};

/**
 * Create a new structured trade request on an item.
 * @param {{ listingId: number, meetupLocation: string, meetupDate: string, meetupTime: string, notes?: string }} data
 */
export const createTradeRequest = async (data) => {
  return await api.post('/trade-requests', data);
};

/**
 * Get buyer's requests ("My Requests") with pagination and optional status filter.
 * @param {{ status?: string, page?: number, limit?: number }} params
 */
export const getMyTradeRequests = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  const qs = query.toString() ? `?${query.toString()}` : '';
  return await api.get(`/trade-requests/mine${qs}`);
};

/**
 * Get seller's incoming requests with pagination and optional status filter.
 * @param {{ status?: string, page?: number, limit?: number }} params
 */
export const getIncomingTradeRequests = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  const qs = query.toString() ? `?${query.toString()}` : '';
  return await api.get(`/trade-requests/incoming${qs}`);
};

/**
 * Get a single trade request by ID (for modal / deep link).
 */
export const getTradeRequestById = async (id) => {
  return await api.get(`/trade-requests/${id}`);
};

/**
 * Check if current user has an active request on a specific listing.
 */
export const getMyRequestOnItem = async (listingId) => {
  try {
    const res = await api.get(`/trade-requests/item/${listingId}/my-request`);
    return res.activeRequest || null;
  } catch {
    return null;
  }
};

/**
 * Accept a proposal or counter-proposal.
 */
export const acceptTradeRequest = async (id) => {
  return await api.post(`/trade-requests/${id}/accept`);
};

/**
 * Decline a request with an optional reason.
 */
export const declineTradeRequest = async (id, reason = '') => {
  return await api.post(`/trade-requests/${id}/decline`, { reason });
};

/**
 * Propose alternate meetup location/date/time (counter-offer).
 */
export const counterTradeRequest = async (id, data) => {
  return await api.post(`/trade-requests/${id}/counter`, data);
};

/**
 * Cancel a pending, countered, or accepted request.
 */
export const cancelTradeRequest = async (id) => {
  return await api.post(`/trade-requests/${id}/cancel`);
};

/**
 * Mark an accepted trade request as completed on or after meetup date.
 */
export const completeTradeRequest = async (id) => {
  return await api.post(`/trade-requests/${id}/complete`);
};
