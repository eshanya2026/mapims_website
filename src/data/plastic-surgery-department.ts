import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const plasticSurgeryIntro = {
  preview:
    "At Adhiparasakthi Hospitals, Melmaruvathur, we offer world-class plastic surgery services encompassing a comprehensive range of reconstructive and aesthetic procedures.",
  full: "With a focus on personalized care and exceptional outcomes, our goal is to help you achieve enhanced confidence, restored functionality, and an improved quality of life — whether you are recovering from injury, addressing congenital conditions, or seeking cosmetic enhancements.",
};

export const plasticSurgeryCareMessage = {
  heading: "Compassionate Care, Exceptional Results",
  body: "Our expert team is dedicated to guiding you through every step of your transformation journey with safety, precision, and compassion.",
};

export const whyChoosePlasticSurgery = [
  {
    title: "Reconstructive & Aesthetic",
    description:
      "Comprehensive care from trauma reconstruction and burn management to advanced cosmetic and body-contouring procedures.",
  },
  {
    title: "Personalized Treatment",
    description:
      "Tailored surgical plans designed around your unique goals, medical needs, and recovery expectations.",
  },
  {
    title: "Expert Surgical Team",
    description:
      "Skilled plastic surgeons experienced in complex reconstruction, microsurgery, and aesthetic refinement.",
  },
  {
    title: "End-to-End Support",
    description:
      "Compassionate nurses and dedicated staff ensuring comfort and satisfaction from consultation through recovery.",
  },
];

export const plasticSurgeryServicesIntro =
  "Our department offers a wide array of services designed to meet diverse needs:";

export const plasticSurgeryServices = [
  {
    title: "Gender Affirmation Surgery",
    description:
      "Compassionate care including chest masculinization/feminization, genital reconstruction, body contouring, and tracheal shave to support individuals on their gender affirmation journey.",
  },
  {
    title: "Aesthetic Surgery",
    description:
      "Refine your natural beauty with eyelid surgery, liposuction, tummy tucks, fat grafting, and anti-aging treatments.",
  },
  {
    title: "Liposuction & Tummy Tucks",
    description:
      "Achieve a slimmer, more contoured figure with tailored procedures customized to your unique goals.",
  },
  {
    title: "Breast Surgery",
    description:
      "Augmentation, reduction, and reconstruction to address asymmetry, discomfort, volume loss, or post-mastectomy restoration.",
  },
  {
    title: "Gynecomastia Treatment",
    description:
      "Liposuction and glandular tissue excision to help male patients achieve a masculine chest contour and improved self-esteem.",
  },
  {
    title: "Burns Care",
    description:
      "Specialized acute burn treatment, reconstruction, and scar management for optimal healing and functionality.",
  },
  {
    title: "Hand Surgery",
    description:
      "Advanced solutions for traumatic injuries, congenital deformities, and degenerative conditions affecting hand function and appearance.",
  },
  {
    title: "Trauma Surgery",
    description:
      "Immediate and comprehensive care for traumatic injuries, reconstructing and restoring both form and function.",
  },
  {
    title: "General Reconstruction",
    description:
      "Complex procedures to restore functionality and aesthetics following cancer treatment, trauma, or congenital abnormalities.",
  },
  {
    title: "Wound Care & Diabetic Foot Surgery",
    description:
      "Comprehensive wound care and surgical intervention for diabetic foot ulcers and complex wounds to promote healing and prevent complications.",
  },
];

export const plasticSurgerySpecialityAreas = [
  "Gender affirmation",
  "Aesthetic surgery",
  "Breast surgery",
  "Burn reconstruction",
  "Hand surgery",
  "Trauma reconstruction",
  "Wound & diabetic foot care",
];

export const plasticSurgeryInfrastructure = [
  "Dedicated facilities for reconstructive and aesthetic surgical procedures",
  "Specialized burn care, reconstruction, and scar management programmes",
  "Hand surgery and microsurgical capability for complex injuries",
  "Post-operative recovery support with focus on form and function",
  "Coordination with trauma, oncology, and multidisciplinary teams",
  "Patient-centred consultation, counselling, and follow-up care",
];

export const plasticSurgeryAchievementsNote =
  "Our Plastic Surgery Department combines surgical precision with compassionate care — supporting patients through reconstructive needs, aesthetic goals, and specialized treatments with a commitment to safety, outcomes, and satisfaction at every stage.";

export const plasticSurgeryTeamNote = {
  title: "Your Partner in Health and Wellness",
  description:
    "Our skilled surgeons, compassionate nurses, and dedicated support staff are committed to ensuring your comfort and satisfaction from consultation to recovery.",
};

export const plasticSurgeryJourney = {
  heading: "Restoring Form, Function, and Confidence.",
  body: "Schedule your consultation today and discover the transformative possibilities with our Plastic Surgery Department at Adhiparasakthi Hospitals, Melmaruvathur.",
  ctaHeading: "Schedule a Consultation",
  ctaBody:
    "Whether you are exploring reconstructive surgery, aesthetic enhancements, or specialized treatments, we are here to help you achieve your goals.",
};

export const plasticSurgeryJourneyPillars = [
  {
    title: "Consultation & Planning",
    description: "Personalized assessment and a clear treatment plan aligned with your goals.",
  },
  {
    title: "Procedure & Recovery",
    description: "Expert surgery with attentive nursing and structured post-operative care.",
  },
  {
    title: "Lasting Results",
    description: "Follow-up support focused on healing, function, confidence, and quality of life.",
  },
];

export const plasticSurgeryHeroImage = "/images/plastic%20surgery.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS plastic surgery faculty when profiles are available */
export const plasticSurgerySpecialists: DepartmentSpecialist[] = [
  {
    id: "plastic-reconstructive",
    name: "Dr. R. Venkat",
    degree: "MS, M.Ch. (Plastic Surgery)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — Reconstructive & Aesthetic Surgery",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "plastic-burns",
    name: "Dr. Meera Subramanian",
    degree: "MS, M.Ch. (Plastic Surgery)",
    experience: "14+ Yrs",
    designation: "Consultant — Burns & Wound Reconstruction",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "plastic-hand",
    name: "Dr. K. Arjun",
    degree: "MS, M.Ch. (Plastic Surgery)",
    experience: "12+ Yrs",
    designation: "Consultant — Hand & Trauma Reconstruction",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "plastic-aesthetic",
    name: "Dr. P. Divya",
    degree: "MS, M.Ch. (Plastic Surgery)",
    experience: "10+ Yrs",
    designation: "Consultant — Aesthetic & Breast Surgery",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
