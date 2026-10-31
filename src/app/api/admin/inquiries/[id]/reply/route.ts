import { NextResponse } from "next/server";
import { requireApiPermission } from "@/lib/admin-api-auth";
import { canAccessEnquiryType } from "@/lib/admin-roles";
import { addInquiryReply, findFormSubmissionById } from "@/lib/db/form-submissions";
import { sendAppointmentReplyEmail } from "@/lib/appointment-notifications";
import { sendInsuranceReplyEmail } from "@/lib/inquiry-notifications";
import { isValidInquiryStatusForType } from "@/lib/inquiry-status";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const auth = await requireApiPermission("inquiries");
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const inquiry = await findFormSubmissionById(id);

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  if (!canAccessEnquiryType(auth.session.role, inquiry.type)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const recipientEmail = inquiry.email?.trim();
  if (!recipientEmail) {
    return NextResponse.json(
      { error: "This inquiry does not have a recipient email address" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const rawMessage = typeof body.message === "string" ? body.message.trim() : "";
    const rawSubject = typeof body.subject === "string" ? body.subject.trim() : "";
    const requestedStatus = typeof body.status === "string" ? body.status.trim() : "completed";

    if (!rawMessage || rawMessage.length < 2) {
      return NextResponse.json(
        { error: "Reply message must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const nextStatus = isValidInquiryStatusForType(inquiry.type, requestedStatus)
      ? requestedStatus
      : inquiry.status;

    const defaultSender =
      inquiry.type === "appointment"
        ? "Appointment Desk Coordinator"
        : "Insurance Desk Coordinator";
    const senderName = auth.session.name || auth.session.email || defaultSender;

    // 1. Send the email directly to the recipient from the respective department email
    if (inquiry.type === "appointment") {
      await sendAppointmentReplyEmail({
        submission: inquiry,
        replyMessage: rawMessage,
        subject: rawSubject || undefined,
        senderName,
      });
    } else {
      await sendInsuranceReplyEmail({
        submission: inquiry,
        replyMessage: rawMessage,
        subject: rawSubject || undefined,
        senderName,
      });
    }

    // 2. Record the reply in MongoDB and update status
    const updated = await addInquiryReply(
      id,
      {
        message: rawMessage,
        subject: rawSubject || undefined,
        repliedBy: senderName,
      },
      nextStatus
    );

    return NextResponse.json(updated ?? { success: true });
  } catch (error) {
    console.error("[inquiries reply POST] error:", error);
    const message = error instanceof Error ? error.message : "Failed to send reply email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
