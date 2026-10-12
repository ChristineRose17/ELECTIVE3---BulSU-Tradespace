require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const prisma = require('./src/lib/prisma');
const apiRoutes = require('./src/routes');

const app = express();
const port = process.env.PORT || 7171;

// Render (and Vercel) sit behind a reverse proxy.
// Needed so express-rate-limit sees the real client IP instead of the proxy's.
app.set('trust proxy', 1);

// CORS — allow local dev servers, the production Vercel frontend,
// and any extra URLs listed in FRONTEND_URL (comma-separated, optional).
const normalizeOrigin = (url) => url.trim().replace(/\/+$/, '');

const allowedOrigins = [
  'http://localhost:5173', // Vite default dev port
  'http://localhost:4173', // Vite preview port
  'https://elective-3-bul-su-tradespace.vercel.app', // Production frontend (Vercel)
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(normalizeOrigin).filter(Boolean)
    : []),
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) return cb(null, true);
    const err = new Error(`CORS: origin ${origin} not allowed`);
    err.status = 403;
    cb(err);
  },
  credentials: true,
}));
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.json({
    message: 'BulSU TradeSpace API is running',
    version: '1.0.0',
    status: 'healthy',
  });
});

// Database Health Check Route
app.get('/api/health', async (req, res) => {
  try {
    // Ping Supabase PostgreSQL via Prisma
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      database: 'connected (Supabase PostgreSQL)',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
    });
  }
});

// Rate limiting — protect sensitive auth endpoints from brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: 'Too many attempts. Please wait 15 minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/verify-otp', authLimiter);
app.use('/api/auth/resend-otp', authLimiter);

// API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start Server
const server = app.listen(port, () => {
  console.log(`🚀 BulSU TradeSpace server running on port ${port}`);
  console.log(`📍 Allowed origins: ${allowedOrigins.join(', ')}`);
});

// Graceful Shutdown
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);