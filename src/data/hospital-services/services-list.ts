/** Lightweight listing data — safe for client components (no full service modules). */
export type ServiceCategory = "clinical" | "emergency" | "diagnostics" | "support";

export type ServiceListItem = {
  slug: string;
  path: string;
  label: string;
  description: string;
  image: string;
  category: ServiceCategory;
};

export const serviceCategories: {
  id: ServiceCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All Services" },
  { id: "clinical", label: "Clinical & Inpatient" },
  { id: "emergency", label: "Emergency & 24/7" },
  { id: "diagnostics", label: "Diagnostics & Health Checks" },
  { id: "support", label: "Support & Rehabilitation" },
];

export const servicesList: ServiceListItem[] = [
  {
    slug: "outpatient-service",
    path: "/services/outpatient-service",
    label: "Outpatient Service",
    description:
      "Medical consultations, clinical evaluations, follow-up care, and free OP pharmacy for certain prescribed drugs across medical and surgical specialties.",
    image: "/images/services/opd-care-hero.jpg",
    category: "clinical",
  },
  {
    slug: "inpatient-service",
    path: "/services/inpatient-service",
    label: "Inpatient Service",
    description:
      "Round-the-clock inpatient hospitalization with intensive nursing care, modern private deluxe rooms, general wards, dedicated ICUs, and free IP pharmacy for certain drugs.",
    image: "/images/services/inpatient-room-hero.jpg",
    category: "clinical",
  },
  {
    slug: "blood-bank",
    path: "/services/blood-bank",
    label: "Blood Bank",
    description:
      "24/7 fully licensed blood transfusion center equipped with advanced component separation for PRBC, platelets, plasma, and cryoprecipitate.",
    image: "/images/services/blood-bank-slide-1.webp",
    category: "emergency",
  },
  {
    slug: "master-health-checkup",
    path: "/services/master-health-checkup",
    label: "Master Health Checkup",
    description:
      "Tailored executive, cardiac, diabetic, and whole-body preventive health screening packages with same-day comprehensive reporting.",
    image: "/images/services/master-health-checkup-hero.jpg",
    category: "diagnostics",
  },
  {
    slug: "24hrs-pharmacy",
    path: "/services/24hrs-pharmacy",
    label: "24hrs Pharmacy",
    description:
      "Fully stocked 24/7 hospital dispensary supplying authentic prescription medicines, critical emergency drugs, and surgical consumables.",
    image: "/images/services/pharmacy-dispensing-hero.png",
    category: "emergency",
  },
  {
    slug: "ambulance-services",
    path: "/services/ambulance-services",
    label: "Ambulance Services",
    description:
      "24/7 Advanced Cardiac Life Support (ACLS) and Basic Life Support (BLS) mobile intensive care ambulance fleet with GPS emergency tracking.",
    image: "/images/services/ambulance-emergency-hero.jpg",
    category: "emergency",
  },
  {
    slug: "physiotherapy",
    path: "/services/physiotherapy",
    label: "Physiotherapy",
    description:
      "Evidence-based physical rehabilitation, post-surgical recovery, neuro-rehab, sports injury conditioning, and pain-relief electrotherapy.",
    image: "/images/services/physiotherapy-rehab-hero.jpg",
    category: "support",
  },
  {
    slug: "laboratory",
    path: "/services/laboratory",
    label: "Laboratory",
    description:
      "State-of-the-art diagnostic laboratory offering automated biochemistry, clinical pathology, microbiology, hematology, and rapid testing.",
    image: "/images/services/lab-slide-1.webp",
    category: "diagnostics",
  },
  {
    slug: "dialysis-services",
    path: "/services/dialysis-services",
    label: "Dialysis Services (Hemodialysis)",
    description:
      "One of the region's largest renal dialysis centers featuring 26+ modern dialyzers, ICU dia-filtration, and dedicated hepatitis-safe units.",
    image: "/images/services/dialysis-hemodialysis-hero.png",
    category: "support",
  },
  {
    slug: "insurance",
    path: "/services/insurance",
    label: "Insurance & Corporate Cashless Services",
    description:
      "Dedicated TPA and insurance helpdesk providing hassle-free cashless hospitalization, CMCHIS scheme benefits, and private insurance coordination.",
    image: "/images/services/insurance-tpa-hero.png",
    category: "support",
  },
  {
    slug: "bliss-skill-simulation-lab",
    path: "/services/bliss-skill-simulation-lab",
    label: "Bliss Skill Simulation Lab",
    description:
      "Structured simulation-based clinical training, high-fidelity emergency drills, ACLS/BCLS resuscitation certification, and hands-on skill development for healthcare professionals.",
    image: "/images/services/bliss-skill-lab-hero.jpg",
    category: "support",
  },
  {
    slug: "community-outreach-services",
    path: "/services/community-outreach-services",
    label: "Community Outreach",
    description:
      "Extending healthcare beyond hospital walls through free medical screening camps, health awareness drives, eye camps, and government scheme support.",
    image: "/images/services/community-outreach-hero.jpg",
    category: "support",
  },
  {
    slug: "sustainability-green-healthcare",
    path: "/services/sustainability-green-healthcare",
    label: "Sustainability & Green Healthcare",
    description:
      "Responsible resource management, rooftop solar energy, water recycling (STP/ETP), plastic reduction, and green campus eco-initiatives.",
    image: "/images/services/sustainability-green-healthcare-hero.jpg",
    category: "support",
  },
];

export const serviceCards = servicesList.map((s) => ({
  slug: s.slug,
  href: s.path,
  title: s.label,
  description: s.description,
  image: s.image,
  category: s.category,
}));
