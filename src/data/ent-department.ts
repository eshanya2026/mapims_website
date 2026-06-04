import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const entIntro = {
  preview:
    "Discover exceptional ENT care at Adhiparasakthi Hospitals, Melmaruvathur — where cutting-edge technology meets expert clinical care.",
  full: "Our ENT (Ear, Nose, and Throat) department addresses all your ENT needs, from routine consultation to complex surgery. Our highly skilled specialists provide top-notch care with precision and compassion.",
};

export const whyChooseEnt = [
  {
    title: "Expert Team",
    description:
      "ENT specialists who are leaders in their field, offering the highest level of ear, nose, and throat care.",
  },
  {
    title: "State-of-the-Art Facilities",
    description:
      "Latest technology for accurate diagnosis and effective treatment, including endoscopic and navigation systems.",
  },
  {
    title: "Patient-Centred Approach",
    description:
      "Personalized care tailored to your unique needs and concerns at every stage.",
  },
  {
    title: "Comprehensive Care",
    description:
      "From initial consultation to follow-up — all ENT services under one roof.",
  },
];

export const entServicesIntro = "Our ENT services include:";

export const entServices = [
  {
    title: "Comprehensive Ear Care",
    description:
      "Treatment for hearing loss, ear infections, tinnitus, and balance disorders.",
  },
  {
    title: "Advanced Nasal Treatments",
    description:
      "Solutions for sinusitis, nasal allergies, and deviated septum.",
  },
  {
    title: "Expert Throat Care",
    description:
      "Management of voice disorders, swallowing difficulties, and throat infections.",
  },
  {
    title: "Pediatric ENT Services",
    description:
      "Specialized care for children's ENT issues, including tonsillitis and adenoid problems.",
  },
  {
    title: "Allergy Testing & Management",
    description:
      "Identifying and treating environmental and food allergies affecting the ENT region.",
  },
];

export const entSurgeriesIntro = "Our ENT surgeries include:";

export const entSurgeries = [
  {
    title: "Tympanoplasty",
    description:
      "Repairing the eardrum and middle ear structures.",
  },
  {
    title: "Sinus Surgery",
    description:
      "Endoscopic procedures to treat chronic sinusitis.",
  },
  {
    title: "Septoplasty",
    description:
      "Correcting a deviated nasal septum to improve breathing.",
  },
  {
    title: "Adenoidectomy",
    description:
      "Removal of the adenoids, often performed in children.",
  },
  {
    title: "Tonsillectomy",
    description:
      "Surgical removal of the tonsils to address chronic infections.",
  },
];

export const entTechnology = [
  {
    title: "Endoscopic ENT Surgery",
    description:
      "Minimally invasive procedures using high-definition endoscopic cameras.",
  },
  {
    title: "Advanced Hearing Aids",
    description:
      "State-of-the-art devices for improved hearing outcomes.",
  },
  {
    title: "Digital Imaging",
    description:
      "High-resolution imaging for accurate diagnosis and treatment planning.",
  },
  {
    title: "Computer-Assisted Navigation",
    description:
      "Precision-guided surgical navigation for complex cases.",
  },
  {
    title: "Voice & Speech Analysis",
    description:
      "Advanced tools for diagnosing and treating voice disorders.",
  },
];

export const entSpecialityAreas = [
  "Audiology",
  "Cochlear implant programme",
  "Facial plastic & reconstructive surgery",
  "Head & neck surgical oncology",
  "General ENT",
  "Immunology & rhinology",
  "Maxillofacial trauma",
  "Neuro-otology",
  "Otology, hearing & balance",
  "Pediatric otolaryngology",
  "Sinus & nasal disorders",
  "Skull base surgery",
  "Snoring & sleep medicine",
  "Salivary gland disorders",
  "Thyroid & parathyroid disorders",
  "Voice & swallowing centre",
];

export const entSpeciality = {
  heading: "Our Speciality",
  preview:
    "Our specialized team delivers subspecialty ENT care across otology, rhinology, laryngology, head and neck surgery, and pediatric otolaryngology.",
  full: "From cochlear implants and skull base surgery to sinus disorders, sleep medicine, and voice and swallowing disorders — we provide comprehensive, multidisciplinary ENT care for local, national, and international patients.",
};

export const entInfrastructure = [
  "In-house blood bank for surgical and critical care support",
  "State-of-the-art ICU, CCU, and ICCU facilities",
  "In-house laboratory for rapid diagnostic turnaround",
  "Industry-leading, highly equipped operation theatres",
  "Qualified and experienced multidisciplinary medical team",
  "1:1 nursing ratio with 24/7 patient care",
  "Suite, deluxe, and semi-deluxe room options",
];

export const entAchievementsNote =
  "World-class patient care and quality service lie at the core of our mission. Our nationally recognized faculty and superb administrative and clinical teams collaborate closely to provide comprehensive, personalized care for patients with ENT disorders.";

export const entTeamNote = {
  title: "Experience World-Class ENT Care",
  description:
    "Schedule your appointment today and take the first step towards better ear, nose, and throat health at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export const entJourney = {
  heading: "Specialized Care for Ear, Nose, and Throat Health.",
  body: "Experience world-class ENT care — from consultation through surgery and follow-up, all with precision and compassion.",
  ctaHeading: "Book a Consultation",
  ctaBody:
    "Contact us to schedule your ENT consultation and begin personalized care with our specialists.",
};

export const entJourneyPillars = [
  {
    title: "Assessment & Diagnosis",
    description: "Comprehensive ENT evaluation with digital imaging and allergy testing.",
  },
  {
    title: "Treatment & Surgery",
    description: "Medical therapy, endoscopic procedures, and specialized ENT surgery.",
  },
  {
    title: "Recovery & Follow-Up",
    description: "Audiology support, voice care, and long-term ENT health monitoring.",
  },
];

export const entHeroImage = "/images/ent.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS ENT faculty when profiles are available */
export const entSpecialists: DepartmentSpecialist[] = [
  {
    id: "ent-otology",
    name: "Dr. R. Srinivasan",
    degree: "MS (ENT)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — Otology & Hearing",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "ent-rhinology",
    name: "Dr. Anjali Krishnan",
    degree: "MS (ENT)",
    experience: "14+ Yrs",
    designation: "Consultant — Sinus & Nasal Surgery",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "ent-head-neck",
    name: "Dr. K. Mohanraj",
    degree: "MS, M.Ch. (Head & Neck Surgery)",
    experience: "16+ Yrs",
    designation: "Consultant — Head & Neck Oncology",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "ent-pediatric",
    name: "Dr. S. Deepa",
    degree: "MS (ENT)",
    experience: "11+ Yrs",
    designation: "Consultant — Pediatric Otolaryngology",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
