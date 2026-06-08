"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";

const doctors = [
  {
    name: "Dr.T.Ramesh",
    designation: "Medical Director",
    specialty: "General Medicine",
    image: "/images/doctor/ramesh.jpg",
  },
  {
    name: "Dr. Kapali Neelamekam",
    designation: "Advisor - Multi organ Transplant",
    specialty: "Transplant",
    image: "/images/doctor/kapali.jpg",
  },
  {
    name: "Vaseekaran",
    designation: "Chief Operating officer (COO)",
    specialty: "Administration",
    image: "/images/doctor/vasee.jpg",
  },
  {
    name: "Dr.T.R. RAJKUMAR",
    designation: "Transplant surgeon & Consultant urologist",
    specialty: "Urology",
    image: "/images/doctor/raj.jpg",
  },
  {
    name: "Dr A. Rekha",
    designation: "Medical Superintendent",
    specialty: "Hospital Administration",
    image: "/images/doctor/rekha.jpg",
  },
  {
    name: "DR.R. RAMA KRISHNAN",
    designation: "Consultant Urologist",
    specialty: "Urology",
    image: "/images/doctor/ramakrishan.jpg",
  },
  {
    name: "Dr. S. KUMARESAN",
    designation: "Head of Transplant Anesthesia",
    specialty: "Anesthesiology",
    image: "/images/doctor/Dr.Kumaresan.jpg",
  },
  {
    name: "Dr. Umesh Raj Somasundaram",
    designation: "Advanced Laparoscopic & General Surgery",
    specialty: "General Surgery",
    image: "/images/doctor/Dr.UmeshRaj.jpg",
  },
  {
    name: "Dr. Mahendra Varman L",
    designation: "Lead consultant Transplant Sciences & Nephrology",
    specialty: "Nephrology",
    image: "/images/doctor/mahendran%20.png",
  },
  {
    name: "Dr S Bhaskaran",
    designation: "Senior Consultant Department Nephrology & Renal Transplant",
    specialty: "Nephrology",
    image: "/images/doctor/bhaskaran.png",
  },
];

function DoctorPortrait({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative mx-auto h-[200px] w-[155px] shrink-0 overflow-hidden sm:mx-0 sm:h-[220px] sm:w-[170px]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-rose-700 opacity-95 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderRadius: "58% 42% 38% 62% / 48% 52% 48% 52%" }}
        aria-hidden
      />
      <div
        className="absolute inset-[6px] overflow-hidden bg-white/10"
        style={{ borderRadius: "55% 45% 40% 60% / 50% 50% 46% 54%" }}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function AboutSpecialistDoctors() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, doctors.length - itemsPerView);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.03),transparent_55%)]" />
      <div
        className="pointer-events-none absolute -right-20 top-16 h-64 w-64 rounded-full bg-red-600/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 bottom-8 h-48 w-48 rounded-full bg-red-500/8 blur-3xl"
        aria-hidden
      />

      <div className="page-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-0.5 w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Our Experts
            </span>
            <div className="h-0.5 w-12 bg-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Meet Our <span className="text-red-600">Specialists</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Experienced physicians and leaders dedicated to delivering compassionate,
            high-quality care across every specialty at MAPIMS.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden py-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.name}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="group relative flex h-full min-h-[280px] flex-col items-center gap-5 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6"
                  >
                    <div
                      className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-600/5 transition-transform duration-500 group-hover:scale-150"
                      aria-hidden
                    />

                    <DoctorPortrait image={doctor.image} name={doctor.name} />

                    <div className="relative flex min-w-0 flex-1 flex-col justify-between text-center sm:text-left">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-600">
                          <Stethoscope className="h-3.5 w-3.5" />
                          {doctor.specialty}
                        </div>
                        <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600 sm:text-xl">
                          {doctor.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                          {doctor.designation}
                        </p>
                      </div>

                      <Link
                        href="/#book-appointment"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 sm:w-fit"
                      >
                        <Calendar className="h-4 w-4" />
                        Book Appointment
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i
                      ? "w-8 bg-red-600"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goToSlide(currentIndex - 1)}
                disabled={currentIndex === 0}
                aria-label="Previous doctors"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}
                aria-label="Next doctors"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
