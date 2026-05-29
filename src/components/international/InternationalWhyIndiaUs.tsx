"use client";

import { motion } from "framer-motion";
import { whyIndiaPoints, whyUsPoints } from "@/data/international-patients";

function WhyColumn({
  label,
  title,
  highlight,
  points,
  delayOffset = 0,
}: {
  label: string;
  title: string;
  highlight: string;
  points: typeof whyIndiaPoints;
  delayOffset?: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-12 h-0.5 bg-red-600" />
        <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
          {label}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
        {title} <span className="text-red-600">{highlight}</span>
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-8">
        {label === "Why India"
          ? "Discover why patients worldwide choose India for trusted, high-quality medical care."
          : "See why international patients choose Adhiparasakthi Hospitals for treatment and recovery."}
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {points.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delayOffset + index * 0.06 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
              <point.icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">{point.title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{point.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function InternationalWhyIndiaUs() {
  return (
    <section id="why-india-us" className="section-padding bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
              Why Choose Us
            </span>
            <div className="w-12 h-0.5 bg-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why <span className="text-red-600">India</span> · Why{" "}
            <span className="text-red-600">Us</span>
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            From India&apos;s strengths as a medical destination to MAPIMS&apos;s dedicated
            international patient services — everything you need to plan care with confidence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <WhyColumn
            label="Why India"
            title="Healthcare in"
            highlight="India"
            points={whyIndiaPoints}
          />
          <WhyColumn
            label="Why Us"
            title="Adhiparasakthi"
            highlight="Hospitals"
            points={whyUsPoints}
            delayOffset={0.15}
          />
        </div>
      </div>
    </section>
  );
}
