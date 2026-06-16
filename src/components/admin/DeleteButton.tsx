"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type DeleteButtonProps = {
  endpoint: string;
  label?: string;
  onDeleted?: () => void | Promise<void>;
  skipRefresh?: boolean;
};

export default function DeleteButton({
  endpoint,
  label = "Delete",
  onDeleted,
  skipRefresh = false,
}: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Move this item to trash? You can restore it later from Trash.")) return;

    setLoading(true);
    const response = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);

    if (response.ok) {
      await onDeleted?.();
      if (!skipRefresh) {
        router.refresh();
      }
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
      className="border-red-200 text-red-600 hover:bg-red-50"
    >
      {loading ? "Moving..." : label}
    </Button>
  );
}
