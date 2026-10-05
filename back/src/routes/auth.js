const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { supabaseAdmin, supabaseAnon } = require('../lib/supabase');
const verifyToken = require('../middleware/auth');

// ─── Validation helpers ───────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_DOMAINS = /^@(bulsu\.edu\.ph|gmail\.com|googlemail\.com)$/;
const getEmailDomain = (email) => '@' + email.split('@')[1];

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
// Matches Signup.jsx — receives: { name, email, password }
// 1. Validates input (mirrors frontend rules)
// 2. Creates user in Supabase Auth (bcrypt hashing done by Supabase)
// 3. Creates profile row in our Prisma users table, linked by supabaseId
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // --- Server-side validation ---
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ field: 'name', error: 'Please enter your full name (minimum 2 characters).' });
    }

    const cleanEmail = (email || '').trim().toLowerCase();

    if (!EMAIL_RE.test(cleanEmail)) {
      return res.status(400).json({ field: 'email', error: 'Please enter a valid email address.' });
    }

    if (!ALLOWED_DOMAINS.test(getEmailDomain(cleanEmail))) {
      return res.status(400).json({ field: 'email', error: 'Approved for @bulsu.edu.ph or any @gmail.com account.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ field: 'password', error: 'Password must be at least 6 characters long.' });
    }

    // --- Step 1: Create user in Supabase Auth ---
    // email_confirm: true → skips verification email so the user can log in immediately.
    // Supabase automatically bcrypt-hashes the password.
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: cleanEmail,
      password,
      email_confirm: true,   // auto-confirm — no email verification needed
      user_metadata: { name: name.trim() },
    });

    if (authError) {
      // Supabase returns "already registered" or similar
      if (authError.message?.toLowerCase().includes('already')) {
        return res.status(409).json({ field: 'email', error: 'An account with this email already exists. Please log in instead.' });
      }
      return next(authError);
    }

    const supabaseId = authData.user.id; // UUID from Supabase auth.users

    // --- Step 2: Create profile in our Prisma users table ---
    const newUser = await prisma.user.create({
      data: {
        supabaseId,
        name: name.trim(),
        email: cleanEmail,
      },
      select: {
        id: true, name: true, email: true, campus: true, createdAt: true,
      },
    });

    return res.status(201).json({ ok: true, user: newUser });
  } catch (error) {
    next(error);
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
// Matches Login.jsx — receives: { email, password }
// 1. Calls Supabase signInWithPassword (Supabase verifies bcrypt hash)
// 2. Looks up our Prisma profile by supabaseId
// 3. Returns { user, access_token, refresh_token }
//    — the access_token is a Supabase JWT; the frontend sends it as Bearer on every request
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // --- Step 1: Authenticate with Supabase Auth ---
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error || !data.user) {
      return res.status(401).json({
        field: 'both',
        error: 'Invalid email or password. Please try again.',
      });
    }

    // --- Step 2: Look up or auto-create the Prisma profile ---
    let user = await prisma.user.findUnique({
      where: { supabaseId: data.user.id },
    });

    if (!user) {
      // Edge case: Supabase user exists but no Prisma profile yet (e.g. created externally)
      user = await prisma.user.create({
        data: {
          supabaseId: data.user.id,
          name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
          email: cleanEmail,
        },
      });
    }

    // Remove any internal fields from the response
    const { supabaseId: _sid, ...userProfile } = user;

    return res.json({
      ok: true,
      user: userProfile,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  } catch (error) {
    next(error);
  }
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
// Invalidates the Supabase session server-side.
router.post('/logout', verifyToken, async (req, res, next) => {
  try {
    await supabaseAdmin.auth.admin.signOut(req.headers.authorization.slice(7));
    return res.json({ ok: true });
  } catch {
    // Even if server-side sign-out fails, the client already cleared its token
    return res.json({ ok: true });
  }
});

// ─── PUT /api/auth/profile/:id ────────────────────────────────────────────────
// Protected — requires valid JWT. Matches Profile.jsx fields.
router.put('/profile/:id', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID.' });

    const { name, studentId, college, course, year, campus, phone, bio, avatar } = req.body;

    // Only allow updating your own profile
    const profile = await prisma.user.findUnique({ where: { id } });
    if (!profile || profile.supabaseId !== req.supabaseUser.id) {
      return res.status(403).json({ error: 'You can only update your own profile.' });
    }

    // Check studentId isn't taken by someone else
    if (studentId) {
      const conflict = await prisma.user.findFirst({
        where: { studentId, NOT: { id } },
      });
      if (conflict) {
        return res.status(409).json({ field: 'studentId', error: 'This Student ID is already registered.' });
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(name      && { name: name.trim() }),
        ...(studentId !== undefined && { studentId: studentId || null }),
        ...(college   !== undefined && { college }),
        ...(course    !== undefined && { course }),
        ...(year      !== undefined && { year }),
        ...(campus    && { campus }),
        ...(phone     !== undefined && { phone }),
        ...(bio       !== undefined && { bio }),
        ...(avatar    !== undefined && { avatar }),
      },
      select: {
        id: true, name: true, email: true,
        studentId: true, college: true, course: true,
        year: true, campus: true, phone: true, bio: true, avatar: true,
        updatedAt: true,
      },
    });

    return res.json({ ok: true, user: updated });
  } catch (error) {
    next(error);
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
// Returns the current user profile from the JWT (no ID needed in URL).
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { supabaseId: req.supabaseUser.id },
      select: {
        id: true, name: true, email: true,
        studentId: true, college: true, course: true,
        year: true, campus: true, phone: true, bio: true, avatar: true,
        createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
