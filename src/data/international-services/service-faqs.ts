import type { InternationalServiceFaq } from "@/data/international-services/types";

export const serviceFaqsBySlug: Record<string, InternationalServiceFaq[]> = {
  "accident-emergency-services": [
    {
      question: "Is the emergency department open 24/7?",
      answer:
        "Yes. Our Accident & Emergency department at Adhiparasakthi Hospitals, Melmaruvathur operates around the clock with trauma surgeons, emergency physicians, and critical care support available at all times.",
    },
    {
      question: "What should I do in a medical emergency?",
      answer:
        "Call our emergency line at +91 94990 59966 or come directly to the emergency department. For severe trauma, chest pain, stroke symptoms, or difficulty breathing, seek care immediately — our triage team prioritizes the most critical cases first.",
    },
    {
      question: "What emergency services are available on-site?",
      answer:
        "We provide rapid triage, on-site X-ray and CT diagnostics, emergency surgery, critical and intensive care, trauma and orthopedic emergency care, wound management, and neuro-emergency assessment for strokes and head injuries.",
    },
    {
      question: "Can family members accompany emergency patients?",
      answer:
        "Yes. We offer family support and keep relatives informed during assessment and treatment. Our team coordinates with other hospitals departments so emergency care continues seamlessly into surgery or inpatient care when needed.",
    },
  ],
  anaesthesiology: [
    {
      question: "What does the anaesthesiology department provide?",
      answer:
        "Our department covers preoperative assessment, anesthesia for surgery, pain management during and after procedures, emergency anesthesia, intensive care (ICU), and chronic pain medicine including interventional treatments.",
    },
    {
      question: "Is anesthesia safe for older patients or complex surgery?",
      answer:
        "Our anaesthesiologists conduct detailed preoperative evaluations and tailor anesthesia plans to each patient’s age, health conditions, and type of surgery to maximize safety and comfort.",
    },
    {
      question: "Do you offer pain management after surgery?",
      answer:
        "Yes. We use advanced pain management techniques during recovery, including medication plans and interventional options when appropriate, working with surgical teams to support faster, more comfortable healing.",
    },
    {
      question: "Is critical care available 24/7?",
      answer:
        "Yes. Our ICU teams provide round-the-clock monitoring, mechanical ventilation, renal replacement therapy, and multidisciplinary critical care for patients who need intensive support.",
    },
  ],
  "cardiovascular-thoracic-surgery": [
    {
      question: "What heart and chest conditions do you treat surgically?",
      answer:
        "We perform CABG, heart valve repair and replacement, aortic aneurysm repair, minimally invasive cardiac surgery, thoracic tumor resection, lung volume reduction, esophageal surgery, EVLT for varicose veins, and pectus excavatum repair.",
    },
    {
      question: "Is minimally invasive heart surgery available?",
      answer:
        "Yes. Where suitable for the patient’s condition, our surgeons use minimally invasive cardiac techniques that can mean smaller incisions and a quicker recovery compared with traditional open surgery.",
    },
    {
      question: "How do I know if I need cardiovascular surgery?",
      answer:
        "Your cardiologist or our surgical team will review echocardiograms, angiography, CT scans, and clinical findings. Surgery is recommended when medical treatment alone cannot adequately restore heart or lung function or prevent serious complications.",
    },
    {
      question: "What support is available after heart or thoracic surgery?",
      answer:
        "Patients receive ICU monitoring when needed, specialist nursing care, physiotherapy, and follow-up with cardiology and surgical teams to guide recovery and long-term heart and lung health.",
    },
  ],
  "central-laboratory": [
    {
      question: "What types of lab tests are available?",
      answer:
        "Our Central Laboratory offers hematology, clinical chemistry, microbiology, immunology, serology, endocrinology, and toxicology testing — from routine blood work to specialized assays for complex diagnoses.",
    },
    {
      question: "How quickly will I receive test results?",
      answer:
        "Turnaround times vary by test. Routine tests are processed efficiently; urgent and emergency samples are fast-tracked so your doctor can make timely treatment decisions.",
    },
    {
      question: "Is the laboratory accredited?",
      answer:
        "Yes. Our laboratory follows stringent quality control and accreditation standards to ensure accurate, reliable results integrated with hospitals departments for comprehensive patient care.",
    },
    {
      question: "How do I schedule a lab test?",
      answer:
        "Tests are usually ordered by your treating doctor at MAPIMS. For more information or scheduling, contact the hospitals at +91 94990 59966 or contact@mapims.edu.in.",
    },
  ],
  dermatology: [
    {
      question: "What skin conditions do you treat?",
      answer:
        "We treat acne, psoriasis, eczema, skin allergies, hair loss, nail disorders, and skin cancers, and offer cosmetic dermatology including laser resurfacing, Botox, fillers, and chemical peels.",
    },
    {
      question: "Do you offer skin cancer screening?",
      answer:
        "Yes. We provide skin cancer screening and treatment options with advanced diagnostic tools for early detection and effective management of various skin malignancies.",
    },
    {
      question: "Are cosmetic dermatology procedures available?",
      answer:
        "Yes. Our cosmetic dermatology services include laser treatments, injectables, and peels performed by experienced specialists in a clinical environment focused on safety and results.",
    },
    {
      question: "How do I book a dermatology appointment?",
      answer:
        "You can book through our website appointment section, call +91 94990 59966, or email contact@mapims.edu.in. We accept various insurance plans and offer flexible scheduling where possible.",
    },
  ],
  "general-surgery": [
    {
      question: "What is general surgery at MAPIMS?",
      answer:
        "General surgery covers abdominal, gastrointestinal, hepatobiliary, hernia, appendicitis, colorectal, thyroid, breast, and soft-tissue conditions — including emergency and elective procedures using open, laparoscopic, and minimally invasive techniques.",
    },
    {
      question: "Is laparoscopic surgery available?",
      answer:
        "Yes. Our surgeons perform laparoscopic and minimally invasive procedures for suitable cases, which can reduce post-operative pain and support faster recovery when compared with open surgery.",
    },
    {
      question: "When is emergency general surgery needed?",
      answer:
        "Emergency surgery may be required for acute appendicitis, intestinal obstruction, perforation, severe abdominal trauma, strangulated hernia, and other acute surgical abdomen conditions — our team is available around the clock.",
    },
    {
      question: "What should I expect before and after surgery?",
      answer:
        "You will receive preoperative assessment, clear explanation of the procedure, anaesthesia and ICU support when needed, and personalized post-operative care with multidisciplinary follow-up for optimal recovery.",
    },
  ],
  hemodialysis: [
    {
      question: "When is hemodialysis required?",
      answer:
        "Hemodialysis is needed when kidneys can no longer adequately filter waste and fluid from the blood — often in advanced chronic kidney disease or acute kidney failure. Your nephrologist will advise when dialysis should begin.",
    },
    {
      question: "Is dialysis available 24/7?",
      answer:
        "Yes. Our Dialysis Centre offers round-the-clock hemodialysis services for scheduled and urgent needs, with ICU dialysis available for critically ill patients.",
    },
    {
      question: "What facilities does the dialysis centre offer?",
      answer:
        "We have 26 modern dialyzers, advanced dia-filtration machines, a separate unit for positive patients, and dedicated nursing and specialist support — one of the largest dialysis centres in Kanchipuram District.",
    },
    {
      question: "How do I start dialysis at MAPIMS?",
      answer:
        "Patients are typically referred by a nephrologist or physician. Contact us at +91 94990 59966 for appointments, scheduling, and coordination with your treating doctor.",
    },
  ],
  "interventional-radiology": [
    {
      question: "What is interventional radiology?",
      answer:
        "Interventional radiology uses imaging guidance (X-ray, CT, ultrasound) to perform minimally invasive procedures such as angioplasty, biopsies, tumor ablation, fibroid embolization, and dialysis access — often with smaller incisions and shorter recovery.",
    },
    {
      question: "What conditions can be treated without open surgery?",
      answer:
        "Many vascular, liver, kidney, uterine fibroid, varicose vein, bile duct, and some spinal conditions can be treated with image-guided procedures. Your interventional radiologist will advise if this approach suits your diagnosis.",
    },
    {
      question: "Is interventional radiology safe?",
      answer:
        "Procedures are performed by trained interventional radiologists using advanced imaging for precision. Risks and benefits are discussed before each procedure as part of your personalized care plan.",
    },
    {
      question: "How do I get referred for a procedure?",
      answer:
        "Referral is usually from your treating physician or surgeon at MAPIMS or externally. Contact the hospitals for consultation with our interventional radiology team.",
    },
  ],
  "radiology-imaging-science": [
    {
      question: "What imaging services are available?",
      answer:
        "We offer MRI, CT, X-ray, ultrasound, mammography, and imaging support for interventional procedures — with expert radiologist interpretation for accurate diagnosis.",
    },
    {
      question: "How do I prepare for an MRI or CT scan?",
      answer:
        "Preparation depends on the study. You may need fasting, contrast instructions, or to remove metal objects. Our team will give you clear instructions when your appointment is scheduled.",
    },
    {
      question: "Are emergency imaging services available?",
      answer:
        "Yes. Radiology services are available 24/7 for emergency and urgent cases, supporting trauma, stroke, and critical care teams with rapid imaging.",
    },
    {
      question: "How soon will my doctor receive imaging results?",
      answer:
        "We prioritize fast, accurate reporting. Urgent scans are read promptly; routine studies are reported efficiently so your care team can plan treatment without unnecessary delay.",
    },
  ],
  "spinal-surgeries": [
    {
      question: "When is spine surgery required?",
      answer:
        "Spine surgery is considered when pain or nerve symptoms persist despite medication, physiotherapy, and other non-surgical care — or when there is significant nerve compression, spinal instability, deformity, fractures, or conditions that threaten movement or bladder and bowel function.",
    },
    {
      question: "How long is recovery after spine surgery?",
      answer:
        "Recovery depends on the procedure and your health. Minimally invasive options often mean a shorter stay and faster return to light activities; complex fusion may need several weeks of guided rehabilitation with our therapy teams.",
    },
    {
      question: "Is minimally invasive spine surgery available?",
      answer:
        "Yes. MAPIMS offers minimally invasive and endoscopic spine surgery when appropriate, using smaller incisions where suitable to reduce tissue disruption and support quicker recovery for many patients.",
    },
    {
      question: "What conditions are treated?",
      answer:
        "We treat herniated discs, spinal stenosis, spondylolisthesis, scoliosis, fractures, chronic back and neck pain, and nerve compression. Procedures include diskectomy, laminectomy, fusion, kyphoplasty, and scoliosis surgery.",
    },
  ],
  "surgical-oncology": [
    {
      question: "What is surgical oncology?",
      answer:
        "Surgical oncology is the branch of surgery focused on diagnosing, staging, and removing cancerous tumors — often as part of a combined plan with chemotherapy, radiotherapy, and rehabilitation at MAPIMS.",
    },
    {
      question: "Do you offer minimally invasive cancer surgery?",
      answer:
        "Yes. We perform laparoscopic and robotic-assisted procedures when suitable, aiming for precise tumor removal with less pain and faster recovery compared with some open approaches.",
    },
    {
      question: "What cancers are treated surgically at MAPIMS?",
      answer:
        "Our team manages surgical care for many cancers including breast, colon, lung, prostate, and others — with sentinel node biopsy, advanced tumor removal, and palliative surgery when appropriate.",
    },
    {
      question: "Is support available after cancer surgery?",
      answer:
        "Yes. A multidisciplinary team provides chemotherapy, radiotherapy, rehabilitation, and personalized follow-up — all coordinated under one roof for continuity of care.",
    },
  ],
  "outpatient-service": [
    {
      question: "What are the outpatient (OPD) timings at Adhiparasakthi Hospitals?",
      answer:
        "Regular OPD clinics operate from 8:30 AM to 5:00 PM, Monday through Saturday.",
    },
    {
      question: "Do I need a prior appointment for OPD consultations?",
      answer:
        "Appointments can be booked online or via phone at +91 94990 59966 for minimal waiting time. Walk-in patients are also welcomed and registered at our central OPD counters.",
    },
    {
      question: "Are diagnostic investigations available on the same day?",
      answer:
        "Yes. Our central laboratory, digital X-ray, ECG, and ultrasound suites are conveniently situated near the outpatient clinics to enable same-day diagnostic sampling and expedited physician reviews.",
    },
  ],
  "inpatient-service": [
    {
      question: "What room categories are available for inpatient admission?",
      answer:
        "We offer air-conditioned Deluxe Single Rooms, Private Rooms with attendant facilities, Semi-Private Twin Sharing Rooms, and clean, well-spaced General Wards. Specialized critical care is delivered in dedicated MICU, SICU, CCU, NICU, and PICU units.",
    },
    {
      question: "Can an attendant stay with the patient?",
      answer:
        "Yes. One attendant is permitted to stay with the patient in private and semi-private rooms with dedicated sleeping accommodation. Visiting hours for general wards are scheduled to ensure quiet healing.",
    },
    {
      question: "How does the discharge process work?",
      answer:
        "Discharges are processed after the morning medical rounds. The billing and nursing staff provide an itemized summary, discharge medications, follow-up advice, and clear instructions for home recovery.",
    },
  ],
  "blood-bank": [
    {
      question: "Is the blood bank open 24/7?",
      answer:
        "Yes. Our licensed Blood Bank operates 24/7, providing whole blood, packed red cells (PRBC), platelets, and fresh frozen plasma for scheduled and emergency hospital needs.",
    },
    {
      question: "How is blood safety guaranteed?",
      answer:
        "Every blood unit undergoes automated screening for HIV, Hepatitis B, Hepatitis C, Syphilis, and Malaria using chemiluminescent technology and automated cross-matching gel cards.",
    },
    {
      question: "How can I donate blood at MAPIMS?",
      answer:
        "Healthy donors aged 18–65 weighing over 45 kg can walk into our Blood Bank Monday through Saturday, or participate in our regular voluntary blood donation camps.",
    },
  ],
  "master-health-checkup": [
    {
      question: "What health checkup packages are offered?",
      answer:
        "We offer Basic Wellness, Master Health Checkup, Executive Cardiac Screening, Comprehensive Diabetic Checkup, Women's Wellness, and Senior Citizen Comprehensive packages.",
    },
    {
      question: "How should I prepare for my health checkup?",
      answer:
        "Overnight fasting for 10–12 hours is mandatory for accurate blood sugar and lipid profiles. Plain water is permitted. Report to our preventive health lounge at 8:00 AM.",
    },
    {
      question: "When will I receive my checkup reports?",
      answer:
        "Most investigation reports are compiled on the same day, followed immediately by detailed review consultations with senior medical specialists.",
    },
  ],
  "24hrs-pharmacy": [
    {
      question: "Is the pharmacy open during nights and holidays?",
      answer:
        "Yes. Our main hospital and emergency casualty pharmacies operate 24 hours a day, 365 days a year without closure.",
    },
    {
      question: "Do you supply specialized and refrigerated medications?",
      answer:
        "Yes. We stock temperature-sensitive vaccines, insulins, critical care emergency drugs, surgical implants, and oncology pharmaceuticals stored under strict cold-chain compliance.",
    },
  ],
  "ambulance-services": [
    {
      question: "How do I request an emergency ambulance?",
      answer:
        "Call our 24/7 Emergency Helpline at +91 94990 59966 or 1066. Our dispatch coordinator will track the closest ambulance and provide immediate medical guidance over the phone.",
    },
    {
      question: "What life-support equipment is available in your ambulances?",
      answer:
        "Our Advanced Cardiac Life Support (ACLS) ambulances are equipped with transport ventilators, cardiac defibrillators with pacing, oxygen cylinders, syringe infusion pumps, and trained paramedics.",
    },
  ],
  physiotherapy: [
    {
      question: "What conditions are treated by the physiotherapy department?",
      answer:
        "We treat post-surgical orthopedic conditions (knee/hip replacements, fractures), neurological conditions (stroke, Parkinson's), sports injuries, chronic back/neck pain, and pediatric developmental delays.",
    },
    {
      question: "Do I need a doctor's referral for physiotherapy?",
      answer:
        "Patients can consult our physiotherapists directly for evaluation, or be referred by orthopedic, neurological, or spine consultants for specialized post-intervention therapy.",
    },
  ],
  laboratory: [
    {
      question: "What diagnostic tests are performed at the Laboratory?",
      answer:
        "Our central laboratory performs routine and advanced hematology, clinical biochemistry, microbiology, serology, histopathology, cytopathology, and hormone assays.",
    },
    {
      question: "Are emergency diagnostic tests processed 24/7?",
      answer:
        "Yes. Critical investigations such as troponin, blood gas analysis (ABG), electrolytes, CBC, and cross-matching are processed 24/7 with fast turnaround times.",
    },
  ],
  "dialysis-services": [
    {
      question: "What are the facilities at the Dialysis Centre?",
      answer:
        "Our unit features 26+ modern dialyzers, advanced online dia-filtration machines, dedicated isolated units for seropositive patients, and round-the-clock nephrologist coverage.",
    },
    {
      question: "Is emergency dialysis available at night?",
      answer:
        "Yes. Emergency bedside hemodialysis and SLED/CRRT therapies are available 24/7 in our Intensive Care Units for critically ill renal patients.",
    },
  ],
  insurance: [
    {
      question: "Does Adhiparasakthi Hospitals accept private health insurance and TPAs?",
      answer:
        "Yes. We are empaneled with all leading private health insurers and TPAs including Star Health, Medi Assist, Paramount, MDIndia, Heritage, ICICI Lombard, HDFC ERGO, and more.",
    },
    {
      question: "Can I avail the Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)?",
      answer:
        "Yes. Our hospital is an approved provider under the Tamil Nadu Government CMCHIS scheme for eligible surgical, oncology, cardiac, and emergency procedures.",
    },
    {
      question: "What documents are required for cashless hospitalization?",
      answer:
        "Please provide the patient's active health insurance card/policy document, government photo ID (Aadhaar/Voter ID), and treating doctor's admission advice.",
    },
  ],
};
