"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";

type InquiryActionsProps = {
  id: string;
  status: string;
  onUpdated?: () => void | Promise<void>;
};

export default function InquiryActions({ id, status, onUpdated }: InquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      {status === "new" ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() => updateStatus("read")}
        >
          Mark read
        </Button>
      ) : null}
      {status !== "archived" ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() => updateStatus("archived")}
        >
          Archive
        </Button>
      ) : null}
      <DeleteButton
        endpoint={`/api/admin/inquiries/${id}`}
        label="Delete"
        onDeleted={onUpdated}
        skipRefresh={Boolean(onUpdated)}
      />
    </div>
  );
}
