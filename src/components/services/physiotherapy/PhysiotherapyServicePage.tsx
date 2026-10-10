"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Clock,
  Bone,
  Brain,
  Zap,
  Dumbbell,
  HeartPulse,
  Flame,
  Award,
  Calendar,
  Building2,
} from "lucide-react";

const physioPillars = [
  {
    icon: Bone,
    title: "Post-Surgical Recovery",
    desc: "Accelerated rehabilitation protocols following joint replacements, trauma fixations, and ligament repairs.",
  },
  {
    icon: Brain,
    title: "Neurological Relearning",
    desc: "Targeted balance retraining, motor recovery, and spasticity care for stroke and neurological patients.",
  },
  {
    icon: Zap,
    title: "Advanced Modalities",
    desc: "Targeted electrotherapy, SWD, ultrasound, and mechanical traction relieving pain and muscle spasms.",
  },
  {
    icon: HeartPulse,
    title: "Bedside ICU Mobilization",
    desc: "Early postoperative physical therapy starting Day 1 to prevent DVT, stiffness, and muscle wasting.",
  },
];

const physioWorkflow = [
  {
    step: "01",
    title: "Clinical Evaluation",
    desc: "Comprehensive physical assessment, joint range-of-motion testing, and biomechanical pain mapping.",
    icon: Activity,
  },
  {
    step: "02",
    title: "Tailored Care Plan",
    desc: "Personalized therapeutic roadmap created in synergy with orthopedic, neuro, and spine surgeons.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Modalities & Exercise",
    desc: "Combining pain-relieving electrotherapy, joint mobilization, gym strengthening, and gait retraining.",
    icon: Dumbbell,
  },
  {
    step: "04",
    title: "Active Home Wellness",
    desc: "Ergonomic postural education, functional milestone training, and progressive home exercise routines.",
    icon: HeartHandshake,
  },
];

const rehabilitationSpecialties = [
  {
    number: "01",
    title: "Orthopedic & Post-Surgical Rehabilitation",
    desc: "Accelerated recovery protocols following total knee replacement, hip arthroplasty, fracture fixations, and ligament reconstructions.",
    icon: Bone,
    badge: "Ortho Recovery",
  },
  {
    number: "02",
    title: "Neurological Rehabilitation",
    desc: "Motor relearning, balance retraining, and spasticity management for stroke survivors, Parkinson’s disease, spinal cord injuries, and cerebral palsy.",
    icon: Brain,
    badge: "Neuro Care",
  },
  {
    number: "03",
    title: "Spine & Postural Care",
    desc: "Targeted core stabilization, McKenzie therapy, and decompression for disc herniations, sciatica, and cervical/lumbar spondylosis.",
    icon: Activity,
    badge: "Spine & Core",
  },
  {
    number: "04",
    title: "Cardiopulmonary Physiotherapy",
    desc: "Chest clearance techniques, incentive spirometry, and graded aerobic endurance training for post-CABG and ICU patients.",
    icon: HeartPulse,
    badge: "Cardiopulmonary",
  },
  {
    number: "05",
    title: "Sports Injury Management",
    desc: "Biomechanical assessment, athletic taping, eccentric muscle loading, and safe return-to-sport conditioning.",
    icon: Zap,
    badge: "Sports Rehab",
  },
  {
    number: "06",
    title: "Pediatric Physiotherapy",
    desc: "Developmental delay interventions, sensory motor stimulation, and developmental milestones training for growing children.",
    icon: Sparkles,
    badge: "Pediatric",
  },
];

const whyChoosePhysio = [
  {
    title: "One-on-One Dedicated Attention",
    desc: "Individualized therapy delivered by experienced, university-qualified physiotherapists.",
  },
  {
    title: "Multidisciplinary Medical Integration",
    desc: "Evidence-based clinical protocols coordinated directly with orthopedic, spine, and neuro specialists.",
  },
  {
    title: "Well-Equipped Modern Gym",
    desc: "Spacious rehabilitation gymnasium furnished with parallel bars, traction, and electrotherapy modalities.",
  },
  {
    title: "Tailored Independence Roadmaps",
    desc: "Focused therapeutic goals restoring pain-free functional movement, balance, and daily freedom.",
  },
];

export default function PhysiotherapyServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28 pb-16 lg:pt-36 lg:pb-24 text-white">
        {/* Glow ambient background */}
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
              Physiotherapy &amp; Rehabilitation
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
                Advanced Physiotherapy &amp; Rehabilitation
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-red-500">Physiotherapy</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                The Department of Physiotherapy and Physical Rehabilitation at
                Adhiparasakthi Hospitals helps patients regain movement, rebuild
                functional independence, and relieve chronic musculoskeletal
                pain. Working in close collaboration with orthopedic surgeons,
                neurologists, spine specialists, and intensivists, our team of
                qualified physiotherapists designs customized therapeutic
                protocols combining electrotherapy, manual mobilization, gait
                retraining, and restorative exercise.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Book Evaluation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Call Desk: +91 94990 59966</span>
                </Link>
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
                    src="/images/services/physiotherapy-rehab-hero.jpg"
                    alt="Physical Rehabilitation and Physiotherapy Department at Adhiparasakthi Hospitals"
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
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
            {physioPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed sm:text-sm">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 4-Stage Rehabilitation Journey */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Sparkles className="h-3.5 w-3.5" />
              Structured Recovery Roadmap
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Your Physical Rehabilitation Journey
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              A progressive therapeutic process designed to restore functional
              mobility and rebuild active life confidence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {physioWorkflow.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-red-600/40">
                    {item.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comprehensive Rehabilitation Specialties (Exact user list) */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Award className="h-3.5 w-3.5" />
              Specialized Clinical Care
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Comprehensive Rehabilitation Specialties
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Specialized clinical therapy streams covering post-surgical care,
              neurology, spine wellness, sports, and pediatrics.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rehabilitationSpecialties.map((specialty, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 transition-all hover:border-red-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100/80 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <specialty.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                    {specialty.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">
                  {specialty.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {specialty.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-Depth Dual Showcase Section */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left Showcase: Modern Modalities & Therapeutic Equipment */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <Zap className="h-3.5 w-3.5" />
                Equipment &amp; Facilities
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Modern Modalities &amp; Therapeutic Equipment
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Advanced physiological modalities accelerating tissue healing,
                alleviating deep muscular spasm, and restoring strength.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Advanced Electrotherapy
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Short Wave Diathermy (SWD), Ultrasound Therapy (UST),
                      Interferential Therapy (IFT), and TENS for targeted,
                      non-invasive pain relief.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Mechanical Traction Units
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Motorized intermittent lumbar and cervical traction units
                      for nerve root decompression and spinal relief.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Therapeutic Exercise Gymnasium
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Parallel walking bars, quadriceps exercise tables,
                      balance boards, wobble cushions, and resistant exercise
                      pulleys.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Hydrocollator Packs &amp; Cryotherapy
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Moist heat hydrocollator units and specialized cryotherapy
                      for acute soft-tissue inflammation and stiffness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Showcase: Inpatient & Outpatient Therapy Sessions */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <HeartPulse className="h-3.5 w-3.5" />
                Continuum of Care
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Inpatient &amp; Outpatient Therapy Sessions
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Seamless progression from bedside hospital mobilization to
                outpatient therapy and independent lifestyle wellness.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Early Bedside ICU &amp; Ward Mobilization
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Daily bedside mobilization for ICU and inpatient ward
                      patients starting Day 1 after surgery to prevent DVT,
                      atelectasis, and muscle wasting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Flexible Outpatient Department Hours
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Convenient morning and evening appointment slots designed
                      around working professionals, students, and seniors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Ergonomics &amp; Home Exercise Guidance
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Ergonomic counseling, workplace postural education, and
                      personalized home exercise programs ensuring sustained,
                      long-term wellness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Physiotherapy Department? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Patient-Focused Excellence
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Physiotherapy Department?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Dedicated rehabilitative care centered on functional
              independence, personalized attention, and proven recovery.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoosePhysio.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100/70 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Hospital Commitment Banner (Last Position) */}
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <Activity className="h-3.5 w-3.5" />
                  Movement &amp; Wellness Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Restore Your Strength, Balance &amp; Freedom of Movement
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  Restore your strength, balance, and freedom of movement. Book
                  an evaluation with our Physiotherapy and Rehabilitation
                  Department at Adhiparasakthi Hospitals by calling +91 94990
                  59966.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Book Evaluation
                </Link>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  +91 94990 59966
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
