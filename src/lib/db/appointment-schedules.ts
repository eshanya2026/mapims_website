import { getDb } from "@/lib/mongodb";
import {
  createDefaultScheduleConfig,
  normalizeDaySlotsFromRecord,
} from "@/lib/appointment-schedule-config";
import { departments } from "@/data/departments";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { AppointmentScheduleRecord } from "@/lib/db/types";
import { mapId, now } from "@/lib/db/utils";

type AppointmentScheduleDoc = Omit<AppointmentScheduleRecord, "id">;

async function appointmentSchedulesCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<AppointmentScheduleDoc>("appointmentSchedules");
}

function toAppointmentScheduleRecord(
  doc: AppointmentScheduleDoc & { _id: import("mongodb").ObjectId }
): AppointmentScheduleRecord {
  const record = mapId(doc) as AppointmentScheduleRecord;

  return {
    ...record,
    daySlots: normalizeDaySlotsFromRecord(record),
    notes: record.notes ?? null,
  };
}

export async function listAppointmentSchedules() {
  const collection = await appointmentSchedulesCollection();
  const docs = await collection.find({}).sort({ departmentSlug: 1 }).toArray();
  return docs.map(toAppointmentScheduleRecord);
}

export async function findAppointmentScheduleByDepartmentSlug(departmentSlug: string) {
  const collection = await appointmentSchedulesCollection();
  const doc = await collection.findOne({ departmentSlug });
  return doc ? toAppointmentScheduleRecord(doc) : null;
}

export async function ensureAppointmentSchedulesForDepartments() {
  const collection = await appointmentSchedulesCollection();
  const existing = await collection.find({}).project({ departmentSlug: 1 }).toArray();
  const existingSlugs = new Set(existing.map((doc) => doc.departmentSlug));
  const timestamp = now();
  const inserts: AppointmentScheduleDoc[] = [];

  for (const department of departments) {
    if (existingSlugs.has(department.slug)) continue;

    const defaults = createDefaultScheduleConfig(department.slug);
    inserts.push({
      departmentSlug: department.slug,
      enabled: defaults.enabled,
      daySlots: { ...defaults.daySlots },
      advanceDays: defaults.advanceDays,
      notes: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }

  if (inserts.length > 0) {
    await collection.insertMany(inserts);
  }
}

export async function upsertAppointmentSchedule(
  departmentSlug: string,
  data: {
    enabled: boolean;
    daySlots: AppointmentScheduleRecord["daySlots"];
    advanceDays: number;
    notes?: string | null;
  }
) {
  const collection = await appointmentSchedulesCollection();
  const timestamp = now();
  const existing = await collection.findOne({ departmentSlug });

  if (existing) {
    const doc = await collection.findOneAndUpdate(
      { departmentSlug },
      {
        $set: {
          enabled: data.enabled,
          daySlots: data.daySlots,
          advanceDays: data.advanceDays,
          notes: data.notes ?? null,
          updatedAt: timestamp,
        },
        $unset: {
          weekdaySlots: "",
          sundaySlots: "",
        },
      },
      { returnDocument: "after" }
    );

    return doc ? toAppointmentScheduleRecord(doc) : null;
  }

  const insertDoc: AppointmentScheduleDoc = {
    departmentSlug,
    enabled: data.enabled,
    daySlots: data.daySlots,
    advanceDays: data.advanceDays,
    notes: data.notes ?? null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(insertDoc);
  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create appointment schedule");
  }

  return toAppointmentScheduleRecord(doc);
}

export async function getPublishedAppointmentSchedule(departmentSlug: string) {
  await ensureAppointmentSchedulesForDepartments();
  return findAppointmentScheduleByDepartmentSlug(departmentSlug);
}

export async function listEnabledAppointmentSchedules() {
  await ensureAppointmentSchedulesForDepartments();
  const collection = await appointmentSchedulesCollection();
  const docs = await collection
    .find({ enabled: true })
    .sort({ departmentSlug: 1 })
    .toArray();
  return docs.map(toAppointmentScheduleRecord);
}
