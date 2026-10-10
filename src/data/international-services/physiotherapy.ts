import type { InternationalServiceData } from "@/data/international-services/types";

export const physiotherapyPath = "/services/physiotherapy";

export const physiotherapyService: InternationalServiceData = {
  slug: "physiotherapy",
  path: physiotherapyPath,
  sectionLabel: "Physical Rehabilitation",
  title: "Advanced",
  titleHighlight: "Physiotherapy & Rehabilitation",
  seoTitle: "Physiotherapy & Physical Rehabilitation Services | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Physiotherapy",
  heroBadge: "Rehabilitation & Mobility",
  heroSubtitle:
    "Evidence-based physical therapy, neuro-rehabilitation, orthopedic recovery, sports conditioning, and cardiopulmonary physical therapy at Melmaruvathur.",
  intro:
    "The Department of Physiotherapy and Physical Rehabilitation at Adhiparasakthi Hospitals helps patients regain movement, rebuild functional independence, and relieve chronic musculoskeletal pain. Working in close collaboration with orthopedic surgeons, neurologists, spine specialists, and intensivists, our team of qualified physiotherapists designs customized therapeutic protocols combining electrotherapy, manual mobilization, gait retraining, and restorative exercise.",
  sections: [
    {
      title: "Comprehensive Rehabilitation Specialties",
      items: [
        "Orthopedic & Post-Surgical Rehabilitation: Accelerated recovery protocols following total knee replacement, hip arthroplasty, fracture fixations, and ligament reconstructions.",
        "Neurological Rehabilitation: Motor relearning, balance retraining, and spasticity management for stroke survivors, Parkinson’s disease, spinal cord injuries, and cerebral palsy.",
        "Spine & Postural Care: Targeted core stabilization, McKenzie therapy, and decompression for disc herniations, sciatica, and cervical/lumbar spondylosis.",
        "Cardiopulmonary Physiotherapy: Chest clearance techniques, incentive spirometry, and graded aerobic endurance training for post-CABG and ICU patients.",
        "Sports Injury Management: Biomechanical assessment, athletic taping, eccentric muscle loading, and safe return-to-sport conditioning.",
        "Pediatric Physiotherapy: Developmental delay interventions, sensory motor stimulation, and developmental milestones training.",
      ],
    },
    {
      title: "Modern Modalities & Therapeutic Equipment",
      items: [
        "Advanced Electrotherapy: Short Wave Diathermy (SWD), Ultrasound Therapy (UST), Interferential Therapy (IFT), and TENS for targeted pain relief.",
        "Mechanical Traction: Motorized intermittent lumbar and cervical traction units.",
        "Exercise Gymnasium: Parallel walking bars, quadriceps exercise tables, therapeutic balance boards, wobble cushions, and resistant exercise pulleys.",
        "Moist heat hydrocollator packs and cryotherapy units for acute soft-tissue inflammation.",
      ],
    },
    {
      title: "Inpatient & Outpatient Therapy Sessions",
      items: [
        "Daily bedside mobilization for ICU and inpatient ward patients starting from Day 1 after surgery to prevent DVT and muscle wasting.",
        "Outpatient physical therapy department offering flexible morning and evening appointment slots.",
        "Ergonomic counseling, postural education, and personalized home exercise programs for sustained long-term wellness.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our Physiotherapy Department?",
  whyChoose: [
    "One-on-one attention from experienced, university-qualified physiotherapists",
    "Evidence-based multidisciplinary approach with orthopedic and neuro backup",
    "Well-equipped, spacious rehabilitation gym with modern electrotherapy modalities",
    "Tailored exercise roadmaps focused on functional independence and pain freedom",
  ],
  closing:
    "Restore your strength, balance, and freedom of movement. Book an evaluation with our Physiotherapy and Rehabilitation Department at Adhiparasakthi Hospitals by calling +91 94990 59966.",
  image: "/images/services/physiotherapy-rehab-hero.jpg",
  heroImage: "/images/services/physiotherapy-rehab-hero.jpg",
};
