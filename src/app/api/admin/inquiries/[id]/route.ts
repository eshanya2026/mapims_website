import { NextResponse } from "next/server";
import { requireApiPermission } from "@/lib/admin-api-auth";
import { canAccessEnquiryType } from "@/lib/admin-roles";
import {
  deleteFormSubmission,
  findFormSubmissionById,
  updateFormSubmission,
} from "@/lib/db/form-submissions";
import { isRecruitmentInquiry, isValidInquiryStatusForType } from "@/lib/inquiry-status";
import {
  notifyCandidateOfInterviewReschedule,
  notifyCandidateOfRecruitmentStatusChange,
} from "@/lib/recruitment-status-notifications";
import { updateInquiryPatchSchema } from "@/lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireApiPermission("inquiries");
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const inquiry = await findFormSubmissionById(id);

  if (!inquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!canAccessEnquiryType(auth.session.role, inquiry.type)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(inquiry);
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireApiPermission("inquiries");
  if (auth.error) return auth.error;

  const { id } = await context.params;

  try {
    const body = await request.json();

    const existing = await findFormSubmissionById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (!canAccessEnquiryType(auth.session.role, existing.type)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const parsed = updateInquiryPatchSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const payload = parsed.data;

    if ("interview" in payload) {
      if (!isRecruitmentInquiry(existing.type)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }

      const { interview } = payload;
      const notifyCandidate = interview.notifyCandidate;
      const isReschedule = payload.reschedule === true;

      if (isReschedule && existing.status !== "interview_scheduled") {
        return NextResponse.json(
          { error: "Interview can only be rescheduled while it is scheduled" },
          { status: 400 }
        );
      }

      const inquiry = await updateFormSubmission(id, {
        status: "interview_scheduled",
        interviewDate: new Date(`${interview.date}T00:00:00`),
        interviewTime: interview.time,
        interviewInterviewer: interview.interviewer,
        interviewMode: interview.mode,
        interviewAddress: interview.address || null,
      });

      if (!inquiry) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      try {
        if (isReschedule) {
          await notifyCandidateOfInterviewReschedule(inquiry, {
            sendEmail: notifyCandidate,
          });
        } else {
          await notifyCandidateOfRecruitmentStatusChange(
            inquiry,
            existing.status,
            "interview_scheduled",
            { sendEmail: notifyCandidate }
          );
        }
      } catch (emailError) {
        console.error("[admin/inquiries PATCH] candidate email failed:", emailError);
      }

      return NextResponse.json(inquiry);
    }

    const nextStatus = payload.status;

    if (!isValidInquiryStatusForType(existing.type, nextStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const inquiry = await updateFormSubmission(id, { status: nextStatus });

    if (!inquiry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
      await notifyCandidateOfRecruitmentStatusChange(
        { ...existing, status: nextStatus },
        existing.status,
        nextStatus
      );
    } catch (emailError) {
      console.error("[admin/inquiries PATCH] candidate email failed:", emailError);
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("[admin/inquiries PATCH]", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireApiPermission("inquiries");
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const existing = await findFormSubmissionById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!canAccessEnquiryType(auth.session.role, existing.type)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await deleteFormSubmission(id);
  return NextResponse.json({ ok: true });
}
