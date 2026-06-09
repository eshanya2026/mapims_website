"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type DeleteButtonProps = {
  endpoint: string;
  label?: string;
  onDeleted?: () => void;
};

export default function DeleteButton({
  endpoint,
  label = "Delete",
  onDeleted,
}: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    const response = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);

    if (response.ok) {
      onDeleted?.();
      router.refresh();
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
      {loading ? "Deleting..." : label}
    </Button>
  );
}
