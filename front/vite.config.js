import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests from the browser to /api/* are forwarded to the backend.
      // The real backend URL is never exposed in browser network tabs.
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:7171',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
