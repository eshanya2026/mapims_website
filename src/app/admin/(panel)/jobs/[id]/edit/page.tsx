import { notFound } from "next/navigation";
import { findJobById } from "@/lib/db/jobs";
import JobForm from "@/components/admin/JobForm";

type EditJobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const job = await findJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <JobForm
      mode="edit"
      initial={{
        id: job.id,
        title: job.title,
        slug: job.slug,
        jobRefNo: job.jobRefNo ?? "",
        department: job.department,
        location: job.location,
        employmentType: job.employmentType,
        vacancy: job.vacancy,
        description: job.description,
        requirements: job.requirements,
        qualifications: job.qualifications,
        applyEmail: job.applyEmail ?? "",
        applyUrl: job.applyUrl ?? "",
        published: job.published,
        closingDate: job.closingDate?.toISOString().slice(0, 10) ?? "",
      }}
    />
  );
}
