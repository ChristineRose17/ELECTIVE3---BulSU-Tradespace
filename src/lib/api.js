// Data layer using localStorage with rich mock data for BulSU TradeSpace
const USERS = 'bulsu_registered_users';
const SESSION = 'bulsu_current_user';
const LIST = 'ts_listings';
const SAVED = 'ts_saved_items';
const CLAIMS = 'ts_claims';

const get = (k, d) => {
  try {
    const val = localStorage.getItem(k);
    return val ? JSON.parse(val) : d;
  } catch {
    return d;
  }
};

const set = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
};

export const DEFAULT_USER = {
  name: 'Juan Dela Cruz',
  email: 'student@bulsu.edu.ph',
  studentId: '2022-108249',
  college: 'CIT / Engineering',
  course: 'BS Information Technology',
  year: '3rd Year',
  campus: 'Meneses Campus',
  bio: 'BulSU Meneses IT student. Selling past semester textbooks, engineering calculators, and uniform items.',
  phone: '0917-123-4567',
  avatar: ''
};

const users = () => {
  const u = get(USERS, null);
  if (u) return u;
  const seed = [{
    ...DEFAULT_USER,
    password: 'password123',
    registeredAt: Date.now()
  }];
  set(USERS, seed);
  return seed;
};

// Initial realistic BulSU listings
const SEED_LISTINGS = [
  {
    id: 101,
    status: 'active',
    title: 'Engineering Mechanics Reviewer & Formula Sheet',
    category: 'Books and Notes',
    college: 'CIT / Engineering',
    condition: 'Like New',
    description: 'Complete compiled notes for Statics & Dynamics with solved practice problems. Perfect for 2nd and 3rd year engineering students taking midterms.',
    type: 'For Sale',
    price: 180,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
    seller: 'Juan Dela Cruz',
    campus: 'Meneses Campus',
    createdAt: '2026-10-01T08:30:00.000Z'
  },
  {
    id: 102,
    status: 'active',
    title: 'BulSU Meneses Official White Polo Uniform (Medium)',
    category: 'School Supplies',
    college: 'All Colleges',
    condition: 'Good',
    description: 'Original campus polo uniform with crisp embroidered BulSU seal. Clean, no stains or tears. Freshly laundered and ready to wear.',
    type: 'For Sale',
    price: 250,
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'],
    seller: 'Maria Santos',
    campus: 'Meneses Campus',
    createdAt: '2026-09-28T14:15:00.000Z'
  },
  {
    id: 103,
    status: 'active',
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    category: 'School Supplies',
    college: 'CIT / Engineering',
    condition: 'Like New',
    description: 'Original authentic Casio ClassWiz in pristine condition. Solar + battery, complete with hard slide cover. Allowed for board examinations and engineering courses.',
    type: 'For Sale',
    price: 850,
    images: ['https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80'],
    seller: 'Juan Dela Cruz',
    campus: 'Meneses Campus',
    createdAt: '2026-10-02T11:00:00.000Z'
  },
  {
    id: 104,
    status: 'active',
    title: 'Fresh Baked Meneses Canteen Choco Brownies (Box of 6)',
    category: 'Food',
    college: 'All Colleges',
    condition: 'Like New',
    description: 'Freshly baked fudge brownies made every morning. Rich dark chocolate chips and walnuts. Perfect snack during vacant hours! Pick up near student gazebo.',
    type: 'For Sale',
    price: 90,
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80'],
    seller: 'Clara Dimagiba',
    campus: 'Meneses Campus',
    createdAt: '2026-10-03T09:20:00.000Z'
  },
  {
    id: 105,
    status: 'active',
    title: 'Drafting T-Square 36-inch & Precision Triangle Set',
    category: 'School Supplies',
    college: 'CIT / Engineering',
    condition: 'Good',
    description: 'Professional acrylic blade drafting T-square with 30-60 and 45-45 degree drafting triangles. Smooth edges, no nicks.',
    type: 'Item Swap',
    price: 320,
    images: ['https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80'],
    seller: 'Arki Guild BulSU',
    campus: 'Meneses Campus',
    createdAt: '2026-09-30T16:45:00.000Z'
  },
  {
    id: 106,
    status: 'active',
    title: 'Java & Web Development Peer Tutoring (2 hrs)',
    category: 'Services',
    college: 'CIT / Engineering',
    condition: 'Like New',
    description: 'One-on-one tutorial for Object-Oriented Programming, Data Structures, or HTML/CSS/React basics. Will teach at the Meneses library or computer lab.',
    type: 'Service',
    price: 150,
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'],
    seller: 'CodeBulSU Mentors',
    campus: 'Meneses Campus',
    createdAt: '2026-10-02T13:30:00.000Z'
  },
  {
    id: 107,
    status: 'active',
    title: 'Besavilla Engineering Mathematics Vol 2',
    category: 'Books and Notes',
    college: 'CIT / Engineering',
    condition: 'Fair',
    description: 'Classic reviewer by Engr. Besavilla covering Integral Calculus, Differential Equations, and Probability. Some highlighted formulas inside.',
    type: 'For Sale',
    price: 350,
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'],
    seller: 'Mark Bautista',
    campus: 'Meneses Campus',
    createdAt: '2026-09-29T10:10:00.000Z'
  },
  {
    id: 108,
    status: 'active',
    title: 'Free General Chemistry Lab Manual & Safety Goggles',
    category: 'Books and Notes',
    college: 'College of Education',
    condition: 'Good',
    description: 'Donating for any freshman or junior student in need of lab goggles and lab experiment manual. No charge, just meet at the student lounge.',
    type: 'Giveaway',
    price: 0,
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80'],
    seller: 'Alyssa Ramos',
    campus: 'Meneses Campus',
    createdAt: '2026-10-01T15:00:00.000Z'
  }
];

// Initial realistic claims
const SEED_CLAIMS = [
  {
    id: 201,
    listingId: 102,
    listingTitle: 'BulSU Meneses Official White Polo Uniform (Medium)',
    listingImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    price: 250,
    type: 'For Sale',
    seller: 'Maria Santos',
    campus: 'Meneses Campus',
    claimant: 'Juan Dela Cruz',
    claimDate: '2026-10-02',
    status: 'pending',
    notes: 'Hi! Can we meet at the campus gazebo tomorrow at 10:00 AM? Ready with exact cash.'
  },
  {
    id: 202,
    listingId: 105,
    listingTitle: 'Drafting T-Square 36-inch & Precision Triangle Set',
    listingImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    price: 320,
    type: 'Item Swap',
    seller: 'Arki Guild BulSU',
    campus: 'Meneses Campus',
    claimant: 'Juan Dela Cruz',
    claimDate: '2026-10-01',
    status: 'accepted',
    notes: 'Swap accepted! Meeting point: CIT Building Lobby near Room 204 at 1:30 PM.'
  },
  {
    id: 203,
    listingId: 107,
    listingTitle: 'Besavilla Engineering Mathematics Vol 2',
    listingImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    price: 350,
    type: 'For Sale',
    seller: 'Mark Bautista',
    campus: 'Meneses Campus',
    claimant: 'Juan Dela Cruz',
    claimDate: '2026-09-28',
    status: 'declined',
    notes: 'Apologies, already reserved and promised to a blockmate who inquired earlier.'
  },
  {
    id: 204,
    listingId: 108,
    listingTitle: 'Free General Chemistry Lab Manual & Safety Goggles',
    listingImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
    price: 0,
    type: 'Giveaway',
    seller: 'Alyssa Ramos',
    campus: 'Meneses Campus',
    claimant: 'Juan Dela Cruz',
    claimDate: '2026-09-25',
    status: 'completed',
    notes: 'Handover completed successfully at BulSU Meneses Library reading area. Thank you!'
  }
];

// --- AUTH / USER SESSION ---
export const getSession = () => {
  const current = get(SESSION, null);
  if (current) return current;
  set(SESSION, DEFAULT_USER);
  return DEFAULT_USER;
};

export const setSession = (u) => {
  if (u) {
    const full = { ...DEFAULT_USER, ...u, loggedInAt: Date.now() };
    set(SESSION, full);
    return full;
  }
  localStorage.removeItem(SESSION);
  return null;
};

export const updateUserProfile = async (updates) => {
  const current = getSession() || DEFAULT_USER;
  const updated = { ...current, ...updates };
  set(SESSION, updated);

  // Also update registered users list if matching
  const allUsers = users().map((u) => (u.email === updated.email ? { ...u, ...updates } : u));
  set(USERS, allUsers);

  return updated;
};

export const authenticate = async (email, password) => {
  const u = users().find((x) => x.email === email && x.password === password);
  return u || null;
};

export const registerUser = async (u) => {
  const all = users();
  if (all.some((x) => x.email === u.email)) return { error: 'exists' };
  all.push({ ...u, registeredAt: Date.now() });
  set(USERS, all);
  return { ok: true };
};

// --- LISTINGS ---
export const getListings = async () => {
  const stored = get(LIST, null);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  set(LIST, SEED_LISTINGS);
  return SEED_LISTINGS;
};

export const upsertListing = async (item) => {
  const current = await getListings();
  const exists = current.some((p) => p.id === item.id);
  const updated = exists
    ? current.map((p) => (p.id === item.id ? { ...p, ...item } : p))
    : [item, ...current];
  set(LIST, updated);
  return true;
};

export const removeListing = async (id) => {
  const current = await getListings();
  const filtered = current.filter((p) => p.id !== id);
  set(LIST, filtered);
  return true;
};

export const setListingStatus = async (id, status) => {
  const current = await getListings();
  const updated = current.map((p) => (p.id === id ? { ...p, status } : p));
  set(LIST, updated);
  return true;
};

// --- SAVED / FAVORITES ---
export const getSavedListingIds = async () => {
  const stored = get(SAVED, null);
  if (stored && Array.isArray(stored)) {
    return stored;
  }
  const defaultSaved = [101, 102];
  set(SAVED, defaultSaved);
  return defaultSaved;
};

export const toggleSaveListing = async (id) => {
  const current = await getSavedListingIds();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  set(SAVED, next);
  return next;
};

// --- CLAIMS ---
export const getClaims = async () => {
  const stored = get(CLAIMS, null);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  set(CLAIMS, SEED_CLAIMS);
  return SEED_CLAIMS;
};

export const createClaim = async (claimData) => {
  const current = await getClaims();
  const newClaim = {
    id: Date.now(),
    claimDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    ...claimData
  };
  const updated = [newClaim, ...current];
  set(CLAIMS, updated);
  return newClaim;
};

export const updateClaimStatus = async (id, status) => {
  const current = await getClaims();
  const updated = current.map((c) => (c.id === id ? { ...c, status } : c));
  set(CLAIMS, updated);
  return updated;
};

export const removeClaim = async (id) => {
  const current = await getClaims();
  const filtered = current.filter((c) => c.id !== id);
  set(CLAIMS, filtered);
  return filtered;
};
