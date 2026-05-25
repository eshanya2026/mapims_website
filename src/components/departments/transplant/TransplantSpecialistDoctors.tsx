"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  transplantSpecialistCount,
  transplantSpecialists,
} from "@/data/transplant-department";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className="w-12 h-0.5 bg-red-600" />
      <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
        {children}
      </span>
      <div className="w-12 h-0.5 bg-red-600" />
    </div>
  );
}

export default function TransplantSpecialistDoctors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, transplantSpecialists.length - itemsPerView);

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Specialist <span className="text-red-600">Doctors</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl">
              {transplantSpecialistCount} specialist profiles — including our
              lead COO and transplant team
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              aria-label="Previous doctors"
              className="w-11 h-11 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors disabled:opacity-35 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => Math.min(maxIndex, p + 1))}
              disabled={currentIndex >= maxIndex}
              aria-label="Next doctors"
              className="w-11 h-11 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors disabled:opacity-35 disabled:pointer-events-none"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-2 py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {transplantSpecialists.map((doctor) => (
              <div
                key={doctor.name}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-center h-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900">{doctor.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-snug">
                      {doctor.role}
                    </p>
                    <Link
                      href="/doctors"
                      className="inline-block mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
