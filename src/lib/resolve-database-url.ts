import { copyFileSync, existsSync, mkdirSync, statSync } from "fs";
import path from "path";

const TMP_DB_DIR = path.join("/tmp", "mapims");
const TMP_DB_PATH = path.join(TMP_DB_DIR, "dev.db");

function findProjectRoot(): string {
  let dir = process.cwd();

  for (let i = 0; i < 6; i++) {
    if (existsSync(path.join(dir, "prisma", "schema.prisma"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return process.cwd();
}

function findSourceDatabase(root: string): string | null {
  const candidates = [
    path.join(root, "prisma", "dev.db"),
    path.join(root, ".netlify", "prisma", "dev.db"),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function shouldRefreshTmpCopy(source: string, tmp: string) {
  if (!existsSync(tmp)) return true;
  try {
    return statSync(source).mtimeMs > statSync(tmp).mtimeMs;
  } catch {
    return true;
  }
}

/**
 * SQLite on NTFS / read-only mounts (common on external drives) cannot write
 * WAL/journal files. Copy the database to /tmp for a writable runtime copy.
 */
function getWritableSqliteUrl(sourceDb: string): string {
  mkdirSync(TMP_DB_DIR, { recursive: true });

  if (shouldRefreshTmpCopy(sourceDb, TMP_DB_PATH)) {
    copyFileSync(sourceDb, TMP_DB_PATH);
  }

  return `file:${TMP_DB_PATH}`;
}

/**
 * Resolves SQLite to a writable absolute path.
 * Source of truth: prisma/dev.db in the project root.
 */
export function resolveDatabaseUrl(): string {
  const configured = process.env.DATABASE_URL;

  if (configured && !configured.startsWith("file:")) {
    return configured;
  }

  const root = findProjectRoot();
  const sourceDb = findSourceDatabase(root) ?? path.join(root, "prisma", "dev.db");

  // Never use bundled/read-only copies (.next, etc.) — always copy to /tmp
  if (existsSync(sourceDb)) {
    return getWritableSqliteUrl(sourceDb);
  }

  // Fresh project — create empty db path in /tmp (db:push seeds prisma/dev.db)
  mkdirSync(TMP_DB_DIR, { recursive: true });
  return `file:${TMP_DB_PATH}`;
}
