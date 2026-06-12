"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Bone, Activity, Stethoscope, Baby, Wind, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDepartmentHref } from "@/data/departments";

const centers = [
  { icon: Heart, name: "Cardiology", slug: "cardiology", desc: "Advanced heart care and surgeries" },
  { icon: Brain, name: "Neurology", slug: "neurology", desc: "Comprehensive brain and spine care" },
  { icon: Bone, name: "Orthopaedics", slug: "orthopaedics", desc: "Joint replacement and sports medicine" },
  { icon: Activity, name: "Oncology", slug: "oncology", desc: "State-of-the-art cancer treatment" },
  { icon: Stethoscope, name: "Gastroenterology", slug: "medical-gastroenterology", desc: "Digestive system disorders" },
  { icon: Baby, name: "Pediatrics", slug: "paediatric", desc: "Expert care for infants and children" },
  { icon: Wind, name: "Pulmonology", slug: "general-medicine", desc: "Respiratory and lung diseases" },
  { icon: Eye, name: "Ophthalmology", slug: "ophthalmology", desc: "Advanced eye care and surgeries" },
];

export default function CentersOfExcellence() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-red-600"></div>
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Specialities</span>
            <div className="w-12 h-[2px] bg-red-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Centers of <span className="text-red-600">Excellence</span>
          </h2>
          <p className="text-lg text-slate-600">
            We offer comprehensive medical care across various specialities, equipped with the latest technology and renowned medical professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {centers.map((center, index) => (
            <motion.div
              key={center.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={getDepartmentHref(center.slug)} className="block group">
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                  
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <center.icon className="w-8 h-8" />
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
