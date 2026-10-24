"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, ChevronLeft, ChevronRight, FileText } from "lucide-react";

const certificates = [
  {
    id: "nabh",
    tabLabel: "NABH (2026–30)",
    titlePrefix: "NABH",
    titleHighlight: "Accreditation",
    description:
      "Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research is accredited under NABH Accreditation Standards for Hospitals (6th Edition) for 720 sanctioned beds, valid from May 2026 to May 2030.",
    badges: ["NABH 6th Edition", "720 Sanctioned Beds", "ISQua Accredited", "Quality Council of India"],
    image: "/doc/nabh-6th-edition-2026-2030.webp",
    pdf: "/doc/NABH 6th edition 2026-2030.pdf",
    alt: "NABH 6th Edition Certificate of Accreditation 2026-2030 for Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research",
  },
  {
    id: "nabl",
    tabLabel: "NABL (2026–30)",
    titlePrefix: "NABL",
    titleHighlight: "Accreditation",
    description:
      "Central Laboratory at Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research is accredited in accordance with the standard ISO 15189:2022 for Medical Testing, valid from July 2026 to July 2030.",
    badges: ["ISO 15189:2022", "Medical Testing", "NABL Accredited", "Central Laboratory"],
    image: "/doc/nabl-lab.webp",
    pdf: "/doc/NABL lab.pdf",
    alt: "NABL Certificate of Accreditation ISO 15189:2022 for Central Laboratory, Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research",
  },
  {
    id: "nabh-blood-bank",
    tabLabel: "NABH Blood Bank (2024–27)",
    titlePrefix: "NABH Blood Bank",
    titleHighlight: "Accreditation",
    description:
      "Department of Transfusion Medicine at Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research is accredited under NABH Accreditation Standards for Blood Banks / Blood Centres and Transfusion Services, valid from September 2024 to September 2027.",
    badges: ["NABH Standards", "Blood Centres & Transfusion", "Cert. No. BB-2021-0124", "ISQua Accredited"],
    image: "/bloodbank nabh.jpeg",
    pdf: "/doc/NABH Blood Bank 2024-2027.pdf",
    alt: "NABH Certificate of Accreditation for Department of Transfusion Medicine (Blood Bank), Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research",
  },
  {
    id: "2025",
    tabLabel: "2025",
    titlePrefix: "Certificate of",
    titleHighlight: "Appreciation (2025)",
    description:
      "Awarded to Melmaruvathur Adhiparasakthi Institute by the Government of Tamil Nadu & District Collector, Chengalpattu for exemplary performance under the Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS) - Ayushman Bharat PM-JAY on August 15, 2025.",
    badges: ["CMCHIS", "PM-JAY (Ayushman Bharat)", "Govt. of Tamil Nadu", "District Collector"],
    image: "/doc/best-performance-2025.png",
    pdf: "/doc/BEST PERFOMANCE 2025.pdf",
    alt: "Certificate of Appreciation 2025 from Government of Tamil Nadu to Melmaruvathur Adhiparasakthi Institute",
  },
  {
    id: "2024",
    tabLabel: "2024",
    titlePrefix: "Certificate of",
    titleHighlight: "Appreciation (2024)",
    description:
      "Awarded to Melmaruvathur Adhiparasakthi Institute, Kancheepuram for significant contribution and exemplary performance in the 6 Years of CMCHIS - ABPMJAY implementation by the District Collector, Chengalpattu District.",
    badges: ["6 Years CMCHIS-ABPMJAY", "National Health Agency", "Govt. of Tamil Nadu"],
    image: "/doc/best-performance-2024.webp",
    pdf: "/doc/BEST PERFOMANCE 2024.pdf",
    alt: "Certificate of Appreciation 2024 for 6 Years of CMCHIS-ABPMJAY to Melmaruvathur Adhiparasakthi Institute",
  },
  {
    id: "2022",
    tabLabel: "2022",
    titlePrefix: "Certificate of",
    titleHighlight: "Appreciation (2022)",
    description:
      "Awarded to Melmaruvathur Adhiparasakthi Institute for exemplary performance under Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS) - Ayushman Bharat PM-JAY by the District Administration & Govt. of Tamil Nadu.",
    badges: ["CMCHIS", "PM-JAY (Ayushman Bharat)", "Govt. of Tamil Nadu"],
    image: "/doc/best-performance-2022.webp",
    pdf: "/doc/BEST PERFOMANCE 2022.pdf",
    alt: "Certificate of Appreciation 2022 to Melmaruvathur Adhiparasakthi Institute",
  },
  {
    id: "2021",
    tabLabel: "2021",
    titlePrefix: "Certificate of",
    titleHighlight: "Appreciation (2021)",
    description:
      "Recognized by the Government of Tamil Nadu for dedicated healthcare service delivery under CMCHIS and Ayushman Bharat Pradhan Mantri Jan Arogya Yojana.",
    badges: ["CMCHIS", "PM-JAY (Ayushman Bharat)", "Govt. of Tamil Nadu"],
    image: "/doc/best-performance-2021.webp",
    pdf: "/doc/BEST PERFOMANCE 2021.pdf",
    alt: "Certificate of Appreciation 2021 to Melmaruvathur Adhiparasakthi Institute",
  },
  {
    id: "2019",
    tabLabel: "2019",
    titlePrefix: "Certificate of",
    titleHighlight: "Appreciation (2019)",
    description:
      "Honored by the Government of Tamil Nadu for outstanding performance and pioneering implementation of CMCHIS and Ayushman Bharat PM-JAY.",
    badges: ["CMCHIS", "PM-JAY (Ayushman Bharat)", "Govt. of Tamil Nadu"],
    image: "/doc/best-performance-2019.webp",
    pdf: "/doc/BEST PERFOMANCE 2019.pdf",
    alt: "Certificate of Appreciation 2019 to Melmaruvathur Adhiparasakthi Institute",
  },
];

export default function CertificationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const current = certificates[activeIndex];

  // Automatic slide interval (5 seconds), pauses on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const prevCertificate = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const nextCertificate = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const selectCertificate = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 md:py-28">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,38,38,0.08)_0%,transparent_45%,rgba(37,99,235,0.12)_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-white"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-600/20 px-4 py-1.5 backdrop-blur-sm">
              <Award className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-red-300">
                Recognition
              </span>
            </div>

            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                    {current.titlePrefix}{" "}
                    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      {current.titleHighlight}
                    </span>
                  </h2>
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-blue-100/90">
                    {current.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {current.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-950/50 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm"
                      >
                        <ShieldCheck className="h-4 w-4 text-red-400" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick document switcher pills */}
            <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400 mr-1 font-semibold">
                Certificates:
              </span>
              {certificates.map((cert, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => selectCertificate(index)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400"
                        : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {cert.tabLabel}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-1 flex-col items-center"
          >
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full max-w-xl lg:max-w-2xl"
            >
              {/* Ambient blur glow (pointer-events-none so it never blocks clicks) */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-red-600/25 to-blue-500/20 blur-xl pointer-events-none" />

              {/* Single Slide Carousel Track Frame fitted exactly to certificate size */}
              <div
                className="relative w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15"
                style={{ aspectRatio: "1.413 / 1" }}
              >
                <div
                  className="flex w-full h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {certificates.map((cert) => {
                    const isScrollable =
                      cert.id === "nabh" ||
                      cert.id === "nabl" ||
                      cert.id === "nabh-blood-bank";
                    const is2024 = cert.id === "2024";
                    return (
                      <div
                        key={cert.id}
                        className={`w-full h-full shrink-0 flex items-center justify-center p-0 overflow-hidden ${
                          isScrollable ? "group cursor-pointer" : is2024 ? "bg-white" : ""
                        }`}
                      >
                        <img
                          src={cert.image}
                          alt={cert.alt}
                          className={
                            isScrollable
                              ? "w-full h-full object-cover object-top origin-top transition-[object-position] duration-1000 ease-in-out group-hover:object-bottom hover:object-bottom"
                              : is2024
                              ? "w-full h-full object-contain p-1.5"
                              : "w-full h-full object-cover"
                          }
                        />

                        {isScrollable && (
                          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-slate-900/75 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm shadow-md opacity-80 group-hover:opacity-0 transition-opacity duration-300">
                            Hover to scroll ↓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next controls & PDF link */}
              <div className="relative z-20 mt-4 flex items-center justify-between text-slate-300 px-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevCertificate}
                    aria-label="Previous certificate"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <ChevronLeft className="h-5 w-5 pointer-events-none" />
                  </button>
                  <button
                    type="button"
                    onClick={nextCertificate}
                    aria-label="Next certificate"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <ChevronRight className="h-5 w-5 pointer-events-none" />
                  </button>

                  {/* Dot indicators */}
                  <div className="flex items-center gap-1.5 ml-2">
                    {certificates.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(i);
                        }}
                        aria-label={`Go to certificate ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeIndex
                            ? "w-5 bg-red-500"
                            : "w-2 bg-white/30 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-slate-400 font-medium ml-2">
                    {activeIndex + 1} of {certificates.length}
                  </span>
                </div>

                <a
                  href={current.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-white transition-colors bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  View PDF
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
