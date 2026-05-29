"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { internationalWelcome } from "@/data/international-patients";
import { internationalCarePath } from "@/data/international-patient-care";

export default function InternationalWelcome() {
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
              Welcome to{" "}
              <span className="text-red-600">Adhiparasakthi Hospitals</span>{" "}
              International patients care
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {internationalWelcome.preview}
            </p>
            <Link
              href={internationalCarePath}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              More Details
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="/images/international/global-healthcare.png"
              alt="Global healthcare — stethoscope and world globe representing international patient care"
              className="w-full aspect-[4/3] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
