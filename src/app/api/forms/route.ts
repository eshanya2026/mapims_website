import { after, NextResponse } from "next/server";
import {
  ACTIVE_APPOINTMENT_EXISTS_MESSAGE,
  APPOINTMENT_RATE_LIMIT_MESSAGE,
} from "@/lib/appointment-identity-guard";
import { notifyPatientOfAppointment } from "@/lib/appointment-notifications";
import { createFormSubmission } from "@/lib/form-submissions";
import {
  notifyCandidateOfJobApplication,
  notifyHrOfFormSubmission,
} from "@/lib/hr-form-notifications";
import {
  notifyHospitalOfInquiry,
  notifyPatientOfInquiry,
} from "@/lib/inquiry-notifications";
import { getClientIpFromRequest } from "@/lib/request-client-ip";
import { formSubmissionSchema } from "@/lib/validations";

function formSubmissionErrorStatus(message: string) {
  if (
    message.includes("time slot was just booked") ||
    message === ACTIVE_APPOINTMENT_EXISTS_MESSAGE
  ) {
    return 409;
  }

  if (message === APPOINTMENT_RATE_LIMIT_MESSAGE) {
    return 429;
  }

  return 500;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = formSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue?.message ?? "Please check the form and try again.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const submission = await createFormSubmission(parsed.data, {
      clientIp: getClientIpFromRequest(request),
    });

    const triggerNotifications = async () => {
      if (submission.type === "job_application" || submission.type === "career") {
        await Promise.allSettled([
          notifyHrOfFormSubmission(submission).catch((emailError) => {
            console.error("[forms POST] HR notification email failed:", emailError);
          }),
          notifyCandidateOfJobApplication(submission).catch((emailError) => {
            console.error("[forms POST] candidate confirmation email failed:", emailError);
          }),
        ]);
      }

      if (submission.type === "appointment") {
        try {
          await notifyPatientOfAppointment(submission);
        } catch (emailError) {
          console.error("[forms POST] appointment confirmation email failed:", emailError);
        }
      }

      if (
        submission.type === "contact" ||
        submission.type === "international" ||
        submission.type === "insurance"
      ) {
        await Promise.allSettled([
          notifyPatientOfInquiry(submission).catch((emailError) => {
            console.error("[forms POST] patient inquiry email failed:", emailError);
          }),
          notifyHospitalOfInquiry(submission).catch((emailError) => {
            console.error("[forms POST] hospital inquiry notification failed:", emailError);
          }),
        ]);
      }
    };

    if (typeof after === "function") {
      after(triggerNotifications);
    } else {
      void triggerNotifications();
    }

    return NextResponse.json(
      {
        ok: true,
        id: submission.id,
        referenceId: submission.referenceId ?? null,
        jobTitle:
          submission.type === "job_application"
            ? submission.jobTitle ?? null
            : submission.type === "career"
              ? "General Career Enquiry"
              : null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[forms POST]", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to submit the form right now. Please try again.";
    const status = formSubmissionErrorStatus(message);
    return NextResponse.json({ error: message }, { status });
  }
}
