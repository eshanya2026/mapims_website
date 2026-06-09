"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";

export default function CareersHero({ jobCount }: { jobCount: number }) {
  return (
    <section className="relative flex min-h-[42vh] items-center overflow-hidden sm:min-h-[48vh] md:min-h-[52vh]">
      <HeroBackground
        imageSrc="/images/mapims-about-campus.png"
        imageClassName="object-cover object-center"
        overlayClassName="bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/55"
      />

      <div className="container relative z-20 mx-auto px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white/70 sm:mb-6 sm:gap-2 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-white">Careers</span>
          </nav>

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/20 px-3 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md sm:mb-6 sm:px-4 sm:text-sm">
            <Briefcase className="h-4 w-4" />
            Join Our Team
          </span>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Careers at <span className="text-red-500">MAPIMS</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Build a meaningful career in healthcare at Melmaruvathur. We welcome compassionate
            professionals who share our commitment to ethical, patient-centred care.
          </p>

          {jobCount > 0 ? (
            <p className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {jobCount} open {jobCount === 1 ? "position" : "positions"} available
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
