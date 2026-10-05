const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !serviceKey || !anonKey) {
  throw new Error(
    'Missing Supabase env vars. Add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ' +
    'and SUPABASE_ANON_KEY to your .env file.'
  );
}

// ─── Admin client (service_role key) ─────────────────────────────────────────
// Used for: admin.createUser, admin.deleteUser, getUser (JWT verification)
// ⚠️  NEVER expose this key to the browser — it bypasses all RLS policies.
const supabaseAdmin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Anon client ──────────────────────────────────────────────────────────────
// Used for: signInWithPassword (requires anon key, not service role)
// This stays server-side; the browser never sees it.
const supabaseAnon = createClient(url, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

module.exports = { supabaseAdmin, supabaseAnon };
