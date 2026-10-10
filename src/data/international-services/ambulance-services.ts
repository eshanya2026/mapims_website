import type { InternationalServiceData } from "@/data/international-services/types";

export const ambulanceServicesPath = "/services/ambulance-services";

export const ambulanceServices: InternationalServiceData = {
  slug: "ambulance-services",
  path: ambulanceServicesPath,
  sectionLabel: "Emergency Transport",
  title: "24/7 Rapid Response",
  titleHighlight: "Ambulance Services",
  seoTitle: "24/7 Emergency Ambulance Services | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Ambulance Services",
  heroBadge: "24/7 Mobile ICU",
  heroSubtitle:
    "Advanced Cardiac Life Support (ACLS) and Basic Life Support (BLS) mobile intensive care ambulance fleet covering highway emergencies and hospital transfers.",
  intro:
    "Adhiparasakthi Hospitals operates a modern, GPS-enabled fleet of 24/7 emergency ambulances equipped to handle high-acuity medical and trauma crises across the GST Road highway corridor, Melmaruvathur, and neighboring districts. Staffed by certified emergency medical technicians (EMTs), paramedic nurses, and experienced drivers, our mobile intensive care units bring critical hospital resuscitation directly to the patient's doorstep.",
  sections: [
    {
      title: "Our Emergency Fleet Capabilities",
      items: [
        "Advanced Cardiac Life Support (ACLS) Ambulances: Equipped with transport ventilators, multi-parameter defibrillators with pacing, syringe infusion pumps, and emergency airway management kits.",
        "Basic Life Support (BLS) Ambulances: Outfitted with oxygen therapy, pulse oximetry, trauma immobilizers, spine boards, and basic resuscitation supplies.",
        "Neonatal & Pediatric Transport Ambulances: Featuring transport incubators, neonatal ventilators, and specialized pediatric monitoring equipment.",
        "Inter-Hospital Critical Care Transport: Safe, continuous intensive monitoring during patient transfers from rural health centers and regional nursing homes.",
      ],
    },
    {
      title: "Highway & Golden-Hour Emergency Response",
      items: [
        "Strategic positioning along national highway NH-45 for rapid rescue during motor vehicle accidents and polytrauma incidents.",
        "Real-time GPS tracking and continuous tele-communication between onboard paramedics and hospital emergency resuscitation bays.",
        "Pre-arrival hospital notification enabling emergency trauma surgeons, cardiologists, and cath labs to be primed before the ambulance arrives.",
        "Free ambulance transport for emergency road traffic accident victims within designated community catchment areas.",
      ],
    },
    {
      title: "Trained Paramedical & Medical Escort Crew",
      items: [
        "ACLS- and BLS-certified emergency medical technicians providing pre-hospital stabilization and CPR en route.",
        "Specialist doctors and emergency physicians accompany critical, ventilated, or hemodynamically unstable transfers.",
        "Rigorous infection prevention, daily terminal cleaning, and sterile vehicle maintenance.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our Ambulance Services?",
  whyChoose: [
    "24/7 instant dispatch with direct emergency helpline access",
    "Fully equipped mobile ICU capabilities for critical patients",
    "Specialized pediatric and neonatal transport capabilities",
    "Seamless golden-hour coordination with on-site trauma surgeons",
  ],
  closing:
    "For emergency ambulance dispatch in and around Melmaruvathur, call our 24/7 Emergency Helpline immediately at +91 94990 59966 or 1066.",
  image: "/images/services/ambulance-emergency-hero.jpg",
  heroImage: "/images/services/ambulance-emergency-hero.jpg",
};
