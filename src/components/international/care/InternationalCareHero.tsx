"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Plane } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import ContactInternationalDeskButton from "@/components/international/ContactInternationalDeskButton";
import { internationalDesk } from "@/data/international-patients";
import { internationalCareHero } from "@/data/international-patient-care";

export default function InternationalCareHero() {
  return (
    <section className="relative min-h-[38vh] sm:min-h-[45vh] md:min-h-[55vh] flex items-center overflow-hidden">
      <HeroBackground
        imageSrc={internationalCareHero.image}
        imageClassName="object-cover object-[center_35%]"
      />

      <div className="absolute bottom-0 left-0 w-full h-24 z-10 opacity-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1000 100"
          className="w-full h-full stroke-red-600 stroke-2 fill-none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 L200,50 L230,20 L260,80 L290,50 L1000,50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="page-container relative z-20 py-10 sm:py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/international" className="hover:text-white transition-colors">
              International Patients
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Patient Care</span>
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            <Plane className="w-4 h-4" />
            {internationalCareHero.badge}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            International{" "}
            <span className="text-red-500">Patients Care</span>
          </h1>
          <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
            {internationalCareHero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <ContactInternationalDeskButton variant="primary" />
            <a
              href={internationalDesk.phoneTel}
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-8 h-12 font-medium backdrop-blur-md transition-all"
            >
              <Phone className="mr-2 w-5 h-5" />
              {internationalDesk.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
