"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { serviceCards } from "@/data/hospital-services/services-list";

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            All Services
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Find the <span className="text-red-600">right care</span>
          </h2>
          <p className="mt-3 text-slate-600">
            Explore our clinical services and learn how our specialists can help you.
          </p>
        </div>

        <ul className="mx-auto mt-10 flex max-w-5xl flex-col gap-4 md:mt-12 md:gap-5">
          {serviceCards.map((service, index) => (
            <motion.li
              key={service.slug}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <Link
                href={service.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200/80 transition-all duration-300 hover:bg-white hover:shadow-lg hover:ring-red-200 sm:flex-row"
              >
                <span className="absolute left-0 top-0 z-10 hidden h-full w-1 bg-red-600 transition-all group-hover:w-1.5 sm:block" />

                <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56 md:w-64">
                  <img
                    src={service.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 to-transparent sm:bg-gradient-to-t sm:from-slate-900/50" />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-red-600 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6 md:p-7">
                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-red-600 md:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 md:line-clamp-3 md:text-base">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                    View service details
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
