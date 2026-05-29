"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Mail } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import { cn } from "@/lib/utils";

const heroButtonBase =
  "inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-px";

export default function ContactHero() {
  return (
    <section className="relative min-h-[52vh] md:min-h-[60vh] flex items-center overflow-hidden">
      <HeroBackground
        imageSrc="/images/contact-hero.png"
        imageClassName="object-cover object-[right_center] sm:object-[65%_center]"
        overlayClassName="bg-gradient-to-r from-slate-950/92 via-slate-900/70 via-[40%] to-transparent"
      />

      <div className="absolute bottom-0 left-0 w-full h-24 z-10 opacity-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1000 100"
          className="w-full h-full stroke-red-600 stroke-2 fill-none"
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

      <div className="page-container relative z-20 py-10 sm:py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Contact</span>
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            <Phone className="w-4 h-4" />
            Reach our team
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Contact <span className="text-red-500">Adhiparasakthi</span> Hospital
          </h1>
          <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Call, email, or send a message — we’ll help you with appointments,
            international care, reports, and general enquiries.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="tel:18005990999"
              className={cn(
                heroButtonBase,
                "bg-red-600 text-white shadow-lg shadow-red-700/30 hover:-translate-y-0.5 hover:bg-red-700 focus-visible:ring-red-500/70"
              )}
            >
              <Phone className="mr-2 w-5 h-5" />
              1800 599 0999
            </a>
            <a
              href="mailto:contact@mapims.edu.in"
              className={cn(
                heroButtonBase,
                "border border-white/30 bg-white/12 text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-white/60"
              )}
            >
              <Mail className="mr-2 w-5 h-5" />
              contact@mapims.edu.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

