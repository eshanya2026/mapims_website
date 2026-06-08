# Hospital CMS Setup

This project includes a custom admin CMS at `/admin` for managing hospital news, events, health insights, and career openings.

## Prerequisites

- Node.js 20+
- npm

## First-time setup

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Edit `.env` and set:

- `DATABASE_URL` — SQLite path (default: `file:./prisma/dev.db`)
- `AUTH_SECRET` — long random string for signing admin sessions
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials used only by the seed script

3. Install dependencies and initialize the database:

```bash
npm install
npx prisma generate
npm run db:setup
```

This project uses Prisma 7 with SQLite via `@prisma/adapter-better-sqlite3`. Connection settings live in `prisma.config.ts` and `.env`.

`db:setup` runs `prisma db push` and seeds the database with:

- A default admin account (from `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- Existing health insights articles from the static blog data

4. Start the development server:

```bash
npm run dev
```

`npm run dev` runs `prisma generate` automatically before starting Next.js. If you see `Cannot find module '.prisma/client/default'`, stop the dev server, run `npx prisma generate`, delete `.next`, and start again.

The site runs on [http://localhost:3001](http://localhost:3001).

## Admin access

- Login: [http://localhost:3001/admin/login](http://localhost:3001/admin/login)
- Dashboard: [http://localhost:3001/admin](http://localhost:3001/admin)

**Change the default admin password after first login** by updating `ADMIN_PASSWORD` and re-running the seed, or by adding a password-change flow later.

## What admins can manage

| Content type | Public URL |
|--------------|------------|
| Hospital News | `/blog/hospital-news` |
| Hospital Events | `/blog/hospital-events` |
| Health Insights | `/blog/health-insights` |
| Career openings | `/careers` |

Uploaded images are stored in `public/uploads/`.

## Production notes

- **SQLite** works for a single VPS deployment.
- For **Vercel** or serverless hosting, switch `DATABASE_URL` to PostgreSQL (Neon, Supabase, etc.) and use cloud storage for uploads instead of the local `public/uploads/` folder.
- Set a strong `AUTH_SECRET` in production.

## Useful commands

```bash
npm run db:push   # Apply schema changes
npm run db:seed   # Re-seed admin + default posts
npm run build     # Production build
```
