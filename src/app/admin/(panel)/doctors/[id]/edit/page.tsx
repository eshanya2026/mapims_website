import { notFound } from "next/navigation";
import { findDoctorById } from "@/lib/db/doctors";
import DoctorForm from "@/components/admin/DoctorForm";

type EditDoctorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { id } = await params;
  const doctor = await findDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <DoctorForm
      mode="edit"
      initial={{
        id: doctor.id,
        name: doctor.name,
        slug: doctor.slug,
        designation: doctor.designation,
        specialty: doctor.specialty,
        departmentSlug: doctor.departmentSlug,
        degree: doctor.degree,
        experience: doctor.experience,
        bio: doctor.bio,
        image: doctor.image,
        accent: doctor.accent,
        showOnHome: doctor.showOnHome,
        showOnAbout: doctor.showOnAbout,
        sortOrder: doctor.sortOrder,
        published: doctor.published,
      }}
    />
  );
}
