"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Target, Eye, CheckCircle2, Quote, HeartPulse } from "lucide-react";

const missionPoints = [
  "To offer affordable, high-quality healthcare services to the community, ensuring that every individual receives personalized and compassionate care.",
  "To integrate modern medical practices with a human-centered approach, addressing the physical, mental, and spiritual well-being of patients.",
  "To continuously innovate and upgrade our healthcare technologies and practices, staying at the forefront of medical advancements.",
  "To foster an environment of education and training for healthcare professionals, enabling them to serve with skill, dedication, and compassion.",
  "To contribute to community health initiatives and awareness programs, promoting preventive care and a healthier society.",
  "To create a healthy society with responsibility.",
];

const visionPoints = [
  "Medical research is constantly pushing the boundaries of health care and redefining what is and isn't possible. At an academic health system such as Adhiparasakthi Hospitals Health Care, physicians from every field of medicine work together to offer comprehensive care.",
  "Our patients have access to the latest treatments and research. To continually upgrade the infrastructure with state of art technology to serve all the patients.",
  "Our team approach takes into account all their needs, so that in good or poor health, they receive personalized attention.",
];

function PanelHeader({
  icon: Icon,
  subtitle,
  title,
}: {
  icon: typeof Target;
  subtitle: string;
  title: string;
}) {
  return (
    <header className="bg-red-600 px-6 py-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-white/75 text-xs font-medium uppercase tracking-wider">{subtitle}</p>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </header>
  );
}

function PanelBody({ children }: { children: ReactNode }) {
  return <div className="p-6 md:p-8">{children}</div>;
}

function DividerEmblem({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center w-11 h-11 rounded-full bg-white border-[3px] border-red-600 shadow-md ${className}`}
      aria-hidden
    >
      <HeartPulse className="w-5 h-5 text-red-600" />
    </div>
  );
}

export default function MissionVisionSection() {
  return (
    <div id="mission-vision">
      <div className="text-center mb-10">
        <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Our Purpose</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
          Mission <span className="text-red-600">&</span> Vision
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden"
      >
        {/* Desktop — vertical divider with emblem */}
        <div
          className="hidden lg:flex absolute inset-y-0 left-1/2 -translate-x-1/2 z-10 flex-col items-center pointer-events-none"
          aria-hidden
        >
          <div className="w-3 h-3 rotate-45 bg-red-600 rounded-sm mt-10 shrink-0" />
          <div className="flex-1 w-px min-h-[60px] bg-gradient-to-b from-red-600/80 via-red-600 to-red-600/80 my-2" />
          <DividerEmblem className="shrink-0 ring-4 ring-white" />
          <div className="flex-1 w-px min-h-[60px] bg-gradient-to-b from-red-600/80 via-red-600 to-red-600/80 my-2" />
          <div className="w-3 h-3 rotate-45 bg-red-600 rounded-sm mb-10 shrink-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Mission */}
          <section id="mission" className="flex flex-col lg:pr-4">
            <PanelHeader icon={Target} subtitle="What we do" title="Our Mission" />
            <PanelBody>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                The Adhiparasakthi medical family is selflessly working every day, dedicating their lives to improve the lives of people, many of whom are poor ones belonging to the lower socioeconomic class of surrounding villages from agricultural background. His Holiness Arul Thiru Bangaru Adigalar&apos;s mission of humane healthcare delivery is accomplished through several instruments: the super specialty hospitals, community care, medical camps, preventive healthcare, health maintenance and education. His teachings and exemplary life have inspired thousands of individuals who administer care for patients.
              </p>
              <ul className="space-y-3">
                {missionPoints.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </PanelBody>
          </section>

          {/* Mobile — horizontal divider */}
          <div className="lg:hidden flex items-center gap-4 px-8 py-5 bg-slate-50 border-y border-red-100">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-300" />
            <DividerEmblem />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-300" />
          </div>

          {/* Vision */}
          <section id="vision" className="flex flex-col lg:pl-4">
            <PanelHeader icon={Eye} subtitle="Where we're headed" title="Our Vision" />
            <PanelBody>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 relative">
                <Quote className="w-5 h-5 text-red-300 absolute top-3 right-3" />
                <p className="text-slate-600 text-sm leading-relaxed italic pr-4">
                  To be a leading healthcare institution, providing world-class medical services rooted in compassion, innovation, and holistic healing, inspired by the teachings of Adhiparasakthi. We aim to make quality healthcare accessible to all, while nurturing a healthy and resilient society.
                </p>
              </div>
              <ul className="space-y-3">
                {visionPoints.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </PanelBody>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
