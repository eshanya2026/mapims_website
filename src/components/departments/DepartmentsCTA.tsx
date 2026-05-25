"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function DepartmentsCTA() {
  return (
    <section className="py-16 md:py-20 bg-red-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="absolute -top-20 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-snug max-w-4xl mx-auto">
            We Provide the Highest Level of Satisfaction Care & Services to Our Patients
          </h2>
          <Link
            href="/#book-appointment"
            className="inline-flex items-center gap-2 text-white font-semibold text-lg border-b-2 border-white pb-1 hover:text-white/90 hover:border-white/80 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Make an Appointment
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
