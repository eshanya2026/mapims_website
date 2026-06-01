"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BedDouble, Users, Ambulance, Award, type LucideIcon } from "lucide-react";

type StatConfig = {
  icon: LucideIcon;
  label: string;
  end?: number;
  suffix?: string;
  display?: string;
};

const stats: StatConfig[] = [
  { icon: BedDouble, end: 1000, suffix: "+", label: "Hospital Beds" },
  { icon: Users, end: 100, suffix: "+", label: "Expert Doctors" },
  {
    icon: Ambulance,
    display: "24/7",
    label: "Emergency & Trauma Care",
  },
  { icon: Award, end: 40, suffix: "+", label: "Years of Service" },
];

function StatItem({
  end,
  suffix = "",
  label,
  icon: Icon,
  display,
  delay,
}: StatConfig & { delay: number }) {
  const [count, setCount] = useState(0);
  const isNumeric = display === undefined && end !== undefined;

  useEffect(() => {
    if (!isNumeric || end === undefined) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, isNumeric]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-red-600" />
      </div>
      <span className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 leading-tight">
        {display ?? `${count}${suffix}`}
      </span>
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

export default function AboutStats() {
  return (
    <section className="relative -mt-12 z-30 px-4 mb-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 divide-y divide-slate-100 rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
