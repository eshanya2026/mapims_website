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
    label: "I need to book an appointment",
    prompt: "I need to book an appointment at MAPIMS. How can I do that?",
  },
  {
    id: "international",
    label: "International patient services",
    prompt: "Tell me about international patient services at MAPIMS.",
  },
  {
    id: "specialities",
    label: "Specialities",
    prompt: "What specialities and departments are available at MAPIMS?",
  },
  {
    id: "emergency",
    label: "Emergency contact",
    prompt: "What is the emergency contact number and how do I reach emergency care at MAPIMS?",
  },
  {
    id: "health-checkup",
    label: "Health checkup packages",
    prompt: "What health checkup packages are available at MAPIMS?",
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
      "OPD hours are Monday to Saturday, 8:00 AM to 8:00 PM. On Sunday, OPD is open from 9:00 AM to 1:00 PM. Walk-ins are welcome during these hours.",
  },
  {
    id: "emergency",
    question: "How do I reach emergency care?",
    answer:
      "For emergencies, call 1066 — our casualty and ambulance team is available 24/7. You can also visit the emergency department at Melmaruvathur anytime.",
  },
  {
    id: "helpline",
    question: "What is the patient helpline number?",
    answer:
      "Call our helpline at 1800 599 0999 (Mon–Sat, 8 AM – 8 PM) or +91 94990 59966. Email us at contact@mapims.edu.in for non-urgent enquiries.",
  },
  {
    id: "location",
    question: "Where is the hospital located?",
    answer:
      "Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram District, Tamil Nadu, India 603319. Visit the Contact page on our website for directions and a map.",
  },
  {
    id: "departments",
    question: "Which departments are available?",
    answer:
      "MAPIMS is a 1000+ bed super-specialty hospital with cardiology, neurology, oncology, orthopaedics, nephrology, transplant, paediatrics, and many more. Browse all departments under Specialities on our website.",
  },
  {
    id: "nabh",
    question: "Is the hospital NABH accredited?",
    answer:
      "Yes. Adhiparasakthi Hospital is NABH accredited and recognized by the Government of Tamil Nadu for patient safety and quality healthcare.",
  },
  {
    id: "international",
    question: "Do you treat international patients?",
    answer:
      "Yes. We welcome patients from India and abroad. Our international patient desk helps with appointments, travel guidance, and coordinated care. Call +91 94990 59966 or email contact@mapims.edu.in.",
  },
  {
    id: "reports",
    question: "How can I get lab reports?",
    answer:
      "Lab reports are shared after your tests are completed. For assistance, contact the hospital on +91 94990 59966 or visit the front office during OPD hours with your patient ID.",
  },
  {
    id: "health-packages",
    question: "Are health checkup packages available?",
    answer:
      "Yes. We offer preventive health packages and master health checkups. Ask at the front office or call +91 94990 59966 for package details and pricing.",
  },
];

export const liveChatContact = {
  phone: "+91 94990 59966",
  phoneHref: "tel:+919499059966",
  helpline: "1800 599 0999",
  helplineHref: "tel:18005990999",
  email: "contact@mapims.edu.in",
  emailHref: "mailto:contact@mapims.edu.in",
  emergency: "1066",
  emergencyHref: "tel:1066",
};
