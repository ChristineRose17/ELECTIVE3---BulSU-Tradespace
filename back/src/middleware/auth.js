const { supabaseAdmin } = require('../lib/supabase');

/**
 * verifyToken — Express middleware that reads the Bearer token from the
 * Authorization header, verifies it against Supabase Auth, and attaches
 * the Supabase user to req.supabaseUser.
 *
 * Protected routes should use this as: router.post('/', verifyToken, handler)
 */
async function verifyToken(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;

  if (!token) {
    return res.status(401).json({ error: 'Authorization required. Please log in.' });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  req.supabaseUser = data.user; // { id (UUID), email, ... }
  next();
}

module.exports = verifyToken;
