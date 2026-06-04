import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const jointReplacementIntro = {
  preview:
    "Total joint replacement is a surgical procedure in which parts of an arthritic or damaged joint are removed and replaced with a metal, plastic, or ceramic device called a prosthesis.",
  full: "The prosthesis is designed to replicate the movement of a normal, healthy joint. Hip and knee replacements are the most commonly performed joint replacements, but replacement surgery can also be performed on the ankle, wrist, shoulder, and elbow at Adhiparasakthi Hospitals.",
};

export const whenJointReplacementRecommended = {
  heading: "When Is Total Joint Replacement Recommended?",
  body: "Several conditions can cause joint pain and disability and lead patients to consider joint replacement surgery. In many cases, joint pain is caused by damage to the cartilage that lines the ends of the bones (articular cartilage)—either from arthritis, a fracture, or another condition.",
  conclusion:
    "If nonsurgical treatments like medications, physical therapy, and changes to your everyday activities do not relieve your pain and disability, your doctor may recommend total joint replacement.",
};

export const whyChooseJointReplacement = [
  {
    title: "Expert Surgical Team",
    description:
      "Specialized doctors experienced in complex knee and hip replacements, shoulder resurfacing, and biological orthopaedics.",
  },
  {
    title: "Advanced Operation Theatres",
    description:
      "Best-in-industry operating theatres highly equipped with the latest technology for safe joint replacement surgery.",
  },
  {
    title: "24/7 Patient Care",
    description:
      "Qualified and experienced medical team with 1:1 nursing ratio and round-the-clock post-operative support.",
  },
  {
    title: "Comfortable Recovery",
    description:
      "Suite, deluxe, and semi-deluxe rooms with healthy, tasty, balanced meals to support healing after surgery.",
  },
];

export const jointReplacementSpeciality = {
  heading: "Our Speciality",
  preview:
    "Our specialized team of doctors are well experienced in joint replacement surgeries. They are adept at handling complex knee and hip replacements, shoulder resurfacing, and biological orthopaedics.",
  full: "Total joint replacement surgery takes a few hours and is performed at our hospital. Hip and knee replacements remain the most commonly performed procedures, while our team also performs replacement surgery on the ankle, wrist, shoulder, and elbow.",
};

export const jointReplacementProceduresIntro = "We are performing:";

export const jointReplacementProcedures = [
  {
    title: "Total Hip Replacement",
    description:
      "Full replacement of the hip joint with a prosthesis to restore mobility and relieve pain.",
  },
  {
    title: "Total Knee Replacement",
    description:
      "Complete knee joint replacement for severe arthritis or joint damage affecting the whole knee.",
  },
  {
    title: "Unicompartmental Knee Replacement",
    description:
      "Partial knee replacement targeting a single damaged compartment while preserving healthy tissue.",
  },
  {
    title: "Shoulder Joint Replacement",
    description:
      "Replacement of the shoulder joint to restore function in advanced arthritis or injury.",
  },
  {
    title: "Reverse Total Shoulder Replacement",
    description:
      "Specialized shoulder procedure for rotator cuff tears and complex shoulder arthritis.",
  },
  {
    title: "Total Elbow Replacement",
    description:
      "Elbow joint replacement for severe arthritis, fractures, or chronic joint instability.",
  },
  {
    title: "Wrist Joint Replacement",
    description:
      "Wrist arthroplasty to reduce pain and improve wrist movement in advanced joint disease.",
  },
];

export const jointReplacementInfrastructure = [
  "Best-in-industry operation theatres equipped with the latest surgical technology",
  "Qualified and experienced orthopaedic and joint replacement surgical team",
  "1:1 nursing ratio with 24/7 patient care throughout recovery",
  "Suite, deluxe, and semi-deluxe rooms for comfortable post-operative stay",
  "Healthy, tasty, balanced meals supporting recovery and wellness",
];

export const jointReplacementAchievementsNote =
  "Our joint replacement program combines expert surgical skill with modern facilities—from advanced operation theatres and dedicated nursing to comfortable accommodation and nutritious meals—helping patients return to active, pain-free lives.";

export const jointReplacementTeamNote = {
  title: "Trusted Joint Replacement Care",
  description:
    "Hip and knee replacements are the most commonly performed joint replacements at our centre, with experienced teams also performing shoulder, elbow, wrist, and ankle procedures when clinically indicated.",
};

export const jointReplacementJourney = {
  heading: "Move Freely Again",
  body: "When conservative care is no longer enough, our joint replacement specialists are here to help you regain mobility, reduce pain, and improve quality of life with proven surgical solutions.",
  ctaHeading: "Book an Appointment",
  ctaBody:
    "Schedule a consultation with our orthopaedic team to discuss whether joint replacement is right for you.",
};

export const jointReplacementJourneyPillars = [
  {
    title: "Evaluation & Planning",
    description: "Thorough assessment and personalized surgical planning for every patient.",
  },
  {
    title: "Expert Surgery",
    description: "Procedures performed in advanced theatres by experienced joint replacement surgeons.",
  },
  {
    title: "Rehabilitation",
    description: "Structured recovery support with nursing care, physiotherapy, and follow-up.",
  },
];

export const jointReplacementHeroImage = "/images/joint%20.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS joint replacement faculty when profiles are available */
export const jointReplacementSpecialists: DepartmentSpecialist[] = [
  {
    id: "jr-hip-knee",
    name: "Dr. R. Murugan",
    degree: "MS, DNB (Orthopaedics)",
    experience: "20+ Yrs",
    designation: "Senior Consultant — Hip & Knee Replacement",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "jr-shoulder",
    name: "Dr. K. Balaji",
    degree: "MS, M.Ch. (Orthopaedics)",
    experience: "16+ Yrs",
    designation: "Consultant — Shoulder & Upper Limb Joint Replacement",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "jr-knee",
    name: "Dr. S. Priya",
    degree: "MS (Orthopaedics)",
    experience: "12+ Yrs",
    designation: "Consultant — Knee & Sports Orthopaedics",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "jr-trauma",
    name: "Dr. V. Ganesh",
    degree: "MS, DNB (Orthopaedics)",
    experience: "14+ Yrs",
    designation: "Consultant — Trauma & Joint Reconstruction",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
