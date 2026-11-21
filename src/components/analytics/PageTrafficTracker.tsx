"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTrafficTracker() {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);
  const lastTrackedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!pathname) return;

    // Do not track admin panel or internal pages
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const now = Date.now();
    // Debounce exact duplicate triggers within 3 seconds
    if (lastTrackedPathRef.current === pathname && now - lastTrackedTimeRef.current < 3000) {
      return;
    }

    lastTrackedPathRef.current = pathname;
    lastTrackedTimeRef.current = now;

    const payload = JSON.stringify({
      path: pathname,
      referrer: typeof document !== "undefined" ? document.referrer : "",
    });

    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/track", blob);
      } else {
        void fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore background tracking errors
    }
  }, [pathname]);

  return null;
}

