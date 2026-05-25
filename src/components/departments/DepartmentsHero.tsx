"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import HeroBackground from "@/components/layout/HeroBackground";

export default function DepartmentsHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden">
      <HeroBackground
        imageSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
        overlayClassName="bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-slate-900/40"
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

      <div className="container mx-auto px-4 z-20 relative py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Departments</span>
          </nav>

          <span className="inline-block py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            16 Super-Specialty Departments
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            All Departments
          </h1>
          <p className="text-lg text-slate-300 mt-4 max-w-2xl">
            Explore our centers of excellence staffed by senior specialists and dedicated nursing teams.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
