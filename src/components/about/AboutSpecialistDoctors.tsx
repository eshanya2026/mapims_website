"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const doctors = [
  {
    name: "Dr. T. Ramesh",
    designation: "Senior Consultant",
    specialty: "General Medicine",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    name: "Dr. Kapali Neelamekam",
    designation: "Specialist Doctor",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    name: "Dr. Vaseekaran",
    designation: "Consultant Physician",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
  },
  {
    name: "Dr. Mahendra Varman L",
    designation: "Senior Specialist",
    specialty: "Orthopaedics",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
  },
];

export default function AboutSpecialistDoctors() {
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

  const maxIndex = Math.max(0, doctors.length - itemsPerView);

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-0.5 bg-red-600" />
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Our Experts</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Meet Our <span className="text-red-600">Specialists</span>
            </h2>
            <p className="text-slate-500 mt-3 text-lg">
              Experienced doctors dedicated to your health and well-being.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm transition-all disabled:opacity-40"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex((p) => Math.min(maxIndex, p + 1))}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm transition-all disabled:opacity-40"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-2 py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {doctor.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-red-600 text-sm font-medium mb-1">{doctor.specialty}</p>
                    <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{doctor.designation}</p>
                    <a
                      href="/#book-appointment"
                      className="mt-4 inline-flex w-full items-center justify-center h-10 rounded-full bg-slate-900 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                    >
                      Book Consultation
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/doctors"
            className="inline-flex items-center justify-center rounded-full px-10 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5"
          >
            View All Doctors
          </a>
        </div>
      </div>
    </section>
  );
}
