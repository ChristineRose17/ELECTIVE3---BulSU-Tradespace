require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./src/lib/prisma');
const apiRoutes = require('./src/routes');

const app = express();
const port = process.env.PORT || 7171;

// CORS — allow the Vite dev server and any production frontend URL
const allowedOrigins = [
  'http://localhost:5173', // Vite default dev port
  'http://localhost:4173', // Vite preview port
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
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
  console.log(`📍 Health check: http://localhost:${port}/api/health`);
  console.log(`📍 API Base:     http://localhost:${port}/api`);
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