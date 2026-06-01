"use client";

import { usePathname } from "next/navigation";
import FooterMap from "@/components/layout/FooterMap";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
      {children}
      <span className="mt-2 block h-0.5 w-10 rounded-full bg-red-600" />
    </h3>
  );
}

/** Google Maps block in the site footer — homepage only. */
export default function FooterFindUs() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="mt-12 border-t border-slate-800 pt-10">
      <FooterHeading>Find us on Google Maps</FooterHeading>
      <FooterMap variant="dark" size="compact" />
    </div>
  );
}
