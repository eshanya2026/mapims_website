"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type ScrollToTopLinkProps = ComponentProps<typeof Link>;

function linkPathname(href: ScrollToTopLinkProps["href"]) {
  if (typeof href === "string") {
    return href.split("#")[0] || "/";
  }
  return href.pathname ?? "/";
}

export default function ScrollToTopLink({
  href,
  onClick,
  ...props
}: ScrollToTopLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (pathname === linkPathname(href)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
