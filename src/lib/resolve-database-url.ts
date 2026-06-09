import { copyFileSync, existsSync, statSync } from "fs";
import os from "os";
import path from "path";

function isServerlessHost() {
  return Boolean(
    process.env.NETLIFY ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.VERCEL
  );
}

function findSourceDatabase(): string | null {
  const relative =
    process.env.DATABASE_URL?.replace(/^file:\.?\//, "").replace(/^file:/, "") ??
    "prisma/dev.db";

  const candidates = [
    path.resolve(process.cwd(), relative),
    path.resolve(process.cwd(), "prisma", "dev.db"),
    path.resolve(process.cwd(), ".netlify", "prisma", "dev.db"),
    path.resolve(process.cwd(), ".next", "prisma", "dev.db"),
    path.resolve(process.cwd(), "..", "prisma", "dev.db"),
    path.resolve(process.cwd(), "..", ".netlify", "prisma", "dev.db"),
  ];

  return [...new Set(candidates)].find((candidate) => existsSync(candidate)) ?? null;
}

function shouldRefreshCopy(source: string, destination: string) {
  try {
    return statSync(source).mtimeMs > statSync(destination).mtimeMs;
  } catch {
    return true;
  }
}

/**
 * Resolves SQLite to an absolute path. On serverless hosts, copies the bundled
 * database to /tmp so better-sqlite3 can open it read-write.
 */
export function resolveDatabaseUrl(): string {
  const configured = process.env.DATABASE_URL;

  if (configured && !configured.startsWith("file:")) {
    return configured;
  }

  const source = findSourceDatabase();
  if (!source) {
    return `file:${path.resolve(process.cwd(), "prisma", "dev.db")}`;
  }

  if (isServerlessHost()) {
    const tmpDb = path.join(os.tmpdir(), "mapims-cms.db");
    try {
      if (!existsSync(tmpDb) || shouldRefreshCopy(source, tmpDb)) {
        copyFileSync(source, tmpDb);
      }
      return `file:${tmpDb}`;
    } catch (error) {
      console.error("[db] Failed to copy SQLite database to tmp:", error);
    }
  }

  return `file:${source}`;
}
