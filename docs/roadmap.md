# ROADMAP Orga.com (source de verite)

VISION
- Orga.com: gestion missions/plannings, equipes tech, notifications, exports.
- Priorite: qualite, securite, Windows-first, CI verte.

## Jalon 0 - Bootstrap
- Scaffolding dossiers, docs, scripts stubs, .env.example, .gitignore.
- CI minimale en place (lint + tests a vide).

## Jalon 1 - Backend base
- FastAPI squelette /api/v1/health, config env, logs JSON (request_id).
- Tests pytest (health OK/KO), ruff, mypy. Alembic init. pip-audit.

## Jalon 2 - Frontend base
- Vite + React + TS, page /health (ping backend).
- Lint, typecheck stricts. npm audit.
- UI placeholder (tailwind, shadcn).

## Jalon 3 - Authentification v1
- JWT, refresh token, password hashing (bcrypt).
- CRUD utilisateurs. Rate limit de base.
- Tests auth (login ok/ko, refresh ok/ko).

## Jalon 4 - Missions v1
- Modeles mission, role, site. CRUD REST.
- Pagination par defaut (limit/offset, total).
- Tests (create ok/ko, list, pagination).

## Jalon 5 - Disponibilites et Planning
- Calendrier utilisateur. CRUD disponibilites.
- Detection conflits de planning.
- Export ICS (par utilisateur).
- Tests (chevauchements, exports).

## Jalon 6 - Notifications
- Email SMTP (demo avec Mailhog) et Telegram bot.
- Mode debug local. Tests unitaires mocks.
- Audit log des envois.

## Jalon 7 - Comptabilite simplifiee
- Modeles cachet, facture.
- Exports CSV/PDF. ICS pour rappel de paiement.
- Tests (export ok, format ko).

## Jalon 8 - Observabilite
- Logs JSON partout (request_id).
- Metrics Prometheus (latence, requetes).
- Dashboard Grafana basique.
- Smoke tests observabilite.

## Jalon 9 - Performance et scalabilite
- k6 smoke, objectif 1000 VUs p95 < 500ms.
- Pgbouncer profil prod.
- SQLAlchemy pool config (pool_size=20, max_overflow=40).

## Jalon 10 - Livraison et gouvernance
- CHANGELOG, RELEASE.md.
- PR template, CODEOWNERS, CONTRIBUTING.md.
- Audit deps (pip-audit, npm audit) en CI bloquant.
- chore: deps monthly.

Regles:
- PR <= 300 lignes (hors lockfiles). Conventional Commits.
- TZ UTC. Pas de secrets en repo.
- Source de verite: ce document. Si conflit: proposer patch dans PR.

