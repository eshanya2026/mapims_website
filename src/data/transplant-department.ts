import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const transplantIntro = {
  preview:
    "At Adhiparasakthi Hospitals, we are committed to saving lives and enhancing health through our state-of-the-art Multi-Organ Transplant Department.",
  full: "As a leader in organ transplant medicine, we provide comprehensive care for patients requiring complex multi-organ transplants, including heart, liver, kidney, and pancreas. Our facility is fully authorized by the government to perform multi-organ transplants, adhering to the highest standards of medical practice and patient safety. Each transplant journey is supported by a team of specialists who are dedicated to providing personalized care tailored to the unique needs of each patient.",
};

export const transplantVisionMission = {
  vision:
    "Our vision at Adhiparasakthi Hospitals - MAPIMS' Multi-Organ Transplant Department is to be a leader in organ transplantation, offering a new lease on life through advanced surgical techniques and compassionate care. We strive to set the standard for excellence in patient outcomes, embracing innovative research and technology to treat complex organ failure. Our commitment is to provide hope and renewal to individuals and families, ensuring access to quality care regardless of background",
  missionIntro:
    "Our mission is to save and enhance lives through comprehensive and efficient multi-organ transplant services. We are dedicated to:",
  missionPoints: [
    {
      title: "Excellence in Patient Care",
      description:
        "Deliver personalized, patient-centric treatment plans utilizing state-of-the-art technology and the highest standards of medical practice.",
    },
    {
      title: "Innovation in Transplantation",
      description:
        "Pursue groundbreaking research and adopt pioneering techniques to improve transplant success rates and patient recovery.",
    },
    {
      title: "Education and Advocacy",
      description:
        "Educate the community on the importance of organ donation and support patients and their families throughout the transplant process.",
    },
    {
      title: "Ethical Practices",
      description:
        "Uphold the highest ethical standards in all aspects of our operations, from patient care to organ donation and transplantation.",
    },
    {
      title: "Collaboration and Community Engagement",
      description:
        "Collaborate with national and international transplant networks to expand access to transplant services and improve organ donation awareness.",
    },
  ],
};

export const kidneyHopeCaseStudy = {
  preview:
    "Performed a complex kidney transplant procedure on a 38 year-old female patient who was on dialysis for end stage renal disease (ESRD). The kidney was also harvested from namakal Medical College 65 year old brain dead donor and was perfused with Hypothermic Oxygenated Machine Perfusion (HOPE) which preserved the organ for 2 hours. Preserving the organ in this device keeps Kidney Longer and better for Transplantation.",
  paragraphs: [
    "Kidneys harvested from donors are usually perfused and left in a cold environment surrounded by ice / cold solution where the cooling is static. Even though theoretically it can be used for upto 24 hours after harvesting, the quality of the kidney and the outcome decreases as the ischemic (storage) time increases. This HOPE system has the added advantage of continuous inflow of high concentrated oxygen along with the continuous infusion of hypothermic solution. This dual advantage is very important especially in the case of marginal donors as well as in situations where the ischemia time is expected to be long. Studies done in the west have shown that the rejection rate was less in the kidneys perfused with such preservation devices",
  ],
};

export const whyChooseTransplant = [
  {
    title: "Experienced Medical Team",
    description:
      "Our renal transplant team comprises highly experienced doctors, surgeons, and support staff committed to the best possible outcomes and personalized care.",
  },
  {
    title: "Patient Centered Care",
    description:
      "We guide every patient and family through evaluation, surgery, recovery, and long-term follow-up with compassion, transparency, and respect.",
  },
  {
    title: "24/7 Hours Service",
    description:
      "Round-the-clock clinical support, ICU care, and transplant coordination for patients and donors throughout the transplant journey.",
  },
];

export const transplantMilestones = [
  {
    title: "Back-to-Back Cadaver Transplants",
    body: "Our multi organ transplant team successfully completed two back-to-back cadaver transplants in 8 hours.",
  },
  {
    title: "HOPE Kidney Transplant",
    body: kidneyHopeCaseStudy.preview,
    detail: kidneyHopeCaseStudy.paragraphs.join("\n\n"),
  },
];

export const transplantExcellence = {
  heading: "Pioneering Excellence in Multi-Organ Transplantation",
  intro:
    "Adhiparasakthi Hospitals delivers advanced transplant medicine with technology, specialist expertise, and comprehensive support for every stage of care.",
  pillars: [
    {
      title: "Advanced Technological Infrastructure",
      description:
        "Modern surgical suites and diagnostic systems equipped for complex liver and kidney transplant procedures.",
    },
    {
      title: "Expert Team of Transplant Specialists",
      description:
        "Multidisciplinary surgeons, nephrologists, hepatologists, and coordinators with deep experience in organ transplantation.",
    },
    {
      title: "Comprehensive Support Services",
      description:
        "End-to-end evaluation, surgery, ICU care, dialysis coordination, and lifelong post-transplant follow-up.",
    },
  ],
  servicesNote:
    "Enhancing health through the provision of advanced transplant services.",
};

export const transplantDepartmentMetrics = [
  { end: 15, suffix: "+", label: "Health Sections" },
  { end: 200, suffix: "+", label: "Happy Patients" },
  { end: 30, suffix: "+", label: "Expert Doctors" },
];

export type TransplantServiceCard = {
  title: string;
  highlight?: string;
  subtitle?: string;
  description?: string;
};

export const transplantServices: TransplantServiceCard[] = [
  {
    title: "Expert Surgeons",
    highlight: "20+",
    subtitle: "Specialist Doctors",
  },
  {
    title: "Advanced Medical Equipment's",
    highlight: "24 X 7",
    subtitle: "Support",
  },
  {
    title: "Liver & Kidney",
    highlight: "Multi Transplant",
    subtitle: "Services",
  },
];

export const transplantSpecialistCount = 20;

export const expertCareTransplant = {
  title: "Expert Care in Liver & kidney Transplantation",
  intro:
    "At Adhiparasakthi Hospitals, we are dedicated to providing exceptional kidney transplant services in a supportive and caring environment. Our Renal Transplant Department is recognized and authorized by the government to perform complex kidney transplantation procedures, ensuring that every patient receives the highest standard of care.",
  accordion: [
    {
      id: "facilities",
      title: "State-of-the-Art Facilities",
      content:
        "Our hospital boasts state-of-the-art facilities designed to support advanced medical procedures and patient comfort. Our modern surgical suites are equipped with the latest technology, enabling our skilled surgical teams to perform even the most complicated surgeries with precision and care.",
    },
    {
      id: "cost",
      title: "Cost-Effective Treatment Options",
      content:
        "Understanding the financial aspects of healthcare, we strive to make Liver and kidney transplants accessible and affordable for all our patients. We offer cost-effective treatment options and accept various insurances, making it easier for patients to receive the care they need without financial burden.",
    },
    {
      id: "team",
      title: "Experienced Medical Team",
      content:
        "Our renal transplant team comprises highly experienced and dedicated doctors, surgeons, and support staff. Each member is committed to providing the best possible outcomes and personalized care. Our experts are leaders in their field, with extensive knowledge and experience in renal medicine and transplant surgery.",
    },
    {
      id: "patient-care",
      title: "Patient-Centered Care",
      content:
        "We prioritize personalized, compassionate care for every transplant patient and their family. Our team guides you through evaluation, surgery, recovery, and long-term follow-up with clear communication and support, addressing physical, emotional, and practical needs throughout your transplant journey.",
    },
    {
      id: "contact",
      title: "Contact Us",
      content:
        "For transplant consultation and appointments, call 1800 599 0999 or +91 94990 59966. Email us at contact@mapims.edu.in or book an appointment online through our website.",
    },
  ],
};

export const liverTransplantProgram = {
  title: "Liver Transplant",
  preview:
    "Our liver transplant program addresses complex cases including pediatric transplants, acute liver failure, and specialized mismatch procedures.",
  fullIntro:
    "Expert care in liver transplantation at Adhiparasakthi Hospitals, with government authorization and adherence to the highest standards of medical practice and patient safety.",
  bullets: [
    "Pediatric liver transplants",
    "Liver Transplants for acute liver failure patients",
    "HIV / HCV / HBV liver transplants",
    "ABOi blood group mismatch liver Transplants",
    "Swap liver transplants",
  ],
};

export const kidneyTransplantProgram = {
  title: "Kidney Transplant",
  preview:
    "At Adhiparasakthi Hospitals, we are dedicated to providing exceptional kidney transplant services in a supportive and caring environment.",
  fullIntro: [
    "At Adhiparasakthi Hospitals, we are dedicated to providing exceptional kidney transplant services in a supportive and caring environment. Our Renal Transplant Department is recognized and authorized by the government to perform complex kidney transplantation procedures, ensuring that every patient receives the highest standard of care.",
    "Understanding the financial aspects of healthcare, we strive to make Liver and kidney transplants accessible and affordable for all our patients. We offer cost-effective treatment options and accept various insurances, making it easier for patients to receive the care they need without financial burden.",
  ],
  bullets: [
    "ABO i transplant",
    "Transplant in a 5 year old",
    "HIV positive recipient",
    "2 cadaver transplant in 12 hours –3 times",
    "Obese donor and recipient",
    "Transplant in a young female with Turner syndrome and Aortic stenosis",
    "Transplant in a young male with severe PAH",
  ],
};

export const transplantProgramAchievements = {
  heading: "Our Achievements",
  intro:
    "Our successful transplant cases demonstrate our commitment to excellence in liver and kidney transplantation.",
  liver: liverTransplantProgram,
  kidney: kidneyTransplantProgram,
};

export const leadDoctor = {
  name: "Vaseekaran",
  credentials: "Chief Operating officer (COO)",
  department:
    "Department of Multi organ Transplant (Liver kidney and HPB surgery )",
  image:
    "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=800&auto=format&fit=crop",
  preview:
    "I have been involved in the department of Multiorgan Transplant and Hepatobiliary surgery for 15 years, being a part of various multidisciplinary teams. I have been a part of 150 liver transplants and 300 renal transplants. My initial role was primarily to assist in surgeries and help in perioperative care of our transplant patients.",
  fullBio: `This initial exposure gradually transcended into me fulfilling various roles such as a Surgery Associate. I obtained a Masters in Business Administration in Hospital Management to better equip myself in this field and improve my organisational skills and knowledge in financial analysis and data analysis. This proved to be value addition to every team I was a part of thereafter.

My role in operations has been vital in bridging the gap between the patient and in-hospital services . This involves in depth understanding of the department administration,smooth donor retrieval, adequate counselling, comprehensive documentation and thorough knowledge of paperwork related to Multiorgan Transplant.

My executive role has been valued as a clinician- assisting in surgeries, and aiding in proper peri- operative care. As organ transplantation involves many disciplines of medicine , it is vital to have someone to link them all together ensuring the well being of the patient.I have also been active in helping in fund raising and Grief counselling for patients.

I have managed daily business operations of the various Multi organ transplant units I have been a part of, working closely with department heads. I have supervised day to day operations ensuring a smooth workflow. I value honesty and teamwork, and I take a straightforward, determined approach to my work. My insight and experience as a leader would help take a department forward towards achieving its goals.`,
};

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127b54e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1651008376811-b90daee60fbf?q=80&w=400&auto=format&fit=crop",
];

export const transplantSpecialists = [
  { name: "Dr. T. Ramesh", role: "Medical Director" },
  { name: "Dr. Kapali Neelamekam", role: "Advisor - Multi organ Transplant" },
  {
    name: "Dr. Mahendra Varman L",
    role: "Lead consultant Transplant Sciences & Nephrology",
  },
  {
    name: "Dr S Bhaskaran",
    role: "Senior Consultant — Nephrology & Renal Transplant",
  },
  {
    name: "Dr.T.R. RAJKUMAR",
    role: "Transplant surgeon & Consultant urologist",
  },
  { name: "Dr A. Rekha", role: "Medical Superintendent" },
  { name: "Dr. R. Rama Krishnan", role: "Consultant Urologist" },
  { name: "Dr. S. KUMARESAN", role: "Head of Transplant Anesthesia" },
  {
    name: "Dr. Umesh Raj Somasundaram",
    role: "Advanced Laparoscopic & General Surgery",
  },
  { name: "S. Rajkumar", role: "Senior executive Transplant" },
  { name: "M.M. Rajendiran", role: "Dialysis Manager" },
  {
    name: "Dr. Dinesh Jothimani",
    role: "M.S., M.Ch., (Surgical Gastroenterology)",
  },
].map((doctor, index) => ({
  ...doctor,
  image: specialistImagePool[index % specialistImagePool.length],
}));

export const transplantHeroImage = "/images/mutliorgan%20.png";

export const transplantServicesIntro = transplantExcellence.servicesNote;

export const transplantInfrastructure = [
  expertCareTransplant.accordion[0].content,
  expertCareTransplant.accordion[1].content,
  expertCareTransplant.accordion[2].content,
  expertCareTransplant.accordion[3].content,
];

export const transplantTeamNote = {
  title: expertCareTransplant.title,
  description: expertCareTransplant.intro,
};

export const transplantJourney = {
  heading: "Transforming Lives Through Advanced Transplant Care.",
  body: "From evaluation and surgery to recovery and long-term follow-up, our transplant team guides patients and families through every step with compassion, transparency, and clinical excellence.",
  ctaHeading: "Take the First Step Today",
  ctaBody:
    "Schedule a consultation with our transplant experts to discuss liver or kidney transplant options and personalized care plans for you or your loved one.",
};

export const transplantJourneyPillars = [
  {
    title: "Evaluation & Planning",
    description:
      "Thorough assessment, donor matching, and clear guidance through waiting-list and preparation.",
  },
  {
    title: "Surgery & Recovery",
    description:
      "Expert surgical teams and ICU support for safe transplant procedures and post-operative care.",
  },
  {
    title: "Lifelong Follow-Up",
    description:
      "Ongoing monitoring, medication management, and family support after transplant.",
  },
];

function mapTransplantSpecialist(
  entry: {
    id: string;
    name: string;
    degree: string;
    experience: string;
    designation: string;
  },
  imageIndex: number,
  accent: DepartmentSpecialist["accent"]
): DepartmentSpecialist {
  return {
    ...entry,
    image: specialistImagePool[imageIndex % specialistImagePool.length],
    accent,
  };
}

/** Transplant faculty — replace images with official MAPIMS photos when available */
export const transplantDepartmentSpecialists: DepartmentSpecialist[] = [
  mapTransplantSpecialist(
    {
      id: "transplant-ramesh",
      name: "Dr. T. Ramesh",
      degree: "Medical Director",
      experience: "20+ Yrs",
      designation: "Medical Director — Multi Organ Transplant",
    },
    0,
    "primary"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-neelamekam",
      name: "Dr. Kapali Neelamekam",
      degree: "Advisor — Multi Organ Transplant",
      experience: "25+ Yrs",
      designation: "Advisor — Multi Organ Transplant",
    },
    1,
    "deep"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-vaseekaran",
      name: "Vaseekaran",
      degree: "Chief Operating Officer (COO)",
      experience: "15+ Yrs",
      designation:
        "Department of Multi Organ Transplant (Liver, Kidney & HPB Surgery)",
    },
    2,
    "primary"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-mahendra",
      name: "Dr. Mahendra Varman L",
      degree: "MD, DM (Nephrology)",
      experience: "18+ Yrs",
      designation: "Lead Consultant — Transplant Sciences & Nephrology",
    },
    3,
    "deep"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-bhaskaran",
      name: "Dr. S. Bhaskaran",
      degree: "MD, DM (Nephrology)",
      experience: "16+ Yrs",
      designation: "Senior Consultant — Nephrology & Renal Transplant",
    },
    4,
    "primary"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-rajkumar",
      name: "Dr. T.R. Rajkumar",
      degree: "MS, M.Ch.",
      experience: "18+ Yrs",
      designation: "Transplant Surgeon & Consultant Urologist",
    },
    5,
    "deep"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-rajendiran",
      name: "M.M. Rajendiran",
      degree: "Dialysis Manager",
      experience: "12+ Yrs",
      designation: "Dialysis Manager — Transplant Services",
    },
    6,
    "primary"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-seshadri",
      name: "Seshadri",
      degree: "Transplant Manager & Coordinator",
      experience: "10+ Yrs",
      designation: "Transplant Manager & Coordinator",
    },
    0,
    "deep"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-sathish",
      name: "G. Sathish Kumar",
      degree: "Transplant Coordinator",
      experience: "8+ Yrs",
      designation: "Transplant Coordinator",
    },
    1,
    "primary"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-dinesh",
      name: "Dr. Dinesh Jothimani",
      degree: "MS, M.Ch. (Surgical Gastroenterology)",
      experience: "14+ Yrs",
      designation: "Consultant — Surgical Gastroenterology",
    },
    2,
    "deep"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-kumaresan",
      name: "Dr. S. Kumaresan",
      degree: "MD, DA",
      experience: "20+ Yrs",
      designation: "Head of Transplant Anesthesia",
    },
    3,
    "primary"
  ),
  mapTransplantSpecialist(
    {
      id: "transplant-umesh",
      name: "Dr. Umesh Raj Somasundaram",
      degree: "MS, M.Ch.",
      experience: "15+ Yrs",
      designation: "Advanced Laparoscopic & General Surgery",
    },
    4,
    "deep"
  ),
];

export const transplantGallery = [
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631217868264-e5b1b5d261b9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530497610247-94d17445316a?q=80&w=600&auto=format&fit=crop",
];
