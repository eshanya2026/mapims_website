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
      "Comprehensive heart care for adults and children—from preventive care and cardiac imaging to interventional procedures and 24/7 CCU support.",
    image: "/images/0b7b9cd4-ff80-484d-b49e-b1604e2e0fb1.png",
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics",
    description:
      "Comprehensive bone, joint, muscle, and spine care—from fractures and sports injuries to joint replacement, spine surgery, and rehabilitation.",
    image: "/images/ortho.png",
  },
  {
    slug: "joint-replacement",
    name: "Joint Replacement",
    description:
      "Comprehensive hip, knee, shoulder, and upper-limb joint replacement with modern implants, advanced surgical techniques, and personalized rehabilitation.",
    image: "/images/joint%20.png",
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    description:
      "Expert women's healthcare from adolescence through pregnancy, fertility, surgery, and menopause—with maternity, NICU, and gynaecology under one roof.",
    image: "/images/og.png",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    description:
      "Comprehensive kidney care—from CKD management and dialysis to transplantation, renal diagnostics, and 24/7 emergency renal support.",
    image: "/images/nephrology.png",
  },
  {
    slug: "paediatric",
    name: "Paediatric",
    description:
      "Comprehensive child healthcare from infancy through adolescence—wellness visits, vaccinations, neonatal care, pediatric surgery, and 24/7 emergency support.",
    image: "/images/paedrtrics.png",
  },
  {
    slug: "diabetology",
    name: "Diabetology",
    description:
      "Personalized diabetes and metabolic care—CGMS, insulin pump therapy, complication management, bariatric surgery, and endocrine support.",
    image: "/images/diab.png",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    description:
      "Expert diagnosis, preventive care, and chronic disease management—with advanced diagnostics, telemedicine, and 24/7 emergency support.",
    image: "/images/general%20med.png",
  },
  {
    slug: "medical-gastroenterology",
    name: "Medical Gastroenterology",
    description:
      "Comprehensive digestive, liver, and colorectal care—with advanced endoscopy, ERCP, EUS, and minimally invasive treatment options.",
    image: "/images/medical%20gastro.png",
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    description:
      "Comprehensive eye care—from cataract and glaucoma to retina, cornea, LASIK, and pediatric ophthalmology with advanced diagnostics.",
    image: "/images/optho.png",
  },
  {
    slug: "ent",
    name: "Otorhinolaryngology - ENT",
    description:
      "Comprehensive ear, nose, and throat care—from hearing and sinus disorders to pediatric ENT, cochlear implants, and head & neck surgery.",
    image: "/images/ent.png",
  },
  {
    slug: "urology",
    name: "Urology",
    description:
      "Comprehensive urological care—from kidney stones and prostate disorders to uro-oncology, laser surgery, and renal transplantation.",
    image: "/images/urology.png",
  },
  {
    slug: "multi-organ-transplant",
    name: "Multi Organ Transplant",
    description:
      "Government-authorized liver and kidney transplant care with HOPE technology, expert multidisciplinary teams, and comprehensive pre and post-transplant support.",
    image: "/images/mutliorgan%20.png",
  },
  {
    slug: "oncology",
    name: "Oncology",
    description:
      "Comprehensive cancer care from early diagnosis through treatment, recovery, and survivorship—with advanced technology and compassionate support.",
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
      "Reconstructive and aesthetic surgery—burns, trauma, hand microsurgery, breast surgery, wound care, and cosmetic procedures.",
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
