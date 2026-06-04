"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { DepartmentHeroStat } from "@/data/department-stats";

function LiveStatValue({
  end,
  suffix = "",
  display,
}: Pick<DepartmentHeroStat, "end" | "suffix" | "display">) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const isNumeric = display === undefined && end !== undefined;

  useEffect(() => {
    if (!isInView || !isNumeric || end === undefined) return;

    let start = 0;
    const duration = 1800;
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
  }, [end, isInView, isNumeric]);

  if (display) {
    return (
      <span ref={ref} className="tabular-nums">
        {display}
      </span>
    );
  }

  const formatted =
    count >= 1000 ? count.toLocaleString("en-IN") : String(count);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

type DepartmentHeroStatsProps = {
  stats: DepartmentHeroStat[];
};

export default function DepartmentHeroStats({ stats }: DepartmentHeroStatsProps) {
  return (
    <section
      className="relative z-30 -mt-10 px-4 sm:-mt-12"
      aria-label="Department statistics"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="px-5 py-6 text-center sm:px-6 sm:py-7"
            >
              <p className="text-3xl font-bold leading-none text-red-600 md:text-4xl">
                <LiveStatValue
                  end={stat.end}
                  suffix={stat.suffix}
                  display={stat.display}
                />
              </p>
              <p className="mt-3 text-sm font-bold text-slate-900">{stat.label}</p>
              {stat.sublabel ? (
                <p className="mt-1 text-xs text-slate-500">{stat.sublabel}</p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
