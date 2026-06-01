"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Stethoscope, Calendar, Phone } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";

const stats = [
  { value: "11+", label: "Clinical services" },
  { value: "24/7", label: "Emergency care" },
  { value: "NABH", label: "Accredited hospital" },
];

export default function ServicesHero() {
  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden md:min-h-[58vh]">
      <HeroBackground
        imageSrc="/images/hospital-casualty-emergency.png"
        imageClassName="object-cover object-center"
        overlayClassName="bg-gradient-to-r from-slate-950/95 via-slate-900/80 via-55% to-slate-900/35"
      />

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full overflow-hidden opacity-20">
        <svg
          viewBox="0 0 1000 100"
          className="h-full w-full stroke-red-600 stroke-2 fill-none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 L200,50 L230,20 L260,80 L290,50 L1000,50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="page-container relative z-20 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="font-medium text-white">Services</span>
          </nav>

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/20 px-4 py-1.5 text-sm font-semibold text-red-400 backdrop-blur-md">
            <Stethoscope className="h-4 w-4" />
            Clinical &amp; Support Services
          </span>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Hospital <span className="text-red-500">Services</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Emergency care, surgery, diagnostics, and specialty programmes — all
            under one roof at Melmaruvathur.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#book-appointment"
              className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-8 font-medium text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
            <a
              href="tel:18005990999"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Phone className="mr-2 h-5 w-5" />
              1800 599 0999
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-3 gap-3 sm:mt-12 sm:max-w-xl sm:gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur-md sm:px-4 sm:py-4"
            >
              <p className="text-lg font-bold text-white sm:text-xl">{stat.value}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
