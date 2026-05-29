"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Bone, Activity, Stethoscope, Baby, Wind, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

const centers = [
  { icon: Heart, name: "Cardiology", desc: "Advanced heart care and surgeries" },
  { icon: Brain, name: "Neurology", desc: "Comprehensive brain and spine care" },
  { icon: Bone, name: "Orthopaedics", desc: "Joint replacement and sports medicine" },
  { icon: Activity, name: "Oncology", desc: "State-of-the-art cancer treatment" },
  { icon: Stethoscope, name: "Gastroenterology", desc: "Digestive system disorders" },
  { icon: Baby, name: "Pediatrics", desc: "Expert care for infants and children" },
  { icon: Wind, name: "Pulmonology", desc: "Respiratory and lung diseases" },
  { icon: Eye, name: "Ophthalmology", desc: "Advanced eye care and surgeries" },
];

export default function CentersOfExcellence() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="section-header-center">
          <div className="section-eyebrow-center">
            <div className="h-0.5 w-10 bg-red-600 sm:w-12" />
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 sm:text-sm">Specialities</span>
            <div className="h-0.5 w-10 bg-red-600 sm:w-12" />
          </div>
          <h2 className="section-title">
            Centers of <span className="text-red-600">Excellence</span>
          </h2>
          <p className="section-desc">
            We offer comprehensive medical care across various specialities, equipped with the latest technology and renowned medical professionals.
          </p>
        </div>

        <div className="section-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {centers.map((center, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href="#" className="block group">
                <div className="relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl sm:rounded-3xl sm:p-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                  
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl">
                    <center.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                    {center.name}
                  </h3>
                  <p className="text-slate-500 mb-6 line-clamp-2">
                    {center.desc}
                  </p>
                  
                  <div className="flex items-center text-red-600 font-medium text-sm">
                    Learn More 
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/departments" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-red-600 transition-colors shadow-sm">
            View All Departments
          </Link>
        </div>
      </div>
    </section>
  );
}
