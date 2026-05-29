"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HeartHandshake } from "lucide-react";
import { valueAddedServices } from "@/data/value-added-services";
import { cn } from "@/lib/utils";

const highlights = [
  { value: "8+", label: "Patient support services" },
  { value: "24/7", label: "Campus security" },
  { value: "Free", label: "Shuttle for patients" },
];

export default function AboutValueAddedServices() {
  const [openId, setOpenId] = useState<string>("shuttle");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <section
      id="value-added-services"
      className="relative section-padding bg-white scroll-mt-24 sm:scroll-mt-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full bg-red-50 opacity-60 blur-3xl sm:h-80 sm:w-80 md:h-[480px] md:w-[480px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-80 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-28"
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-4 text-center"
                >
                  <p className="text-xl font-bold text-red-600">{item.value}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

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
                          <div className="px-4 sm:px-5 py-5 sm:pl-[4.25rem] bg-white border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
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
