"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Leaf,
  Sun,
  Droplets,
  Recycle,
  Trash2,
  TreePine,
  Sparkles,
  Phone,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Wind,
  Lightbulb,
  Building,
} from "lucide-react";

const ecoPillars = [
  {
    icon: TreePine,
    title: "Green Campus",
    desc: "Extensive tree plantation and lush landscaped native greenery fostering clean oxygen and a healing environment.",
  },
  {
    icon: Sun,
    title: "Solar Energy",
    desc: "Harnessing clean, renewable solar power to support hospital energy needs and reduce carbon emissions.",
  },
  {
    icon: Droplets,
    title: "Water Management",
    desc: "Advanced Sewage Treatment (STP) and Effluent Treatment (ETP) recycling water for campus landscaping.",
  },
  {
    icon: Trash2,
    title: "Responsible Waste",
    desc: "Strict biomedical waste segregation and systematic recycling protocols protecting public health.",
  },
];

const greenInitiatives = [
  {
    number: "01",
    title: "Green Campus Development",
    desc: "Promoting tree plantation and maintaining expansive green spaces and landscaped gardens across the hospital campus.",
    icon: TreePine,
    badge: "Campus Ecology",
  },
  {
    number: "02",
    title: "Renewable Energy",
    desc: "Utilizing solar energy to support sustainable energy practices and reduce dependence on conventional power sources.",
    icon: Sun,
    badge: "Clean Energy",
  },
  {
    number: "03",
    title: "Water Management",
    desc: "Supporting responsible water management through sewage and effluent treatment systems with 100% recycled landscape irrigation.",
    icon: Droplets,
    badge: "Water Conservation",
  },
  {
    number: "04",
    title: "Plastic Reduction",
    desc: "Encouraging the reduction of single-use plastics and promoting environmentally responsible, biodegradable alternatives.",
    icon: Recycle,
    badge: "Zero Single-Use Plastic",
  },
  {
    number: "05",
    title: "Responsible Waste Management",
    desc: "Following appropriate practices for the segregation, handling, and safe certified disposal of healthcare and general waste.",
    icon: Trash2,
    badge: "Waste Stewardship",
  },
  {
    number: "06",
    title: "Environmental Awareness",
    desc: "Encouraging staff, students, patients, and visitors to participate in environmentally responsible practices and conservation drives.",
    icon: Leaf,
    badge: "Eco Awareness",
  },
];

const greenEnvironmentPillars = [
  {
    title: "Energy & Carbon Efficiency",
    desc: "High-efficiency LED illumination, energy-smart air management systems, and solar thermal water heating significantly minimize our environmental footprint.",
    icon: Lightbulb,
  },
  {
    title: "Natural Light & Air Quality",
    desc: "Architectural designs prioritizing natural day-lighting, ventilation corridors, and non-toxic materials promoting therapeutic recovery.",
    icon: Wind,
  },
  {
    title: "Sustainable Campus Infrastructure",
    desc: "Rainwater harvesting structures, permeable paving, and green buffer belts conserving soil and local groundwater reserves.",
    icon: Building,
  },
];

export default function SustainabilityServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28 pb-16 lg:pt-36 lg:pb-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-red-500/10 blur-[100px]" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-red-400 font-semibold">
              Sustainability &amp; Green Healthcare
            </span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-red-400" />
                Caring for Health, Caring for the Environment
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Sustainability &amp;</span>
                <span className="block mt-1">
                  <span className="text-red-500">Green Healthcare</span>
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                At Adhiparasakthi Hospitals, we recognize that a healthy
                environment contributes to a healthier community. Our
                sustainability initiatives focus on responsible resource
                management, environmental conservation, waste reduction, and the
                adoption of greener practices across the hospital campus.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#green-initiatives"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Leaf className="h-4 w-4" />
                  Explore Green Initiatives
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Campus Desk: +91 94990 59966</span>
                </a>
              </div>
            </motion.div>

            {/* Right Card / Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/services/sustainability-green-healthcare-hero.jpg"
                    alt="Eco-friendly green hospital campus at Adhiparasakthi Hospitals"
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/95 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      <Sun className="h-3.5 w-3.5" />
                      Solar Powered &amp; Eco-Conscious Campus
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars Strip */}
      <section className="relative z-10 -mt-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ecoPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/40 transition-all hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Green Initiatives */}
      <section id="green-initiatives" className="section-padding py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Leaf className="h-3.5 w-3.5" />
              Environmental Action
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Green Initiatives
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Proactive measures across energy, water, waste, and campus greening creating a cleaner healing environment.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {greenInitiatives.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Sustainable Practice</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Building a Greener Healthcare Environment */}
      <section className="section-padding bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Building className="h-3.5 w-3.5" />
              Eco-Friendly Operations
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Building a Greener Healthcare Environment
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Our approach to green healthcare extends beyond patient care. We continually work towards creating a cleaner, safer, and more sustainable hospital environment through responsible use of energy, water, and other resources.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {greenEnvironmentPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-red-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Commitment Banner (Horizontal Rectangle at last) */}
      <section className="section-padding py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1 min-w-0 max-w-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Our Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                  Integrating Environmental Responsibility With Healthcare Delivery
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm max-w-3xl">
                  Adhiparasakthi Hospitals remains committed to integrating
                  environmental responsibility with healthcare delivery. Through
                  sustainable practices and continued green initiatives, we aim
                  to contribute to the well-being of our patients, our community,
                  and the environment.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>Call: +91 94990 59966</span>
                </a>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Enquire Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
