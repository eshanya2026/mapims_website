"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import BookAppointmentLink from "@/components/layout/BookAppointmentLink";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { departments } from "@/data/departments";
import { internationalNavGroups } from "@/data/international-patient-care";
import { blogSections } from "@/data/blog-posts";
import { servicesPath } from "@/data/hospital-services";
import { procedureServicesSidebar } from "@/data/procedure-services";

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
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

type NavDropdownGroup = {
  title: string;
  items: NavLinkItem[];
};

const departmentDropdownItems: NavDropdownItem[] = [
  { name: "All Specialities", href: "/departments", highlight: true },
  ...departments.map((dept) => ({
    name: dept.name,
    href: `/departments/${dept.slug}`,
  })),
];

const blogDropdownItems: NavDropdownItem[] = blogSections.map((section) => ({
  name: section.label,
  href: section.href,
}));

const servicesDropdownItems: NavDropdownItem[] = [
  { name: "All Services", href: servicesPath, highlight: true },
  ...procedureServicesSidebar.map((item) => ({
    name: item.label,
    href: item.href,
  })),
];

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
    <div className="rounded-md border border-slate-100 overflow-hidden">
      <div className="flex items-center">
        <Link
          href={href}
          className="flex-1 px-4 py-3 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <button
          type="button"
          className="px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-slate-50 border-l border-slate-100"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Toggle ${label} menu`}
        >
          <ChevronDown className={cn("w-5 h-5 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="bg-slate-50 border-t border-slate-100 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.href + item.name}
              href={item.href}
              className={cn(
                "block px-6 py-2.5 text-sm transition-colors",
                item.highlight
                  ? "font-semibold text-red-600"
                  : "text-slate-600 hover:text-red-600"
              )}
              onClick={onNavigate}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
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
    <div className="rounded-md border border-slate-100 overflow-hidden">
      <div className="flex items-center">
        <Link
          href={href}
          className="flex-1 px-4 py-3 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <button
          type="button"
          className="px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-slate-50 border-l border-slate-100"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Toggle ${label} menu`}
        >
          <ChevronDown className={cn("w-5 h-5 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="bg-slate-50 border-t border-slate-100 max-h-72 overflow-y-auto">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-red-600">
                {group.title}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href + item.name}
                  href={item.href}
                  className="block px-8 py-2.5 text-sm text-slate-600 hover:text-red-600"
                  onClick={onNavigate}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 shrink-0 min-w-0">
            <span className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
              <img
                src="/images/adhiparasakthi-hospitals-emblem.png"
                alt="Adhiparasakthi Hospitals emblem"
                className="h-11 w-auto max-h-12 max-w-[2.75rem] object-contain object-center shrink-0 sm:h-12 sm:max-w-[3.25rem]"
              />
              <span className="text-sm sm:text-lg font-bold leading-tight text-slate-900 whitespace-nowrap">
                Adhiparasakthi Hospital
              </span>
            </span>
            <img
              src="/images/nabh-nabl-certifications.png"
              alt="NABH and NABL certified"
              className="h-9 sm:h-11 md:h-12 w-auto max-w-[100px] sm:max-w-[130px] object-contain shrink-0 border-l border-slate-200 pl-2 sm:pl-3 ml-0.5"
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
              label="Specialities"
              href="/departments"
              items={departmentDropdownItems}
              wide
            />

            <NavDropdown
              label="Services"
              href={servicesPath}
              items={servicesDropdownItems}
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
            <BookAppointmentLink
              className={cn(
                buttonVariants(),
                "h-9 rounded-full bg-red-600 px-6 text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5"
              )}
            >
              Book Appointment
            </BookAppointmentLink>
          </div>

          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg py-4 px-4 flex flex-col space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link
            href="/"
            className="px-4 py-2 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-md"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-md"
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <MobileNavSection
            label="Specialities"
            href="/departments"
            items={departmentDropdownItems}
            onNavigate={closeMobileMenu}
          />

          <MobileNavSection
            label="Services"
            href={servicesPath}
            items={servicesDropdownItems}
            onNavigate={closeMobileMenu}
          />

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

          <Link
            href="/careers"
            className="px-4 py-2 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-md"
            onClick={closeMobileMenu}
          >
            Careers
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-base font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-md"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <div className="pt-4 border-t flex flex-col space-y-4">
            <BookAppointmentLink
              className={cn(
                buttonVariants(),
                "h-10 w-full justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
              )}
              onNavigate={closeMobileMenu}
            >
              Book Appointment
            </BookAppointmentLink>
          </div>
        </div>
      )}
    </header>
  );
}
