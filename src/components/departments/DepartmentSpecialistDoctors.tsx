"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DepartmentSpecialist } from "@/data/department-specialist";

const accentGradients: Record<DepartmentSpecialist["accent"], string> = {
  primary: "from-red-500 via-red-600 to-rose-600",
  deep: "from-red-700 via-red-800 to-rose-800",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      <div className="h-0.5 w-12 bg-red-600" />
      <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
        {children}
      </span>
      <div className="h-0.5 w-12 bg-red-600" />
    </div>
  );
}

function DoctorPortrait({ doctor }: { doctor: DepartmentSpecialist }) {
  return (
    <div className="relative h-[168px] w-[130px] shrink-0 overflow-hidden sm:h-[180px] sm:w-[140px]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentGradients[doctor.accent]} opacity-95 transition-opacity duration-300 group-hover:opacity-100`}
        style={{
          borderRadius: "58% 42% 38% 62% / 48% 52% 48% 52%",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-[6px] overflow-hidden bg-white/10"
        style={{
          borderRadius: "55% 45% 40% 60% / 50% 50% 46% 54%",
        }}
      >
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

type DepartmentSpecialistDoctorsProps = {
  departmentSlug: string;
  specialists: DepartmentSpecialist[];
  embedded?: boolean;
};

export default function DepartmentSpecialistDoctors({
  departmentSlug,
  specialists,
  embedded = false,
}: DepartmentSpecialistDoctorsProps) {
  return (
    <section
      className={cn(
        "bg-slate-50 py-12 md:py-16",
        embedded ? "border-b border-slate-100" : "border-t border-slate-100"
      )}
    >
      <div className={cn(embedded ? "" : "container mx-auto px-4")}>
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Meet Our <span className="text-red-600">Specialists</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {specialists.map((doctor, index) => (
            <motion.article
              key={doctor.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -8 }}
              className="group flex items-stretch gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-red-100 hover:shadow-xl hover:shadow-slate-200/50 sm:gap-5 sm:p-5"
            >
              <DoctorPortrait doctor={doctor} />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div>
                  <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600 sm:text-lg">
                    {doctor.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-red-700">
                    {doctor.degree}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">Exp:</span>{" "}
                    {doctor.experience}
                  </p>
                  <p className="mt-1 text-sm font-medium text-red-600">
                    {doctor.designation}
                  </p>
                </div>
                <Link
                  href="/#book-appointment"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-md hover:shadow-red-600/25"
                >
                  Know More
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
