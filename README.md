# BulSU TradeSpace

BulSU TradeSpace is a campus marketplace application built with an Express/Prisma backend and a React/Vite frontend.

---

## 🚀 Running Frontend & Backend

You can run both dev servers with a single command from the project root:

```bash
npm run dev
```

This starts both services concurrently:
- **Backend**: Express + Nodemon (`http://localhost:7171` or configured `PORT`)
- **Frontend**: Vite (`http://localhost:5173`)

Output logs are color-coded with prefixes: `[BACKEND]` and `[FRONTEND]`. Pressing `Ctrl + C` stops both servers together.

---

## 🛠 Available Scripts

From the project root:
- `npm run dev` – Run backend and frontend concurrently
- `npm run dev:back` – Run only the backend
- `npm run dev:front` – Run only the frontend
- `npm run build:front` – Build the frontend for production
- `npm run install:all` – Install dependencies for both `back` and `front`
