"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Microscope, GraduationCap } from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "NABH Accredited",
    desc: "Recognized for highest standards of patient safety and clinical quality.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency",
    desc: "Round-the-clock emergency and trauma care with dedicated response teams.",
  },
  {
    icon: Microscope,
    title: "Advanced Diagnostics",
    desc: "State-of-the-art imaging, labs, and digital health infrastructure.",
  },
  {
    icon: GraduationCap,
    title: "Teaching Hospital",
    desc: "MAPIMS — premier medical education, research, and academic excellence.",
  },
];

export default function AboutHighlights() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Why Us</span>
            <div className="w-12 h-0.5 bg-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Excellence in <span className="text-red-600">Healthcare</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
