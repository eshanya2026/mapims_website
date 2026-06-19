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
  deletedAt?: Date | null;
};

export type JobRecord = {
  id: string;
  slug: string;
  jobRefNo: string | null;
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
  deletedAt?: Date | null;
};

export type DoctorRecord = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  specialty: string;
  departmentSlug: string;
  degree: string;
  experience: string;
  bio: string;
  image: string;
  accent: "primary" | "deep";
  showOnHome: boolean;
  showOnAbout: boolean;
  sortOrder: number;
  homeSortOrder: number;
  aboutSortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type NewsletterSubscriberRecord = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  subscribedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AppointmentScheduleRecord = {
  id: string;
  departmentSlug: string;
  enabled: boolean;
  daySlots: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  /** @deprecated Legacy field — migrated into daySlots on read */
  weekdaySlots?: string[];
  /** @deprecated Legacy field — migrated into daySlots on read */
  sundaySlots?: string[];
  advanceDays: number;
  notes: string | null;
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
  departmentSlug: string | null;
  preferredDate: Date | null;
  preferredTime: string | null;
  country: string | null;
  medicalCondition: string | null;
  address: string | null;
  currentLocation: string | null;
  qualification: string | null;
  totalExperience: string | null;
  medicalCouncilRegistrationNo: string | null;
  noticePeriod: string | null;
  resumeUrl: string | null;
  jobSlug: string | null;
  jobTitle: string | null;
  interviewDate: Date | null;
  interviewTime: string | null;
  interviewInterviewer: string | null;
  interviewMode: "online" | "offline" | null;
  interviewAddress: string | null;
  documentUrls: string[];
  status: string;
  createdAt: Date;
  deletedAt?: Date | null;
};
