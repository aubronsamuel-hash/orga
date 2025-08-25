# Frontend Orga.com

Vite + React + TS + Tailwind.
Page /health qui ping le backend (VITE_API_URL) et affiche le JSON.

## Prerequis
- Node 20+
- Backend lance sur http://localhost:8000 (ou config via .env.local)

## Commandes
- pnpm install (ou npm install)
- pnpm dev (ou npm run dev)
- pnpm typecheck
- pnpm lint
- pnpm test
- pnpm build
- pnpm audit

## Config env
- Creer frontend/.env.local (non commite):
  VITE_API_URL=http://localhost:8000/api/v1
