import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { resolveDatabaseUrl } from "@/lib/resolve-database-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaUrl: string | undefined;
};

function createPrismaClient(url: string) {
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function hasExpectedModels(client: PrismaClient) {
  return typeof client.formSubmission?.count === "function";
}

export function getPrismaClient() {
  const url = resolveDatabaseUrl();
  const stale =
    globalForPrisma.prisma &&
    (!hasExpectedModels(globalForPrisma.prisma) || globalForPrisma.prismaUrl !== url);

  if (!globalForPrisma.prisma || stale) {
    void globalForPrisma.prisma?.$disconnect();
    globalForPrisma.prisma = createPrismaClient(url);
    globalForPrisma.prismaUrl = url;
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
