export type BlogSection = "hospital-events" | "hospital-news" | "health-insights";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  section: BlogSection;
  image: string;
  excerpt: string;
  content: string;
};

export const blogSections: {
  slug: BlogSection;
  label: string;
  href: string;
  description: string;
}[] = [
  {
    slug: "hospital-events",
    label: "Hospital Events",
    href: "/blog/hospital-events",
    description: "Health camps, conferences, community programmes, and upcoming events at MAPIMS.",
  },
  {
    slug: "hospital-news",
    label: "Hospital News",
    href: "/blog/hospital-news",
    description: "Hospital announcements, milestones, accreditations, and facility updates.",
  },
  {
    slug: "health-insights",
    label: "Health Insights",
    href: "/blog/health-insights",
    description: "Expert health tips, preventive care guidance, and wellness advice from our specialists.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "heart-health-prevention-tips",
    title: "Heart Health: Prevention Tips from Our Cardiology Team",
    date: "March 18, 2026",
    category: "Cardiology",
    section: "health-insights",
    image:
      "https://images.unsplash.com/photo-1559757175-08eb37c6afcb?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Simple lifestyle changes and regular screenings can significantly reduce cardiovascular risk.",
    content:
      "Our cardiologists recommend maintaining a balanced diet, staying physically active, managing blood pressure and cholesterol, avoiding tobacco, and scheduling periodic cardiac check-ups — especially if you have a family history of heart disease.",
  },
  {
    slug: "managing-diabetes-lifestyle",
    title: "Managing Diabetes: Lifestyle Guidance from Specialists",
    date: "March 5, 2026",
    category: "Diabetology",
    section: "health-insights",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Expert advice on diet, exercise, and medication adherence for better glucose control.",
    content:
      "The diabetology team at MAPIMS emphasises consistent meal timing, portion control, regular physical activity, and follow-up monitoring. Early intervention and patient education remain key to preventing long-term complications.",
  },
  {
    slug: "hypertension-awareness",
    title: "Understanding High Blood Pressure: When to Seek Help",
    date: "February 20, 2026",
    category: "General Medicine",
    section: "health-insights",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Hypertension often has no symptoms — learn the warning signs and why regular monitoring matters.",
    content:
      "High blood pressure is a leading risk factor for stroke and heart disease. Our physicians advise adults to check blood pressure regularly, reduce salt intake, manage stress, and consult a specialist if readings stay elevated over multiple visits.",
  },
  {
    slug: "childhood-immunization-guide",
    title: "Childhood Immunization: A Parent's Guide",
    date: "February 8, 2026",
    category: "Paediatrics",
    section: "health-insights",
    image:
      "https://images.unsplash.com/photo-1584820929298-1fcef00f5c8b?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Stay on track with recommended vaccines to protect your child's health from infancy through adolescence.",
    content:
      "Our paediatric team follows national immunization schedules and helps parents understand each vaccine's purpose and timing. Timely vaccinations prevent serious illnesses and support healthy development.",
  },
  {
    slug: "bone-joint-care-seniors",
    title: "Bone & Joint Care for Seniors: Staying Active Safely",
    date: "January 22, 2026",
    category: "Orthopaedics",
    section: "health-insights",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Practical tips to maintain mobility, prevent falls, and manage joint pain as you age.",
    content:
      "Orthopaedic specialists at Adhiparasakthi Hospitals recommend low-impact exercise, adequate calcium and vitamin D, home safety modifications, and early evaluation for persistent joint pain or stiffness.",
  },
];

export function isBlogSection(value: string | undefined): value is BlogSection {
  return value === "hospital-events" || value === "hospital-news" || value === "health-insights";
}

export function getBlogSection(slug: string | undefined) {
  return blogSections.find((section) => section.slug === slug);
}

export function getPostsForSection(section: BlogSection) {
  return blogPosts.filter((post) => post.section === section);
}
