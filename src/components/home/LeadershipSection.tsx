"use client";

import { motion } from "framer-motion";

const leaders = [
  {
    name: "His Holiness Arul Thiru Bangaru Adigalar",
    role: "Founder President",
    subtitle: "Padmashri Awardee · ACMEC Trust",
    image: "/images/bangaru.png",
    objectPosition: "center 20%",
  },
  {
    name: "Thirumathi Lakshmi Bangaru Adigalar",
    role: "President",
    subtitle: "ACMEC Trust",
    image: "/images/lakshmi.png",
    objectPosition: "center top",
  },
  {
    name: "Dr. T. Ramesh, M.D.",
    role: "Medical Director",
    subtitle: "Adhiparasakthi Hospitals",
    image: "/images/dr.ramesh.png",
    objectPosition: "center 15%",
  },
];

export default function LeadershipSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle ambient red background accents */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-red-600/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-red-600/5 blur-3xl"
        aria-hidden
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
              Our Guiding Lights
            </span>
            <div className="w-10 h-[2px] bg-red-600" />
          </div>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl mb-4">
            Visionary <span className="text-red-600">Leadership</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Inspiring compassionate healthcare delivery and selfless service with dedication to human well-being and community health.
          </p>
        </div>

        {/* 3 Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:border-red-100 transition-all duration-300 flex flex-col"
            >
              {/* Portrait Image Container */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-slate-50">
                <img
                  src={leader.image}
                  alt={leader.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: leader.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Leader Info */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 text-center bg-white">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
                  {leader.role}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors">
                  {leader.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {leader.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
