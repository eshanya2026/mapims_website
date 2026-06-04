export const neurologyIntro = {
  preview:
    "At Adhiparasakthi Hospitals, we are dedicated to providing world-class neurological care for patients of all ages. With state-of-the-art facilities, advanced diagnostic tools, and a team of highly skilled neurologists, we offer comprehensive services to diagnose, treat, and manage a wide range of neurological disorders.",
  full: "Our Neurology Department is committed to delivering accurate diagnoses, cutting-edge treatments, and compassionate care. We work closely with patients and their families to create personalized treatment plans that ensure the best outcomes and quality of life.",
};

export const whyChooseNeurology = [
  {
    title: "Accurate Diagnosis",
    description:
      "Advanced neurophysiology and imaging help identify conditions early and guide precise treatment decisions.",
  },
  {
    title: "Cutting-Edge Treatment",
    description:
      "From stroke thrombolysis to epilepsy management and movement disorder care, we use evidence-based therapies tailored to each patient.",
  },
  {
    title: "Compassionate Care",
    description:
      "Personalized plans and family-centred support across acute care, rehabilitation, and long-term neurological health.",
  },
];

export const neurologyServicesIntro =
  "We specialize in the diagnosis and treatment of a variety of neurological conditions, including but not limited to:";

export const neurologyServices = [
  {
    title: "Stroke Management",
    description:
      "Rapid diagnosis and treatment for strokes, including thrombolytic therapy and rehabilitation to minimize complications and promote recovery.",
  },
  {
    title: "Epilepsy Care",
    description:
      "Advanced diagnostics and tailored treatment plans for seizure disorders, including medication management and surgical options.",
  },
  {
    title: "Headache and Migraine Treatment",
    description:
      "Comprehensive care for chronic headaches and migraines, focusing on prevention, pain relief, and lifestyle management.",
  },
  {
    title: "Parkinson's & Movement Disorders",
    description:
      "Specialized care for Parkinson's disease, tremors, and dystonia, with a focus on improving motor function and quality of life.",
  },
  {
    title: "Neuropathy & Nerve Disorders",
    description:
      "Diagnosis and treatment of peripheral neuropathy, nerve compression syndromes, and other nerve-related conditions.",
  },
  {
    title: "Dementia & Alzheimer's Care",
    description:
      "Expert management of memory disorders with a focus on cognitive function and caregiver support.",
  },
  {
    title: "MS & Autoimmune Disorders",
    description:
      "Advanced care for multiple sclerosis and autoimmune neurological disorders, focusing on disease management and symptom relief.",
  },
  {
    title: "Sleep Disorders",
    description:
      "Evaluation and treatment of sleep-related neurological issues, such as sleep apnea, insomnia, and restless leg syndrome.",
  },
  {
    title: "Neurological Trauma & Critical Care",
    description:
      "Expert care for traumatic brain and spinal cord injuries, including emergency interventions and long-term rehabilitation.",
  },
  {
    title: "Pediatric Neurology",
    description:
      "Comprehensive care for children with epilepsy, developmental delays, and neuromuscular disorders.",
  },
  {
    title: "Neurophysiology Services",
    description:
      "Advanced diagnostics including EEG, EMG, and nerve conduction studies to accurately assess neurological conditions.",
  },
];

export const neurologyInfrastructure = [
  "High-resolution MRI and CT scans",
  "Advanced EEG and EMG machines",
  "Dedicated neuro-intensive care units (NICU)",
  "24/7 emergency stroke care services",
];

export const neurologyTeamNote = {
  title: "Expert Neurological Team",
  description:
    "Our team of neurologists, neurosurgeons, and rehabilitation specialists is dedicated to guiding you on your journey to recovery — from early diagnosis to advanced treatments and post-treatment care.",
};

export const neurologyJourney = {
  heading: "Advanced Neurological Care for Every Stage of Life.",
  body: "At Adhiparasakthi Hospitals, our team of neurologists, neurosurgeons, and rehabilitation specialists is dedicated to guiding you on your journey to recovery. From early diagnosis to advanced treatments and post-treatment care, we are here to ensure you receive the highest standard of neurological care.",
  ctaHeading: "Take the First Step Today",
  ctaBody:
    "Schedule a consultation with our experts to explore tailored solutions for your neurological concerns. Together, let's work towards improving your health, function, and overall well-being.",
};

export const neurologyJourneyPillars = [
  {
    title: "Early Diagnosis",
    description: "Timely assessment with advanced imaging and neurophysiology.",
  },
  {
    title: "Specialized Treatment",
    description: "Expert care for stroke, epilepsy, movement disorders, and more.",
  },
  {
    title: "Recovery & Support",
    description: "Rehabilitation and ongoing care for lasting neurological health.",
  },
];

export const neurologyHeroImage = "/images/neurology.png";

import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS neurology faculty when profiles are available. */
export const neurologySpecialists: DepartmentSpecialist[] = [
  {
    id: "stroke-neurology",
    name: "Dr. V. Arun",
    degree: "MD, DM (Neurology)",
    experience: "16+ Yrs",
    designation: "Senior Consultant — Stroke & Neurocritical Care",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "epilepsy-neurology",
    name: "Dr. Meera Krishnan",
    degree: "MD, DM (Neurology)",
    experience: "14+ Yrs",
    designation: "Consultant — Epilepsy & Neurophysiology",
    image: specialistImagePool[1],
    accent: "primary",
  },
  {
    id: "movement-disorders",
    name: "Dr. K. Suresh",
    degree: "MD, DM (Neurology)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — Movement Disorders",
    image: specialistImagePool[2],
    accent: "deep",
  },
  {
    id: "pediatric-neurology",
    name: "Dr. Lakshmi Devi",
    degree: "MD, DM (Paediatric Neurology)",
    experience: "12+ Yrs",
    designation: "Consultant — Paediatric Neurology",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
