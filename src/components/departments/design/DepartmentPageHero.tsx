"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Calendar } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import DepartmentHeroBadge from "@/components/departments/DepartmentHeroBadge";

type DepartmentPageHeroProps = {
  breadcrumbLabel: string;
  badge: string;
  title: React.ReactNode;
  tagline: string;
  imageSrc: string;
  imageClassName?: string;
  overlayClassName?: string;
};

export default function DepartmentPageHero({
  breadcrumbLabel,
  badge,
  title,
  tagline,
  imageSrc,
  imageClassName,
  overlayClassName = "bg-gradient-to-r from-slate-950/98 via-slate-900/94 via-42% to-slate-900/20",
}: DepartmentPageHeroProps) {
  return (
    <section className="relative flex min-h-[58vh] items-center overflow-hidden md:min-h-[62vh]">
      <HeroBackground
        imageSrc={imageSrc}
        imageClassName={imageClassName}
        overlayClassName={overlayClassName}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative z-20 mx-auto section-padding px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/65">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/departments"
              className="transition-colors hover:text-white"
            >
              Departments
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">{breadcrumbLabel}</span>
          </nav>

          <DepartmentHeroBadge>{badge}</DepartmentHeroBadge>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <div className="mt-5 h-1 w-16 rounded-full bg-red-500" aria-hidden />

          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
            {tagline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/#book-appointment"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-red-600 px-8 font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5 hover:bg-red-700"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
            <a
              href="tel:+919499059966"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/18"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-slate-50 to-transparent md:h-24"
        aria-hidden
      />
    </section>
  );
}
