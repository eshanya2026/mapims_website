"use client";

import { Phone, Ambulance } from "lucide-react";

export default function EmergencyCTA() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-red-600 z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-xl animate-pulse">
              <Phone className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Need Immediate Medical Help?
              </h2>
              <p className="text-white/80 text-lg">
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
