export type InquiryRecord = {
  id: string;
  referenceId: string | null;
  type: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  department: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  country: string | null;
  medicalCondition: string | null;
  status: string;
  createdAt: string;
};
