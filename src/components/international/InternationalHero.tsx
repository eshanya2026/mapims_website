"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Plane } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import { internationalHero } from "@/data/international-patients";

export default function InternationalHero() {
  return (
    <section className="relative min-h-[38vh] sm:min-h-[45vh] md:min-h-[55vh] flex items-center overflow-hidden">
      <HeroBackground
        imageSrc={internationalHero.image}
        imageClassName="object-cover object-[center_35%]"
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
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white/70 sm:mb-6 sm:gap-2 sm:text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">International Patients</span>
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            <Plane className="w-4 h-4" />
            International Patient Care
          </span>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Airport To Airport{" "}
            <span className="text-red-500">Service</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-4 sm:text-lg">
            {internationalHero.subtitle}
          </p>
          <Link
            href="/#book-appointment"
            className="inline-flex items-center justify-center mt-8 bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 font-semibold shadow-lg shadow-red-600/30 transition-all"
          >
            <Calendar className="mr-2 w-5 h-5" />
            {internationalHero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
