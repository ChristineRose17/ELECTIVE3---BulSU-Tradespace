// Data layer. Everything is async so it can be swapped for Supabase without touching the pages.
const USERS = 'bulsu_registered_users', SESSION = 'bulsu_current_user', LIST = 'ts_listings';
const get = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };

const users = () => {
  const u = get(USERS, null);
  if (u) return u;
  const seed = [{ name: 'Juan Dela Cruz', email: 'student@bulsu.edu.ph', password: 'password123', registeredAt: Date.now() }];
  set(USERS, seed);
  return seed;
};

// auth (TODO: replace with supabase.auth.signInWithPassword / signUp)
export const getSession = () => get(SESSION, null);
export const setSession = (u) => u ? set(SESSION, { name: u.name, email: u.email, loggedInAt: Date.now() }) : localStorage.removeItem(SESSION);
export const authenticate = async (email, password) => users().find((u) => u.email === email && u.password === password) || null;
export const registerUser = async (u) => {
  const all = users();
  if (all.some((x) => x.email === u.email)) return { error: 'exists' };
  all.push({ ...u, registeredAt: Date.now() });
  set(USERS, all);
  return { ok: true };
};

// listings (TODO: replace with supabase.from('listings'))
export const getListings = async () => get(LIST, []);
export const upsertListing = async (item) => set(LIST, [item, ...get(LIST, []).filter((p) => p.id !== item.id)]);
export const removeListing = async (id) => set(LIST, get(LIST, []).filter((p) => p.id !== id));
export const setListingStatus = async (id, status) => set(LIST, get(LIST, []).map((p) => (p.id === id ? { ...p, status } : p)));
