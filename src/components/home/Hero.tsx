"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Activity, Users, Clock } from "lucide-react";

import HeroBackground from "@/components/layout/HeroBackground";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50 py-12 lg:py-16">
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
            <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 text-red-600 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
              World-Class Healthcare
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Advanced Healthcare <br />
              <span className="text-red-600">With Compassion</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
              Providing exceptional medical care with state-of-the-art technology and a team of dedicated experts committed to your well-being.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#book-appointment"
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-14 text-lg font-medium shadow-lg shadow-red-600/30 transition-all"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Appointment
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full px-8 h-14 text-lg backdrop-blur-md">
                <Search className="mr-2 w-5 h-5" />
                Find a Doctor
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Status Cards */}
        <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 w-full sm:w-auto sm:min-w-[240px]"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Live OP Status</p>
              <p className="text-lg font-bold text-slate-900">Accepting Patients</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 w-full sm:w-auto sm:min-w-[240px]"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Available Doctors</p>
              <p className="text-lg font-bold text-slate-900">45+ Today</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 w-full sm:w-auto sm:min-w-[240px]"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Avg Waiting Time</p>
              <p className="text-lg font-bold text-slate-900">&lt; 15 Mins</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
