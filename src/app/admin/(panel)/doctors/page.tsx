import { ensureDoctorPlacementSortOrders, listDoctors } from "@/lib/db/doctors";
import { departments } from "@/data/departments";
import DoctorsAdminList, {
  type AdminDoctorRecord,
} from "@/components/admin/DoctorsAdminList";

const departmentNames = Object.fromEntries(
  departments.map((dept) => [dept.slug, dept.name])
);

function serializeDoctors(
  doctors: Awaited<ReturnType<typeof listDoctors>>
): AdminDoctorRecord[] {
  return doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    designation: doctor.designation,
    departmentSlug: doctor.departmentSlug,
    departmentName: doctor.departmentSlug
      ? departmentNames[doctor.departmentSlug] ?? doctor.departmentSlug
      : "General",
    image: doctor.image,
    showOnHome: doctor.showOnHome,
    showOnAbout: doctor.showOnAbout,
    published: doctor.published,
    sortOrder: doctor.sortOrder,
    homeSortOrder: doctor.homeSortOrder ?? 0,
    aboutSortOrder: doctor.aboutSortOrder ?? 0,
  }));
}

export default async function AdminDoctorsPage() {
  await ensureDoctorPlacementSortOrders();
  const doctors = await listDoctors();

  return <DoctorsAdminList doctors={serializeDoctors(doctors)} />;
}
