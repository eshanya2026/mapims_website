"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";

export default function CertificationSection() {
  return (
    <section className="py-20 md:py-28 bg-red-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-white"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 mb-6">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Recognition</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Certificate of Appreciation
            </h2>
            <p className="text-white/85 text-lg leading-relaxed max-w-xl mb-8">
              Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research, Kancheepuram, was awarded a Certificate of Appreciation by the Government of Tamil Nadu in January 2024 for exemplary performance under the Chief Minister&apos;s Comprehensive Health Insurance Scheme (CMCHIS) and Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY).
            </p>
            <div className="flex flex-wrap gap-4">
              {["CMCHIS", "PM-JAY (Ayushman Bharat)", "Govt. of Tamil Nadu"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <ShieldCheck className="w-4 h-4" />
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
            className="flex-1 flex justify-center w-full"
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <div className="absolute -inset-3 bg-white/10 rounded-2xl blur-xl" />
              <div className="relative bg-white rounded-xl p-2 sm:p-3 shadow-2xl ring-1 ring-white/20 hover:scale-[1.01] transition-transform duration-300">
                <img
                  src="/images/mapims-certificate-appreciation.png"
                  alt="Certificate of Appreciation from Government of Tamil Nadu to Melmaruvathur Adhiparasakthi Institute, Kancheepuram for exemplary performance under CMCHIS and Ayushman Bharat PM-JAY"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
