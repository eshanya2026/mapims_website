"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CareersIntro() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.05),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.04),transparent_50%)]" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-600 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Explore Opportunities
          </span>

          <h2 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.5rem]">
            Unlock Excellence{" "}
            <span className="text-red-600">|</span> Redefine the Future of Healthcare
          </h2>

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-left sm:mt-10 sm:text-center">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              What&apos;s next for you? Whether it&apos;s pioneering medical advancements,
              enhancing your clinical expertise, or becoming a part of a dedicated community of
              healthcare professionals, your journey begins here. At our hospital, we provide
              state-of-the-art resources, expert guidance, and a supportive environment to help
              you thrive.
            </p>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Join us in delivering exceptional patient care, advancing medical knowledge, and
              transforming healthcare standards. Together, let&apos;s create a healthier tomorrow.
            </p>
          </div>

          <div className="mx-auto mt-10 h-1 w-16 rounded-full bg-red-600" />
        </motion.div>
      </div>
    </section>
  );
}
