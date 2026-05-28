"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { scrollToBookAppointment } from "@/lib/scroll-to-book-appointment";

type BookAppointmentLinkProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export default function BookAppointmentLink({
  href = "/#book-appointment",
  className,
  children,
  onNavigate,
}: BookAppointmentLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          scrollToBookAppointment("smooth");
        }
        onNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}
