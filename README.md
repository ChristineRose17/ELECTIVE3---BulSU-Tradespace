# BulSU TradeSpace Meneses (Vite + React)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in dist/

Demo login: student@bulsu.edu.ph / password123

## Structure
- src/pages        Landing, Login, Signup, Marketplace, CreatePost
- src/components   AppLayout (sidebar + topbar), AuthShell, Brand, Icons
- src/context      AuthContext (current user)
- src/lib/api.js   ALL data access. Currently localStorage; replace these
                   functions with Supabase calls when the database is ready.
- vercel.json      SPA rewrite so page refreshes work on Vercel
