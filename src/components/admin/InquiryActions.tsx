"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import ScheduleInterviewModal from "@/components/admin/ScheduleInterviewModal";
import { getInquiryNextActions } from "@/lib/inquiry-status";

type InterviewDetails = {
  interviewDate: string | null;
  interviewTime: string | null;
  interviewInterviewer: string | null;
  interviewMode: "online" | "offline" | null;
  interviewAddress: string | null;
};

type InquiryActionsProps = {
  id: string;
  type: string;
  status: string;
  candidateName: string;
  interview?: InterviewDetails;
  onUpdated?: (updated?: Record<string, unknown>) => void | Promise<void>;
};

export default function InquiryActions({
  id,
  type,
  status,
  candidateName,
  interview,
  onUpdated,
}: InquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<"schedule" | "reschedule">("schedule");
  const actions = getInquiryNextActions(type, status);

  async function updateStatus(nextStatus: string) {
    setLoading(true);
    const response = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    setLoading(false);

    if (response.ok) {
      const updated = await response.json();
      await onUpdated?.(updated);
      if (!onUpdated) {
        router.refresh();
      }
    }
  }

  function handleAction(actionStatus: string) {
    if (actionStatus === "interview_scheduled") {
      setScheduleMode("schedule");
      setScheduleOpen(true);
      return;
    }
    if (actionStatus === "reschedule_interview") {
      setScheduleMode("reschedule");
      setScheduleOpen(true);
      return;
    }
    void updateStatus(actionStatus);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.status}
            type="button"
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={() => handleAction(action.status)}
          >
            {action.label}
          </Button>
        ))}
        <DeleteButton
          endpoint={`/api/admin/inquiries/${id}`}
          label="Delete"
          onDeleted={onUpdated}
          skipRefresh={Boolean(onUpdated)}
        />
      </div>

      <ScheduleInterviewModal
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        inquiryId={id}
        candidateName={candidateName}
        mode={scheduleMode}
        initialInterview={scheduleMode === "reschedule" ? interview : undefined}
        onScheduled={onUpdated}
      />
    </>
  );
}
