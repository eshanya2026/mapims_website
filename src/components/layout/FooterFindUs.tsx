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

export default function FooterFindUs() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <div className="mt-12 pt-10 border-t border-slate-800">
      <FooterHeading>Find us</FooterHeading>
      <p className="text-sm text-slate-500 mb-4 max-w-2xl">
        Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram District, Tamil Nadu
        603319
      </p>
      <FooterMap />
    </div>
  );
}
