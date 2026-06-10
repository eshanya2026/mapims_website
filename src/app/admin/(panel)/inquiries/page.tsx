import { hydrateMissingAppointmentReferences } from "@/lib/appointment-reference-id";
import { listFormSubmissions } from "@/lib/db/form-submissions";
import type { FormSubmissionRecord } from "@/lib/db/types";
import InquiriesWorkspace from "@/components/admin/InquiriesWorkspace";
import type { InquiryRecord } from "@/types/inquiry";

const filters = ["all", "appointment", "contact", "international"] as const;

type InquiriesPageProps = {
  searchParams: Promise<{ type?: string }>;
};

function serializeInquiries(inquiries: FormSubmissionRecord[]): InquiryRecord[] {
  return inquiries.map((inquiry) => ({
    id: inquiry.id,
    referenceId: inquiry.referenceId,
    type: inquiry.type,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    message: inquiry.message,
    department: inquiry.department,
    preferredDate: inquiry.preferredDate?.toISOString() ?? null,
    preferredTime: inquiry.preferredTime,
    country: inquiry.country,
    medicalCondition: inquiry.medicalCondition,
    status: inquiry.status,
    createdAt: inquiry.createdAt.toISOString(),
  }));
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const { type } = await searchParams;
  const activeFilter = filters.includes(type as (typeof filters)[number])
    ? (type as (typeof filters)[number])
    : "all";

  const inquiries = await hydrateMissingAppointmentReferences(
    await listFormSubmissions(
      activeFilter === "all" ? undefined : { type: activeFilter }
    )
  );

  return (
    <InquiriesWorkspace
      initialInquiries={serializeInquiries(inquiries)}
      initialFilter={activeFilter}
    />
  );
}
