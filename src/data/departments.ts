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

/** Slugs routed to hospital services detail page */
export const departmentServiceSlugs: Record<string, string> = {
  "general-surgery": "/services/general-surgery",
  "cardiovascular-thoracic-surgery": "/services/cardiovascular-thoracic-surgery",
  "surgical-oncology": "/services/surgical-oncology",
  "accident-emergency-services": "/services/accident-emergency-services",
  "spinal-surgeries": "/services/spinal-surgeries",
  anaesthesiology: "/services/anaesthesiology",
  radiology: "/services/radiology-imaging-science",
  dermatology: "/services/dermatology",
};

export function getDepartmentHref(slug: string): string {
  if ((departmentDetailSlugs as readonly string[]).includes(slug)) {
    return `/departments/${slug}`;
  }
  if (departmentServiceSlugs[slug]) {
    return departmentServiceSlugs[slug];
  }
  return "/departments";
}

/** Emoji shown beside department names in the department page aside */
export const departmentAsideIcons: Record<string, string> = {
  cardiology: "❤️",
  nephrology: "🫘",
  urology: "🚻",
  "multi-organ-transplant": "🫀",
  "general-medicine": "🩺",
  diabetology: "🩸",
  pulmonology: "🫁",
  "general-surgery": "🔪",
  paediatric: "👶",
  orthopaedics: "🦴",
  "obstetrics-gynaecology": "🤰",
  ent: "👂",
  ophthalmology: "👁️",
  dermatology: "🧴",
  psychiatry: "🧠",
  radiology: "🩻",
  anaesthesiology: "💉",
  "medical-gastroenterology": "🍽️",
  "plastic-surgery": "✋",
  oncology: "🎗️",
  neurology: "🧠",
  "joint-replacement": "🦵",
  "cardiovascular-thoracic-surgery": "🫀",
  "surgical-oncology": "🎗️",
  "accident-emergency-services": "🚑",
  "spinal-surgeries": "🦴",
  "critical-care-medicine": "🏥",
  "transfusion-medicine": "🩸",
  "oral-maxillofacial-surgery": "🦷",
};

export const departments: Department[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    description:
      "Comprehensive heart care for adults and children—from preventive care and cardiac imaging to interventional procedures and 24/7 CCU support.",
    image: "/images/0b7b9cd4-ff80-484d-b49e-b1604e2e0fb1.png",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    description:
      "Comprehensive kidney care—from CKD management and dialysis to transplantation, renal diagnostics, and 24/7 emergency renal support.",
    image: "/images/nephrology.png",
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
    slug: "general-medicine",
    name: "General Medicine",
    description:
      "Expert diagnosis, preventive care, and chronic disease management—with advanced diagnostics, telemedicine, and 24/7 emergency support.",
    image: "/images/general%20med.png",
  },
  {
    slug: "diabetology",
    name: "Diabetology",
    description:
      "Personalized diabetes and metabolic care—CGMS, insulin pump therapy, complication management, bariatric surgery, and endocrine support.",
    image: "/images/diab.png",
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    description:
      "Advanced respiratory and pulmonary medicine—asthma, allergy, COPD, sleep medicine, interstitial lung diseases, and bronchoscopy.",
    image: "/images/general%20med.png",
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    description:
      "Comprehensive surgical care for abdominal, gastrointestinal, hernia, trauma, and advanced minimally invasive laparoscopic procedures.",
    image: "/images/international/general sur.png",
  },
  {
    slug: "paediatric",
    name: "Pediatrics",
    description:
      "Comprehensive child healthcare from infancy through adolescence—routine wellness visits, free vaccination under 5 yrs, neonatal care, and 24/7 emergency support.",
    image: "/images/paedrtrics.png",
  },
  {
    slug: "orthopaedics",
    name: "Orthopedics",
    description:
      "Comprehensive bone, joint, muscle, and spine care—from fractures and sports injuries to joint replacement, spine surgery, and rehabilitation.",
    image: "/images/ortho.png",
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology Department",
    description:
      "Expert women's healthcare from adolescence through pregnancy, fertility, surgery, and menopause—with maternity, NICU, and gynaecology under one roof.",
    image: "/images/og.png",
  },
  {
    slug: "ent",
    name: "ENT",
    description:
      "Comprehensive ear, nose, and throat care—from hearing and sinus disorders to pediatric ENT, cochlear implants, and head & neck surgery.",
    image: "/images/ent.png",
  },
  {
    slug: "ophthalmology",
    name: "Opthal (Ophthalmology)",
    description:
      "Comprehensive eye care—from cataract and glaucoma to retina, cornea, LASIK, and pediatric ophthalmology with advanced diagnostics.",
    image: "/images/optho.png",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    description:
      "Medical and cosmetic dermatology for skin conditions, allergies, hair and nail disorders, and advanced clinical skin treatments.",
    image: "/images/international/derma.png",
  },
  {
    slug: "psychiatry",
    name: "Psychiatry",
    description:
      "Compassionate mental health and behavioral sciences care—psychological counseling, mood disorder management, and holistic psychiatric support.",
    image: "/images/neurology.png",
  },
  {
    slug: "radiology",
    name: "Radiology",
    description:
      "Advanced diagnostic imaging including high-resolution CT, MRI, ultrasound, X-ray, and precision interventional radiology services.",
    image: "/images/international/imaging science.png",
  },
  {
    slug: "anaesthesiology",
    name: "Anaesthesiology",
    description:
      "Expert anesthesia, ICU critical care, and pain medicine with round-the-clock specialist teams and advanced monitoring.",
    image: "/images/international/anaesthesiology.png",
  },
  {
    slug: "medical-gastroenterology",
    name: "Medical Gastroenterology",
    description:
      "Comprehensive digestive, liver, and colorectal care—with advanced endoscopy, diagnostic imaging, and minimally invasive treatment options.",
    image: "/images/medical%20gastro.png",
  },
  {
    slug: "plastic-surgery",
    name: "Plastic Surgery",
    description:
      "Reconstructive and aesthetic surgery—burns, trauma, hand microsurgery, breast surgery, wound care, and cosmetic procedures.",
    image: "/images/plastic%20surgery.png",
  },
  {
    slug: "oncology",
    name: "Medical Oncology",
    description:
      "Comprehensive cancer care from early diagnosis through chemotherapy, immunotherapy, recovery, and survivorship with compassionate support.",
    image: "/images/oncology.png",
  },
  {
    slug: "neurology",
    name: "Neurology",
    description:
      "World-class neurological and stroke care for patients of all ages with advanced neuro-diagnostics and skilled neurologists.",
    image: "/images/neurology.png",
  },
  {
    slug: "joint-replacement",
    name: "Joint Replacement",
    description:
      "Comprehensive hip, knee, shoulder, and upper-limb joint replacement with modern implants, advanced techniques, and personalized rehabilitation.",
    image: "/images/joint%20.png",
  },
  {
    slug: "cardiovascular-thoracic-surgery",
    name: "Cardiovascular & Thoracic Surgery",
    description:
      "Heart and chest surgery programmes with experienced cardiothoracic surgeons, bypass surgery, valve replacements, and modern operating suites.",
    image: "/images/international/cardio.png",
  },
  {
    slug: "surgical-oncology",
    name: "Surgical Oncology",
    description:
      "Advanced cancer surgery with multidisciplinary tumor board planning, organ-preserving resection, and modern oncologic techniques.",
    image: "/images/international/spinal oncology.png",
  },
  {
    slug: "accident-emergency-services",
    name: "Accident and Emergency Medicine",
    description:
      "24/7 emergency and trauma care with rapid triage, trauma resuscitation bays, advanced diagnostics, and critical care transport.",
    image: "/images/international/casualty.png",
  },
  {
    slug: "spinal-surgeries",
    name: "Spine Surgeries",
    description:
      "Specialized spine care from minimally invasive disc procedures to complex spinal deformity correction and trauma surgery.",
    image: "/images/international/spiral.png",
  },
  {
    slug: "critical-care-medicine",
    name: "Critical Care Medicine",
    description:
      "Round-the-clock intensive care units (ICU, CCU, NICU, PICU) equipped with advanced ventilators, hemodynamic monitoring, and intensivists.",
    image: "/images/hospital-casualty-emergency.png",
  },
  {
    slug: "transfusion-medicine",
    name: "Transfusion Medicine",
    description:
      "State-of-the-art licensed blood center and transfusion medicine services with component separation, apheresis, and strict safety testing.",
    image: "/images/international/central lab.png",
  },
  {
    slug: "oral-maxillofacial-surgery",
    name: "Oral and Maxillofacial Surgery",
    description:
      "Specialized surgical care for facial trauma, jaw reconstruction, orthognathic correction, oral pathology, and advanced dental surgery.",
    image: "/images/ent.png",
  },
];

/** Priority order at the top of the department page aside nav */
export const departmentAsidePrioritySlugs = [
  "cardiology",
  "nephrology",
  "urology",
  "multi-organ-transplant",
] as const;

export function getDepartmentsForAside(): Department[] {
  return departments;
}
