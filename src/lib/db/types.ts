export type AdminRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string | null;
  category: string;
  section: string;
  sortOrder: number;
  published: boolean;
  featured: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type JobRecord = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  vacancy: number;
  summary: string;
  description: string;
  requirements: string;
  qualifications: string;
  applyEmail: string | null;
  applyUrl: string | null;
  published: boolean;
  postedAt: Date;
  closingDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FormSubmissionRecord = {
  id: string;
  referenceId: string | null;
  type: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  department: string | null;
  preferredDate: Date | null;
  preferredTime: string | null;
  country: string | null;
  medicalCondition: string | null;
  status: string;
  createdAt: Date;
};
