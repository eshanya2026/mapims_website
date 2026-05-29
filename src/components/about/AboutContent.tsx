"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Calendar, Target, Eye, ArrowRight } from "lucide-react";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { id: "about", label: "About Us", icon: null },
  { id: "mission", label: "Our Mission", icon: Target },
  { id: "vision", label: "Our Vision", icon: Eye },
];

export default function AboutContent() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <>
      <section id="about" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-28 space-y-5"
              >
                <nav className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden">
                  {sidebarLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => setActiveSection(link.id)}
                      className={cn(
                        "flex items-center gap-3 px-5 py-4 text-sm font-semibold border-b border-slate-50 last:border-0 transition-all duration-200",
                        activeSection === link.id
                          ? "bg-red-600 text-white shadow-inner"
                          : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                      )}
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-600/25">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase tracking-wider text-sm">Emergency Call</span>
                  </div>
                  <a href="tel:1066" className="text-3xl font-black block mb-1 hover:underline">
                    1066
                  </a>
                  <a href="tel:+919499059966" className="text-sm text-white/80 hover:text-white">
                    +91 94990 59966
                  </a>
                </div>

                <Link
                  href="/#book-appointment"
                  className="flex w-full h-12 items-center justify-center bg-red-600 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 text-white rounded-full text-base font-semibold shadow-md shadow-red-600/20 transition-all"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Appointment
                </Link>
              </motion.div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-0.5 bg-red-600" />
                  <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
                    Our Story
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  About <span className="text-red-600">MAPIMS</span>
                </h2>

                <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium border-l-4 border-red-600 pl-5">
                  Melmaruvathur Adhiparasakthi Institute of Medical Sciences & Research (MAPIMS), a 1000+ bed super-specialty tertiary care hospital, is supported in all its specialty institutes and departments by an excellent, experienced, dedicated core team of senior medical specialists and committed nursing teams.
                </p>

                <div className="space-y-6 text-slate-600 leading-relaxed mb-10">
                  <p>
                    Our teams have been providing succor and a healing touch to people from all walks of life — from top bureaucrats, celebrities, and major multinational corporates, to public sector organizations, the general public, and foreign patients from various countries of the Middle East, South East Asia, and the African continent.
                  </p>
                  <p>
                    We at MAPIMS take delight to inform that all patients seeking good health at our hospital avail the same quality of medical services and facilities, along with state-of-the-art cutting-edge medical technology with successful outcomes — standards that are taken for granted by citizens in Western countries.
                  </p>
                  <p>
                    Besides the above, MAPIMS — Melmaruvathur is well known for cost leadership, total transparency, and ethical medical treatment and clinical practices across all its super-specialty institutes, departments, and various allied services in this part of the Indian sub-continent — to the advantage of all who seek good health and cures at our facility.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 group"
                >
                  <img
                    src="/images/mapims-about-campus.png"
                    alt="Adhiparasakthi Hospital campus at Melmaruvathur"
                    className="w-full h-auto object-cover object-[center_40%] aspect-[16/8] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-semibold text-lg">1000+ Bed Super-Specialty Tertiary Care</p>
                    <p className="text-white/80 text-sm mt-1">World-class technology · Ethical · Transparent care</p>
                  </div>
                </motion.div>

                <Link
                  href="/#book-appointment"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 font-semibold shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5"
                >
                  Schedule a Visit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-white">
        <div className="container mx-auto px-4">
          <MissionVisionSection />
        </div>
      </section>
    </>
  );
}
