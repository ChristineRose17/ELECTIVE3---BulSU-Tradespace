# BulSU TradeSpace

BulSU TradeSpace is a campus marketplace application built with an Express/Prisma backend and a React/Vite frontend.

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [Supabase](https://supabase.com/) project (free tier works)
- A Google Cloud project with OAuth 2.0 credentials for Google Drive (for image uploads)

---

## ⚙️ Environment Setup

**This repo does not include `.env` files** — you must create them yourself from the examples.

### Backend (`back/.env`)

```bash
cp back/.env.example back/.env
```

Then open `back/.env` and fill in:
- `DATABASE_URL` — Transaction Pooler connection string from Supabase Dashboard → Settings → Database
- `DIRECT_URL` — Direct connection string (required for Prisma migrations)
- `SUPABASE_URL` — Your Supabase project URL
- `SUPABASE_ANON_KEY` — Found in Supabase Dashboard → Settings → API
- `SUPABASE_SERVICE_ROLE_KEY` — Found in Supabase Dashboard → Settings → API (**keep secret**)
- `GOOGLE_DRIVE_FOLDER_ID` — The ID of the Google Drive folder where images will be uploaded

### Frontend (`front/.env`)

```bash
cp front/.env.example front/.env
```

Then fill in:
- `VITE_SUPABASE_URL` — Same as backend `SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` — Same as backend `SUPABASE_ANON_KEY`
- `VITE_API_URL` — Leave as `http://localhost:7171` for local development

### Google Drive Authorization (one-time setup)

Image uploads use Google Drive via OAuth. After setting up your Google Cloud project:

1. Download your OAuth client credentials JSON from Google Cloud Console.
2. Rename it to `credentials.json` and place it in the **project root**.
3. Run the authorization script once:
   ```bash
   node authorize-drive.js
   ```
4. This creates `token.json` in the project root. **Both `credentials.json` and `token.json` are gitignored** — never commit them.

---

## 🚀 Running the App

Install dependencies for both workspaces:

```bash
npm run install:all
```

Then run the database migration (first time only):

```bash
npm --prefix back run prisma:migrate
```

Start both dev servers concurrently from the project root:

```bash
npm run dev
```

This starts:
- **Backend**: Express + Nodemon → `http://localhost:7171`
- **Frontend**: Vite → `http://localhost:5173`

Output logs are color-coded: `[BACKEND]` and `[FRONTEND]`. Press `Ctrl + C` to stop both.

---

## 🛠 Available Scripts

From the project root:

| Command | Description |
|---|---|
| `npm run dev` | Run backend and frontend concurrently |
| `npm run dev:back` | Run only the backend |
| `npm run dev:front` | Run only the frontend |
| `npm run build:front` | Build the frontend for production |
| `npm run install:all` | Install dependencies for both `back` and `front` |

From `back/`:

| Command | Description |
|---|---|
| `npm run prisma:generate` | Regenerate the Prisma client |
| `npm run prisma:migrate` | Run pending migrations |
| `npm run prisma:push` | Push schema changes (dev only) |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:seed` | Seed the database |
| `npm test` | Run Jest tests |

---

## 🔒 Security Notes

- **Never commit** `.env`, `credentials.json`, or `token.json` — they are gitignored.
- The `back/prisma/client/` directory is generated automatically by `prisma generate` — it is gitignored and should not be committed.
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses all Row Level Security policies. Keep it server-side only.
