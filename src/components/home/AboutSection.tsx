"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const Counter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col">
      <span className="mb-1 text-2xl font-bold text-red-600 sm:text-3xl md:text-4xl">
        {count}{suffix}
      </span>
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default function AboutSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="page-container">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:gap-16">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full pb-6 sm:pb-8 lg:w-1/2 lg:pb-10"
          >
            {/* Decorative frame background */}
            <div
              className="absolute -top-3 -left-3 w-[88%] h-[88%] rounded-[2rem] bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-600/25"
              aria-hidden
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/80 aspect-[4/3] lg:aspect-[16/10] border-[5px] border-white">
              <img
                src="/images/hospital-casualty-emergency.png"
                alt="Adhiparasakthi Hospital Casualty and Emergency Care"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/40">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  24/7 Emergency
                </span>
              </div>
            </div>

            {/* Floating certification badges */}
            <div className="absolute -bottom-5 left-6 sm:left-8 z-10 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg border border-slate-100">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0" />
                <span className="text-sm font-bold text-slate-800">NABH Certified</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg border border-slate-100">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0" />
                <span className="text-sm font-bold text-slate-800">NABL Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">About Our Hospital</span>
            </div>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-900 sm:mb-6 sm:text-4xl md:text-5xl">
              Welcome to <span className="text-red-600">Adhiparasakthi</span> Hospital
            </h2>
            <p className="text-base text-slate-600 mb-4 leading-relaxed">
              <strong className="text-slate-800">We started in 1986.</strong> Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research (MAPIMS) was established in 2008. The hospital — evolved as Adhiparasakthi Hospitals by His Holiness Padmashri Bangaru Adigalar and run by non-profit ACMEC Trust — is NABH certified, with 1000 beds across 5 floors.
            </p>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Nestled in sylvan settings, we have grown from primary care into a leading acute tertiary hospital — offering primary, secondary, and tertiary care, critical care, and inpatient & day-patient services across medical and surgical disciplines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
              {[
                "Hospital since 1986 · MAPIMS since 2008",
                "NABH certified · 1000-bed tertiary care",
                "5-floor modern facility",
                "Run by non-profit ACMEC Trust",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:mb-10 sm:gap-6 sm:p-6 md:grid-cols-4">
              <Counter end={1000} label="Beds" suffix="+" />
              <Counter end={100} label="Doctors" suffix="+" />
              <Counter end={5} label="Floors" />
              <Counter end={40} label="Years of Service" suffix="+" />
            </div>

            <Button className="bg-red-600 hover:bg-red-600/90 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-red-600/20 group">
              Read More About Us
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
