"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BOOK_APPOINTMENT_ID, scrollToBookAppointment } from "@/lib/scroll-to-book-appointment";
import { scrollToHashWithRetry } from "@/lib/scroll-to-hash";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      if (hash === BOOK_APPOINTMENT_ID) {
        const run = () => scrollToBookAppointment("smooth");
        requestAnimationFrame(run);
        setTimeout(run, 150);
        setTimeout(run, 400);
        return;
      }

      scrollToHashWithRetry(hash);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [pathname]);

  return null;
}
