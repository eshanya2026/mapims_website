import type { FormSubmissionRecord } from "@/lib/db/types";
import type { InquiryRecord } from "@/types/inquiry";

function toIsoString(value: Date | string | null | undefined) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
}

export function toInquiryRecord(
  inquiry: FormSubmissionRecord | Record<string, unknown>
): InquiryRecord {
  const record = inquiry as FormSubmissionRecord;

  return {
    id: String(record.id),
    referenceId: record.referenceId ?? null,
    type: record.type,
    name: record.name,
    email: record.email ?? null,
    phone: record.phone ?? null,
    message: record.message ?? null,
    department: record.department ?? null,
    preferredDate: toIsoString(record.preferredDate),
    preferredTime: record.preferredTime ?? null,
    country: record.country ?? null,
    medicalCondition: record.medicalCondition ?? null,
    address: record.address ?? null,
    currentLocation: record.currentLocation ?? null,
    qualification: record.qualification ?? null,
    totalExperience: record.totalExperience ?? null,
    medicalCouncilRegistrationNo: record.medicalCouncilRegistrationNo ?? null,
    noticePeriod: record.noticePeriod ?? null,
    resumeUrl: record.resumeUrl ?? null,
    jobSlug: record.jobSlug ?? null,
    jobTitle: record.jobTitle ?? null,
    interviewDate: toIsoString(record.interviewDate),
    interviewTime: record.interviewTime ?? null,
    interviewInterviewer: record.interviewInterviewer ?? null,
    interviewMode: record.interviewMode ?? null,
    interviewAddress: record.interviewAddress ?? null,
    documentUrls: Array.isArray(record.documentUrls) ? record.documentUrls : [],
    status: record.status,
    createdAt: toIsoString(record.createdAt) ?? new Date().toISOString(),
  };
}

export function toInquiryRecords(
  inquiries: FormSubmissionRecord[] | Record<string, unknown>[]
) {
  return inquiries.map((inquiry) => toInquiryRecord(inquiry));
}
