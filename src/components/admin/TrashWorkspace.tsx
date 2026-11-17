"use client";

import { useCallback, useEffect, useState } from "react";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TrashItem, TrashResource } from "@/lib/db/trash";
import { formatDisplayDateTime } from "@/lib/format-display-date";
import { cn } from "@/lib/utils";

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
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

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

  useEffect(() => {
    setSelectedKeys((prev) => {
      if (prev.size === 0) return prev;
      const existingKeys = new Set(
        items.map((item) => `${item.resource}:${item.id}`)
      );
      let changed = false;
      const next = new Set<string>();
      for (const key of prev) {
        if (existingKeys.has(key)) {
          next.add(key);
        } else {
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [items]);

  function toggleSelectOne(key: string) {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  function toggleSelectAll() {
    const allKeys = items.map((item) => `${item.resource}:${item.id}`);
    const isAllSelected =
      items.length > 0 && allKeys.every((key) => selectedKeys.has(key));

    if (isAllSelected) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(allKeys));
    }
  }

  async function handleAction(item: TrashItem, action: "restore" | "purge") {
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

  async function handleBulkAction(action: "restore" | "purge") {
    if (selectedKeys.size === 0) return;
    const count = selectedKeys.size;
    const message =
      action === "restore"
        ? `Restore ${count} selected ${count === 1 ? "item" : "items"}?`
        : `Permanently delete ${count} selected ${count === 1 ? "item" : "items"}? This cannot be undone.`;

    if (!confirm(message)) return;

    const selectedItems = items
      .filter((item) => selectedKeys.has(`${item.resource}:${item.id}`))
      .map((item) => ({ resource: item.resource, id: item.id }));

    setBulkBusy(true);
    try {
      const response = await fetch("/api/admin/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, items: selectedItems }),
      });

      if (response.ok) {
        setSelectedKeys(new Set());
        await fetchItems();
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Failed to process bulk trash action");
      }
    } catch (err) {
      console.error("[bulk trash action]", err);
      alert("An error occurred during bulk trash action");
    } finally {
      setBulkBusy(false);
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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-3">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={
                  items.length > 0 &&
                  items.every((item) =>
                    selectedKeys.has(`${item.resource}:${item.id}`)
                  )
                }
                ref={(el) => {
                  if (el) {
                    const allSelected =
                      items.length > 0 &&
                      items.every((item) =>
                        selectedKeys.has(`${item.resource}:${item.id}`)
                      );
                    const someSelected = items.some((item) =>
                      selectedKeys.has(`${item.resource}:${item.id}`)
                    );
                    el.indeterminate = !allSelected && someSelected;
                  }
                }}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-700">
                {selectedKeys.size > 0
                  ? `${selectedKeys.size} of ${items.length} selected`
                  : `Select all (${items.length})`}
              </span>
            </label>

            {selectedKeys.size > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={bulkBusy}
                  onClick={() => void handleBulkAction("restore")}
                  className="h-8 text-xs font-semibold"
                >
                  <ArchiveRestore className="mr-1.5 h-3.5 w-3.5" />
                  {bulkBusy ? "Processing..." : `Restore (${selectedKeys.size})`}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={bulkBusy}
                  onClick={() => void handleBulkAction("purge")}
                  className="h-8 border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  {bulkBusy
                    ? "Processing..."
                    : `Delete forever (${selectedKeys.size})`}
                </Button>
                <button
                  type="button"
                  onClick={() => setSelectedKeys(new Set())}
                  className="text-xs text-slate-400 hover:text-slate-600 ml-1 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <ul className="divide-y divide-slate-100">
            {items.map((item) => {
              const itemKey = `${item.resource}:${item.id}`;
              const isChecked = selectedKeys.has(itemKey);
              const busy = actionId?.endsWith(item.id) || bulkBusy;

              return (
                <li
                  key={itemKey}
                  className={cn(
                    "flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between transition-colors",
                    isChecked && "bg-slate-50/80"
                  )}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelectOne(itemKey)}
                      aria-label={`Select ${item.title}`}
                      className="mt-1 sm:mt-0 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer shrink-0"
                    />
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
                        <p className="mt-0.5 truncate text-sm text-slate-500">
                          {item.subtitle}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2 sm:ml-4">
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
