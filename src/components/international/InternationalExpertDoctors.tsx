"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { internationalExperts } from "@/data/international-patients";

export default function InternationalExpertDoctors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, internationalExperts.length - itemsPerView);

  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center md:text-left">
            Talk To Our Expert Now!
          </h2>
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
            {internationalExperts.map((doctor) => (
              <div
                key={doctor.name}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-center"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900">
                      {doctor.name}, {doctor.credentials}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{doctor.specialty}</p>
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
