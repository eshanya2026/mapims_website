import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const obstetricsGynaecologyIntro = {
  preview:
    "At Adhiparasakthi Hospitals, our Obstetrics and Gynaecology department is dedicated to providing exceptional care for women at every stage of life.",
  full: "From routine checkups to advanced treatments, we cover all aspects of women's health with cutting-edge facilities and expert care. Our state-of-the-art facilities include advanced labor rooms, cutting-edge operation theatres, and specialized neonatal care units, ensuring the highest level of safety and comfort for every patient. From routine diagnostics to specialized treatments and post-care services, we offer a complete spectrum of obstetric and gynecological care—all under one roof. Experience exceptional care tailored for women, at every stage of life.",
};

export const whyChooseObgyn = [
  {
    title: "Complete Women's Healthcare",
    description:
      "Prenatal and postnatal care, fertility treatments, minimally invasive surgery, and menopause management under one roof.",
  },
  {
    title: "High-Risk Pregnancy Expertise",
    description:
      "Specialized management of complex pregnancies, medical disorders in pregnancy, and safe normal and C-section deliveries.",
  },
  {
    title: "Advanced Facilities",
    description:
      "Modern labor rooms, NICU, in-house blood bank and laboratory, and fully equipped operation theatres.",
  },
  {
    title: "Trusted Clinical Team",
    description:
      "Experienced consultants supported by resident postgraduate DNB trainees for round-the-clock hospital-based care.",
  },
];

export const obgynServicesIntro =
  "We offer a wide range of treatments and surgeries for every stage of a woman's life:";

export const obgynServices = [
  {
    title: "Pregnancy Care",
    description:
      "Comprehensive prenatal and postnatal care, high-risk pregnancy management, and safe normal and C-section deliveries.",
  },
  {
    title: "Fertility Treatments",
    description:
      "Infertility consultations, IVF, IUI, and other assisted reproductive technologies.",
  },
  {
    title: "Gynaecological Surgeries",
    description:
      "Minimally invasive laparoscopic surgeries, hysterectomies, fibroid removal, and endometriosis treatment.",
  },
  {
    title: "Menstrual Disorders",
    description:
      "Diagnosis and treatment for PCOS, irregular periods, and other hormonal issues.",
  },
  {
    title: "Menopause Care",
    description:
      "Expert care for managing menopausal symptoms and long-term women's health.",
  },
];

export const gynaecologySpecialityAreas = [
  "Puberty and adolescent health disorders",
  "Irregular or painful menstruation",
  "Abnormal and excessive uterine bleeding",
  "PCOS / hirsutism",
  "Abnormal vaginal discharges",
  "Ectopic pregnancy management",
  "MTP, contraception & family planning",
  "Uterine and pelvic organ prolapse",
  "Genital tract malformations",
  "Genital infections, STD & tuberculosis",
  "Endometriosis and allied conditions",
  "Menopause disorders",
  "Infertility and assisted reproductive technology",
  "Genital cancers — surgery and chemotherapy",
  "Benign breast disorders",
];

export const obstetricsSpecialityAreas = [
  "Preconception and prenatal care",
  "Early pregnancy complications",
  "High-risk pregnancy management",
  "Medical disorders in pregnancy",
  "Recurrent pregnancy loss and abortions",
  "Ultrasound and fetal medicine",
  "Diet and exercise preparatory classes",
  "Labour management preparatory classes",
  "Painless labour",
  "Puerperium management",
  "Obstetric haemorrhages",
  "Preterm and post-term pregnancy",
  "Surgical complications of pregnancy",
];

export const obgynSpeciality = {
  heading: "Our Speciality",
  preview:
    "Our team of consultants in Obstetrics and Gynaecology provides specialized care for women from puberty to menopause.",
  full: "They are efficiently assisted by resident postgraduate students pursuing DNB who reside in the hospital itself, ensuring continuous, compassionate support. Trust our experienced doctors to provide personalized care tailored to your needs, ensuring the best outcomes for both mother and baby.",
};

export const obgynInfrastructure = [
  "Specialized NICU for newborn intensive care",
  "In-house blood bank for safe maternal and neonatal support",
  "State-of-the-art ICU for critical obstetric and gynaecological care",
  "In-house laboratory for rapid diagnostics",
  "Best-in-industry operation theatres with latest technology",
  "Qualified and experienced medical team with 1:1 nursing ratio and 24/7 care",
  "Suite, deluxe, and semi-deluxe rooms for comfortable recovery",
];

export const obgynAchievementsNote =
  "We take pride in delivering exceptional obstetric and gynaecological care — combining advanced labor rooms, neonatal support, skilled surgeons, and a dedicated team focused on the safety and wellbeing of every mother and baby.";

export const obgynTeamNote = {
  title: "Expert Obstetric & Gynaecology Team",
  description:
    "Our consultants provide specialized care across the full spectrum of women's health, supported by DNB postgraduate residents living on campus for continuous clinical coverage.",
};

export const obgynJourney = {
  heading: "Supporting Women's Health at Every Stage.",
  body: "Whether it's high-risk pregnancies, infertility treatments, or minimally invasive surgeries, our expert team handles every aspect with compassion and precision — tailored for you and your family.",
  ctaHeading: "Book an Appointment",
  ctaBody:
    "Schedule a consultation with our obstetrics and gynaecology team and take the first step toward personalized women's healthcare.",
};

export const obgynJourneyPillars = [
  {
    title: "Preventive & Routine Care",
    description: "Checkups, screening, and guidance from adolescence through adulthood.",
  },
  {
    title: "Specialized Treatment",
    description: "Fertility, surgery, high-risk pregnancy, and neonatal support when needed.",
  },
  {
    title: "Compassionate Follow-Up",
    description: "Postnatal and long-term care for mother and baby with dedicated nursing.",
  },
];

export const obgynHeroImage = "/images/og.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1651008376811-b90daee60fbf?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127b54e?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS OBGYN faculty when profiles are available */
export const obgynSpecialists: DepartmentSpecialist[] = [
  {
    id: "obgyn-obstetrics",
    name: "Dr. K. Lakshmi",
    degree: "MD, DGO, DNB (OBG)",
    experience: "20+ Yrs",
    designation: "Senior Consultant — Obstetrics & High-Risk Pregnancy",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "obgyn-fertility",
    name: "Dr. Priya Venkat",
    degree: "MD, DNB (OBG)",
    experience: "16+ Yrs",
    designation: "Consultant — Fertility & Reproductive Medicine",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "obgyn-gynaecology",
    name: "Dr. S. Meenakshi",
    degree: "MS, DNB (OBG)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — Gynaecology & Laparoscopic Surgery",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "obgyn-fetal",
    name: "Dr. R. Anitha",
    degree: "MD, DNB (OBG)",
    experience: "14+ Yrs",
    designation: "Consultant — Fetal Medicine & Ultrasound",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
