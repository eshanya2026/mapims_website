import { ensureDoctorPlacementSortOrders, listDoctors } from "@/lib/db/doctors";
import type { DoctorRecord } from "@/lib/db/types";

export type ContentDoctor = {
  id: string;
  slug: string;
  name: string;
  designation: string;
  specialty: string;
  departmentSlug: string;
  degree: string;
  experience: string;
  bio: string;
  image: string;
  accent: "primary" | "deep";
};

function mapDoctor(doctor: DoctorRecord): ContentDoctor {
  return {
    id: doctor.id,
    slug: doctor.slug,
    name: doctor.name,
    designation: doctor.designation,
    specialty: doctor.specialty,
    departmentSlug: doctor.departmentSlug,
    degree: doctor.degree,
    experience: doctor.experience,
    bio: doctor.bio,
    image: doctor.image,
    accent: doctor.accent,
  };
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[doctors-content] Database query failed:", error);
    }
    return fallback;
  }
}

export async function getHomeDoctors() {
  return safeQuery(async () => {
    await ensureDoctorPlacementSortOrders();
    const doctors = await listDoctors(
      { published: true, showOnHome: true },
      { sortBy: "homeSortOrder" }
    );
    return doctors.map(mapDoctor);
  }, []);
}

export async function getAboutDoctors() {
  return safeQuery(async () => {
    await ensureDoctorPlacementSortOrders();
    const doctors = await listDoctors(
      { published: true, showOnAbout: true },
      { sortBy: "aboutSortOrder" }
    );
    return doctors.map(mapDoctor);
  }, []);
}

export async function getDepartmentDoctors(departmentSlug: string) {
  return safeQuery(async () => {
    const doctors = await listDoctors({
      published: true,
      departmentSlug,
    });
    return doctors.map(mapDoctor);
  }, []);
}

export async function getPublishedDoctors() {
  return safeQuery(async () => {
    const doctors = await listDoctors({ published: true });
    return doctors.map(mapDoctor);
  }, []);
}
