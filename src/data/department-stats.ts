export type DepartmentHeroStat = {
  label: string;
  sublabel?: string;
  /** Animate from 0 when set */
  end?: number;
  suffix?: string;
  /** Static value (e.g. 24/7) — skips counter animation */
  display?: string;
};

export const oncologyStats: DepartmentHeroStat[] = [
  {
    end: 3,
    label: "Oncology Disciplines",
    sublabel: "Medical, radiation & surgical",
  },
  {
    end: 4,
    label: "Care Programs",
    sublabel: "Screening to survivorship",
  },
  {
    display: "24/7",
    label: "Cancer Care Support",
    sublabel: "Emergency & inpatient",
  },
  {
    end: 15,
    suffix: "+",
    label: "Expert Oncologists",
    sublabel: "Multidisciplinary team",
  },
];

export const urologyStats: DepartmentHeroStat[] = [
  {
    end: 7,
    suffix: "+",
    label: "Urology Services",
    sublabel: "Stones, prostate & oncology",
  },
  {
    display: "Laser",
    label: "Holmium & Thulium",
    sublabel: "Stones & BPH treatment",
  },
  {
    display: "24/7",
    label: "Critical Care",
    sublabel: "ICU, CCU & transplant support",
  },
  {
    display: "Expert",
    label: "Urologists",
    sublabel: "Endourology to renal transplant",
  },
];

export const entStats: DepartmentHeroStat[] = [
  {
    end: 5,
    suffix: "+",
    label: "ENT Services",
    sublabel: "Ear, nose & throat care",
  },
  {
    end: 5,
    label: "ENT Surgeries",
    sublabel: "Tympanoplasty to tonsillectomy",
  },
  {
    display: "24/7",
    label: "Critical Care",
    sublabel: "ICU, CCU & ICCU support",
  },
  {
    display: "Expert",
    label: "ENT Specialists",
    sublabel: "Subspecialty-trained team",
  },
];

export const ophthalmologyStats: DepartmentHeroStat[] = [
  {
    display: "1L+",
    label: "Eye Surgeries",
    sublabel: "Successful procedures performed",
  },
  {
    display: "Free",
    label: "Eye Camps",
    sublabel: "Community outreach & surgery",
  },
  {
    display: "24/7",
    label: "Patient Care",
    sublabel: "Round-the-clock support",
  },
  {
    display: "Expert",
    label: "Ophthalmologists",
    sublabel: "Highly equipped surgical team",
  },
];

export const plasticSurgeryStats: DepartmentHeroStat[] = [
  {
    end: 10,
    suffix: "+",
    label: "Surgical Services",
    sublabel: "Reconstructive & aesthetic care",
  },
  {
    display: "Expert",
    label: "Plastic Surgeons",
    sublabel: "Complex reconstruction & aesthetics",
  },
  {
    display: "Personal",
    label: "Patient-Centred Care",
    sublabel: "Consultation through recovery",
  },
  {
    display: "24/7",
    label: "Trauma Support",
    sublabel: "Urgent reconstructive needs",
  },
];

export const medicalGastroenterologyStats: DepartmentHeroStat[] = [
  {
    end: 17,
    label: "Operation Theatres",
    sublabel: "State-of-the-art surgical suites",
  },
  {
    end: 7,
    suffix: "+",
    label: "GI Procedures",
    sublabel: "Endoscopic & surgical care",
  },
  {
    display: "1:1",
    label: "Nursing Ratio",
    sublabel: "24/7 patient care",
  },
  {
    end: 6,
    suffix: "+",
    label: "Advanced Technologies",
    sublabel: "HD endoscopy, EUS, capsule & more",
  },
];

export const generalMedicineStats: DepartmentHeroStat[] = [
  {
    end: 17,
    label: "Operation Theatres",
    sublabel: "State-of-the-art surgical suites",
  },
  {
    display: "1:1",
    label: "Nursing Ratio",
    sublabel: "24/7 patient care",
  },
  {
    display: "24/7",
    label: "Emergency Care",
    sublabel: "Acute & urgent medical needs",
  },
  {
    display: "Expert",
    label: "Medical Team",
    sublabel: "Qualified & experienced specialists",
  },
];

export const diabetologyStats: DepartmentHeroStat[] = [
  {
    end: 6,
    suffix: "+",
    label: "Care Programmes",
    sublabel: "Medical & surgical diabetes care",
  },
  {
    display: "CGMS",
    label: "Glucose Monitoring",
    sublabel: "Insulin pump & CGMS",
  },
  {
    display: "24/7",
    label: "Specialist Support",
    sublabel: "Endocrine & metabolic care",
  },
  {
    display: "4",
    label: "Surgical Options",
    sublabel: "Foot, bariatric & vascular",
  },
];

export const paediatricStats: DepartmentHeroStat[] = [
  {
    end: 500,
    suffix: "+",
    label: "Emergency Cases / Year",
    sublabel: "Children under age 4",
  },
  {
    display: "24/7",
    label: "Paediatric Care",
    sublabel: "Emergency & inpatient",
  },
  {
    display: "NICU",
    label: "Neonatal & PICU",
    sublabel: "Critical child care",
  },
  {
    display: "Expert",
    label: "Paediatric Team",
    sublabel: "Family-centred specialists",
  },
];

export const nephrologyStats: DepartmentHeroStat[] = [
  {
    end: 50,
    suffix: "+",
    label: "Advanced Dialysis Units",
    sublabel: "Hemodialysis & peritoneal dialysis",
  },
  {
    display: "24/7",
    label: "Patient Care",
    sublabel: "Emergency & inpatient services",
  },
  {
    display: "Expert",
    label: "Nephrology Team",
    sublabel: "Transplant, dialysis & urology",
  },
  {
    display: "CKD",
    label: "Full Spectrum Care",
    sublabel: "Diagnosis to long-term management",
  },
];

export const obstetricsGynaecologyStats: DepartmentHeroStat[] = [
  {
    end: 5,
    suffix: "+",
    label: "Core Service Areas",
    sublabel: "Pregnancy, fertility & women's health",
  },
  {
    display: "NICU",
    label: "Neonatal Intensive Care",
    sublabel: "Advanced newborn support",
  },
  {
    display: "24/7",
    label: "Maternal Care",
    sublabel: "Emergency & inpatient services",
  },
  {
    display: "IVF",
    label: "Fertility Care",
    sublabel: "IVF, IUI & ART services",
  },
];

export const orthopaedicsStats: DepartmentHeroStat[] = [
  {
    end: 8,
    suffix: "+",
    label: "Orthopaedic Services",
    sublabel: "Comprehensive bone & joint care",
  },
  {
    display: "24/7",
    label: "Emergency Support",
    sublabel: "Trauma & fracture care",
  },
  {
    display: "Expert",
    label: "Orthopaedic Team",
    sublabel: "Specialized surgeons & rehab",
  },
  {
    display: "ICU",
    label: "Critical Care Support",
    sublabel: "ICU, CCU & ICCU backup",
  },
];

export const jointReplacementStats: DepartmentHeroStat[] = [
  {
    end: 7,
    label: "Joint Procedures",
    sublabel: "Hip, knee, shoulder & more",
  },
  {
    display: "24/7",
    label: "Patient Care",
    sublabel: "Round-the-clock support",
  },
  {
    display: "1:1",
    label: "Nursing Ratio",
    sublabel: "Dedicated recovery care",
  },
];

export const cardiologyStats: DepartmentHeroStat[] = [
  {
    end: 10000,
    suffix: "+",
    label: "Diagnoses & Treatments",
    sublabel: "Annually",
  },
  {
    end: 50,
    suffix: "+",
    label: "Cardiology Experts",
    sublabel: "Subspecialized team",
  },
  {
    display: "24/7",
    label: "CCU Patient Care",
    sublabel: "1:1 nursing ratio",
  },
  {
    end: 90,
    suffix: "%",
    label: "Second Opinion",
    sublabel: "New or refined diagnosis",
  },
];

export const neurologyStats: DepartmentHeroStat[] = [
  {
    end: 10,
    suffix: "+",
    label: "Neurology Experts",
  },
  {
    end: 5000,
    suffix: "+",
    label: "Patients Treated",
  },
  {
    display: "24/7",
    label: "Stroke Care",
  },
  {
    end: 100,
    suffix: "+",
    label: "Neurosurgeries / Year",
  },
];

/** Achievement figures — update when hospital publishes new totals */
export const transplantHeroStats: DepartmentHeroStat[] = [
  {
    end: 43,
    label: "Successful Transplants",
    sublabel: "Overall achievement",
  },
  {
    end: 22,
    label: "Kidney Transplants",
    sublabel: "Renal program",
  },
  {
    end: 20,
    label: "Cornea Transplants",
    sublabel: "Successful cases",
  },
  {
    end: 150,
    label: "Liver Transplants Supported",
    sublabel: "Leadership team expertise",
  },
];
