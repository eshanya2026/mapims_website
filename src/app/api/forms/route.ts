import { NextResponse } from "next/server";
import { createFormSubmission } from "@/lib/form-submissions";
import {
  notifyCandidateOfJobApplication,
  notifyHrOfFormSubmission,
} from "@/lib/hr-form-notifications";
import { formSubmissionSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = formSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue?.message ?? "Please check the form and try again.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const submission = await createFormSubmission(parsed.data);

    if (submission.type === "job_application") {
      try {
        await notifyHrOfFormSubmission(submission);
        await notifyCandidateOfJobApplication(submission);
      } catch (emailError) {
        console.error("[forms POST] notification email failed:", emailError);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        id: submission.id,
        referenceId: submission.referenceId ?? null,
        jobTitle:
          submission.type === "job_application" ? submission.jobTitle ?? null : null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[forms POST]", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to submit the form right now. Please try again.";
    const status = message.includes("time slot was just booked") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
