"use client";

import { useCallback, useEffect, useState } from "react";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TrashItem, TrashResource } from "@/lib/db/trash";
import { formatDisplayDateTime } from "@/lib/format-display-date";

const resourceLabels: Record<TrashResource, string> = {
  posts: "Post",
  jobs: "Career opening",
  doctors: "Doctor",
  inquiries: "Enquiry",
};

export default function TrashWorkspace() {
  const [items, setItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    const response = await fetch("/api/admin/trash", { cache: "no-store" });
    if (!response.ok) {
      setItems([]);
      setLoading(false);
      return;
    }

    const data = (await response.json()) as TrashItem[];
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchItems();
  }, [fetchItems]);

  async function handleAction(
    item: TrashItem,
    action: "restore" | "purge"
  ) {
    const message =
      action === "restore"
        ? `Restore this ${resourceLabels[item.resource].toLowerCase()}?`
        : "Delete permanently? This cannot be undone.";

    if (!confirm(message)) return;

    setActionId(`${action}-${item.id}`);
    const response = await fetch("/api/admin/trash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, resource: item.resource, id: item.id }),
    });
    setActionId(null);

    if (response.ok) {
      await fetchItems();
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Trash</h1>
        <p className="mt-1 text-sm text-slate-500">
          Restore accidentally deleted items or remove them permanently.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading trash...</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <Trash2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="font-medium text-slate-700">Trash is empty</p>
          <p className="mt-1 text-sm text-slate-500">
            Deleted posts, careers, doctors, and enquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <ul className="divide-y divide-slate-100">
            {items.map((item) => {
              const busy = actionId?.endsWith(item.id) ?? false;

              return (
                <li
                  key={`${item.resource}-${item.id}`}
                  className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        {resourceLabels[item.resource]}
                      </span>
                      <span className="text-xs text-slate-400">
                        Deleted {formatDisplayDateTime(item.deletedAt)}
                      </span>
                    </div>
                    <p className="mt-2 truncate text-base font-semibold text-slate-900">
                      {item.title}
                    </p>
                    {item.subtitle ? (
                      <p className="mt-0.5 truncate text-sm text-slate-500">{item.subtitle}</p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={busy}
                      onClick={() => void handleAction(item, "restore")}
                    >
                      <ArchiveRestore className="mr-1.5 h-4 w-4" />
                      Restore
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={busy}
                      onClick={() => void handleAction(item, "purge")}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-1.5 h-4 w-4" />
                      Delete forever
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
