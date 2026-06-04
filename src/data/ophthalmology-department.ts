import type { DepartmentSpecialist } from "@/data/department-specialist";

export type { DepartmentSpecialist };

export const ophthalmologyIntro = {
  preview:
    "At Adhiparasakthi Hospitals, Melmaruvathur, our Ophthalmology Department offers cutting-edge eye care tailored to meet every patient's needs.",
  full: "Our team of expert ophthalmologists is committed to preserving and enhancing your vision with the latest advancements in eye care — delivering unparalleled treatment for your vision health.",
};

export const whyChooseOphthalmology = [
  {
    title: "Comprehensive Eye Care",
    description:
      "From routine examinations to complex surgery — cataracts, glaucoma, retina, cornea, and pediatric ophthalmology.",
  },
  {
    title: "Advanced Technology",
    description:
      "HD OCT, fundus imaging, visual field analysis, phacoemulsification, and wavefront-guided refractive surgery.",
  },
  {
    title: "Proven Experience",
    description:
      "More than 1,00,000 successful eye surgeries and community outreach through free eye camps.",
  },
  {
    title: "Dedicated Support",
    description:
      "Expert surgeons, equipped operation theatres, and 24/7 patient care in comfortable accommodation.",
  },
];

export const ophthalmologyServicesIntro =
  "Our comprehensive ophthalmology services include:";

export const ophthalmologyServices = [
  {
    title: "Routine Eye Examinations",
    description:
      "Comprehensive eye exams to monitor overall eye health and vision changes.",
  },
  {
    title: "Cataract Surgery",
    description:
      "Advanced techniques including phacoemulsification for clear, precise vision restoration.",
  },
  {
    title: "Glaucoma Management",
    description:
      "Innovative treatments to control intraocular pressure and prevent vision loss.",
  },
  {
    title: "Retinal Care",
    description:
      "Specialized treatments for retinal disorders including diabetic retinopathy and macular degeneration.",
  },
  {
    title: "Corneal Transplants",
    description:
      "State-of-the-art procedures to restore vision in cases of corneal damage.",
  },
  {
    title: "Refractive Surgery",
    description:
      "LASIK and PRK options for nearsightedness, farsightedness, and astigmatism.",
  },
  {
    title: "Pediatric Ophthalmology",
    description:
      "Expert care for eye conditions in children, from strabismus to congenital cataracts.",
  },
  {
    title: "Oculoplastic Surgery",
    description:
      "Cosmetic and reconstructive surgery for eyelid and orbital conditions.",
  },
];

export const ophthalmologyTechnology = [
  {
    title: "High-Definition OCT",
    description:
      "Optical Coherence Tomography providing detailed retina images for accurate diagnosis.",
  },
  {
    title: "Fundus Camera",
    description:
      "Advanced imaging to assess the health of the retina and optic nerve.",
  },
  {
    title: "Automated Visual Field Analyzer",
    description:
      "Precise measurement of the visual field to detect and monitor glaucoma.",
  },
  {
    title: "Phacoemulsification Machine",
    description:
      "Latest technology for efficient cataract surgery.",
  },
  {
    title: "Wavefront Technology",
    description:
      "Enhances the precision of refractive surgeries to improve visual outcomes.",
  },
];

export const ophthalmologySpecialityAreas = [
  "Cataracts",
  "Comprehensive vision eye care",
  "Cornea & refractive surgery",
  "Eye trauma",
  "Glaucoma",
  "Laser vision correction",
  "Neuro-ophthalmology",
  "Ocular oncology",
  "Oculoplastic & orbital surgery",
  "Ophthalmic pathology",
  "Pediatric ophthalmology & strabismus",
  "Retina services",
  "Uveitis & ocular immunology",
];

export const ophthalmologyInfrastructure = [
  "More than 1,00,000 successful eye surgeries performed",
  "Free eye camp and surgery outreach programmes",
  "Highly equipped ophthalmic operation theatres",
  "Expert surgeons and dedicated support team",
  "24/7 patient care with 1:1 nursing attention",
  "Suite, deluxe, and semi-deluxe room options",
];

export const ophthalmologyAchievementsNote =
  "Adhiparasakthi Hospitals offers the most advanced and comprehensive treatments for all eye conditions. Our highly skilled physicians manage cataracts, glaucoma, corneal disease, eye trauma, uveitis, retina conditions such as age-related macular degeneration, and many other ophthalmologic disorders.";

export const ophthalmologyTeamNote = {
  title: "Your Vision, Our Priority",
  description:
    "Our dedication to innovation and patient care ensures you receive the best possible treatment for your vision health at every stage.",
};

export const ophthalmologyJourney = {
  heading: "Clear Vision Through Expert Eye Care.",
  body: "Contact us to schedule a consultation or learn more about our ophthalmology services at Adhiparasakthi Hospitals, Melmaruvathur.",
  ctaHeading: "Schedule a Consultation",
  ctaBody:
    "Discover unparalleled eye care where advanced technology meets compassionate, patient-centred treatment.",
};

export const ophthalmologyJourneyPillars = [
  {
    title: "Examination & Diagnosis",
    description: "Comprehensive eye exams and advanced imaging for accurate assessment.",
  },
  {
    title: "Treatment & Surgery",
    description: "Medical and surgical care from cataracts to retina and refractive correction.",
  },
  {
    title: "Recovery & Follow-Up",
    description: "Structured post-operative care and long-term vision health monitoring.",
  },
];

export const ophthalmologyHeroImage = "/images/optho.png";

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS ophthalmology faculty when profiles are available */
export const ophthalmologySpecialists: DepartmentSpecialist[] = [
  {
    id: "ophthal-cataract",
    name: "Dr. S. Ramesh",
    degree: "MS (Ophthalmology)",
    experience: "20+ Yrs",
    designation: "Senior Consultant — Cataract & Phaco Surgery",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "ophthal-retina",
    name: "Dr. Kavitha Menon",
    degree: "MS, Fellowship (Vitreoretina)",
    experience: "15+ Yrs",
    designation: "Consultant — Retina & Diabetic Eye Disease",
    image: specialistImagePool[1],
    accent: "deep",
  },
  {
    id: "ophthal-glaucoma",
    name: "Dr. P. Harish",
    degree: "MS (Ophthalmology)",
    experience: "14+ Yrs",
    designation: "Consultant — Glaucoma & Cornea",
    image: specialistImagePool[2],
    accent: "primary",
  },
  {
    id: "ophthal-refractive",
    name: "Dr. N. Priya",
    degree: "MS, Fellowship (Refractive Surgery)",
    experience: "11+ Yrs",
    designation: "Consultant — LASIK & Refractive Surgery",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
