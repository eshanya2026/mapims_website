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
        "Yes. We offer family support and keep relatives informed during assessment and treatment. Our team coordinates with other hospital departments so emergency care continues seamlessly into surgery or inpatient care when needed.",
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
        "Yes. Our laboratory follows stringent quality control and accreditation standards to ensure accurate, reliable results integrated with hospital departments for comprehensive patient care.",
    },
    {
      question: "How do I schedule a lab test?",
      answer:
        "Tests are usually ordered by your treating doctor at MAPIMS. For more information or scheduling, contact the hospital at +91 94990 59966 or contact@mapims.edu.in.",
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
        "Referral is usually from your treating physician or surgeon at MAPIMS or externally. Contact the hospital for consultation with our interventional radiology team.",
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
};
