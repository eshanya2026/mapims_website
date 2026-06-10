import { NextResponse } from "next/server";
import { createFormSubmission } from "@/lib/form-submissions";
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

    return NextResponse.json(
      {
        ok: true,
        id: submission.id,
        referenceId: submission.referenceId ?? null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[forms POST]", error);
    return NextResponse.json(
      { error: "Unable to submit the form right now. Please try again." },
      { status: 500 }
    );
  }
}
