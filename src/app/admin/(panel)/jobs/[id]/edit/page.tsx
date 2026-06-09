import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import JobForm from "@/components/admin/JobForm";

type EditJobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) notFound();

  return (
    <JobForm
      mode="edit"
      initial={{
        id: job.id,
        title: job.title,
        slug: job.slug,
        department: job.department,
        location: job.location,
        employmentType: job.employmentType,
        vacancy: job.vacancy ?? 1,
        description: job.description,
        requirements: job.requirements,
        qualifications: job.qualifications ?? "",
        applyEmail: job.applyEmail ?? "",
        applyUrl: job.applyUrl ?? "",
        published: job.published,
        closingDate: job.closingDate
          ? job.closingDate.toISOString().slice(0, 10)
          : "",
      }}
    />
  );
}
