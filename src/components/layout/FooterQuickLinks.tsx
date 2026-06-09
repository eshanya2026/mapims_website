"use client";

import Link from "next/link";
import BookAppointmentLink from "@/components/layout/BookAppointmentLink";
import { footerQuickLinks } from "@/data/quick-links";

const linkClassName =
  "text-sm text-slate-400 hover:text-white transition-colors";

export default function FooterQuickLinks() {
  return (
    <ul className="space-y-2">
      {footerQuickLinks.map((link) => (
        <li key={link.label}>
          {link.appointment ? (
            <BookAppointmentLink className={linkClassName}>
              {link.label}
            </BookAppointmentLink>
          ) : link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className={linkClassName}>
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
