"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { departments } from "@/data/departments";
import { internationalNavGroups } from "@/data/international-patient-care";
import { blogSections } from "@/data/blog-posts";

type NavLinkItem = {
  name: string;
  href: string;
};

type NavDropdownItem = NavLinkItem & {
  highlight?: boolean;
};

const simpleNavLinks: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Doctors", href: "/doctors" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

type NavDropdownGroup = {
  title: string;
  items: NavLinkItem[];
};

const departmentDropdownItems: NavDropdownItem[] = [
  { name: "All Departments", href: "/departments", highlight: true },
  ...departments.map((dept) => ({
    name: dept.name,
    href: `/departments/${dept.slug}`,
  })),
];

const blogDropdownItems: NavDropdownItem[] = blogSections.map((section) => ({
  name: section.label,
  href: section.href,
}));

function NavDropdown({
  label,
  href,
  items,
  wide,
}: {
  label: string;
  href: string;
  items: NavDropdownItem[];
  wide?: boolean;
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors rounded-md hover:bg-slate-50"
      >
        {label}
        <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
      </Link>

      <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
        <div
          className={cn(
            "bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-y-auto",
            wide
              ? "w-[min(520px,calc(100vw-2rem))] max-h-[420px] grid grid-cols-1 sm:grid-cols-2 gap-x-1"
              : "min-w-[240px]"
          )}
        >
          {items.map((item) => (
            <Link
              key={item.href + item.name}
              href={item.href}
              className={cn(
                "block px-4 py-2.5 text-sm transition-colors",
                item.highlight
                  ? "font-semibold text-red-600 hover:bg-red-50"
                  : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavDropdownGrouped({
  label,
  href,
  groups,
}: {
  label: string;
  href: string;
  groups: NavDropdownGroup[];
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors rounded-md hover:bg-slate-50"
      >
        {label}
        <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
      </Link>

      <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
        <div className="flex bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden max-h-[420px]">
          {groups.map((group, index) => (
            <div
              key={group.title}
              className={cn(
                "py-2",
                index === 0
                  ? "w-[220px] shrink-0 border-r border-slate-100"
                  : "w-[280px] overflow-y-auto"
              )}
            >
              <p className="px-4 py-2 text-sm font-bold text-red-600 border-b border-slate-100 mb-1">
                {group.title}
              </p>
              {group.items.map((item, itemIndex) => (
                <Link
                  key={item.href + item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors text-slate-700 hover:text-red-600 hover:bg-slate-50",
                    itemIndex === 0 &&
                      group.title === "Patient Care" &&
                      "font-semibold text-slate-900"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mobileLinkClass =
  "flex w-full items-center px-4 py-3.5 text-[15px] font-medium text-slate-800 transition-colors hover:bg-slate-50 hover:text-red-600";

const mobileSubLinkClass =
  "block w-full px-4 py-2.5 pl-6 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600";

function MobileNavSection({
  label,
  href,
  items,
  onNavigate,
}: {
  label: string;
  href: string;
  items: NavDropdownItem[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100">
      <div className="flex items-stretch">
        <Link href={href} className={cn(mobileLinkClass, "min-w-0 flex-1")} onClick={onNavigate}>
          {label}
        </Link>
        <button
          type="button"
          className="flex w-12 shrink-0 items-center justify-center border-l border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-red-600"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Expand ${label}`}
        >
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </div>
      {open ? (
        <div className="max-h-56 overflow-y-auto border-t border-slate-100 bg-slate-50/80 py-1">
          {items.map((item) => (
            <Link
              key={item.href + item.name}
              href={item.href}
              className={cn(
                mobileSubLinkClass,
                item.highlight && "font-semibold text-red-600"
              )}
              onClick={onNavigate}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileNavGroupedSection({
  label,
  href,
  groups,
  onNavigate,
}: {
  label: string;
  href: string;
  groups: NavDropdownGroup[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100">
      <div className="flex items-stretch">
        <Link href={href} className={cn(mobileLinkClass, "min-w-0 flex-1")} onClick={onNavigate}>
          {label}
        </Link>
        <button
          type="button"
          className="flex w-12 shrink-0 items-center justify-center border-l border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-red-600"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Expand ${label}`}
        >
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </div>
      {open ? (
        <div className="max-h-72 overflow-y-auto border-t border-slate-100 bg-slate-50/80 py-2">
          {groups.map((group) => (
            <div key={group.title} className="mb-2 last:mb-0">
              <p className="px-4 py-1.5 pl-6 text-[11px] font-bold uppercase tracking-wider text-red-600">
                {group.title}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href + item.name}
                  href={item.href}
                  className={mobileSubLinkClass}
                  onClick={onNavigate}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b"
          : "bg-white"
      )}
    >
      <div className="page-container">
        <div className="flex h-[var(--site-navbar-height)] items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-1.5 pr-1 sm:gap-2.5 sm:pr-2">
            <img
              src="/images/adhiparasakthi-hospitals-emblem.png"
              alt=""
              aria-hidden
              className="h-9 w-auto shrink-0 object-contain sm:h-11 md:h-12"
            />
            <span className="min-w-0 flex-1 text-[10px] font-bold leading-[1.2] text-slate-900 sm:text-sm md:text-base lg:text-lg">
              <span className="block sm:inline">Adhiparasakthi</span>{" "}
              <span className="block sm:inline">Hospital</span>
            </span>
            <img
              src="/images/nabh-nabl-certifications.png"
              alt="NABH and NABL certified"
              className="h-8 w-auto max-w-[56px] shrink-0 border-l border-slate-200 object-contain pl-1.5 sm:h-9 sm:max-w-[80px] sm:pl-2 md:h-11 md:max-w-[120px] lg:max-w-[130px]"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {simpleNavLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors rounded-md hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}

            <NavDropdown
              label="Departments"
              href="/departments"
              items={departmentDropdownItems}
              wide
            />

            {simpleNavLinks.slice(2, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors rounded-md hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}

            <NavDropdownGrouped
              label="International Patients"
              href="/international"
              groups={internationalNavGroups}
            />

            <NavDropdown label="Blog" href="/blog/health-insights" items={blogDropdownItems} />

            {simpleNavLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors rounded-md hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-slate-600 hover:text-red-600 transition-colors rounded-full hover:bg-slate-50">
              <Search className="w-5 h-5" />
            </button>
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 shadow-md shadow-red-600/20 transition-all hover:shadow-lg hover:-translate-y-0.5">
              Book Appointment
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 z-40 bg-slate-900/40 lg:hidden"
            style={{ top: "calc(var(--site-topbar-height) + var(--site-navbar-height))" }}
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />
          <nav
            className="fixed inset-x-0 z-50 flex flex-col overflow-hidden border-b border-slate-200 bg-white shadow-xl lg:hidden"
            style={{
              top: "calc(var(--site-topbar-height) + var(--site-navbar-height))",
              maxHeight:
                "calc(100dvh - var(--site-topbar-height) - var(--site-navbar-height))",
            }}
            aria-label="Mobile navigation"
          >
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <Link href="/" className={cn(mobileLinkClass, "border-b border-slate-100")} onClick={closeMobileMenu}>
                Home
              </Link>
              <Link href="/about" className={cn(mobileLinkClass, "border-b border-slate-100")} onClick={closeMobileMenu}>
                About
              </Link>

              <MobileNavSection
                label="Departments"
                href="/departments"
                items={departmentDropdownItems}
                onNavigate={closeMobileMenu}
              />

              <Link href="/doctors" className={cn(mobileLinkClass, "border-b border-slate-100")} onClick={closeMobileMenu}>
                Doctors
              </Link>

              <MobileNavGroupedSection
                label="International Patients"
                href="/international"
                groups={internationalNavGroups}
                onNavigate={closeMobileMenu}
              />

              <MobileNavSection
                label="Blog"
                href="/blog/health-insights"
                items={blogDropdownItems}
                onNavigate={closeMobileMenu}
              />

              <Link href="/careers" className={cn(mobileLinkClass, "border-b border-slate-100")} onClick={closeMobileMenu}>
                Careers
              </Link>
              <Link href="/contact" className={cn(mobileLinkClass, "border-b border-slate-100")} onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white p-4">
              <Link href="/#book-appointment" onClick={closeMobileMenu} className="block">
                <Button className="h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-700">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
