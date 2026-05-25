"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserRound, ArrowRight } from "lucide-react";
import { departments } from "@/data/departments";

export default function DepartmentsGrid() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
              Specialities
            </span>
            <div className="w-12 h-0.5 bg-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Medical <span className="text-red-600">Departments</span>
          </h2>
          <p className="text-slate-500 mt-3">
            World-class care across every major specialty with experienced consultants and modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.article
              key={dept.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 flex flex-col flex-1 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-4">
                  {dept.description}
                </p>
                <div className="flex flex-col gap-2">
                  {dept.slug === "multi-organ-transplant" && (
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-semibold text-sm rounded-lg px-4 py-2.5 hover:bg-red-700 transition-colors"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <Link
                    href={`/doctors?department=${dept.slug}`}
                    className="inline-flex items-center justify-center gap-2 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
                  >
                    <UserRound className="w-4 h-4" />
                    View Specialist Doctors
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
