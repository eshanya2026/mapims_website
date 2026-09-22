# Hospitals CMS Setup

This project includes a custom admin CMS at `/admin` for managing hospitals news, events, health insights, and career openings.

## Prerequisites

- Node.js 20+
- npm

## First-time setup

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Edit `.env` and set:

- `MONGODB_URI` — MongoDB Atlas connection string
- `MONGODB_DB_NAME` — database name (default: `mapims-cms`)
- `AUTH_SECRET` — long random string for signing admin sessions
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials used only by the seed script

3. Install dependencies and initialize the database:

```bash
npm install
npm run db:setup
```

This project uses MongoDB Atlas via the official `mongodb` driver. Connection settings live in `.env`.

`db:setup` seeds the database with:

- A default admin account (from `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- Existing health insights articles from the static blog data

4. Start the development server:

```bash
npm run dev
```

The site runs on [http://localhost:1004](http://localhost:1004).

## Reserved Port Allocation

| Component | Port | Description | URL / URI |
|---|---|---|---|
| **Frontend** | `1004` | Next.js Web App / Patient Portal | `http://localhost:1004` |
| **Backend** | `2004` | Reserved for API services / Backend | `http://localhost:2004` |
| **MongoDB** | `3004` | Reserved for local MongoDB instance / container | `mongodb://localhost:3004/mapims-cms` |

## Admin access

- Login: [http://localhost:1004/admin/login](http://localhost:1004/admin/login)
- Dashboard: [http://localhost:1004/admin](http://localhost:1004/admin)

**Change the default admin password after first login** by updating `ADMIN_PASSWORD` and re-running the seed, or by adding a password-change flow later.

## What admins can manage

| Content type | Public URL |
|--------------|------------|
| Hospitals News | `/blog/hospitals-news` |
| Hospitals Events | `/blog/hospitals-events` |
| Health Insights | `/blog/health-insights` |
| Career openings | `/careers` |

Uploaded images are stored in `public/uploads/`.

## Production notes

- **MongoDB Atlas** is used for CMS data (works on Netlify/serverless).
- Use cloud storage for uploads in production instead of the local `public/uploads/` folder.
- Set a strong `AUTH_SECRET` in production.

### Netlify

In **Site settings → Environment variables**, add:

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/mapims-cms` |
| `MONGODB_DB_NAME` | `mapims-cms` |
| `AUTH_SECRET` | long random string |

`netlify.toml` includes default MongoDB and CMS credentials for deploy builds.

## Useful commands

```bash
npm run db:seed   # Re-seed admin + default posts
npm run build     # Production build
```

## Docker Production Setup

### 1. Build & Run with Docker Compose

To build and start the entire stack (MongoDB on `3004`, Web/API on `1004`):

```bash
docker compose up -d --build
```

### 2. Production Hardened Mode

Runs with `restart: always` and elevated log rotation limits:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### 3. Check Status and Logs

```bash
docker compose ps
docker compose logs -f frontend
```

### 4. Database Setup / Seeding

You can seed the database directly from your host machine (since port 3004 is exposed):

```bash
MONGODB_URI="mongodb://localhost:3004/mapims-cms" npm run db:setup
```
