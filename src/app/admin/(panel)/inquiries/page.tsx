import { prisma } from "@/lib/prisma";
import InquiriesWorkspace from "@/components/admin/InquiriesWorkspace";
import type { InquiryRecord } from "@/types/inquiry";

const filters = ["all", "appointment", "contact", "international"] as const;

type InquiriesPageProps = {
  searchParams: Promise<{ type?: string }>;
};

function serializeInquiries(
  inquiries: Awaited<ReturnType<typeof prisma.formSubmission.findMany>>
): InquiryRecord[] {
  return inquiries.map((inquiry) => ({
    id: inquiry.id,
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

  const inquiries = await prisma.formSubmission.findMany({
    where: activeFilter === "all" ? undefined : { type: activeFilter },
    orderBy: { createdAt: "desc" },
  });

  return (
    <InquiriesWorkspace
      initialInquiries={serializeInquiries(inquiries)}
      initialFilter={activeFilter}
    />
  );
}
