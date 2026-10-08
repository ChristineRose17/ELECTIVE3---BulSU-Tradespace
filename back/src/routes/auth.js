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
      return res.status(400).json({ field: 'name', error: 'Full name must be at least 2 characters.' });
    }

    const cleanEmail = (email || '').trim().toLowerCase();

    if (!EMAIL_RE.test(cleanEmail)) {
      return res.status(400).json({ field: 'email', error: 'Please enter a valid email address.' });
    }

    if (!ALLOWED_DOMAINS.test(getEmailDomain(cleanEmail))) {
      return res.status(400).json({ field: 'email', error: 'Use an @bulsu.edu.ph or @gmail.com email.' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ field: 'password', error: 'Password must be at least 8 characters.' });
    }

    // Evaluate password strength — accept Mid or Strong (at least 3 criteria met)
    let score = 1; // 1 point for length >= 8
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) {
      return res.status(400).json({
        field: 'password',
        error: 'Password is too weak. Reach at least Mid strength.',
      });
    }

    // --- Step 1: Create user in Supabase Auth via signUp (sends OTP email) ---
    // Using supabaseAnon.auth.signUp so Supabase sends a 6-digit OTP to the user's email.
    // The user must verify the code before the email_confirmed_at field is set.
    const { data: authData, error: authError } = await supabaseAnon.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { name: name.trim() },
        // emailRedirectTo is ignored for OTP flow; Supabase sends the token in the email
      },
    });

    if (authError) {
      // Supabase returns "already registered" or similar
      if (authError.message?.toLowerCase().includes('already') || authError.code === 'email_exists') {
        return res.status(409).json({ field: 'email', error: 'Email already registered. Please log in.' });
      }
      // Rate-limit: Supabase returns 429 or "over_email_send_rate_limit"
      if (
        authError.status === 429 ||
        authError.message?.toLowerCase().includes('rate') ||
        authError.message?.toLowerCase().includes('too many') ||
        authError.message?.toLowerCase().includes('over_email')
      ) {
        return res.status(429).json({ error: 'Too many sign-up attempts. Please wait a minute and try again.' });
      }
      return res.status(authError.status || 400).json({ error: authError.message });
    }

    // authData.user may be null if the email is already registered but unconfirmed,
    // or if "Confirm email" is enabled, data.user exists and data.user.identities is an empty array
    if (!authData?.user || (Array.isArray(authData.user.identities) && authData.user.identities.length === 0)) {
      return res.status(409).json({ field: 'email', error: 'Email already registered. Please log in.' });
    }

    const supabaseId = authData.user.id; // UUID from Supabase auth.users

    // --- Step 2: Create or link profile in our Prisma users table ---
    // Using upsert handles cases where the email already exists in the database
    // (e.g. re-registering after Supabase Auth deletion or pre-existing seed data)
    let newUser;
    try {
      newUser = await prisma.user.upsert({
        where: { email: cleanEmail },
        update: {
          supabaseId,
          name: name.trim(),
        },
        create: {
          supabaseId,
          name: name.trim(),
          email: cleanEmail,
          campus: '',
        },
        select: {
          id: true, name: true, email: true, campus: true,
          role: true, profileCompleted: true,
          studentId: true, college: true, course: true, year: true,
          employeeId: true, position: true, office: true,
          phone: true, bio: true, avatar: true, createdAt: true,
        },
      });
    } catch (dbError) {
      if (dbError.code === 'P2002') {
        return res.status(409).json({
          field: 'email',
          error: 'An account with this email already exists. Please log in instead.',
        });
      }
      throw dbError;
    }

    return res.status(201).json({ ok: true, user: newUser, awaitingVerification: true });
  } catch (error) {
    next(error);
  }
});

// ─── POST /api/auth/verify-otp ────────────────────────────────────────────────
// Verifies the 6-digit OTP code sent by Supabase during sign-up.
// Body: { email, token }
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, token } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !token) {
      return res.status(400).json({ error: 'Email and code are required.' });
    }

    const { data, error } = await supabaseAnon.auth.verifyOtp({
      email: cleanEmail,
      token: String(token).trim(),
      type: 'signup',
    });

    if (error || !data?.user) {
      const msg = error?.message || '';
      if (msg.toLowerCase().includes('expired')) {
        return res.status(400).json({ error: 'Code expired. Request a new one.' });
      }
      if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('otp')) {
        return res.status(400).json({ error: 'Incorrect code. Please try again.' });
      }
      return res.status(400).json({ error: 'Verification failed. Please try again.' });
    }

    // ── Prisma profile sync (non-fatal) ──────────────────────────────────────
    // Supabase Auth is source of truth. If Prisma fails for any reason (race,
    // network, schema mismatch), we log it and still return the auth tokens
    // so the user isn't stuck on a confusing error screen.
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { supabaseId: data.user.id },
        select: {
          id: true, name: true, email: true, campus: true,
          role: true, profileCompleted: true,
          studentId: true, college: true, course: true, year: true,
          employeeId: true, position: true, office: true,
          phone: true, bio: true, avatar: true, createdAt: true,
        },
      });

      if (!user) {
        // Use upsert on `email` so that:
        // 1. A pre-existing row from a previous unverified attempt is updated
        //    with the correct supabaseId instead of throwing a unique constraint.
        // 2. Concurrent verify requests can't both try to create the same row.
        user = await prisma.user.upsert({
          where: { email: cleanEmail },
          update: {
            // Stamp the now-confirmed supabaseId onto the existing row
            supabaseId: data.user.id,
          },
          create: {
            supabaseId: data.user.id,
            name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
            email: cleanEmail,
            campus: '',
          },
          select: {
            id: true, name: true, email: true, campus: true,
            role: true, profileCompleted: true,
            studentId: true, college: true, course: true, year: true,
            employeeId: true, position: true, office: true,
            phone: true, bio: true, avatar: true, createdAt: true,
          },
        });
      }
    } catch (prismaErr) {
      // Non-fatal: log the error but don't fail the whole request.
      // The user is already verified by Supabase; they'll get their profile
      // on the next authenticated request once any DB issue is resolved.
      console.error('[verify-otp] Prisma profile sync failed (non-fatal):', prismaErr?.message ?? prismaErr);
    }

    return res.json({
      ok: true,
      user: user ? { ...user, emailVerified: true } : null,
      access_token: data.session?.access_token || null,
      refresh_token: data.session?.refresh_token || null,
    });
  } catch (error) {
    next(error);
  }
});

// ─── POST /api/auth/resend-otp ────────────────────────────────────────────────
// Re-sends the 6-digit OTP to the given email.
// Body: { email }
router.post('/resend-otp', async (req, res, next) => {
  try {
    const { email } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const { error } = await supabaseAnon.auth.resend({
      type: 'signup',
      email: cleanEmail,
    });

    if (error) {
      return res.status(400).json({ error: error.message || 'Failed to resend code.' });
    }

    return res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

// ─── POST /api/auth/forgot-password ──────────────────────────────────────────
// Step 1 of the "forgot password" OTP flow.
// Uses the service-role admin client to verify the email exists in auth.users
// before sending a recovery code — the anon client cannot query auth.users.
// Body: { email }
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // ── 1. Check if the email exists in Supabase Auth (source of truth) ────────
    // listUsers with a filter is the safest admin-only way to check existence
    // without leaking timing info or exposing a public lookup endpoint.
    const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      filter: `email.eq.${cleanEmail}`,
    });

    if (listError) {
      console.error('[forgot-password] admin.listUsers error:', listError.message);
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

    const found = Array.isArray(listData?.users) && listData.users.length > 0;

    if (!found) {
      // Email not in auth.users — tell the user clearly; don't call resetPasswordForEmail.
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    // ── 2. Email exists → send the 6-digit recovery OTP via Supabase ──────────
    // No redirectTo needed; Supabase sends the raw {{ .Token }} (6-digit code)
    // when the Reset Password template contains that variable.
    const { error: resetError } = await supabaseAnon.auth.resetPasswordForEmail(cleanEmail);

    if (resetError) {
      console.error('[forgot-password] resetPasswordForEmail error:', resetError.message, resetError.code);
      // Rate-limit handling
      if (resetError.status === 429 || resetError.message?.toLowerCase().includes('rate')) {
        return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
      }
      return res.status(500).json({ error: 'Failed to send recovery code. Please try again.' });
    }

    return res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

// ─── POST /api/auth/resend-recovery ──────────────────────────────────────────
// Resend the recovery OTP with the same email-existence guard.
// Body: { email }
router.post('/resend-recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Re-verify the email still exists in Supabase Auth before resending
    const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      filter: `email.eq.${cleanEmail}`,
    });

    if (listError) {
      console.error('[resend-recovery] admin.listUsers error:', listError.message);
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

    const found = Array.isArray(listData?.users) && listData.users.length > 0;
    if (!found) {
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    const { error: resetError } = await supabaseAnon.auth.resetPasswordForEmail(cleanEmail);
    if (resetError) {
      console.error('[resend-recovery] resetPasswordForEmail error:', resetError.message);
      if (resetError.status === 429 || resetError.message?.toLowerCase().includes('rate')) {
        return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
      }
      return res.status(500).json({ error: 'Failed to resend recovery code. Please try again.' });
    }

    return res.json({ ok: true });
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

    // --- Step 2: Look up or auto-create/re-link the Prisma profile ---
    let user = await prisma.user.findUnique({
      where: { supabaseId: data.user.id },
    });

    if (!user) {
      // Check if user exists by email (e.g. re-registered in Supabase or seeded)
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (user) {
        // Re-link existing profile to the current Supabase Auth ID
        user = await prisma.user.update({
          where: { id: user.id },
          data: { supabaseId: data.user.id },
        });
      } else {
        // Edge case: Supabase user exists but no Prisma profile yet (e.g. created externally)
        user = await prisma.user.create({
          data: {
            supabaseId: data.user.id,
            name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
            email: cleanEmail,
          },
        });
      }
    }

    // Remove any internal fields from the response
    // Exclude internal supabaseId from the response
    const { supabaseId: _sid, ...userProfile } = user;

    // email_confirmed_at is set by Supabase when the OTP is verified.
    // Google/OAuth users always have it set immediately.
    const emailVerified = !!(data.user.email_confirmed_at);

    return res.json({
      ok: true,
      user: { ...userProfile, emailVerified },
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
// ─── PUT /api/auth/profile/:id ────────────────────────────────────────────────
// Protected — requires valid JWT. Matches Profile.jsx fields.
// All fields are optional — empty fields never trigger validation errors.
router.put('/profile/:id', verifyToken, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID.' });

    const { role, name, studentId, college, course, year, campus, phone, bio, avatar,
            employeeId, position, office } = req.body;

    // Only allow updating your own profile
    const profile = await prisma.user.findUnique({ where: { id } });
    if (!profile || profile.supabaseId !== req.supabaseUser.id) {
      return res.status(403).json({ error: 'You can only update your own profile.' });
    }

    // Format validation — only validate if non-empty
    const trimmedStudentId = studentId ? studentId.trim() : '';
    if (trimmedStudentId) {
      if (!/^\d{4}-\d{6}$/.test(trimmedStudentId)) {
        return res.status(400).json({ field: 'studentId', error: 'Student ID must be in YYYY-XXXXXX format (e.g. 2022-108249).' });
      }
      // Check studentId isn't taken by someone else
      const conflict = await prisma.user.findFirst({
        where: { studentId: trimmedStudentId, NOT: { id } },
      });
      if (conflict) {
        return res.status(409).json({ field: 'studentId', error: 'This Student ID is already registered.' });
      }
    }

    const trimmedPhone = phone ? phone.trim() : '';
    if (trimmedPhone) {
      const cleanPhone = trimmedPhone.replace(/[\s-]/g, '');
      if (!/^(\+639\d{9}|09\d{9})$/.test(cleanPhone)) {
        return res.status(400).json({ field: 'phone', error: 'Please enter a valid phone number (e.g. 0917-123-4567).' });
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(role       !== undefined && { role: role ? role.trim() : null }),
        ...(name       !== undefined && { name: name.trim() }),
        ...(studentId  !== undefined && { studentId: trimmedStudentId || null }),
        ...(college    !== undefined && { college: college ? college.trim() : null }),
        ...(course     !== undefined && { course: course ? course.trim() : null }),
        ...(year       !== undefined && { year: year ? year.trim() : null }),
        ...(campus     !== undefined && { campus: campus ? campus.trim() : '' }),
        ...(phone      !== undefined && { phone: trimmedPhone || null }),
        ...(bio        !== undefined && { bio: bio ? bio.trim() : null }),
        ...(avatar     !== undefined && { avatar: avatar || null }),
        ...(employeeId !== undefined && { employeeId: employeeId ? employeeId.trim() : null }),
        ...(position   !== undefined && { position: position ? position.trim() : null }),
        ...(office     !== undefined && { office: office ? office.trim() : null }),
      },
      select: {
        id: true, name: true, email: true,
        role: true, profileCompleted: true,
        studentId: true, college: true, course: true,
        year: true, campus: true, phone: true, bio: true, avatar: true,
        employeeId: true, position: true, office: true,
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
        role: true, profileCompleted: true,
        studentId: true, college: true, course: true,
        year: true, campus: true, phone: true, bio: true, avatar: true,
        employeeId: true, position: true, office: true,
        createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    // Attach emailVerified from the Supabase Auth record
    const emailVerified = !!(req.supabaseUser.email_confirmed_at);
    return res.json({ ...user, emailVerified });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

