"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";

export default function CertificationSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 md:py-28">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-red-600/15 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,38,38,0.08)_0%,transparent_45%,rgba(37,99,235,0.12)_100%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-white"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-600/20 px-4 py-1.5 backdrop-blur-sm">
              <Award className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-red-300">
                Recognition
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Certificate of{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Appreciation
              </span>
            </h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-blue-100/90">
              Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research,
              Kancheepuram, was awarded a Certificate of Appreciation by the Government of
              Tamil Nadu in January 2024 for exemplary performance under the Chief
              Minister&apos;s Comprehensive Health Insurance Scheme (CMCHIS) and Ayushman
              Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY).
            </p>
            <div className="flex flex-wrap gap-3">
              {["CMCHIS", "PM-JAY (Ayushman Bharat)", "Govt. of Tamil Nadu"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-950/50 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-red-400" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-1 justify-center"
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-red-600/25 to-blue-500/20 blur-xl" />
              <div className="relative rounded-xl bg-white p-2 shadow-2xl ring-1 ring-blue-400/20 transition-transform duration-300 hover:scale-[1.01] sm:p-3">
                <img
                  src="/images/mapims-certificate-appreciation.png"
                  alt="Certificate of Appreciation from Government of Tamil Nadu to Melmaruvathur Adhiparasakthi Institute, Kancheepuram for exemplary performance under CMCHIS and Ayushman Bharat PM-JAY"
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
