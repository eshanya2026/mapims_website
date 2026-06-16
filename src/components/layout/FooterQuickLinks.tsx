"use client";

import Link from "next/link";
import BookAppointmentLink from "@/components/layout/BookAppointmentLink";
import { footerQuickLinks, type FooterQuickLink } from "@/data/quick-links";

const linkClassName =
  "text-sm text-slate-400 hover:text-white transition-colors";

const quickLinkSplitIndex = 5;

function QuickLinkItem({ link }: { link: FooterQuickLink }) {
  if (link.appointment) {
    return (
      <BookAppointmentLink className={linkClassName}>
        {link.label}
      </BookAppointmentLink>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkClassName}>
      {link.label}
    </Link>
  );
}

function QuickLinkList({ links }: { links: FooterQuickLink[] }) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <QuickLinkItem link={link} />
        </li>
      ))}
    </ul>
  );
}

export default function FooterQuickLinks() {
  const firstColumn = footerQuickLinks.slice(0, quickLinkSplitIndex);
  const secondColumn = footerQuickLinks.slice(quickLinkSplitIndex);

  return (
    <div className="flex gap-8 sm:gap-10">
      <div className="min-w-0 flex-1">
        <QuickLinkList links={firstColumn} />
      </div>
      <div className="min-w-0 flex-1">
        <QuickLinkList links={secondColumn} />
      </div>
    </div>
  );
}
