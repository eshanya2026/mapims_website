import { redirect } from "next/navigation";
import { hydrateMissingSubmissionReferences } from "@/lib/appointment-reference-id";
import {
  getAllowedEnquiryFilters,
  hasPermission,
  resolveEnquiryFilterForRole,
} from "@/lib/admin-roles";
import { getSession } from "@/lib/auth";
import { listEnquiriesForRole } from "@/lib/enquiry-access";
import { toInquiryRecords } from "@/lib/inquiry-record";
import EnquiriesWorkspace from "@/components/admin/InquiriesWorkspace";

type InquiriesPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!hasPermission(session.role, "inquiries")) redirect("/admin");

  const { type } = await searchParams;
  const activeFilter = resolveEnquiryFilterForRole(session.role, type);
  const allowedFilters = [...getAllowedEnquiryFilters(session.role)];

  const inquiries = await hydrateMissingSubmissionReferences(
    await listEnquiriesForRole(session.role, activeFilter)
  );

  return (
    <EnquiriesWorkspace
      initialEnquiries={toInquiryRecords(inquiries)}
      initialFilter={activeFilter}
      allowedFilters={allowedFilters}
    />
  );
}
