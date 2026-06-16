import "dotenv/config";
import { listFormSubmissions } from "../src/lib/db/form-submissions";
import { notifyCandidateOfRecruitmentStatusChange } from "../src/lib/recruitment-status-notifications";

async function main() {
  const inquiries = await listFormSubmissions({ type: "career" });
  const jobApps = await listFormSubmissions({ type: "job_application" });
  const recruitment = [...jobApps, ...inquiries].filter((item) => item.email?.trim());

  if (recruitment.length === 0) {
    console.error("No recruitment inquiries with email found.");
    process.exit(1);
  }

  const inquiry = recruitment[0];
  console.log("Testing with:", {
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    status: inquiry.status,
    type: inquiry.type,
  });

  const previousStatus =
    inquiry.status === "shortlisted" ? "screening" : inquiry.status;

  await notifyCandidateOfRecruitmentStatusChange(
    { ...inquiry, status: "shortlisted" },
    previousStatus,
    "shortlisted"
  );

  console.log(`OK: shortlisted email sent to ${inquiry.email}`);
}

main().catch((error) => {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
});
