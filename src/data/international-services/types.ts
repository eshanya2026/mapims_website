export type InternationalServiceSection = {
  title: string;
  items: string[];
};

export type InternationalServiceFaq = {
  question: string;
  answer: string;
};

export type InternationalServiceData = {
  slug: string;
  path: string;
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  seoTitle: string;
  intro: string;
  sections: InternationalServiceSection[];
  whyChooseTitle?: string;
  whyChoose?: string[];
  closing: string;
  /** Default / footer image */
  image: string;
  /** Hero background (falls back to image) */
  heroImage?: string;
  /** Wide banner shown after intro (second placement) */
  bannerImage?: string;
  bannerLabel?: string;
  /** Bottom section image (falls back to image) */
  footerImage?: string;
  heroBadge: string;
  heroSubtitle: string;
  breadcrumbLabel: string;
  faqs?: InternationalServiceFaq[];
};
