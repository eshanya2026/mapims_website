import { formTypeLabels } from "@/lib/form-type-labels";
import { getPrismaClient, prisma } from "@/lib/prisma";

export { formTypeLabels };
import type { z } from "zod";
import type {
  appointmentFormSchema,
  contactFormSchema,
  internationalFormSchema,
} from "@/lib/validations";

type AppointmentData = z.infer<typeof appointmentFormSchema>;
type ContactData = z.infer<typeof contactFormSchema>;
type InternationalData = z.infer<typeof internationalFormSchema>;

export type FormSubmissionInput =
  | AppointmentData
  | ContactData
  | InternationalData;

const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;

async function findRecentDuplicate(data: FormSubmissionInput) {
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
  const name = data.name.trim();

  if (data.type === "appointment") {
    return prisma.formSubmission.findFirst({
      where: {
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        department: data.department,
        preferredTime: data.time,
        preferredDate: new Date(`${data.date}T00:00:00`),
        createdAt: { gte: since },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  if (data.type === "contact") {
    return prisma.formSubmission.findFirst({
      where: {
        type: data.type,
        name,
        phone: data.phone ? data.phone.trim() : null,
        email: data.email?.trim() || null,
        message: data.message,
        createdAt: { gte: since },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.formSubmission.findFirst({
    where: {
      type: data.type,
      name,
      email: data.email.trim(),
      phone: data.phone.trim(),
      country: data.country || null,
      medicalCondition: data.medicalCondition || null,
      message: data.message,
      createdAt: { gte: since },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createFormSubmission(data: FormSubmissionInput) {
  const duplicate = await findRecentDuplicate(data);
  if (duplicate) {
    return duplicate;
  }
  if (data.type === "appointment") {
    return prisma.formSubmission.create({
      data: {
        type: data.type,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        department: data.department,
        preferredDate: new Date(`${data.date}T00:00:00`),
        preferredTime: data.time,
        message: data.message || null,
      },
    });
  }

  if (data.type === "contact") {
    return prisma.formSubmission.create({
      data: {
        type: data.type,
        name: data.name,
        phone: data.phone || null,
        email: data.email || null,
        message: data.message,
      },
    });
  }

  return prisma.formSubmission.create({
    data: {
      type: data.type,
      name: data.name,
      country: data.country || null,
      email: data.email,
      phone: data.phone,
      medicalCondition: data.medicalCondition || null,
      message: data.message,
    },
  });
}

export async function getInquiryCounts() {
  try {
    const client = getPrismaClient();
    if (typeof client.formSubmission?.count !== "function") {
      return { total: 0, new: 0 };
    }

    const [total, newCount] = await Promise.all([
      client.formSubmission.count(),
      client.formSubmission.count({ where: { status: "new" } }),
    ]);

    return { total, new: newCount };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[form-submissions] count failed:", error);
    }
    return { total: 0, new: 0 };
  }
}
