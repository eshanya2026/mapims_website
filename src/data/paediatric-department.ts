import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const paediatricIntro = {
  preview:
    "At Adhiparasakthi Hospitals, we understand that children require specialized and compassionate care.",
  full: "Our Paediatric Department is dedicated to providing top-notch medical services tailored to the unique needs of young patients, from infancy through adolescence. Experience exceptional paediatric care at Adhiparasakthi Hospitals, where your child's health is our top priority.",
};

export const whyChoosePaediatric = [
  {
    title: "Expert Team",
    description:
      "Our paediatricians and specialists are highly trained and experienced in treating a wide range of childhood conditions.",
  },
  {
    title: "Family-Centered Care",
    description:
      "We involve families in the care process to ensure a supportive and holistic approach to treatment.",
  },
  {
    title: "Compassionate Approach",
    description:
      "We prioritize a comforting environment for both patients and their families at every visit.",
  },
  {
    title: "Advanced Child Facilities",
    description:
      "Child-friendly wards, modern operating theatres, PICU, NICU, and comprehensive diagnostic services.",
  },
];

export const paediatricServicesIntro =
  "Our expert paediatricians and specialists offer a wide range of services:";

export const paediatricServices = [
  {
    title: "Routine Check-ups",
    description:
      "Regular health assessments to monitor growth, development, and overall well-being.",
  },
  {
    title: "Vaccinations",
    description:
      "Up-to-date immunizations to protect against common childhood diseases.",
  },
  {
    title: "Acute Care",
    description:
      "Immediate treatment for illnesses and injuries, ensuring quick and effective recovery.",
  },
  {
    title: "Chronic Condition Management",
    description:
      "Long-term care for conditions such as asthma, diabetes, and allergies.",
  },
  {
    title: "Paediatric Surgery",
    description:
      "Expert surgical care for conditions ranging from congenital anomalies to injuries.",
  },
  {
    title: "Neonatal Care",
    description:
      "Specialized care for premature and critically ill newborns in our state-of-the-art NICU.",
  },
];

export const paediatricFacilityHighlights = [
  {
    title: "Paediatric Wards",
    description:
      "Comfortable and child-friendly rooms designed to make young patients feel at ease.",
  },
  {
    title: "Modern Operating Theatres",
    description:
      "Advanced surgical suites with cutting-edge technology for safe and precise procedures.",
  },
  {
    title: "Paediatric Intensive Care Unit (PICU)",
    description:
      "Dedicated unit for critically ill children with round-the-clock monitoring and specialized care.",
  },
  {
    title: "Diagnostic Services",
    description:
      "Comprehensive imaging and laboratory services to accurately diagnose and treat paediatric conditions.",
  },
];

export const paediatricSpecialityAreas = [
  "Acute pain service",
  "Adolescent medicine",
  "Airway and voice clinic",
  "Allergy and immunology",
  "Asthma",
  "Audiology",
  "Brain, development and behaviour",
  "Paediatric cardiology",
];

export const paediatricSpeciality = {
  heading: "Advanced Facilities and Equipment",
  preview:
    "Our Paediatric Department is equipped with the latest technology and facilities to ensure the highest standard of care for infants, children, and adolescents.",
  full: "From routine wellness visits to emergency trauma care and neonatal intensive support, we provide comprehensive paediatric services under one roof at Melmaruvathur.",
};

export const paediatricInfrastructure = [
  "In-house blood bank for safe paediatric and neonatal support",
  "State-of-the-art NICU, CCU, and ICCU for critical newborn and child care",
  "In-house laboratory for rapid paediatric diagnostics",
  "Best-in-industry operation theatres equipped with latest technology",
  "Qualified and experienced medical team with 1:1 nursing ratio and 24/7 care",
  "Suite, deluxe, and semi-deluxe rooms for comfortable family-centred stays",
];

export const paediatricAchievementsNote =
  "Each year, our emergency department sees over 500 children under the age of 4 who have sustained traumatic injuries. At least half of infant and toddler injuries are due to falls, with additional cases from burns, foreign bodies, pulled elbows, and poisoning — managed by our experienced paediatric emergency team.";

export const paediatricTeamNote = {
  title: "Your Child's Health, Our Priority",
  description:
    "Our paediatric emergency, surgical, and neonatal teams work together to deliver safe, compassionate care — from preventive visits and vaccinations to acute trauma and intensive support.",
};

export const paediatricJourney = {
  heading: "Compassionate Care for Growing Minds and Bodies.",
  body: "Trust Adhiparasakthi Hospitals for specialized care from infancy through adolescence — with family-centred support at every step.",
  ctaHeading: "Book an Appointment",
  ctaBody:
    "Schedule a consultation or routine check-up with our paediatric team today.",
};

export const paediatricJourneyPillars = [
  {
    title: "Preventive Care",
    description: "Growth monitoring, vaccinations, and wellness guidance for every age.",
  },
  {
    title: "Acute & Surgical Care",
    description: "Emergency treatment, paediatric surgery, and PICU when children need it most.",
  },
  {
    title: "Neonatal Support",
    description: "Specialized NICU care for premature and critically ill newborns.",
  },
];

export const paediatricHeroImage = "/images/paedrtrics.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127b54e?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS paediatric faculty when profiles are available */
export const paediatricSpecialists: DepartmentSpecialist[] = [
  {
    id: "paediatric-general",
    name: "Dr. K. Priya",
    degree: "MD, DCH, DNB (Paediatrics)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — General Paediatrics",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "paediatric-neonatal",
    name: "Dr. R. Anand",
    degree: "MD, DM (Neonatology)",
    experience: "16+ Yrs",
    designation: "Consultant — Neonatology & NICU",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "paediatric-surgery",
    name: "Dr. S. Venkatesh",
    degree: "MS, M.Ch. (Paediatric Surgery)",
    experience: "14+ Yrs",
    designation: "Consultant — Paediatric Surgery",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "paediatric-cardiology",
    name: "Dr. Anitha Raman",
    degree: "MD, DM (Paediatric Cardiology)",
    experience: "12+ Yrs",
    designation: "Consultant — Paediatric Cardiology",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
