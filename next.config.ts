import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Allow phone/tablet on your LAN to load dev assets (use Network URL from `npm run dev`)
  allowedDevOrigins: ["192.168.101.45"],
  turbopack: {
    root: appRoot,
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
