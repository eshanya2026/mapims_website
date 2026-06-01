"use client";

import { motion } from "framer-motion";
import { Award, Clock, ShieldPlus, UserCheck, Laptop, BookOpen } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "NABH Accredited",
    desc: "Recognized for highest quality of patient care and safety standards.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency",
    desc: "Round-the-clock emergency and trauma care with dedicated ambulances.",
  },
  {
    icon: ShieldPlus,
    title: "Advanced ICU",
    desc: "State-of-the-art intensive care units with modern life-support systems.",
  },
  {
    icon: UserCheck,
    title: "Expert Doctors",
    desc: "Highly qualified specialists across all medical disciplines.",
  },
  {
    icon: Laptop,
    title: "Digital Patient Care",
    desc: "Seamless digital experience from booking to accessing reports.",
  },
  {
    icon: BookOpen,
    title: "Teaching Hospital",
    desc: "A premier medical college fostering research and academic excellence.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.04),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.05),transparent_55%)]" />

      <div className="page-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-0.5 w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Why Choose Us
            </span>
            <div className="h-0.5 w-12 bg-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Excellence in <span className="text-red-600">Healthcare</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Compassionate, high-quality, and affordable care — with a patient-first approach
            at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-600/5 transition-transform duration-300 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
                    <feature.icon className="h-6 w-6" />
                  </span>
                  <span className="text-3xl font-black text-slate-100 transition-colors group-hover:text-red-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
