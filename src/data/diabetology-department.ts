import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const diabetologyIntro = {
  preview:
    "At Adhiparasakthi Hospitals, Melmaruvathur, our Diabetic Care Department combines cutting-edge technology with compassionate care.",
  full: "Our dedicated team of specialists provides comprehensive diabetes management, ensuring optimal health and well-being for our patients. We are committed to delivering exceptional diabetic care with a focus on innovation, accuracy, and patient support — helping you manage diabetes with confidence and ease.",
};

export const whyChooseDiabetology = [
  {
    title: "Personalized Treatment",
    description:
      "Tailored therapies for Type 1 and Type 2 diabetes, adolescent care, and gestational diabetes management.",
  },
  {
    title: "Advanced Technology",
    description:
      "Insulin pump therapy, continuous glucose monitoring (CGMS), and state-of-the-art diagnostic tools.",
  },
  {
    title: "Integrated Care",
    description:
      "Multidisciplinary clinics with seamless coordination across endocrinology, surgery, and nutrition.",
  },
  {
    title: "Holistic Support",
    description:
      "Nutritional counseling, patient education, workshops, and compassionate foot and vascular care.",
  },
];

export const diabetologyExpertiseIntro = "Our expertise includes:";

export const diabetologyExpertise = [
  {
    title: "Personalized Diabetes Treatment Plans",
    description:
      "Tailored therapies designed to manage Type 1 and Type 2 diabetes effectively.",
  },
  {
    title: "Advanced Insulin Therapy",
    description:
      "Innovative insulin delivery systems and management solutions.",
  },
  {
    title: "State-of-the-Art Glucose Monitoring",
    description:
      "Continuous glucose monitoring systems to keep your levels in check.",
  },
  {
    title: "Diabetic Foot Care",
    description:
      "Specialized treatments to prevent and manage diabetic foot complications.",
  },
  {
    title: "Nutritional Counseling",
    description:
      "Expert dietary advice to support your diabetes management goals.",
  },
  {
    title: "Education & Support",
    description:
      "Workshops and support groups to empower patients with knowledge and community.",
  },
];

export const diabetologyFacilities = [
  {
    title: "Cutting-Edge Diagnostic Tools",
    description:
      "Latest technology for accurate diagnosis and monitoring, including DEXA and hormone analysis.",
  },
  {
    title: "Integrated Care Approach",
    description:
      "Seamless coordination with other specialties to provide holistic care.",
  },
  {
    title: "Patient-Centric Services",
    description:
      "Comfortable consultation rooms and personalized care plans.",
  },
];

export const diabetologySurgicalIntro =
  "Comprehensive surgical solutions for diabetes-related complications:";

export const diabetologySurgicalServices = [
  {
    title: "Diabetic Foot Surgery",
    description:
      "Expert management of ulcers, infections, and deformities with advanced techniques to promote healing and prevent recurrence.",
  },
  {
    title: "Bariatric Surgery",
    description:
      "Gastric bypass and sleeve gastrectomy options to improve glycemic control and support long-term weight management.",
  },
  {
    title: "Pancreatic Surgery",
    description:
      "Advanced procedures including partial or total pancreatectomy when diabetes is due to pancreatic dysfunction.",
  },
  {
    title: "Vascular Surgery",
    description:
      "Cutting-edge techniques to restore blood flow and address peripheral artery disease related to diabetes.",
  },
];

export const diabetologySpecialityAreas = [
  "Bariatric surgery",
  "Internal medicine",
  "Insulin pump and CGMS",
];

export const diabetologySpeciality = {
  heading: "Our Speciality",
  preview:
    "We run various specialised clinics offering multidisciplinary and comprehensive care in the management of endocrine disorders.",
  full: "The department is supported by DEXA scan for bone mineral density, nuclear imaging for thyroid, parathyroid and adrenal disorders, and state-of-the-art diagnostic solutions in radiology and hormone analysis. Our Diabetology department handles pituitary, adrenal, parathyroid, thyroid and reproductive endocrinology disorders — including complicated secondary and tertiary care, adult and adolescent diabetes, insulin pump therapy, gestational diabetes, and lipid and metabolic disorders.",
};

export const diabetologyInfrastructure = [
  "Specialised multidisciplinary endocrine and diabetes clinics",
  "DEXA scan for bone mineral density assessment",
  "Nuclear imaging for thyroid, parathyroid, and adrenal disorders",
  "Advanced radiology and hormone analysis laboratories",
  "Insulin pump therapy and continuous glucose monitoring programmes",
  "Gestational diabetes and metabolic disorder management",
];

export const diabetologyAchievementsNote =
  "Our Diabetology department delivers secondary and tertiary endocrine care with innovative monitoring, surgical solutions for diabetes complications, and patient education — setting a high standard for diabetes management in the region.";

export const diabetologyTeamNote = {
  title: "Your Path to Better Health",
  description:
    "If you are seeking expert care for diabetes management or diabetes-related surgery, our commitment to excellence and compassionate care ensures the best possible outcomes for every patient.",
};

export const diabetologyJourney = {
  heading: "Managing Diabetes for a Healthier Future.",
  body: "Take the first step towards a healthier future with our expert diabetic care team at Adhiparasakthi Hospitals, Melmaruvathur.",
  ctaHeading: "Book a Consultation",
  ctaBody:
    "Contact us to schedule a consultation and begin personalized diabetes care with our specialists.",
};

export const diabetologyJourneyPillars = [
  {
    title: "Assessment & Monitoring",
    description: "Accurate diagnosis with CGMS, labs, and specialist evaluation.",
  },
  {
    title: "Treatment & Surgery",
    description: "Medical therapy, insulin pumps, nutrition, and surgical options when needed.",
  },
  {
    title: "Ongoing Support",
    description: "Education, lifestyle guidance, and long-term complication prevention.",
  },
];

export const diabetologyHeroImage = "/images/diab.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS diabetology faculty when profiles are available */
export const diabetologySpecialists: DepartmentSpecialist[] = [
  {
    id: "diabetology-endocrine",
    name: "Dr. R. Karthik",
    degree: "MD, DM (Endocrinology)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — Diabetology & Endocrinology",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "diabetology-insulin",
    name: "Dr. Priya Natarajan",
    degree: "MD, DM (Endocrinology)",
    experience: "14+ Yrs",
    designation: "Consultant — Insulin Pump & CGMS Therapy",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "diabetology-foot",
    name: "Dr. K. Balaji",
    degree: "MS (General Surgery)",
    experience: "16+ Yrs",
    designation: "Consultant — Diabetic Foot & Vascular Surgery",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "diabetology-bariatric",
    name: "Dr. S. Venkatesh",
    degree: "MS, M.Ch. (Bariatric Surgery)",
    experience: "12+ Yrs",
    designation: "Consultant — Bariatric & Metabolic Surgery",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
