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
    end: 2,
    label: "Oncology Disciplines",
    sublabel: "Medical & surgical oncology",
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
    display: "Expert",
    label: "Oncology Teams",
    sublabel: "Multidisciplinary care",
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
    label: "Urology Teams",
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
    display: "24/7",
    label: "Critical Care",
    sublabel: "ICU, CCU & ICCU support",
  },
  {
    display: "Expert",
    label: "ENT Teams",
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
    display: "Cornea",
    label: "Transplant",
    sublabel: "Restoring clear vision",
  },
  {
    display: "Expert",
    label: "Ophthalmology Teams",
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
    label: "Plastic Surgery Teams",
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
    sublabel: "HD endoscopy, capsule & more",
  },
];

export const generalMedicineStats: DepartmentHeroStat[] = [
  {
    display: "IMCU",
    label: "ICCU & IRCU Care",
    sublabel: "Specialized critical care units",
  },
  {
    display: "MHC",
    label: "Packages",
    sublabel: "Master health checkup plans",
  },
  {
    display: "24/7",
    label: "Emergency Care",
    sublabel: "Acute & urgent medical needs",
  },
  {
    display: "Expert",
    label: "General Medicine Teams",
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
    display: "2",
    label: "Surgical Options",
    sublabel: "Foot & vascular care",
  },
];

export const paediatricStats: DepartmentHeroStat[] = [
  {
    display: "Free",
    label: "Vaccination",
    sublabel: "Under 5 yrs",
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
    label: "Paediatric Teams",
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
    label: "Nephrology Teams",
    sublabel: "Transplant, dialysis & urology",
  },
  {
    end: 60,
    suffix: "+",
    label: "Renal Transplants",
    sublabel: "Successful kidney transplants",
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
    display: "Advanced",
    label: "Joint Replacement & Spine Surgeries",
    sublabel: "Comprehensive bone, joint & spine care",
  },
  {
    display: "24/7",
    label: "Emergency Support",
    sublabel: "Trauma & fracture care",
  },
  {
    display: "Expert",
    label: "Orthopaedic Teams",
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
    end: 100,
    suffix: "+",
    label: "Joint Replacements",
    sublabel: "Successful surgeries performed",
  },
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
];

export const cardiologyStats: DepartmentHeroStat[] = [
  {
    end: 10000,
    suffix: "+",
    label: "Diagnoses & Treatments",
    sublabel: "Annually",
  },
  {
    display: "Expert",
    label: "Cardiology Teams",
    sublabel: "Subspecialized care",
  },
  {
    display: "24/7",
    label: "CCU Patient Care",
    sublabel: "1:1 nursing ratio",
  },
];

export const neurologyStats: DepartmentHeroStat[] = [
  {
    display: "Expert",
    label: "Neurology Teams",
    sublabel: "Subspecialized care",
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

/** Achievement figures — update when hospitals publishes new totals */
export const transplantHeroStats: DepartmentHeroStat[] = [
  {
    end: 60,
    suffix: "+",
    label: "Successful Transplants",
    sublabel: "Overall achievement",
  },
  {
    end: 40,
    suffix: "+",
    label: "Cadaver Transplants",
    sublabel: "Deceased donor program",
  },
];

export const dermatologyStats: DepartmentHeroStat[] = [
  {
    end: 8,
    suffix: "+",
    label: "Clinical & Laser Services",
    sublabel: "Medical & cosmetic skin care",
  },
  {
    display: "CO2",
    label: "Fractional Laser & Dermatosurgery",
    sublabel: "Scars, vitiligo & aesthetic care",
  },
  {
    display: "Expert",
    label: "Dermatology Teams",
    sublabel: "Board-certified skin specialists",
  },
];

export const radiologyStats: DepartmentHeroStat[] = [
  {
    display: "24/7",
    label: "Emergency Diagnostics",
    sublabel: "Trauma, stroke & acute critical imaging",
  },
  {
    display: "CT & MRI",
    label: "Advanced Scanners",
    sublabel: "High-resolution slice & 3D imaging",
  },
  {
    end: 6,
    suffix: "+",
    label: "Imaging Modalities",
    sublabel: "MRI, CT, USG, X-Ray & Mammography",
  },
  {
    display: "Expert",
    label: "Radiology Teams",
    sublabel: "Board-certified clinical radiologists",
  },
];

export const anaesthesiologyStats: DepartmentHeroStat[] = [
  {
    end: 17,
    suffix: "+",
    label: "Modular Operation Theatres",
    sublabel: "Advanced surgical suites",
  },
  {
    display: "24/7",
    label: "Critical Care & ICU",
    sublabel: "Continuous hemodynamic life support",
  },
  {
    display: "Zero",
    label: "Pain Pathways",
    sublabel: "Multimodal analgesia & nerve blocks",
  },
  {
    display: "Expert",
    label: "Anaesthesia Teams",
    sublabel: "Specialized perioperative consultants",
  },
];

export const emergencyStats: DepartmentHeroStat[] = [
  {
    display: "24/7",
    label: "Emergency & Trauma Care",
    sublabel: "Immediate red-zone resuscitation",
  },
  {
    display: "Golden",
    label: "Hour Protocols",
    sublabel: "Rapid trauma & stroke pathways",
  },
  {
    end: 15,
    suffix: " Mins",
    label: "Door-to-Triage Target",
    sublabel: "Immediate specialist evaluation",
  },
  {
    display: "Level-1",
    label: "Trauma Preparedness",
    sublabel: "Multi-specialty emergency teams",
  },
];

export const spineSurgeryStats: DepartmentHeroStat[] = [
  {
    display: "MISS",
    label: "Keyhole Spine Procedures",
    sublabel: "Endoscopic & tubular decompression",
  },
  {
    display: "3D",
    label: "Intraoperative Navigation",
    sublabel: "Real-time neuro-monitoring (IONM)",
  },
  {
    display: "24/7",
    label: "Spinal Trauma Care",
    sublabel: "Immediate cord decompression",
  },
  {
    display: "Expert",
    label: "Spine Surgical Teams",
    sublabel: "Complex deformity & fusion experts",
  },
];

export const surgicalOncologyStats: DepartmentHeroStat[] = [
  {
    display: "Tumor",
    label: "Board Consensus",
    sublabel: "Multidisciplinary treatment planning",
  },
  {
    display: "Organ",
    label: "Preserving Resections",
    sublabel: "Oncoplastic & radical accuracy",
  },
  {
    display: "4K & MIS",
    label: "Minimally Invasive Onco-OT",
    sublabel: "Laparoscopic cancer surgeries",
  },
  {
    display: "Expert",
    label: "Surgical Oncologists",
    sublabel: "Subspecialized cancer surgeons",
  },
];

export const cardiovascularThoracicStats: DepartmentHeroStat[] = [
  {
    end: 5,
    suffix: "+",
    label: "Surgical Programs",
    sublabel: "Bypass, valve, thoracic & vascular",
  },
  {
    display: "Off-Pump",
    label: "Beating Heart CABG",
    sublabel: "Total arterial revascularisation",
  },
  {
    display: "24/7",
    label: "Dedicated CTICU",
    sublabel: "Intensivist & IABP monitoring",
  },
  {
    display: "Expert",
    label: "Cardiothoracic Teams",
    sublabel: "Surgeons, perfusionists & CCU care",
  },
];

export const generalSurgeryStats: DepartmentHeroStat[] = [
  {
    end: 6,
    suffix: "+",
    label: "Surgical Subspecialties",
    sublabel: "Laparoscopy, GI, HPB & trauma",
  },
  {
    display: "4K HD",
    label: "Minimally Invasive Suites",
    sublabel: "Advanced laparoscopic towers",
  },
  {
    display: "24/7",
    label: "Emergency Surgical Care",
    sublabel: "Acute abdomen & trauma OT",
  },
  {
    display: "Expert",
    label: "General Surgical Teams",
    sublabel: "Board-certified surgical faculty",
  },
];



