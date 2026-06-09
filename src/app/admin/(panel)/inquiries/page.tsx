import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formTypeLabels } from "@/lib/form-submissions";
import InquiryActions from "@/components/admin/InquiryActions";
import { cn } from "@/lib/utils";

const filters = [
  { value: "all", label: "All" },
  { value: "appointment", label: "Appointments" },
  { value: "contact", label: "Contact" },
  { value: "international", label: "International" },
] as const;

type InquiriesPageProps = {
  searchParams: Promise<{ type?: string }>;
};

function formatDate(date: Date) {
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const { type } = await searchParams;
  const activeFilter = filters.some((item) => item.value === type) ? type! : "all";

  const inquiries = await prisma.formSubmission.findMany({
    where: activeFilter === "all" ? undefined : { type: activeFilter },
    orderBy: { createdAt: "desc" },
  });

  const newCount = inquiries.filter((item) => item.status === "new").length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Form inquiries</h1>
        <p className="mt-1 text-sm text-slate-500">
          Appointments, contact messages, and international patient desk submissions.
          {newCount > 0 ? ` ${newCount} new.` : ""}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={filter.value === "all" ? "/admin/inquiries" : `/admin/inquiries?type=${filter.value}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === filter.value
                ? "bg-red-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-red-600"
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Details</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-b border-slate-100 align-top last:border-0">
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                  {formatDate(inquiry.createdAt)}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formTypeLabels[inquiry.type] ?? inquiry.type}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{inquiry.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  <div>{inquiry.phone ?? "—"}</div>
                  <div className="text-xs text-slate-400">{inquiry.email ?? "—"}</div>
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {inquiry.type === "appointment" ? (
                    <div className="space-y-1 text-xs">
                      <p>
                        <span className="font-medium text-slate-700">Dept:</span>{" "}
                        {inquiry.department}
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">When:</span>{" "}
                        {inquiry.preferredDate?.toLocaleDateString("en-IN")} at{" "}
                        {inquiry.preferredTime}
                      </p>
                      {inquiry.message ? <p className="line-clamp-2">{inquiry.message}</p> : null}
                    </div>
                  ) : null}
                  {inquiry.type === "contact" ? (
                    <p className="line-clamp-3 text-xs">{inquiry.message}</p>
                  ) : null}
                  {inquiry.type === "international" ? (
                    <div className="space-y-1 text-xs">
                      {inquiry.country ? <p>Country: {inquiry.country}</p> : null}
                      {inquiry.medicalCondition ? (
                        <p>Condition: {inquiry.medicalCondition}</p>
                      ) : null}
                      <p className="line-clamp-2">{inquiry.message}</p>
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                      inquiry.status === "new" && "bg-amber-100 text-amber-700",
                      inquiry.status === "read" && "bg-blue-100 text-blue-700",
                      inquiry.status === "archived" && "bg-slate-100 text-slate-600"
                    )}
                  >
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <InquiryActions id={inquiry.id} status={inquiry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 ? (
          <p className="px-4 py-12 text-center text-slate-500">No submissions yet.</p>
        ) : null}
      </div>
    </div>
  );
}
