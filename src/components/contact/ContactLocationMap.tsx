"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import FooterMap, { MAP_DIRECTIONS_URL } from "@/components/layout/FooterMap";

export default function ContactLocationMap() {
  return (
    <section className="mt-12 border-t border-slate-200 pt-10 md:mt-16 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-0.5 w-10 bg-red-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                Visit Us
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
              Find Us on the <span className="text-red-600">Map</span>
            </h2>
            <p className="mt-3 flex max-w-xl gap-2 text-sm text-slate-600 sm:text-base">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram District,
              Tamil Nadu, India 603319
            </p>
          </div>
          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition hover:bg-red-700"
          >
            <Navigation className="h-4 w-4" />
            Open in Google Maps
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/80">
          <FooterMap size="medium" showDirectionsLink={false} />
        </div>
      </motion.div>
    </section>
  );
}
