import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import { deletedOnlyFilter, mergeNotDeleted, notDeletedFilter, softDeleteFields } from "@/lib/db/soft-delete";
import type { FormSubmissionRecord } from "@/lib/db/types";
import {
  dateKeyToPreferredDateRange,
  isAppointmentSlotOccupied,
  preferredDateToDateKey,
  startOfTodayIST,
  type BookedSlotsByDate,
} from "@/lib/appointment-bookings";
import { APPOINTMENT_ACTIVE_IDENTITY_STATUSES } from "@/lib/appointment-identity-guard";
import {
  normalizeEmailForMatch,
  normalizePhoneForMatch,
  phoneLookupVariants,
} from "@/lib/identity-normalize";
import { getDepartmentNameBySlug } from "@/lib/department-utils";
import { mapId, now, toObjectId } from "@/lib/db/utils";
import type { z } from "zod";
import type {
  appointmentFormSchema,
  careerApplicationFormSchema,
  contactFormSchema,
  internationalFormSchema,
  jobApplicationFormSchema,
} from "@/lib/validations";

type FormSubmissionInput =
  | z.infer<typeof appointmentFormSchema>
  | z.infer<typeof contactFormSchema>
  | z.infer<typeof internationalFormSchema>
  | z.infer<typeof careerApplicationFormSchema>
  | z.infer<typeof jobApplicationFormSchema>;

type FormSubmissionDoc = Omit<FormSubmissionRecord, "id">;

async function formSubmissionsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<FormSubmissionDoc>("formSubmissions");
}

function toFormSubmissionRecord(
  doc: FormSubmissionDoc & { _id: import("mongodb").ObjectId }
): FormSubmissionRecord {
  const record = mapId(doc) as FormSubmissionRecord;
  return {
    ...record,
    address: record.address ?? null,
    currentLocation: record.currentLocation ?? null,
    qualification: record.qualification ?? null,
    totalExperience: record.totalExperience ?? null,
    medicalCouncilRegistrationNo: record.medicalCouncilRegistrationNo ?? null,
    noticePeriod: record.noticePeriod ?? null,
    resumeUrl: record.resumeUrl ?? null,
    jobSlug: record.jobSlug ?? null,
    jobTitle: record.jobTitle ?? null,
    interviewDate: record.interviewDate ?? null,
    interviewTime: record.interviewTime ?? null,
    interviewInterviewer: record.interviewInterviewer ?? null,
    interviewMode: record.interviewMode ?? null,
    interviewAddress: record.interviewAddress ?? null,
    documentUrls: Array.isArray(record.documentUrls) ? record.documentUrls : [],
    departmentSlug: record.departmentSlug ?? null,
    phoneNormalized: record.phoneNormalized ?? null,
    emailNormalized: record.emailNormalized ?? null,
    clientIp: record.clientIp ?? null,
    deletedAt: record.deletedAt ?? null,
  };
}

export async function findFormSubmissionById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOne(mergeNotDeleted({ _id: objectId }));
  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function listFormSubmissions(filter?: {
  type?: string;
  types?: string[];
  trashed?: boolean;
}) {
  const collection = await formSubmissionsCollection();
  const baseQuery = filter?.types?.length
    ? { type: { $in: filter.types } }
    : filter?.type === "career"
      ? { type: { $in: ["career", "job_application"] } }
      : filter?.type
        ? { type: filter.type }
        : {};
  const query = filter?.trashed
    ? { ...baseQuery, ...deletedOnlyFilter }
    : mergeNotDeleted(baseQuery);
  const docs = await collection.find(query).sort({ createdAt: -1 }).toArray();
  return docs.map(toFormSubmissionRecord);
}

export async function countFormSubmissions(filter?: {
  status?: string;
  types?: string[];
  trashed?: boolean;
}) {
  const collection = await formSubmissionsCollection();
  const baseQuery = filter?.types?.length
    ? {
        type: { $in: filter.types },
        ...(filter.status ? { status: filter.status } : {}),
      }
    : filter?.status
      ? { status: filter.status }
      : {};
  const query = filter?.trashed ? { ...baseQuery, ...deletedOnlyFilter } : mergeNotDeleted(baseQuery);
  return collection.countDocuments(query);
}

export async function createFormSubmissionRecord(data: {
  type: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  department?: string | null;
  departmentSlug?: string | null;
  preferredDate?: Date | null;
  preferredTime?: string | null;
  country?: string | null;
  medicalCondition?: string | null;
  address?: string | null;
  currentLocation?: string | null;
  qualification?: string | null;
  totalExperience?: string | null;
  medicalCouncilRegistrationNo?: string | null;
  noticePeriod?: string | null;
  resumeUrl?: string | null;
  jobSlug?: string | null;
  jobTitle?: string | null;
  interviewDate?: Date | null;
  interviewTime?: string | null;
  interviewInterviewer?: string | null;
  interviewMode?: "online" | "offline" | null;
  interviewAddress?: string | null;
  documentUrls?: string[];
  status?: string;
  referenceId?: string | null;
  phoneNormalized?: string | null;
  emailNormalized?: string | null;
  clientIp?: string | null;
}) {
  const collection = await formSubmissionsCollection();
  const timestamp = now();
  const insertDoc: FormSubmissionDoc = {
    type: data.type,
    name: data.name,
    email: data.email ?? null,
    phone: data.phone ?? null,
    message: data.message ?? null,
    department: data.department ?? null,
    departmentSlug: data.departmentSlug ?? null,
    preferredDate: data.preferredDate ?? null,
    preferredTime: data.preferredTime ?? null,
    country: data.country ?? null,
    medicalCondition: data.medicalCondition ?? null,
    address: data.address ?? null,
    currentLocation: data.currentLocation ?? null,
    qualification: data.qualification ?? null,
    totalExperience: data.totalExperience ?? null,
    medicalCouncilRegistrationNo: data.medicalCouncilRegistrationNo ?? null,
    noticePeriod: data.noticePeriod ?? null,
    resumeUrl: data.resumeUrl ?? null,
    jobSlug: data.jobSlug ?? null,
    jobTitle: data.jobTitle ?? null,
    interviewDate: data.interviewDate ?? null,
    interviewTime: data.interviewTime ?? null,
    interviewInterviewer: data.interviewInterviewer ?? null,
    interviewMode: data.interviewMode ?? null,
    interviewAddress: data.interviewAddress ?? null,
    documentUrls: data.documentUrls ?? [],
    status: data.status ?? "new",
    referenceId: null,
    createdAt: timestamp,
  };

  if (data.phoneNormalized) {
    insertDoc.phoneNormalized = data.phoneNormalized;
  }

  if (data.emailNormalized) {
    insertDoc.emailNormalized = data.emailNormalized;
  }

  if (data.clientIp) {
    insertDoc.clientIp = data.clientIp;
  }

  if (data.referenceId) {
    insertDoc.referenceId = data.referenceId;
  } else {
    delete (insertDoc as { referenceId?: string | null }).referenceId;
  }

  const result = await collection.insertOne(insertDoc);

  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create form submission");
  }

  return toFormSubmissionRecord(doc);
}

export async function updateFormSubmission(
  id: string,
  data: Partial<
    Pick<
      FormSubmissionRecord,
      | "status"
      | "referenceId"
      | "interviewDate"
      | "interviewTime"
      | "interviewInterviewer"
      | "interviewMode"
      | "interviewAddress"
    >
  >
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOneAndUpdate(
    mergeNotDeleted({ _id: objectId }),
    { $set: data },
    { returnDocument: "after" }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function deleteFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await formSubmissionsCollection();
  const result = await collection.updateOne(mergeNotDeleted({ _id: objectId }), {
    $set: softDeleteFields(),
  });
  return result.matchedCount === 1;
}

export async function restoreFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId, ...deletedOnlyFilter },
    { $unset: { deletedAt: "" } },
    { returnDocument: "after" }
  );
  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function purgeFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await formSubmissionsCollection();
  const result = await collection.deleteOne({ _id: objectId, ...deletedOnlyFilter });
  return result.deletedCount === 1;
}

export async function findRecentDuplicateSubmission(data: FormSubmissionInput) {
  const since = new Date(Date.now() - 2 * 60 * 1000);
  const collection = await formSubmissionsCollection();
  const name = data.name.trim();

  if (data.type === "appointment") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        departmentSlug: data.departmentSlug,
        preferredTime: data.time,
        preferredDate: new Date(`${data.date}T00:00:00`),
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "contact") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone ? data.phone.trim() : null,
        email: data.email?.trim() || null,
        message: data.message,
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "career") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email.trim(),
        message: data.message,
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "job_application") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email.trim(),
        jobSlug: data.jobSlug,
        resumeUrl: data.resumeUrl,
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  const doc = await collection.findOne(
    mergeNotDeleted({
      type: data.type,
      name,
      email: data.email?.trim() || null,
      phone: data.phone.trim(),
      country: data.country || null,
      medicalCondition: data.medicalCondition || null,
      message: data.message,
      createdAt: { $gte: since },
    }),
    { sort: { createdAt: -1 } }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function findLatestReferenceId(prefix: string) {
  const collection = await formSubmissionsCollection();
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const doc = await collection.findOne(
    {
      referenceId: { $regex: `^${escapedPrefix}` },
    },
    {
      sort: { referenceId: -1 },
      projection: { referenceId: 1 },
    }
  );

  return doc?.referenceId ?? null;
}

/** @deprecated Use findLatestReferenceId */
export async function findLatestAppointmentReferenceId(prefix: string) {
  return findLatestReferenceId(prefix);
}

function buildDepartmentMatchFilter(departmentSlug?: string | null) {
  if (!departmentSlug) return {};

  const departmentName = getDepartmentNameBySlug(departmentSlug);
  return {
    $or: [
      { departmentSlug },
      {
        $and: [
          { $or: [{ departmentSlug: { $exists: false } }, { departmentSlug: null }] },
          { department: departmentName },
        ],
      },
    ],
  };
}

export async function findBookedAppointmentSlotsByDates(
  dateKeys: string[],
  departmentSlug?: string | null
): Promise<BookedSlotsByDate> {
  const uniqueDates = [...new Set(dateKeys.filter(Boolean))];
  if (uniqueDates.length === 0) return {};

  const collection = await formSubmissionsCollection();
  const dateFilter = {
    $or: uniqueDates.map((dateKey) => {
      const { start, end } = dateKeyToPreferredDateRange(dateKey);
      return {
        preferredDate: { $gte: start, $lt: end },
      };
    }),
  };
  const departmentFilter = buildDepartmentMatchFilter(departmentSlug);
  const docs = await collection
    .find(
      mergeNotDeleted({
        type: "appointment",
        status: { $in: ["new", "contacted", "confirmed", "completed", "read"] },
        ...(Object.keys(departmentFilter).length > 0
          ? { $and: [departmentFilter, dateFilter] }
          : dateFilter),
      })
    )
    .project({ preferredDate: 1, preferredTime: 1, status: 1 })
    .toArray();

  const booked: BookedSlotsByDate = Object.fromEntries(
    uniqueDates.map((dateKey) => [dateKey, [] as string[]])
  );

  for (const doc of docs) {
    if (!doc.preferredDate || !doc.preferredTime || !isAppointmentSlotOccupied(doc.status)) {
      continue;
    }

    const dateKey = preferredDateToDateKey(doc.preferredDate);
    if (!booked[dateKey]) {
      booked[dateKey] = [];
    }

    if (!booked[dateKey].includes(doc.preferredTime)) {
      booked[dateKey].push(doc.preferredTime);
    }
  }

  for (const dateKey of uniqueDates) {
    booked[dateKey]?.sort();
  }

  return booked;
}

export async function findAppointmentBookingConflict(
  dateKey: string,
  time: string,
  departmentSlug?: string | null
) {
  const { start, end } = dateKeyToPreferredDateRange(dateKey);
  const collection = await formSubmissionsCollection();
  const doc = await collection.findOne(
    mergeNotDeleted({
      type: "appointment",
      preferredTime: time,
      preferredDate: { $gte: start, $lt: end },
      status: { $in: ["new", "contacted", "confirmed", "completed", "read"] },
      ...buildDepartmentMatchFilter(departmentSlug),
    })
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function findActiveAppointmentByIdentity(params: {
  phone: string;
  email: string;
}) {
  const phoneNormalized = normalizePhoneForMatch(params.phone);
  const emailNormalized = normalizeEmailForMatch(params.email);
  const phoneVariants = phoneLookupVariants(params.phone);
  const todayStart = startOfTodayIST();

  const identityConditions: Record<string, unknown>[] = [];

  if (phoneNormalized) {
    identityConditions.push({ phoneNormalized });
    if (phoneVariants.length > 0) {
      identityConditions.push({ phone: { $in: phoneVariants } });
    }
  }

  if (emailNormalized) {
    identityConditions.push({ emailNormalized });
    identityConditions.push({ email: emailNormalized });
  }

  if (identityConditions.length === 0) {
    return null;
  }

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOne(
    mergeNotDeleted({
      type: "appointment",
      status: { $in: [...APPOINTMENT_ACTIVE_IDENTITY_STATUSES] },
      preferredDate: { $gte: todayStart },
      $or: identityConditions,
    }),
    { sort: { preferredDate: 1, createdAt: -1 } }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function countRecentAppointmentSubmissionsByIp(
  clientIp: string,
  since: Date
) {
  const collection = await formSubmissionsCollection();
  return collection.countDocuments(
    mergeNotDeleted({
      type: "appointment",
      clientIp,
      createdAt: { $gte: since },
    })
  );
}
