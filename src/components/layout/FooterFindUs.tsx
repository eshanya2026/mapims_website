"use client";

import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import FooterMap from "@/components/layout/FooterMap";
import { internationalDesk } from "@/data/international-patients";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
      {children}
      <span className="mt-2 block h-0.5 w-10 rounded-full bg-red-600" />
    </h3>
  );
}

function showFooterMap(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/international" ||
    pathname.startsWith("/international/")
  );
}

/** Google Maps block in the site footer — homepage and international patient pages. */
export default function FooterFindUs() {
  const pathname = usePathname();

  if (!showFooterMap(pathname)) {
    return null;
  }

  const isInternational = pathname.startsWith("/international");

  return (
    <div className="mt-12 border-t border-slate-800 pt-10">
      <FooterHeading>
        {isInternational ? "Hospital Location" : "Find us on Google Maps"}
      </FooterHeading>
      {isInternational ? (
        <p className="-mt-2 mb-4 flex max-w-2xl gap-2 text-sm leading-relaxed text-slate-400">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden />
          {internationalDesk.address}
        </p>
      ) : null}
      <FooterMap variant="dark" size="compact" />
    </div>
  );
}
