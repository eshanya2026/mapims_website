export type LiveChatFaq = {
  id: string;
  question: string;
  answer: string;
};

export type LiveChatStarterOption = {
  id: string;
  label: string;
  prompt: string;
  answer?: string;
};

export const LIVE_CHAT_WELCOME_INTRO =
  "Hello! Welcome to Adhiparasakthi Hospitals (MAPIMS).";

export const LIVE_CHAT_WELCOME_PROMPT = "How can we help you today?";

export const LIVE_CHAT_WELCOME = `${LIVE_CHAT_WELCOME_INTRO}\n\n${LIVE_CHAT_WELCOME_PROMPT}`;

export const liveChatStarterOptions: LiveChatStarterOption[] = [
  {
    id: "book-appointment",
    label: "📅 Book Appointment",
    prompt: "I need to book an appointment at MAPIMS. How can I do that?",
  },
  {
    id: "inpatient-ward-pricing",
    label: "🛏️ Ward & Room Pricing",
    prompt: "What are the inpatient ward facilities and room tariffs at MAPIMS?",
  },
  {
    id: "surgery-packages",
    label: "🩺 Surgery Concession Packages",
    prompt: "What special concession surgery packages are available at MAPIMS (e.g. ENT, General Surgery)?",
  },
  {
    id: "upcoming-events",
    label: "✨ Upcoming Events & Workshops",
    prompt: "What are the upcoming events or medical workshops happening at MAPIMS?",
  },
  {
    id: "health-checkup",
    label: "🧪 Master Health Checkup",
    prompt: "What health checkup packages are available at MAPIMS?",
  },
  {
    id: "insurance",
    label: "🛡️ Insurance & Cashless",
    prompt: "What health insurance and cashless hospitalization options are accepted at MAPIMS?",
  },
  {
    id: "emergency",
    label: "🚑 Emergency & Ambulance",
    prompt: "What is the emergency contact number and ambulance support at MAPIMS?",
  },
  {
    id: "international",
    label: "🌍 International Patients",
    prompt: "Tell me about international patient services at MAPIMS.",
  },
];

export const liveChatFaqs: LiveChatFaq[] = [
  {
    id: "book-appointment",
    question: "How do I book an appointment?",
    answer:
      "You can book online on our website — scroll to Book Appointment on the home page, choose your department, date, and time, then submit your details. You can also call +91 94990 59966 or email contact@mapims.edu.in.",
  },
  {
    id: "opd-timings",
    question: "What are the OPD timings?",
    answer:
      "OPD hours are Monday to Saturday, 8:00 AM to 8:00 PM. On Sunday, OPD is open from 9:00 AM to 1:00 PM. Walk-ins and pre-booked appointments are welcome during these hours.",
  },
  {
    id: "ward-facilities-pricing",
    question: "What are the inpatient ward facilities and room charges?",
    answer:
      "MAPIMS provides compassionate inpatient care with two main options:\n• General Ward: 100% Free Consultation and Bed charges, 100% Free prescribed essential inpatient medicines, and a 50% discount on lab and diagnostic scans, supported by community welfare.\n• Special Ward Rooms:\n  - Sharing Room: ₹1,500 / per day\n  - Deluxe Room: ₹2,500 / per day\n  - Super Deluxe Room: ₹3,500 / per day\n  - Suite Room: ₹4,800 / per day (includes private bedroom and living lounge)\nAll rooms are supported by 24/7 dedicated nursing care and senior doctor rounds.",
  },
  {
    id: "surgery-concession-packages",
    question: "Are special concession surgical packages available?",
    answer:
      "Yes! MAPIMS offers special concession packages for selected surgical procedures to ensure accessible and affordable care:\n• ENT Surgery Concession Packages: Adenotonsillectomy (Adult & Paediatric), Septoplasty, FESS / Polypectomy, Tympanoplasty, and Cortical Mastoidectomy / MRM. For ENT enquiries call 044-2752 8528 / 9499 905 995 / 8917 671 9999.\n• General & Laparoscopic Surgery: Laparoscopic gallbladder removal (Cholecystectomy), Laparoscopic appendectomy, Hernia repair (inguinal, ventral, umbilical), and Proctology (piles/fissure/fistula).\nContact our surgical desk or visit OPD for consultation and evaluation.",
  },
  {
    id: "upcoming-hospital-events",
    question: "What are the upcoming hospital events and medical workshops?",
    answer:
      "Our upcoming academic events and medical programs include:\n1. “ECG Ignited and Echocardiogram Primer Workshop” (Incoming Event):\n   • Date: October 30 & 31, 2026 (2-day hands-on workshop)\n   • Theme: “Learn | Interpret | Improve”\n   • Course Director: Dr. M. Chenninappan\n   • Venue: Diamond Jubilee Auditorium, Adhiparasakthi Hospital, Melmaruvathur\n   • Organized by: Dept. of Internal Medicine (endorsed by API Chengalpattu Branch).\n2. “AACE 2026 – ECHOSMART”:\n   • Date: November 15, 2026 (Sunday)\n   • Focus: Enhancing Cardiac Imaging and Hemodynamic Outcomes\n   • Venue: BLISS Skill Lab, 4th Floor\n   • Organizing Chairperson: Prof. and Head Dr. Kumaresan S (Dept. of Anaesthesia & Critical Care)\n   • Registration Fee: ₹1,500/- (Max 50 participants, CME credits applied)\nVisit the Hospitals Events section on our website for details and schedules.",
  },
  {
    id: "insurance-cashless",
    question: "What health insurance and cashless hospitalization options are accepted?",
    answer:
      "MAPIMS has an active dedicated Insurance Desk:\n• Cashless Hospitalization: Empanelled with major health insurance companies and TPAs (Star Health, Medi Assist, Paramount, MD India, Heritage, Vidal, etc.).\n• Government Healthcare: Empanelled under Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS / Kalaignar Kaappeettu Thittam).\n• Insurance Desk Contact: Email Insurance@mapims.org | Phone: 9499059970 (Mon–Sat 9 AM – 6 PM).",
  },
  {
    id: "emergency",
    question: "How do I reach emergency care and ambulance?",
    answer:
      "For medical emergencies, our casualty and trauma center is open 24/7:\n• 24/7 Emergency & Casualty: +91 94990 59966\n• Toll Free Helpline: 1800 599 0999\n• Ambulance Services: Advanced Life Support (ALS) ambulances equipped with emergency monitors, ventilators, and trained paramedics available 24/7.",
  },
  {
    id: "helpline",
    question: "What is the patient helpline number?",
    answer:
      "Call our patient helpline at 1800 599 0999 (Toll Free, Mon–Sat 8 AM – 8 PM) or +91 94990 59966. For general enquiries email contact@mapims.edu.in.",
  },
  {
    id: "location",
    question: "Where is the hospital located?",
    answer:
      "Adhiparasakthi Hospitals (MAPIMS) is located on GST Road, Melmaruvathur, Kancheepuram / Chengalpattu District, Tamil Nadu, India 603319. It is easily accessible via road and rail (Melmaruvathur railway station is nearby). Visit the Contact page for directions and Google Maps.",
  },
  {
    id: "departments",
    question: "Which departments and specialities are available?",
    answer:
      "MAPIMS is a 1000+ bed super-speciality teaching hospital with over 30 departments including Cardiology, Orthopaedics, Joint Replacement, Neurology, Oncology & Surgical Oncology, Nephrology & Dialysis, Paediatrics, Obstetrics & Gynaecology, Urology, General & Laparoscopic Surgery, ENT, Ophthalmology, Plastic Surgery, Multi Organ Transplant, and Emergency Medicine.",
  },
  {
    id: "nabh",
    question: "Is the hospital accredited?",
    answer:
      "Yes. Adhiparasakthi Hospitals is NABH accredited and recognized for high standards of patient safety, clinical protocols, and quality healthcare.",
  },
  {
    id: "international",
    question: "Do you treat international patients?",
    answer:
      "Yes. Our dedicated International Patient Desk assists overseas patients with pre-arrival medical opinions, cost estimates, visa assistance letters, airport pickups, language translation, and personalized hospital coordination. Call +91 94990 59966 or email contact@mapims.edu.in.",
  },
  {
    id: "health-packages",
    question: "What master health checkup packages are available?",
    answer:
      "We offer comprehensive preventive health checkup packages including Master Health Checkup, Executive Whole Body Checkup, Cardio Health Checkup, Diabetic Checkup, and Well-Women Checkup with same-day report consultations. Inquire at the front desk or book online via our Master Health Checkup portal.",
  },
  {
    id: "blood-bank-pharmacy",
    question: "Are Blood Bank and Pharmacy open 24 hours?",
    answer:
      "Yes. Both our Blood Bank and 24-Hour Pharmacy operate 24/7, 365 days a year. The Blood Bank provides licensed whole blood and component separation (PRBC, Platelets, FFP, Cryoprecipitate).",
  },
];

export const liveChatContact = {
  phone: "+91 94990 59966",
  phoneHref: "tel:+919499059966",
  helpline: "1800 599 0999",
  helplineHref: "tel:18005990999",
  email: "contact@mapims.edu.in",
  emailHref: "mailto:contact@mapims.edu.in",
  emergency: "+91 94990 59966",
  emergencyHref: "tel:+919499059966",
  insurancePhone: "9499059970",
  insuranceEmail: "Insurance@mapims.org",
};
