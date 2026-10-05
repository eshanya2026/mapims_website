"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Baby,
  Bone,
  Activity,
  Droplets,
  ShieldPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const uniqueServices = [
  {
    id: "organ-transplant",
    title: "Organ Transplant",
    icon: HeartPulse,
  },
  {
    id: "fertility-clinic",
    title: "Fertility Clinic (Kriyasakthi)",
    icon: Baby,
  },
  {
    id: "joint-replacement",
    title: "Joint Replacement",
    icon: Bone,
  },
  {
    id: "spine-surgeries",
    title: "Spine Surgeries",
    icon: Activity,
  },
  {
    id: "dialysis-services",
    title: "24/7 Dialysis Services",
    icon: Droplets,
  },
  {
    id: "orthoscopic-sports-medicine",
    title: "Orthoscopic and Sports Medicine",
    icon: ShieldPlus,
  },
];

export default function OurUniqueServices() {
  const [activeTouchId, setActiveTouchId] = useState<string | null>(null);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const leftColumn = uniqueServices.slice(0, 3);
  const rightColumn = uniqueServices.slice(3, 6);

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  const handleTouchStart = (id: string) => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    setActiveTouchId(id);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setActiveTouchId(null);
    }, 400);
  };

  const handleTouchCancel = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    setActiveTouchId(null);
  };

  return (
    <section
      id="unique-services"
      className="section-padding bg-slate-50 relative overflow-hidden scroll-mt-28"
    >
      {/* Decorative backdrop gradients */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="page-container relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-0.5 bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-xs md:text-sm">
              Centers of Distinction
            </span>
            <div className="w-10 h-0.5 bg-red-600" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Our <span className="text-red-600">Unique Services</span>
          </h2>
        </div>

        {/* Editorial Hairline Grid */}
        <div className="border-t border-b border-slate-300/80 bg-white/40 backdrop-blur-xs rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-slate-200/80">
            {/* Left Column (Items 1-3) */}
            <div className="divide-y divide-slate-200/80">
              {leftColumn.map((service, index) => {
                const Icon = service.icon;
                const serviceNumber = String(index + 1).padStart(2, "0");
                const isHighlighted = activeTouchId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    whileTap={{ scale: 0.99 }}
                    onMouseEnter={() => setActiveTouchId(service.id)}
                    onMouseLeave={() => setActiveTouchId(null)}
                    onTouchStart={() => handleTouchStart(service.id)}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchCancel}
                    className={cn(
                      "group relative flex items-center justify-between py-5 sm:py-6 md:py-7 px-4 sm:px-6 transition-all duration-300 cursor-pointer select-none",
                      isHighlighted
                        ? "bg-white shadow-xs"
                        : "hover:bg-white/80 active:bg-white/90"
                    )}
                  >
                    {/* Left Accent indicator (animates on hover/touch without keeping) */}
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-red-600 rounded-r transition-all duration-300",
                        isHighlighted
                          ? "h-8 opacity-100"
                          : "h-0 opacity-0 group-hover:h-8 group-hover:opacity-100"
                      )}
                    />

                    <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 min-w-0">
                      <span
                        className={cn(
                          "font-mono text-xl sm:text-2xl md:text-3xl font-black transition-colors duration-300 w-8 sm:w-10 shrink-0",
                          isHighlighted
                            ? "text-red-600"
                            : "text-slate-300 group-hover:text-red-600"
                        )}
                      >
                        {serviceNumber}
                      </span>

                      <div
                        className={cn(
                          "flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                          isHighlighted
                            ? "bg-red-600 text-white border border-red-600 scale-105 shadow-md shadow-red-500/20"
                            : "bg-white border border-slate-200/90 text-slate-700 shadow-xs group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:scale-105"
                        )}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>

                      <h3
                        className={cn(
                          "text-base sm:text-lg md:text-xl font-bold transition-colors duration-300 leading-snug",
                          isHighlighted
                            ? "text-red-600"
                            : "text-slate-900 group-hover:text-red-600"
                        )}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Status dot */}
                    <div className="flex items-center gap-2 shrink-0 ml-3 sm:ml-4">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full transition-all duration-300",
                          isHighlighted
                            ? "bg-red-600 scale-125 ring-4 ring-red-100"
                            : "bg-slate-300 group-hover:bg-red-600 group-hover:scale-125"
                        )}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column (Items 4-6) */}
            <div className="divide-y divide-slate-200/80 border-t md:border-t-0 border-slate-200/80">
              {rightColumn.map((service, index) => {
                const Icon = service.icon;
                const serviceNumber = String(index + 4).padStart(2, "0");
                const isHighlighted = activeTouchId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: (index + 3) * 0.06 }}
                    whileTap={{ scale: 0.99 }}
                    onMouseEnter={() => setActiveTouchId(service.id)}
                    onMouseLeave={() => setActiveTouchId(null)}
                    onTouchStart={() => handleTouchStart(service.id)}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchCancel}
                    className={cn(
                      "group relative flex items-center justify-between py-5 sm:py-6 md:py-7 px-4 sm:px-6 transition-all duration-300 cursor-pointer select-none",
                      isHighlighted
                        ? "bg-white shadow-xs"
                        : "hover:bg-white/80 active:bg-white/90"
                    )}
                  >
                    {/* Left Accent indicator (animates on hover/touch without keeping) */}
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-red-600 rounded-r transition-all duration-300",
                        isHighlighted
                          ? "h-8 opacity-100"
                          : "h-0 opacity-0 group-hover:h-8 group-hover:opacity-100"
                      )}
                    />

                    <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 min-w-0">
                      <span
                        className={cn(
                          "font-mono text-xl sm:text-2xl md:text-3xl font-black transition-colors duration-300 w-8 sm:w-10 shrink-0",
                          isHighlighted
                            ? "text-red-600"
                            : "text-slate-300 group-hover:text-red-600"
                        )}
                      >
                        {serviceNumber}
                      </span>

                      <div
                        className={cn(
                          "flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                          isHighlighted
                            ? "bg-red-600 text-white border border-red-600 scale-105 shadow-md shadow-red-500/20"
                            : "bg-white border border-slate-200/90 text-slate-700 shadow-xs group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:scale-105"
                        )}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>

                      <h3
                        className={cn(
                          "text-base sm:text-lg md:text-xl font-bold transition-colors duration-300 leading-snug",
                          isHighlighted
                            ? "text-red-600"
                            : "text-slate-900 group-hover:text-red-600"
                        )}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Status dot */}
                    <div className="flex items-center gap-2 shrink-0 ml-3 sm:ml-4">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full transition-all duration-300",
                          isHighlighted
                            ? "bg-red-600 scale-125 ring-4 ring-red-100"
                            : "bg-slate-300 group-hover:bg-red-600 group-hover:scale-125"
                        )}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
