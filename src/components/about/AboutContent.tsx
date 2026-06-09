"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  ArrowRight,
  ArrowUpRight,
  Building2,
  HeartHandshake,
  CircleHelp,
  History,
} from "lucide-react";
import AboutJourneyTimeline from "@/components/about/AboutJourneyTimeline";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

const sidebarLinks = [
  { id: "about", label: "About Us", icon: Building2 },
  { id: "our-journey", label: "Our Journey", icon: History },
  { id: "mission-vision", label: "Mission & Vision", icon: Target },
  {
    id: "value-added-services",
    label: "Value Added Services",
    icon: HeartHandshake,
  },
  { id: "faq", label: "FAQ", icon: CircleHelp },
] as const;

type SectionId = (typeof sidebarLinks)[number]["id"];

export default function AboutContent() {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  const scrollToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 112; // sticky header
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const sectionIds: SectionId[] = [
      "about",
      "our-journey",
      "mission-vision",
      "value-added-services",
      "faq",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollToHashSection = () => {
      const hash = window.location.hash.replace("#", "") as SectionId;
      if (!sidebarLinks.some((link) => link.id === hash)) return;

      setActiveSection(hash);
      requestAnimationFrame(() => scrollToSection(hash));
      setTimeout(() => scrollToSection(hash), 150);
    };

    scrollToHashSection();
    window.addEventListener("hashchange", scrollToHashSection);
    return () => window.removeEventListener("hashchange", scrollToHashSection);
  }, [scrollToSection]);

  const handleNavClick = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    scrollToSection(id);
  };

  return (
    <>
      <section id="about" className="section-padding bg-white scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-5 lg:sticky lg:top-28"
              >
                {/* Navigation — matches reference stepper design */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-6 text-xl font-bold text-slate-800">About MAPIMS</h3>

                  <nav aria-label="About page sections">
                    <ul className="relative space-y-6">
                      <div
                        className="absolute bottom-5 left-5 top-5 w-px bg-slate-200"
                        aria-hidden
                      />
                      {sidebarLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                          <li key={link.id} className="relative">
                            <a
                              href={`#${link.id}`}
                              onClick={handleNavClick(link.id)}
                              className="group flex items-center gap-4"
                            >
                              <span
                                className={cn(
                                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                                  isActive
                                    ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-600/25"
                                    : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-300"
                                )}
                              >
                                <link.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                              </span>
                              <span
                                className={cn(
                                  "flex-1 text-base font-semibold transition-colors",
                                  isActive
                                    ? "text-red-600"
                                    : "text-slate-800 group-hover:text-slate-900"
                                )}
                              >
                                {link.label}
                              </span>
                              {isActive && (
                                <ArrowUpRight
                                  className="h-5 w-5 shrink-0 text-red-600"
                                  strokeWidth={2}
                                />
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 text-base font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700"
                >
                  Schedule a Visit
                  <ArrowRight className="h-4 w-4" />
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AboutJourneyTimeline />

      <section id="mission-vision" className="pb-16 md:pb-24 bg-white scroll-mt-28">
        <div className="container mx-auto px-4">
          <MissionVisionSection />
        </div>
      </section>
    </>
  );
}
