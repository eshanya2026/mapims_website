"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  ShieldPlus,
  UserCheck,
  Laptop,
  HeartPulse,
  ShieldCheck,
  ArrowRight,
  Microscope,
} from "lucide-react";

const features = [
  {
    title: "NABH Accredited",
    desc: "Recognized for highest quality of patient care and safety standards.",
    icon: Award,
  },
  {
    title: "24/7 Emergency",
    desc: "Round-the-clock emergency and trauma care with dedicated ambulances.",
    icon: Clock,
  },
  {
    title: "Advanced ICU",
    desc: "State-of-the-art intensive care units with modern life-support systems.",
    icon: ShieldPlus,
  },
  {
    title: "Advanced Diagnosis",
    desc: "State-of-the-art diagnostic laboratories and modern imaging technology for precise evaluation.",
    icon: Microscope,
  },
  {
    title: "Expert Doctors",
    desc: "Highly qualified specialists across all medical disciplines.",
    icon: UserCheck,
  },
  {
    title: "Digital Patient Care",
    desc: "Seamless digital experience from booking to accessing reports.",
    icon: Laptop,
  },
  {
    title: "Multi Organ Transplant",
    desc: "Government-authorized liver and kidney transplant care with specialized surgical units.",
    icon: HeartPulse,
  },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Centered heading block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">Why Us</span>
            <div className="w-10 h-[2px] bg-red-600" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl mb-3">
            Excellence in <span className="text-red-600">Healthcare</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            Compassionate, high-quality, and affordable care — with a patient-first approach at every step.
          </p>
        </motion.div>

        {/* Image + List — top-aligned so first dot matches image top */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-14">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Decorative frame background */}
            <div
              className="absolute -top-3 -left-3 w-[88%] h-[88%] rounded-[2rem] bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-600/25"
              aria-hidden
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/80 aspect-[4/3] border-[5px] border-white">
              <img
                loading="lazy"
                decoding="async"
                src="/images/hospital-casualty-emergency.png"
                alt="Adhiparasakthi Hospitals Casualty and Emergency Care"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-red-600/40">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  24/7 Emergency
                </span>
              </div>
            </div>

            {/* Certification badges below image with clear spacing */}
            <div className="mt-5 flex flex-wrap items-center gap-3.5 pl-3 sm:pl-5">
              <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-md shadow-slate-200/80 border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-900">NABH Certified</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-md shadow-slate-200/80 border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-900">NABL Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Connected vertical list — starts flush with image top */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLast = index === features.length - 1;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="relative flex gap-4"
                >
                  {/* Icon + connector line column */}
                  <div className="flex flex-col items-center shrink-0">
                    {/* Red circle with white icon */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 shadow-md shadow-red-600/30 ring-4 ring-white">
                      <Icon className="text-white" style={{ width: "18px", height: "18px" }} />
                    </div>
                    {/* Connector line — hidden on last item */}
                    {!isLast && (
                      <div className="mt-1 w-[2px] flex-1 min-h-[20px] bg-gradient-to-b from-red-400 to-red-100" />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`${isLast ? "pb-0" : "pb-5"}`}>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mt-1.5">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Read About Us Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6 sm:mt-7 pl-14"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 rounded-full bg-red-600 px-6 sm:px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-red-600/25 transition-all duration-200 hover:bg-red-700 hover:shadow-red-600/35 hover:-translate-y-0.5 group"
              >
                <span>Read About Us</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


