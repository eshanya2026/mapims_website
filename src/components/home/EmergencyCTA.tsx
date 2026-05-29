"use client";

import { Phone, Ambulance } from "lucide-react";

export default function EmergencyCTA() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-16">
      <div className="absolute inset-0 bg-red-600 z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

      <div className="page-container relative z-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:gap-8 sm:rounded-3xl sm:p-8 md:flex-row md:p-12">
          <div className="flex w-full flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left md:w-auto">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-xl animate-pulse sm:h-20 sm:w-20">
              <Phone className="h-8 w-8 text-red-600 sm:h-10 sm:w-10" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Need Immediate Medical Help?
              </h2>
              <p className="text-base text-white/80 sm:text-lg">
                Our emergency team is available 24/7 to assist you.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
            <a
              href="tel:1066"
              className="bg-white px-8 py-4 rounded-full flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition-shadow min-h-[72px]"
            >
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Emergency Line</span>
              <span className="text-3xl font-black text-red-600">1066</span>
            </a>
            <a
              href="tel:+919499059966"
              className="bg-white px-8 py-4 rounded-full flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-shadow min-h-[72px] sm:min-w-[220px]"
            >
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                <Ambulance className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-red-600 uppercase tracking-wide">Call Ambulance</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
