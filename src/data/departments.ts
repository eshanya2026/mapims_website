export type Department = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

/** Slugs with a dedicated department detail page */
export const departmentDetailSlugs = [
  "cardiology",
  "orthopaedics",
  "obstetrics-gynaecology",
  "nephrology",
  "paediatric",
  "diabetology",
  "general-medicine",
  "medical-gastroenterology",
  "plastic-surgery",
  "ophthalmology",
  "ent",
  "urology",
  "joint-replacement",
  "oncology",
  "neurology",
  "multi-organ-transplant",
] as const;

/** Emoji shown beside department names in the department page aside */
export const departmentAsideIcons: Record<string, string> = {
  cardiology: "❤️",
  orthopaedics: "🦴",
  "joint-replacement": "🦵",
  "obstetrics-gynaecology": "🤰",
  nephrology: "🫘",
  paediatric: "👶",
  diabetology: "🩸",
  "general-medicine": "🩺",
  "medical-gastroenterology": "🍽️",
  ophthalmology: "👁️",
  ent: "👂",
  urology: "🚻",
  "multi-organ-transplant": "🫀",
  oncology: "🎗️",
  neurology: "🧠",
  "plastic-surgery": "✋",
};

export function getDepartmentHref(slug: string): string {
  if (
    (departmentDetailSlugs as readonly string[]).includes(slug)
  ) {
    return `/departments/${slug}`;
  }
  return "/departments";
}

export const departments: Department[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    description:
      "Top cardiology services in Chennai — cutting-edge heart care, cardiothoracic CCUs with 1:1 nursing, and 50+ subspecialized experts for adults and children.",
    image: "/images/0b7b9cd4-ff80-484d-b49e-b1604e2e0fb1.png",
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics",
    description:
      "Best orthopaedics in India — joint replacement, spine, sports medicine, trauma, paediatric orthopaedics, and rehabilitation at Melmaruvathur.",
    image: "/images/ortho.png",
  },
  {
    slug: "joint-replacement",
    name: "Joint Replacement",
    description:
      "Best joint replacement service in Chennai — hip, knee, shoulder, elbow, and wrist replacements with advanced theatres and expert orthopaedic surgeons.",
    image: "/images/joint%20.png",
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    description:
      "Best obstetrics & gynaecology in India — pregnancy care, IVF, laparoscopic surgery, high-risk obstetrics, and NICU at Melmaruvathur.",
    image: "/images/og.png",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    description:
      "Best nephrology in India — kidney transplant, 50+ dialysis units, CKD care, and advanced renal technology at Melmaruvathur.",
    image: "/images/nephrology.png",
  },
  {
    slug: "paediatric",
    name: "Paediatric",
    description:
      "Best paediatric care in Chennai — routine check-ups, vaccinations, surgery, NICU/PICU, and family-centred child healthcare at Melmaruvathur.",
    image: "/images/paedrtrics.png",
  },
  {
    slug: "diabetology",
    name: "Diabetology",
    description:
      "Best diabetology in India — diabetes management, insulin pump, CGMS, bariatric surgery, and endocrine care at Melmaruvathur.",
    image: "/images/diab.png",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    description:
      "Best general medicine in Chennai — diagnostics, chronic care, laparoscopic surgery, and 24/7 emergency at Melmaruvathur.",
    image: "/images/general%20med.png",
  },
  {
    slug: "medical-gastroenterology",
    name: "Medical Gastroenterology",
    description:
      "Best medical gastroenterology in India — endoscopy, liver care, colorectal health, and minimally invasive GI surgery at Melmaruvathur.",
    image: "/images/medical%20gastro.png",
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    description:
      "Best ophthalmology in India — cataract, glaucoma, retina, LASIK, and 1L+ successful eye surgeries at Melmaruvathur.",
    image: "/images/optho.png",
  },
  {
    slug: "ent",
    name: "Otorhinolaryngology - ENT",
    description:
      "Best ENT hospital in India — ear, nose, throat, sinus surgery, cochlear implants, and head & neck care at Melmaruvathur.",
    image: "/images/ent.png",
  },
  {
    slug: "urology",
    name: "Urology",
    description:
      "Best urology hospital in India — kidney stones, prostate, laser surgery, renal transplant, and uro-oncology at Melmaruvathur.",
    image: "/images/urology.png",
  },
  {
    slug: "multi-organ-transplant",
    name: "Multi Organ Transplant",
    description:
      "Specialized transplant programs with multidisciplinary teams providing pre and post-transplant evaluation, surgery, and lifelong follow-up.",
    image: "/images/mutliorgan%20.png",
  },
  {
    slug: "oncology",
    name: "Oncology",
    description:
      "At Adhiparasakthi Hospitals, our Oncology Department is committed to providing world-class cancer care through cutting-edge treatments, compassionate support, and a patient-centered approach.",
    image: "/images/oncology.png",
  },
  {
    slug: "neurology",
    name: "Neurology",
    description:
      "At Adhiparasakthi Hospitals, we are dedicated to providing world-class neurological care for patients of all ages with advanced diagnostics and skilled neurologists.",
    image: "/images/neurology.png",
  },
  {
    slug: "plastic-surgery",
    name: "Plastic Surgery",
    description:
      "Best plastic surgery in India — reconstructive, aesthetic, burns, hand, trauma, and gender affirmation care at Melmaruvathur.",
    image: "/images/plastic%20surgery.png",
  },
];

/** Priority order at the top of the department page aside nav */
export const departmentAsidePrioritySlugs = [
  "multi-organ-transplant",
  "oncology",
] as const;

export function getDepartmentsForAside(): Department[] {
  const prioritySlugs = new Set<string>(departmentAsidePrioritySlugs);
  const prioritized = departmentAsidePrioritySlugs
    .map((slug) => departments.find((d) => d.slug === slug))
    .filter((d): d is Department => d !== undefined);
  const rest = departments.filter((d) => !prioritySlugs.has(d.slug));
  return [...prioritized, ...rest];
}
