"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HeartHandshake, Bus, Pill } from "lucide-react";
import { valueAddedServices } from "@/data/value-added-services";
import { cn } from "@/lib/utils";

const highlights = [
  {
    value: "8+",
    label: "Patient Support",
    sub: "Services",
    icon: HeartHandshake,
  },
  {
    value: "Free",
    label: "Shuttle Bus",
    sub: "Services",
    icon: Bus,
  },
  {
    value: "Free",
    label: "Pharmacy",
    sub: "Services",
    icon: Pill,
  },
];

export default function AboutValueAddedServices() {
  const [openId, setOpenId] = useState<string>("shuttle");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <section
      id="value-added-services"
      className="relative py-20 md:py-28 bg-white scroll-mt-28"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-red-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-80 translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-50 text-red-600 font-semibold text-sm mb-6 border border-red-100">
                  <HeartHandshake className="w-4 h-4" />
                  Value Added Care
                </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Patient Comfort &{" "}
              <span className="text-red-600">Safety Services</span>
            </h2>

            <p className="text-slate-600 leading-relaxed mb-8">
              Beyond clinical treatment, we offer thoughtful services that make every
              visit safer, easier, and more comfortable for patients and families at
              Melmaruvathur.
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group relative flex flex-col items-center justify-between rounded-2xl bg-white p-3.5 sm:p-4 text-center border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(220,38,38,0.12)] hover:border-red-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top hover accent bar */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Ambient glow on hover */}
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-red-100/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Icon */}
                    <div className="relative mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-xs group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Stat Value */}
                    <div className="relative">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-red-600 transition-colors duration-200">
                        {item.value}
                      </span>
                    </div>

                    {/* Label */}
                    <div className="relative mt-1">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {item.label}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 leading-none mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5">
              Our Value Added Services
            </p>

            <div className="flex flex-col gap-3" role="list">
              {valueAddedServices.map((service, index) => {
                const Icon = service.icon;
                const isOpen = openId === service.id;

                return (
                  <div
                    key={service.id}
                    role="listitem"
                    className={cn(
                      "rounded-2xl border overflow-hidden shadow-sm transition-shadow",
                      isOpen
                        ? "border-red-200 shadow-md ring-1 ring-red-100"
                        : "border-slate-200 bg-white"
                    )}
                  >
                    <button
                      type="button"
                      id={`service-trigger-${service.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.id}`}
                      onClick={() => toggle(service.id)}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left transition-colors",
                        isOpen
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isOpen
                            ? "bg-white/20 text-white"
                            : "bg-white text-red-600 shadow-sm"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 min-w-0 text-left">
                        <span
                          className={cn(
                            "block text-xs font-medium mb-0.5",
                            isOpen ? "text-white/80" : "text-slate-400"
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "block font-semibold text-sm sm:text-base",
                            isOpen ? "text-white" : "text-slate-900"
                          )}
                        >
                          {service.title}
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform duration-300",
                          isOpen ? "rotate-180 text-white" : "text-red-600"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`service-panel-${service.id}`}
                          role="region"
                          aria-labelledby={`service-trigger-${service.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 py-5 sm:pl-[4.25rem] bg-white border-t border-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                            {service.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
