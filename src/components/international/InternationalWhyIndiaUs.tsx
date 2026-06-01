"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Globe } from "lucide-react";
import { whyIndiaPoints, whyUsPoints, type InternationalWhyPoint } from "@/data/international-patients";
import { cn } from "@/lib/utils";

type TabId = "india" | "us";

const tabs: {
  id: TabId;
  label: string;
  shortTitle: string;
  highlight: string;
  description: string;
  icon: typeof Globe;
  points: InternationalWhyPoint[];
}[] = [
  {
    id: "india",
    label: "Why India",
    shortTitle: "Healthcare in",
    highlight: "India",
    description:
      "Discover why patients worldwide choose India for trusted, high-quality medical care.",
    icon: Globe,
    points: whyIndiaPoints,
  },
  {
    id: "us",
    label: "Why Us",
    shortTitle: "Adhiparasakthi",
    highlight: "Hospitals",
    description:
      "See why international patients choose MAPIMS for treatment, recovery, and dedicated support.",
    icon: Building2,
    points: whyUsPoints,
  },
];

function PointRow({ point, index }: { point: InternationalWhyPoint; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="flex gap-4 rounded-2xl border border-red-100 bg-white p-4 transition-colors hover:border-red-200 hover:bg-red-50/40 sm:p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
        <point.icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <h4 className="font-bold text-slate-900">{point.title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{point.desc}</p>
      </div>
    </motion.li>
  );
}

export default function InternationalWhyIndiaUs() {
  const [activeTab, setActiveTab] = useState<TabId>("india");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="why-india-us"
      className="section-padding relative overflow-hidden border-t border-slate-100 bg-slate-50"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-red-600/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-red-600/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Why <span className="text-red-600">India</span>
            <span className="mx-2 text-slate-300">·</span>
            Why <span className="text-red-600">Us</span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            From India&apos;s strengths as a medical destination to MAPIMS&apos;s dedicated
            international patient services — plan your care with confidence.
          </p>
        </motion.header>

        <div className="mx-auto mb-8 flex max-w-md rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-all duration-300",
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/25"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <current.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                    {current.shortTitle}{" "}
                    <span className="text-red-600">{current.highlight}</span>
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {current.description}
                  </p>
                </div>
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:gap-4">
              {current.points.map((point, index) => (
                <PointRow key={point.title} point={point} index={index} />
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
