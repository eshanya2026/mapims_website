"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr.T.Ramesh",
    specialty: "Medical Director",
    image: "/images/doctor/ramesh.jpg",
    bio: "Leads MAPIMS with a focus on clinical excellence, patient safety, and coordinated care across all specialties.",
  },
  {
    id: 2,
    name: "Dr. S. KUMARESAN",
    specialty: "Head of Transplant Anesthesia",
    image: "/images/doctor/Dr.Kumaresan.jpg",
    bio: "Specialises in anaesthesia for organ transplant and high-risk surgeries, ensuring safe perioperative care at every stage.",
  },
  {
    id: 3,
    name: "DR.R. RAMA KRISHNAN",
    specialty: "Consultant Urologist",
    image: "/images/doctor/ramakrishan.jpg",
    bio: "Provides expert diagnosis and treatment for urological conditions, from kidney stones to advanced endoscopic procedures.",
  },
  {
    id: 4,
    name: "Dr. Umesh Raj Somasundaram",
    specialty: "Advanced Laparoscopic & General Surgery",
    image: "/images/doctor/Dr.UmeshRaj.jpg",
    bio: "Performs minimally invasive laparoscopic and general surgical procedures with a focus on faster recovery and precise outcomes.",
  },
  {
    id: 5,
    name: "Dr A. Rekha",
    specialty: "Medical Superintendent",
    image: "/images/doctor/rekha.jpg",
    bio: "Oversees hospital operations and quality standards, ensuring smooth, compassionate care for every patient who walks through our doors.",
  },
];

function DoctorPortrait({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative mx-auto h-[220px] w-[170px] shrink-0 overflow-hidden sm:mx-0 sm:h-[240px] sm:w-[185px]">
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
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function DoctorShowcase() {
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
    <section className="section-padding relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.05),transparent_50%)]" />
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-red-600/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden
      />

      <div className="page-container relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
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
            Highly qualified physicians and surgeons delivering compassionate,
            patient-centred care across every specialty at MAPIMS.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden py-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <article className="group relative flex h-full min-h-[300px] flex-col items-center gap-5 overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:border-red-100 hover:shadow-xl hover:shadow-slate-200/50 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6">
                    <div
                      className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-600/5 transition-transform duration-500 group-hover:scale-150"
                      aria-hidden
                    />

                    <DoctorPortrait image={doctor.image} name={doctor.name} />

                    <div className="relative flex min-w-0 flex-1 flex-col justify-between text-center sm:text-left">
                      <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-600">
                          <Stethoscope className="h-3.5 w-3.5" />
                          MAPIMS Specialist
                        </div>
                        <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600 sm:text-2xl">
                          {doctor.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-red-600 sm:text-base">
                          {doctor.specialty}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
                          {doctor.bio}
                        </p>
                      </div>

                      <Link
                        href="/#book-appointment"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-red-600 bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/25 sm:w-fit"
                      >
                        Book Consult
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
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
