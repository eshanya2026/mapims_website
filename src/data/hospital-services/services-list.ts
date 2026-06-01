/** Lightweight listing data — safe for client components (no full service modules). */
export type ServiceCategory = "emergency" | "surgical" | "diagnostics" | "specialty";

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
  { id: "emergency", label: "Emergency & ICU" },
  { id: "surgical", label: "Surgical" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "specialty", label: "Specialty Care" },
];

export const servicesList: ServiceListItem[] = [
  {
    slug: "accident-emergency-services",
    path: "/services/accident-emergency-services",
    label: "Accident & Emergency Services",
    description:
      "24/7 emergency and trauma care with rapid triage, advanced diagnostics, and critical care support.",
    image: "/images/international/casualty.png",
    category: "emergency",
  },
  {
    slug: "anaesthesiology",
    path: "/services/anaesthesiology",
    label: "Anaesthesiology",
    description:
      "Expert anesthesia, ICU critical care, and pain medicine with round-the-clock specialist teams.",
    image: "/images/international/anaesthesiology.png",
    category: "emergency",
  },
  {
    slug: "general-surgery",
    path: "/services/general-surgery",
    label: "General Surgery",
    description:
      "Comprehensive surgical care for abdominal, gastrointestinal, and related conditions.",
    image: "/images/international/general sur.png",
    category: "surgical",
  },
  {
    slug: "cardiovascular-thoracic-surgery",
    path: "/services/cardiovascular-thoracic-surgery",
    label: "Cardiovascular & Thoracic Surgery",
    description:
      "Heart and chest surgery programmes with experienced surgeons and modern operating facilities.",
    image: "/images/international/cardio.png",
    category: "surgical",
  },
  {
    slug: "spinal-surgeries",
    path: "/services/spinal-surgeries",
    label: "Spinal Surgeries",
    description:
      "Specialized spine care from minimally invasive procedures to complex spinal surgery.",
    image: "/images/international/spiral.png",
    category: "surgical",
  },
  {
    slug: "surgical-oncology",
    path: "/services/surgical-oncology",
    label: "Surgical Oncology",
    description:
      "Cancer surgery with multidisciplinary planning and advanced oncologic surgical techniques.",
    image: "/images/international/spinal oncology.png",
    category: "surgical",
  },
  {
    slug: "central-laboratory",
    path: "/services/central-laboratory",
    label: "Central Laboratory",
    description:
      "Accurate diagnostics with advanced lab technology and timely reporting for inpatient and outpatient care.",
    image: "/images/international/central lab.png",
    category: "diagnostics",
  },
  {
    slug: "radiology-imaging-science",
    path: "/services/radiology-imaging-science",
    label: "Radiology & Imaging Science",
    description:
      "Advanced imaging including CT, MRI, and ultrasound with expert radiologist interpretation.",
    image: "/images/international/imaging science.png",
    category: "diagnostics",
  },
  {
    slug: "interventional-radiology",
    path: "/services/interventional-radiology",
    label: "Interventional Radiology",
    description:
      "Minimally invasive, image-guided procedures for precise diagnosis and treatment.",
    image: "/images/international/radiologyu.png",
    category: "diagnostics",
  },
  {
    slug: "dermatology",
    path: "/services/dermatology",
    label: "Dermatology",
    description:
      "Medical and cosmetic dermatology for skin conditions, allergies, and advanced skin treatments.",
    image: "/images/international/derma.png",
    category: "specialty",
  },
  {
    slug: "hemodialysis",
    path: "/services/hemodialysis",
    label: "Hemodialysis",
    description:
      "Renal dialysis services with dedicated units and experienced nephrology support.",
    image: "/images/international/Hemodialogy.png",
    category: "specialty",
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
