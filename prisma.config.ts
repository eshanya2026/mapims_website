import "dotenv/config";
import { defineConfig } from "prisma/config";

// Fallback URL lets `prisma generate` succeed in CI (e.g. Netlify) when DATABASE_URL
// is not set yet. Runtime still uses DATABASE_URL from the environment.
const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
