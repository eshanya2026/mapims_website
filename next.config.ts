import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keep Prisma and native SQLite out of the Turbopack bundle (fixes
  // "Cannot find module '.prisma/client/default'" in dev).
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
  ],
  async redirects() {
    return [
      {
        source: "/international/care/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
    ];
  },
  // Allow phone/tablet on your LAN to load dev assets (use Network URL from `npm run dev`)
  allowedDevOrigins: ["192.168.101.45"],
  turbopack: {
    root: appRoot,
    resolveAlias: {
      ".prisma/client/default": path.join(
        appRoot,
        "node_modules/.prisma/client/default.js"
      ),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
