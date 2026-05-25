"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";

import HeroBackground from "@/components/layout/HeroBackground";

export default function AboutHero() {
  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center overflow-hidden">
      <HeroBackground
        imageSrc="/images/mapims-about-campus.png"
        imageClassName="object-cover object-[center_35%]"
        overlayClassName="bg-gradient-to-r from-slate-900/92 via-slate-900/75 to-slate-900/45"
      />

      <div className="absolute bottom-0 left-0 w-full h-24 z-10 opacity-20 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1000 100" className="w-full h-full stroke-red-600 stroke-2 fill-none" preserveAspectRatio="none">
          <motion.path
            d="M0,50 L200,50 L230,20 L260,80 L290,50 L1000,50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 z-20 relative py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">About Us</span>
          </nav>

          <span className="inline-block py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            Serving Since 1986
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            About <span className="text-red-500">Adhiparasakthi</span> Hospital
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
            A NABH-certified, 1000-bed tertiary care multispecialty hospital dedicated to compassionate healthcare, medical excellence, and community service at Melmaruvathur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#about"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 font-medium shadow-lg shadow-red-600/30 transition-all"
            >
              Explore Our Story
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/#book-appointment"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-8 h-12 font-medium backdrop-blur-md transition-all"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book Appointment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
