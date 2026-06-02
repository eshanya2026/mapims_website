import {
  Clock,
  Headphones,
  Stethoscope,
  Heart,
  Bone,
  Activity,
  Baby,
  Droplets,
  Microscope,
  Pill,
  Eye,
  Ear,
  UserRound,
  Globe,
  IndianRupee,
  Languages,
  Award,
  Building2,
  Plane,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type InternationalWhyPoint = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

export const whyIndiaPoints: InternationalWhyPoint[] = [
  {
    icon: Globe,
    title: "Global Medical Hub",
    desc: "India is a leading destination for advanced surgery, organ transplant, cardiology, oncology, and multispecialty care.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Excellence",
    desc: "World-class treatment at a fraction of Western costs, with transparent pricing and high clinical success rates.",
  },
  {
    icon: Languages,
    title: "Easy Communication",
    desc: "English is widely used in hospitals, making coordination simple for international patients and families.",
  },
  {
    icon: Award,
    title: "Accredited Healthcare",
    desc: "Hospitals follow rigorous quality standards with NABH accreditation and modern medical technology.",
  },
  {
    icon: Clock,
    title: "Minimal Waiting Time",
    desc: "Faster access to specialists and planned procedures compared with long queues in many countries.",
  },
  {
    icon: Heart,
    title: "Holistic Patient Care",
    desc: "Compassionate nursing, family-centred support, and a calm environment for recovery during your stay.",
  },
];

export const whyUsPoints: InternationalWhyPoint[] = [
  {
    icon: Building2,
    title: "1000+ Bed Tertiary Care",
    desc: "MAPIMS is a super-specialty hospital with comprehensive departments under one roof at Melmaruvathur.",
  },
  {
    icon: ShieldCheck,
    title: "NABH Accredited",
    desc: "Recognized for patient safety, ethical practice, and quality care by national accreditation bodies.",
  },
  {
    icon: Users,
    title: "Dedicated International Desk",
    desc: "Personal coordinators for registration, treatment planning, reports, and follow-up throughout your journey.",
  },
  {
    icon: Plane,
    title: "Residency & Transport",
    desc: "On-campus residency for patients and attendants, with hospital-arranged transportation during treatment.",
  },
  {
    icon: Stethoscope,
    title: "Senior Specialists",
    desc: "Experienced consultants across cardiology, transplant, oncology, neurology, orthopaedics, and more.",
  },
  {
    icon: IndianRupee,
    title: "Cost Leadership",
    desc: "Transparent, ethical billing with detailed estimates — trusted by patients from India and abroad.",
  },
];

/** International Patient Department / desk — use across international pages */
export const internationalDesk = {
  tollFreeTel: "tel:18005990999",
  tollFreeDisplay: "1800 599 0999",
  phoneTel: "tel:+919499059966",
  phoneDisplay: "+91 94990 59966",
  whatsappUrl: "https://wa.me/919499059966",
  email: "contact@mapims.edu.in",
  mailto: "mailto:contact@mapims.edu.in",
  address:
    "Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram District, Tamil Nadu 603319, India",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Tamil+Nadu+603319",
} as const;

export type InternationalHeroSlide = {
  title: string;
  highlight?: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
  href: string;
};

const internationalHeroImage = "/images/international/international-hero.png";

export const internationalHeroSlides: InternationalHeroSlide[] = [
  {
    title: "Airport To Airport",
    highlight: "Service",
    subtitle:
      "Smooth and efficient transportation from departure to arrival.",
    image: internationalHeroImage,
    imagePosition: "object-[center_35%]",
    href: "/international/care",
  },
  {
    title: "Treatment And",
    highlight: "Stay",
    subtitle:
      "Enjoy seamless medical care and comfortable stay, tailored to your needs.",
    image: internationalHeroImage,
    imagePosition: "object-[center_35%]",
    href: "/international/care",
  },
  {
    title: "Life-Saving",
    highlight: "Treatments",
    subtitle: "Offering a wide array of life-saving treatments and surgeries.",
    image: internationalHeroImage,
    imagePosition: "object-[center_35%]",
    href: "/international/care",
  },
];

/** @deprecated Use internationalHeroSlides */
export const internationalHero = {
  title: "Airport To Airport Service",
  subtitle: internationalHeroSlides[0].subtitle,
  cta: "More Details",
  image: internationalHeroSlides[0].image,
};

export const internationalFeatures = [
  {
    title: "Latest Technology",
    description: "State-of-the-art diagnostics and treatment facilities.",
    icon: Clock,
  },
  {
    title: "Emergency Cases",
    description: "Round-the-clock emergency and critical care support.",
    icon: Stethoscope,
  },
  {
    title: "24/7 Hours Service",
    description: "Dedicated international patient assistance anytime.",
    icon: Headphones,
  },
];

export const internationalWelcome = {
  title:
    "Welcome to Adhiparasakthi Hospitals International patients care",
  preview:
    "At Adhiparasakthi Hospitals, we are dedicated to providing world-class healthcare services to international patients. Our commitment to excellence in medical care, combined with state-of-the-art infrastructure and experienced healthcare professionals, ensures that you receive the highest quality treatment during your visit.",
  paragraphs: [
    "Located in the serene town of Melmaruvathur, Adhiparasakthi Hospitals boasts modern facilities designed to cater to the needs of our patients.",
    "We utilize the latest technology in diagnostics and treatment, ensuring precise and effective medical care. Our equipment includes state-of-the-art imaging systems, minimally invasive surgical tools, and cutting-edge therapeutic devices.",
    "Our patient rooms are designed for comfort and recovery, equipped with modern amenities to make your stay as pleasant as possible. Suite, Deluxe, Special Rooms are available for you comfort stay.",
    "We offer a wide range of medical services, from emergency care to specialized treatments, all under one roof.",
  ],
};

export type InternationalSpeciality = {
  name: string;
  desc: string;
  icon: LucideIcon;
  href: string;
};

export const internationalSpecialities: InternationalSpeciality[] = [
  {
    name: "Cardiology",
    desc: "Advanced heart care and surgeries",
    icon: Heart,
    href: "/departments/cardiology",
  },
  {
    name: "Orthopaedics",
    desc: "Joint replacement and sports medicine",
    icon: Bone,
    href: "/departments/orthopaedics",
  },
  {
    name: "Spine Surgery",
    desc: "Comprehensive brain and spine care",
    icon: Activity,
    href: "/departments/neurology",
  },
  {
    name: "Obstetrics & Gynaecology",
    desc: "Complete women's health and maternity care",
    icon: Baby,
    href: "/departments/obstetrics-gynaecology",
  },
  {
    name: "Nephrology",
    desc: "Kidney care and renal transplant support",
    icon: Droplets,
    href: "/departments/nephrology",
  },
  {
    name: "Paediatrics",
    desc: "Expert care for infants and children",
    icon: UserRound,
    href: "/departments/paediatric",
  },
  {
    name: "Pathologist",
    desc: "Advanced diagnostic and lab services",
    icon: Microscope,
    href: "/departments",
  },
  {
    name: "General Medicine",
    desc: "Primary and internal medicine services",
    icon: Stethoscope,
    href: "/departments/general-medicine",
  },
  {
    name: "Gastroenterology",
    desc: "Digestive system disorders",
    icon: Pill,
    href: "/departments/medical-gastroenterology",
  },
  {
    name: "Ophthalmology",
    desc: "Advanced eye care and surgeries",
    icon: Eye,
    href: "/departments/ophthalmology",
  },
  {
    name: "Otorhinolaryngology",
    desc: "Ear, nose, and throat treatments",
    icon: Ear,
    href: "/departments/ent",
  },
  {
    name: "Urology",
    desc: "Urological and minimally invasive care",
    icon: Droplets,
    href: "/departments/urology",
  },
];

export const internationalReasons = [
  "World-class tertiary care with 1000+ bed multispecialty hospital infrastructure.",
  "NABH accredited hospital with Government of Tamil Nadu recognition.",
  "Cost-effective treatment with transparent and ethical clinical practices.",
  "Experienced senior specialists across all super-specialty departments.",
  "Dedicated International Patient Department for end-to-end coordination.",
  "Personalized treatment plans tailored to each patient's medical needs.",
  "Assistance with travel, accommodation, and airport-to-airport support.",
  "Multilingual support for patients and families from abroad.",
  "Advanced medical technology with successful clinical outcomes.",
  "Patients from Middle East, South East Asia, Africa, and beyond are welcomed.",
];

export const internationalExperts = [
  {
    name: "Dr. S. Karthik",
    credentials: "M.S.",
    specialty: "General Surgery",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. S. Muthukumaran",
    credentials: "M.S.",
    specialty: "Orthopaedics",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. S. Murali Krishnan",
    credentials: "M.S.",
    specialty: "General Medicine",
    image:
      "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. P. Jayaraj",
    credentials: "M.S.",
    specialty: "Surgical Gastroenterology",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. T. Ramesh",
    credentials: "M.D.",
    specialty: "Medical Director",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127b54e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. Kapali Neelamekam",
    credentials: "M.S., FRCS",
    specialty: "Multi Organ Transplant Advisor",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
  },
];

export const internationalFaqs = [
  {
    question: "How do I register as an international patient?",
    answer:
      "Contact our International Patient Department by calling 1800 599 0999, +91 94990 59966, or emailing contact@mapims.edu.in. Share your medical reports and travel details — a dedicated coordinator will guide you through registration, specialist assignment, and treatment planning.",
  },
  {
    question: "Do you provide airport pick-up and drop-off?",
    answer:
      "Yes. Our airport-to-airport service includes coordinated pick-up and drop-off, local transport, and assistance throughout your stay so you can travel comfortably from arrival to discharge.",
  },
  {
    question: "What documents do I need before travelling for treatment?",
    answer:
      "Typically you will need a valid passport, medical visa (where applicable), recent medical reports, referral letters if any, and identification documents. Our international desk will provide a checklist based on your treatment plan and country of origin.",
  },
  {
    question: "Can I get a treatment cost estimate in advance?",
    answer:
      "Yes. We provide detailed cost estimates and transparent package pricing before admission. Our team explains hospital charges, expected length of stay, and payment options so you can plan your visit with confidence.",
  },
  {
    question: "Is online consultation available before I visit India?",
    answer:
      "Yes. Teleconsultation is available with our specialists before travel. Book through our website or contact the international desk to share reports and receive clinical guidance on whether to visit and what preparations are needed.",
  },
  {
    question: "What payment options are available for international patients?",
    answer:
      "We accept cashless insurance through partner networks, credit and debit cards, bank transfers, and wire payments. Our financial counselling team assists with insurance coordination and billing in a transparent manner.",
  },
  {
    question: "Do you assist with accommodation during my stay?",
    answer:
      "Yes. Adhiparasakthi Hospitals provides dedicated residency facilities for international patients and attendants on campus. Comfortable stay options are available for the duration of your treatment, including longer stays when extended care is required.",
  },
  {
    question: "Which countries do you commonly serve?",
    answer:
      "We welcome patients from across India and abroad, including the Middle East, South East Asia, Africa, and other regions. Multilingual support is available to help patients and families communicate during their care.",
  },
];

export const internationalGallery = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
  "/images/international/casualty.png",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631217868264-e5b1b5d261b9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop",
];
