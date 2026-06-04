import type { FaqItem } from "@/components/shared/FaqAccordion";

export const departmentFaqsBySlug: Record<string, FaqItem[]> = {
  cardiology: [
    {
      question: "What are the symptoms of heart disease?",
      answer:
        "Common symptoms include chest pain or pressure, shortness of breath, palpitations, dizziness, swelling in the legs, fatigue, and pain radiating to the arm, jaw, or back. Seek urgent care if chest pain is severe, sudden, or accompanied by sweating or breathlessness.",
    },
    {
      question: "Do you provide emergency cardiac care?",
      answer:
        "Yes. Our 24/7 Accident & Emergency team works with the Cardiology Department and cardiothoracic CCUs for acute heart attacks, arrhythmias, and other cardiac emergencies.",
    },
    {
      question: "What tests are available for heart evaluation?",
      answer:
        "We offer ECG, echocardiography, stress testing, cardiac CT/MRI where indicated, Holter monitoring, and invasive assessments when needed, with advanced bedside monitoring in cardiothoracic critical care units.",
    },
    {
      question: "Do you perform angioplasty and bypass surgery?",
      answer:
        "Yes. Our team performs angioplasty and stent placement, and provides comprehensive cardiac surgical care including bypass surgery when required.",
    },
  ],
  oncology: [
    {
      question: "What types of cancer do you treat?",
      answer:
        "Our Oncology Department treats a wide range of cancers through medical, surgical, and radiation oncology, with multidisciplinary tumour boards to plan individualized care.",
    },
    {
      question: "How is cancer diagnosed?",
      answer:
        "Diagnosis may include clinical examination, blood tests, imaging (CT, MRI, PET where indicated), biopsy, and pathology review. Your oncologist will recommend the appropriate tests based on symptoms and findings.",
    },
    {
      question: "Do you provide chemotherapy and radiation therapy?",
      answer:
        "Yes. We offer chemotherapy, radiation therapy, and coordinated supportive care, with treatment plans tailored to cancer type, stage, and overall health.",
    },
    {
      question: "Is cancer surgery available?",
      answer:
        "Yes. Surgical oncology is available for suitable cancers, planned in coordination with medical and radiation oncology for comprehensive treatment.",
    },
    {
      question: "Can I get a second opinion from your specialists?",
      answer:
        "Yes. You may book a consultation with our oncology specialists and bring prior reports, imaging, and pathology records for review and treatment planning.",
    },
  ],
  neurology: [
    {
      question: "What neurological conditions do you treat?",
      answer:
        "We treat stroke, epilepsy, Parkinson's disease, headaches, neuropathy, multiple sclerosis, and other brain, spine, and nerve disorders for adults and children.",
    },
    {
      question: "When should I see a neurologist?",
      answer:
        "See a neurologist for persistent headaches, seizures, weakness, numbness, balance problems, memory concerns, or after a stroke or abnormal brain imaging.",
    },
    {
      question: "Do you provide stroke emergency care?",
      answer:
        "Yes. We provide 24/7 stroke evaluation and acute management, coordinated with emergency medicine and neurosurgery when advanced intervention is needed.",
    },
    {
      question: "What diagnostic tests are available?",
      answer:
        "Available tests include MRI, CT scan, EEG, nerve conduction studies, and laboratory investigations based on your condition.",
    },
    {
      question: "Is rehabilitation available after treatment?",
      answer:
        "Yes. Recovery plans include physiotherapy and rehabilitation support coordinated with neurology follow-up to improve mobility and daily function.",
    },
  ],
  orthopaedics: [
    {
      question: "When should I consult an orthopaedic specialist?",
      answer:
        "Consult an orthopaedic specialist for joint pain, fractures, sports injuries, spine problems, arthritis, deformities, or when daily activities are limited by bone or joint symptoms.",
    },
    {
      question: "Do you treat sports injuries and fractures?",
      answer:
        "Yes. We manage acute fractures, ligament injuries, and sports-related trauma, including surgical fixation and arthroscopic treatment when required.",
    },
    {
      question: "Is joint replacement surgery available?",
      answer:
        "Yes. We perform hip, knee, and other joint replacement procedures with structured post-operative physiotherapy and follow-up care.",
    },
    {
      question: "What treatments are available for arthritis?",
      answer:
        "Treatment includes medication, physiotherapy, lifestyle guidance, injections where appropriate, and surgical options such as joint replacement for advanced arthritis.",
    },
    {
      question: "Do you provide rehabilitation services?",
      answer:
        "Yes. Rehabilitation and physiotherapy are integrated into treatment plans to restore strength, mobility, and function after injury or surgery.",
    },
  ],
  nephrology: [
    {
      question: "What kidney conditions do you treat?",
      answer:
        "We treat chronic kidney disease, acute kidney injury, electrolyte disorders, glomerular disease, diabetic kidney disease, and hypertension related to kidney problems.",
    },
    {
      question: "When is dialysis required?",
      answer:
        "Dialysis is recommended when the kidneys can no longer maintain safe levels of waste and fluid, or when urgent removal of toxins and excess fluid is needed.",
    },
    {
      question: "Do you provide hemodialysis and peritoneal dialysis?",
      answer:
        "Yes. Our nephrology team provides haemodialysis services and can guide suitable patients on peritoneal dialysis options based on clinical needs.",
    },
    {
      question: "How can I prevent kidney disease?",
      answer:
        "Prevention includes controlling diabetes and blood pressure, avoiding nephrotoxic medicines when possible, staying hydrated, and regular kidney function monitoring if you are at risk.",
    },
    {
      question: "Is kidney transplant evaluation available?",
      answer:
        "Yes. Kidney transplant evaluation is available in coordination with our Multi Organ Transplant programme for eligible patients.",
    },
  ],
  "obstetrics-gynaecology": [
    {
      question: "Do you provide high-risk pregnancy care?",
      answer:
        "Yes. We manage high-risk pregnancies with close monitoring, specialist supervision, and NICU support for newborns when needed.",
    },
    {
      question: "Are fertility treatments available?",
      answer:
        "Yes. Fertility evaluation and IVF-related services are available through our Obstetrics & Gynaecology team with individualized counselling and care plans.",
    },
    {
      question: "What gynaecological conditions do you treat?",
      answer:
        "We treat fibroids, endometriosis, menstrual disorders, pelvic pain, ovarian cysts, infections, and other gynaecological conditions with medical and surgical options.",
    },
    {
      question: "Do you offer minimally invasive surgeries?",
      answer:
        "Yes. Laparoscopic and other minimally invasive gynaecological surgeries are performed for suitable conditions to support faster recovery.",
    },
    {
      question: "Is neonatal care available for newborns?",
      answer:
        "Yes. NICU facilities and neonatal support are available for newborns requiring specialized care after delivery.",
    },
  ],
  "medical-gastroenterology": [
    {
      question: "What digestive disorders do you treat?",
      answer:
        "We treat acid reflux, ulcers, inflammatory bowel disease, liver disease, pancreatic and biliary disorders, colorectal conditions, and gastrointestinal cancers.",
    },
    {
      question: "When should I consult a gastroenterologist?",
      answer:
        "Consult a gastroenterologist for persistent abdominal pain, blood in stool, difficulty swallowing, chronic heartburn, jaundice, unexplained weight loss, or abnormal liver tests.",
    },
    {
      question: "Do you perform endoscopy and colonoscopy?",
      answer:
        "Yes. We perform upper GI endoscopy, colonoscopy, ERCP, and therapeutic endoscopic procedures with specialist supervision and monitored sedation when needed.",
    },
    {
      question: "How are liver diseases diagnosed and treated?",
      answer:
        "Diagnosis includes blood tests, ultrasound, CT/MRI, and endoscopy where indicated. Treatment may involve medication, lifestyle changes, endoscopic therapy, and coordinated care for advanced liver disease.",
    },
    {
      question: "Do you provide advanced gastrointestinal procedures?",
      answer:
        "Yes. Advanced procedures include ERCP, therapeutic endoscopy, laparoscopic GI surgery, and minimally invasive management using modern endoscopic and laser technology.",
    },
  ],
  urology: [
    {
      question: "What urological conditions do you treat?",
      answer:
        "We treat kidney stones, prostate disorders, bladder conditions, urinary infections, male infertility, urological cancers, and pediatric urological conditions.",
    },
    {
      question: "Do you treat kidney stones?",
      answer:
        "Yes. Treatment options include medical management, ESWL, ureteroscopy (URS/RIRS), PCNL, and laser lithotripsy based on stone size and location.",
    },
    {
      question: "Is minimally invasive urological surgery available?",
      answer:
        "Yes. We offer endourology, laparoscopic urology, and laser-assisted procedures for many stone and prostate conditions.",
    },
    {
      question: "Do you provide prostate care services?",
      answer:
        "Yes. We diagnose and treat BPH and prostate cancer using medication, TURP, and advanced Holmium and Thulium laser systems.",
    },
    {
      question: "When should I consult a urologist?",
      answer:
        "See a urologist for painful urination, blood in urine, recurrent stones, urinary retention, prostate symptoms, or abnormal urology test results.",
    },
  ],
  paediatric: [
    {
      question: "What age groups do your paediatricians treat?",
      answer:
        "Our paediatric team cares for infants, children, and adolescents, from newborn health through teenage medical needs.",
    },
    {
      question: "Do you provide newborn and neonatal care?",
      answer:
        "Yes. We provide newborn care, vaccinations, and NICU support for infants requiring specialized monitoring and treatment.",
    },
    {
      question: "Are childhood vaccinations available?",
      answer:
        "Yes. Routine immunizations and catch-up vaccination schedules are available as per national guidelines and your paediatrician's advice.",
    },
    {
      question: "When should I bring my child for a consultation?",
      answer:
        "Bring your child for routine check-ups, fever lasting more than a few days, breathing difficulty, poor feeding, persistent pain, rash with fever, or any sudden change in behaviour or alertness.",
    },
    {
      question: "Do you manage childhood allergies and infections?",
      answer:
        "Yes. We diagnose and manage respiratory infections, allergies, asthma, skin conditions, and other common childhood illnesses with family-centred care.",
    },
  ],
  ophthalmology: [
    {
      question: "What eye conditions do you treat?",
      answer:
        "We treat cataracts, glaucoma, retinal disorders, corneal disease, refractive errors, pediatric eye conditions, and oculoplastic disorders.",
    },
    {
      question: "Is cataract surgery available?",
      answer:
        "Yes. We perform advanced cataract surgery including phacoemulsification for precise vision restoration.",
    },
    {
      question: "Do you provide comprehensive eye examinations?",
      answer:
        "Yes. Routine and detailed eye exams are available to assess vision, eye pressure, retina health, and overall ocular status.",
    },
    {
      question: "Can vision problems be detected early?",
      answer:
        "Yes. Regular eye screening helps detect refractive errors, glaucoma, diabetic eye disease, and retinal conditions before significant vision loss.",
    },
    {
      question: "Do you treat glaucoma and retinal disorders?",
      answer:
        "Yes. We provide glaucoma management and specialized retinal care including treatment for diabetic retinopathy and macular degeneration.",
    },
  ],
  ent: [
    {
      question: "What ear, nose and throat conditions do you treat?",
      answer:
        "We treat sinusitis, hearing loss, ear infections, throat infections, voice disorders, nasal blockage, allergies, and head and neck related ENT conditions.",
    },
    {
      question: "Do you provide hearing assessments?",
      answer:
        "Yes. Audiology and hearing evaluation services are available, with advanced hearing aid support where appropriate.",
    },
    {
      question: "Is endoscopic sinus surgery available?",
      answer:
        "Yes. Endoscopic sinus surgery and other minimally invasive ENT procedures are performed for chronic sinus and related conditions.",
    },
    {
      question: "When should I consult an ENT specialist?",
      answer:
        "Consult an ENT specialist for persistent sinus symptoms, hearing difficulty, recurrent throat infections, snoring, balance problems, or voice changes lasting more than two weeks.",
    },
    {
      question: "Do you treat sleep-related breathing disorders?",
      answer:
        "Yes. We evaluate and manage snoring and sleep-related breathing disorders with medical and surgical options when indicated.",
    },
  ],
  diabetology: [
    {
      question: "How can diabetes be effectively managed?",
      answer:
        "Effective management combines blood sugar monitoring, medication or insulin therapy, nutrition counselling, regular follow-up, and complication screening.",
    },
    {
      question: "Do you provide diabetes screening services?",
      answer:
        "Yes. We offer screening for diabetes and pre-diabetes, especially for patients with family history, obesity, hypertension, or pregnancy-related risk.",
    },
    {
      question: "What complications can diabetes cause?",
      answer:
        "Diabetes can affect the eyes, kidneys, nerves, heart, and feet. Our team provides preventive care and early treatment to reduce complication risk.",
    },
    {
      question: "Can lifestyle changes help control diabetes?",
      answer:
        "Yes. Diet planning, physical activity, weight management, and smoking cessation are important parts of diabetes care alongside medical treatment.",
    },
    {
      question: "Do you provide personalized diabetes care plans?",
      answer:
        "Yes. Each patient receives a tailored plan based on diabetes type, age, lifestyle, and targets for glucose control and long-term health.",
    },
  ],
  "plastic-surgery": [
    {
      question: "What reconstructive procedures do you offer?",
      answer:
        "We offer trauma reconstruction, burn care, hand surgery, general reconstruction after cancer or injury, and gender affirmation procedures.",
    },
    {
      question: "Do you treat burn and trauma injuries?",
      answer:
        "Yes. Our team provides acute burn treatment, reconstruction, scar management, and trauma surgery to restore form and function.",
    },
    {
      question: "Is cosmetic surgery available?",
      answer:
        "Yes. Aesthetic procedures including eyelid surgery, liposuction, tummy tucks, breast surgery, and related cosmetic treatments are available after specialist consultation.",
    },
    {
      question: "What is the recovery time after plastic surgery?",
      answer:
        "Recovery varies by procedure and individual health. Your surgeon will provide a personalized recovery timeline and follow-up schedule.",
    },
    {
      question: "Do you provide post-surgical rehabilitation support?",
      answer:
        "Yes. Post-operative care, wound management, physiotherapy when needed, and follow-up visits are provided to support safe recovery.",
    },
  ],
  "general-medicine": [
    {
      question: "When should I consult a general physician?",
      answer:
        "Consult a general physician for fever, infections, chronic disease follow-up, fatigue, unexplained symptoms, preventive check-ups, or when you need guidance on specialist referral.",
    },
    {
      question: "What common medical conditions do you treat?",
      answer:
        "We treat diabetes, hypertension, respiratory illnesses, thyroid disorders, infections, and many acute and chronic internal medicine conditions.",
    },
    {
      question: "Do you provide preventive health check-ups?",
      answer:
        "Yes. Preventive screenings, health assessments, and wellness counselling are available to support early detection and long-term health.",
    },
    {
      question: "Can chronic diseases be managed through your department?",
      answer:
        "Yes. We provide long-term management plans for chronic conditions with regular monitoring, medication adjustment, and lifestyle guidance.",
    },
    {
      question: "How are patients referred to specialists when needed?",
      answer:
        "When specialized care is required, our physicians coordinate referral to the appropriate MAPIMS department for further evaluation and treatment.",
    },
  ],
  "multi-organ-transplant": [
    {
      question: "What transplant services are available?",
      answer:
        "We provide liver, kidney, and multi-organ transplant services with pre-transplant evaluation, surgery, and long-term follow-up through our dedicated transplant programme.",
    },
    {
      question: "How is a patient evaluated for transplantation?",
      answer:
        "Evaluation includes medical history, blood and imaging tests, specialist assessments, and compatibility review for living or cadaveric donation as per guidelines.",
    },
    {
      question: "What is the waiting process for a transplant?",
      answer:
        "After approval, patients are registered on the government waiting list. Waiting time depends on organ availability, blood group, urgency, and medical compatibility.",
    },
    {
      question: "What follow-up care is required after transplantation?",
      answer:
        "Follow-up includes regular clinic visits, blood tests, immunosuppression monitoring, infection prevention counselling, and lifestyle guidance for long-term graft health.",
    },
    {
      question: "Does your transplant team provide long-term monitoring?",
      answer:
        "Yes. Our transplant coordinators and specialists provide lifelong monitoring and support for recipients and donors after surgery.",
    },
  ],
};

export function getDepartmentFaqs(slug: string): FaqItem[] | undefined {
  const faqs = departmentFaqsBySlug[slug];
  return faqs?.length ? faqs : undefined;
}

/** Departments with dedicated FAQ sections on their detail pages */
export const departmentFaqSlugs = [
  "cardiology",
  "oncology",
  "neurology",
  "nephrology",
  "orthopaedics",
  "obstetrics-gynaecology",
  "urology",
  "medical-gastroenterology",
  "multi-organ-transplant",
  "paediatric",
  "ophthalmology",
  "ent",
  "diabetology",
  "plastic-surgery",
  "general-medicine",
] as const;
