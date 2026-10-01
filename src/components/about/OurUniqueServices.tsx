"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Baby,
  Bone,
  Activity,
  Droplets,
  ShieldPlus,
} from "lucide-react";

const uniqueServices = [
  {
    id: "organ-transplant",
    title: "Organ Transplant",
    icon: HeartPulse,
    accent: "from-red-500 to-rose-600",
  },
  {
    id: "fertility-clinic",
    title: "Fertility Clinic (Kriyasakthi)",
    icon: Baby,
    accent: "from-rose-500 to-pink-600",
  },
  {
    id: "joint-replacement",
    title: "Joint Replacement",
    icon: Bone,
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "spine-surgeries",
    title: "Spine Surgeries",
    icon: Activity,
    accent: "from-blue-600 to-indigo-600",
  },
  {
    id: "dialysis-services",
    title: "24/7 Dialysis Services",
    icon: Droplets,
    accent: "from-cyan-600 to-teal-600",
  },
  {
    id: "orthoscopic-sports-medicine",
    title: "Orthoscopic and Sports Medicine",
    icon: ShieldPlus,
    accent: "from-emerald-600 to-green-600",
  },
];

export default function OurUniqueServices() {
  return (
    <section
      id="unique-services"
      className="section-padding bg-slate-50 relative overflow-hidden scroll-mt-28"
    >
      {/* Decorative backdrop gradients */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="page-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-0.5 bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-xs md:text-sm">
              Centers of Excellence
            </span>
            <div className="w-10 h-0.5 bg-red-600" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Our <span className="text-red-600">Unique Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {uniqueServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg hover:shadow-slate-200/50 overflow-hidden">
                  {/* Sleek top accent line on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-200 transition-colors group-hover:text-red-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom Content: Name */}
                  <div className="mt-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600 leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
