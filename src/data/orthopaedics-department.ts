import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const orthopaedicsIntro = {
  preview:
    "At Adhiparasakthi Hospitals, Melmaruvathur, our Orthopaedics Department offers world-class care for all your musculoskeletal needs.",
  full: "From simple fractures to complex joint replacement surgeries, we provide a full spectrum of orthopedic treatments under one roof. Our state-of-the-art facilities include advanced imaging technologies, fully equipped operating rooms, and an in-house rehabilitation center, ensuring seamless and personalized care. With a focus on precision and patient safety, we ensure that you receive the best orthopedic treatment, tailored to your needs.",
};

export const whyChooseOrthopaedics = [
  {
    title: "Full-Spectrum Care",
    description:
      "From trauma and fractures to joint replacement, spine care, sports medicine, and pediatric orthopaedics — all under one roof.",
  },
  {
    title: "Advanced Facilities",
    description:
      "Modular operation theatres, dedicated orthopedic ICUs, and MRI, CT, and digital X-ray for accurate diagnosis and planning.",
  },
  {
    title: "Multidisciplinary Team",
    description:
      "Surgeons, nurses, anaesthetists, physiotherapists, radiologists, and pathologists working together for exceptional outcomes.",
  },
  {
    title: "24/7 Patient Support",
    description:
      "In-house blood bank, laboratory, ICU/CCU/ICCU, 1:1 nursing ratio, and comfortable suite, deluxe, and semi-deluxe rooms.",
  },
];

export const orthopaedicsServicesIntro =
  "Our expert team specializes in comprehensive musculoskeletal care:";

export const orthopaedicsServices = [
  {
    title: "Joint Replacement Surgeries",
    description:
      "Knee, hip, and shoulder replacements using advanced techniques for faster recovery.",
  },
  {
    title: "Arthroscopy & Sports Medicine",
    description:
      "Minimally invasive surgeries for joint repair and rehabilitation for athletes.",
  },
  {
    title: "Spine Care",
    description:
      "Treatment for back pain, slipped discs, and spinal deformities.",
  },
  {
    title: "Trauma & Fracture Care",
    description:
      "Emergency treatment for all kinds of fractures and trauma injuries.",
  },
  {
    title: "Pediatric Orthopaedics",
    description:
      "Specialized care for bone and joint issues in children.",
  },
  {
    title: "Orthopaedic Oncology",
    description:
      "Treatment for bone tumors and related conditions.",
  },
  {
    title: "Foot, Ankle & Upper Limb",
    description:
      "Foot and ankle surgery plus hand and upper extremity procedures.",
  },
  {
    title: "Physiotherapy & Rehabilitation",
    description:
      "Comprehensive post-surgery rehabilitation to aid recovery through our in-house centre.",
  },
];

export const orthopaedicsSpecialityAreas = [
  "Anaesthetics & perioperative care",
  "Musculoskeletal Medicine (MSK) therapy",
  "Large joint & small joint services",
  "Spinal services",
  "Orthopaedic oncology",
  "Paediatric orthopaedics",
  "Infection services",
  "Cellular and molecular pathology (histopathology)",
];

export const orthopaedicsSpeciality = {
  heading: "Our Speciality",
  preview:
    "We deliver coordinated orthopaedic care across subspecialties — from joint and spine surgery to oncology, paediatrics, MSK therapy, and pathology support.",
  full: "Our facilities include fully equipped modular operation theatres, dedicated orthopedic ICUs, and advanced imaging for accurate treatment planning. From minimally invasive surgeries to complex reconstructive procedures, we offer the highest standard of care to ensure the best outcomes for our patients.",
};

export const orthopaedicsInfrastructure = [
  "In-house blood bank for safe transfusion support during surgery",
  "State-of-the-art ICU, CCU, and ICCU for critical orthopaedic care",
  "In-house laboratory for rapid diagnostics and monitoring",
  "Best-in-industry operation theatres equipped with latest technology",
  "Qualified and experienced medical team with multidisciplinary specialists",
  "1:1 nursing ratio with 24/7 patient care",
  "Suite, deluxe, and semi-deluxe rooms for comfortable recovery",
];

export const orthopaedicsAchievementsNote =
  "We take pride in delivering exceptional patient care through skilled surgical teams, advanced infrastructure, and comprehensive rehabilitation — supporting every step from diagnosis to recovery.";

export const orthopaedicsTeamNote = {
  title: "Exceptional Patient Care",
  description:
    "Our specialist teams include surgeons, nurses, anaesthetists, physiotherapists, radiologists, and pathologists — all highly skilled and experienced professionals dedicated to your recovery.",
};

export const orthopaedicsJourney = {
  heading: "Restoring Mobility. Enhancing Quality of Life.",
  body: "Whether you need emergency fracture care, sports injury treatment, or complex reconstructive surgery, Adhiparasakthi Hospitals provides orthopedic care tailored to your condition and goals.",
  ctaHeading: "Book an Appointment",
  ctaBody:
    "Schedule a consultation with our orthopaedic team and take the first step toward stronger, pain-free movement.",
};

export const orthopaedicsJourneyPillars = [
  {
    title: "Accurate Diagnosis",
    description: "Advanced imaging and expert assessment to plan the right treatment.",
  },
  {
    title: "Expert Treatment",
    description: "Minimally invasive to complex procedures performed in modern theatres.",
  },
  {
    title: "Recovery & Rehab",
    description: "In-house physiotherapy and nursing support for lasting outcomes.",
  },
];

export const orthopaedicsHeroImage = "/images/ortho.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS orthopaedic faculty when profiles are available */
export const orthopaedicsSpecialists: DepartmentSpecialist[] = [
  {
    id: "ortho-joint",
    name: "Dr. A. Selvam",
    degree: "MS, DNB (Orthopaedics)",
    experience: "22+ Yrs",
    designation: "Senior Consultant — Joint Replacement & Arthroscopy",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "ortho-spine",
    name: "Dr. N. Deepa",
    degree: "MS, M.Ch. (Orthopaedics)",
    experience: "16+ Yrs",
    designation: "Consultant — Spine & Trauma",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "ortho-sports",
    name: "Dr. R. Karthik",
    degree: "MS (Orthopaedics)",
    experience: "14+ Yrs",
    designation: "Consultant — Sports Medicine & Arthroscopy",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "ortho-paediatric",
    name: "Dr. L. Meena",
    degree: "MS, DNB (Orthopaedics)",
    experience: "12+ Yrs",
    designation: "Consultant — Paediatric Orthopaedics",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
