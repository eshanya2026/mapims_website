"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import { getInquiryNextActions } from "@/lib/inquiry-status";

type InquiryActionsProps = {
  id: string;
  type: string;
  status: string;
  onUpdated?: () => void | Promise<void>;
};

export default function InquiryActions({
  id,
  type,
  status,
  onUpdated,
}: InquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      await onUpdated?.();
      if (!onUpdated) {
        router.refresh();
      }
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.status}
          type="button"
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() => updateStatus(action.status)}
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
  );
}
