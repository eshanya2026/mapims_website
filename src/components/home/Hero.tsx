"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Stethoscope, Users, Ambulance, Microscope } from "lucide-react";

import HeroBackground from "@/components/layout/HeroBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-8 sm:flex sm:min-h-[90vh] sm:items-center sm:py-12 lg:py-16">
      <HeroBackground
        imageSrc="/images/mapims-hospital-campus.png"
        overlayClassName="bg-gradient-to-r from-slate-900/92 via-slate-800/80 to-slate-900/25"
        imageClassName="object-[center_42%] sm:object-[center_45%]"
      />

      {/* Animated Heartbeat Line */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 opacity-20 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1000 100" className="w-full h-full stroke-red-600 stroke-2 fill-none" preserveAspectRatio="none">
          <motion.path
            d="M0,50 L200,50 L230,20 L260,80 L290,50 L1000,50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full border border-red-600/30 bg-red-600/20 px-3 py-1 text-xs font-semibold text-red-400 backdrop-blur-md sm:mb-6 sm:text-sm">
              World-Class Healthcare
            </span>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Healing Lives, <br />
              <span className="text-red-600">Building Trust</span>
            </h1>
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:mb-8 sm:text-lg md:text-xl">
              Compassionate Care. Exceptional Outcomes
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="#book-appointment"
                className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-base font-medium text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 sm:h-14 sm:px-8 sm:text-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              <Link
                href="/departments"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 sm:h-14 sm:px-8 sm:text-lg"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Explore Specialities
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-4 lg:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex w-full items-center gap-3 rounded-xl border border-white/20 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl sm:w-auto sm:min-w-[240px] sm:gap-4 sm:rounded-2xl sm:p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:h-12 sm:w-12">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Expert Specialists
              </p>
              <p className="text-sm font-bold text-slate-900 sm:text-lg">
                Multispeciality Care
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex w-full items-center gap-3 rounded-xl border border-white/20 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl sm:w-auto sm:min-w-[240px] sm:gap-4 sm:rounded-2xl sm:p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-12 sm:w-12">
              <Ambulance className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                24/7 Emergency Care
              </p>
              <p className="text-sm font-bold text-slate-900 sm:text-lg">
                Always Ready
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex w-full items-center gap-3 rounded-xl border border-white/20 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl sm:w-auto sm:min-w-[240px] sm:gap-4 sm:rounded-2xl sm:p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 sm:h-12 sm:w-12">
              <Microscope className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Advanced Diagnostics
              </p>
              <p className="text-sm font-bold text-slate-900 sm:text-lg">
                Accurate & Fast Results
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
