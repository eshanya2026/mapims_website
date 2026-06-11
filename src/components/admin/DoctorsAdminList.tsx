"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import { cn } from "@/lib/utils";

export type AdminDoctorRecord = {
  id: string;
  name: string;
  designation: string;
  departmentSlug: string;
  departmentName: string;
  image: string;
  showOnHome: boolean;
  showOnAbout: boolean;
  published: boolean;
  sortOrder: number;
  homeSortOrder: number;
  aboutSortOrder: number;
};

type OrderTab = "all" | "home" | "about";

type DoctorsAdminListProps = {
  doctors: AdminDoctorRecord[];
};

function DoctorTableCells({ doctor }: { doctor: AdminDoctorRecord }) {
  return (
    <>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt=""
              className="h-10 w-10 rounded-full object-cover object-top"
            />
          ) : null}
          <span className="font-medium text-slate-900">{doctor.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-slate-600">{doctor.designation}</td>
      <td className="px-4 py-3 text-slate-600">{doctor.departmentName}</td>
      <td className="px-4 py-3 text-slate-600">
        {[doctor.showOnHome && "Home", doctor.showOnAbout && "About"]
          .filter(Boolean)
          .join(", ") || "—"}
      </td>
      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
            doctor.published
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          )}
        >
          {doctor.published ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/doctors/${doctor.id}/edit`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Edit
          </Link>
          <DeleteButton endpoint={`/api/admin/doctors/${doctor.id}`} />
        </div>
      </td>
    </>
  );
}

function StaticDoctorRow({ doctor }: { doctor: AdminDoctorRecord }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 bg-white">
      <td className="w-10 px-2 py-3">
        <span className="inline-flex rounded p-1 text-slate-300" aria-hidden="true">
          <GripVertical className="h-4 w-4" />
        </span>
      </td>
      <DoctorTableCells doctor={doctor} />
    </tr>
  );
}

function SortableDoctorRow({
  doctor,
  isDragging,
}: {
  doctor: AdminDoctorRecord;
  isDragging?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: doctor.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isDragging ?? isSortableDragging;

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "border-b border-slate-100 last:border-0 bg-white",
        dragging && "opacity-40"
      )}
    >
      <td className="w-10 px-2 py-3">
        <button
          type="button"
          aria-label={`Drag to reorder ${doctor.name}`}
          className="cursor-grab rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
      <DoctorTableCells doctor={doctor} />
    </tr>
  );
}

function DoctorRowOverlay({ doctor }: { doctor: AdminDoctorRecord }) {
  return (
    <table className="w-full text-left text-sm">
      <tbody>
        <tr className="border border-red-200 bg-white shadow-lg ring-2 ring-red-100">
          <td className="w-10 px-2 py-3">
            <span className="inline-flex rounded p-1 text-slate-500">
              <GripVertical className="h-4 w-4" />
            </span>
          </td>
          <DoctorTableCells doctor={doctor} />
        </tr>
      </tbody>
    </table>
  );
}

function DoctorsTableHeader({ showDragHandle = true }: { showDragHandle?: boolean }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
      <tr>
        {showDragHandle ? <th className="w-10 px-2 py-3" aria-label="Reorder" /> : null}
        <th className="px-4 py-3 font-medium">Name</th>
        <th className="px-4 py-3 font-medium">Designation</th>
        <th className="px-4 py-3 font-medium">Department</th>
        <th className="px-4 py-3 font-medium">Placement</th>
        <th className="px-4 py-3 font-medium">Status</th>
        <th className="px-4 py-3 font-medium">Actions</th>
      </tr>
    </thead>
  );
}

function sortForTab(doctors: AdminDoctorRecord[], tab: OrderTab) {
  if (tab === "home") {
    return [...doctors]
      .filter((doctor) => doctor.showOnHome)
      .sort((a, b) => a.homeSortOrder - b.homeSortOrder || a.name.localeCompare(b.name));
  }

  if (tab === "about") {
    return [...doctors]
      .filter((doctor) => doctor.showOnAbout)
      .sort((a, b) => a.aboutSortOrder - b.aboutSortOrder || a.name.localeCompare(b.name));
  }

  return [...doctors].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
  );
}

export default function DoctorsAdminList({ doctors }: DoctorsAdminListProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderTab>("home");
  const [items, setItems] = useState(doctors);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [reorderError, setReorderError] = useState("");
  const [mounted, setMounted] = useState(false);
  const reorderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipSyncRef = useRef(false);

  const visibleItems = useMemo(() => sortForTab(items, activeTab), [activeTab, items]);

  useEffect(() => {
    if (skipSyncRef.current) return;
    setItems(doctors);
  }, [doctors]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current);
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const persistOrder = useCallback(
    (placement: OrderTab, orderedIds: string[]) => {
      if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current);

      reorderTimeoutRef.current = setTimeout(async () => {
        setReordering(true);
        setReorderError("");

        const response = await fetch("/api/admin/doctors/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placement, orderedIds }),
        });
        setReordering(false);

        if (response.ok) {
          skipSyncRef.current = true;
          router.refresh();
          window.setTimeout(() => {
            skipSyncRef.current = false;
          }, 500);
          return;
        }

        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setReorderError(payload?.error ?? "Failed to save order. Please try again.");
        setItems(doctors);
      }, 450);
    },
    [router, doctors]
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const sortField =
      activeTab === "home"
        ? "homeSortOrder"
        : activeTab === "about"
          ? "aboutSortOrder"
          : "sortOrder";

    setItems((prev) => {
      const tabItems = sortForTab(prev, activeTab);
      const oldIndex = tabItems.findIndex((item) => item.id === active.id);
      const newIndex = tabItems.findIndex((item) => item.id === over.id);
      const nextTabItems = arrayMove(tabItems, oldIndex, newIndex);

      persistOrder(
        activeTab,
        nextTabItems.map((item) => item.id)
      );

      const orderById = new Map(nextTabItems.map((item, index) => [item.id, index]));

      return prev.map((item) =>
        orderById.has(item.id)
          ? { ...item, [sortField]: orderById.get(item.id)! }
          : item
      );
    });
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const activeDoctor = visibleItems.find((item) => item.id === activeId) ?? null;

  const tabDescription =
    activeTab === "home"
      ? "Drag to set the order on the home page carousel. Only doctors with “Show on home page” appear here."
      : activeTab === "about"
        ? "Drag to set the order on the about page. Only doctors with “Show on about page” appear here."
        : "Manage all doctors. Use the Home or About tabs to control page-specific order.";

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctors</h1>
          <p className="mt-1 text-sm text-slate-500">
            {tabDescription}
            {reordering ? " Saving order..." : ""}
          </p>
          {reorderError ? (
            <p className="mt-2 text-sm text-red-600">{reorderError}</p>
          ) : null}
        </div>
        <Link
          href="/admin/doctors/new"
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          New doctor
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["home", "Home page order"],
            ["about", "About page order"],
            ["all", "All doctors"],
          ] as const
        ).map(([tab, label]) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              activeTab === tab
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-red-600"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {visibleItems.length === 0 ? (
          <p className="px-4 py-12 text-center text-slate-500">
            {activeTab === "home"
              ? "No doctors are marked for the home page yet."
              : activeTab === "about"
                ? "No doctors are marked for the about page yet."
                : "No doctors yet."}
          </p>
        ) : activeTab === "all" ? (
          <table className="w-full text-left text-sm">
            <DoctorsTableHeader showDragHandle={false} />
            <tbody>
              {visibleItems.map((doctor) => (
                <tr key={doctor.id} className="border-b border-slate-100 last:border-0 bg-white">
                  <DoctorTableCells doctor={doctor} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : !mounted ? (
          <table className="w-full text-left text-sm">
            <DoctorsTableHeader />
            <tbody>
              {visibleItems.map((doctor) => (
                <StaticDoctorRow key={doctor.id} doctor={doctor} />
              ))}
            </tbody>
          </table>
        ) : (
          <DndContext
            id={`doctors-admin-${activeTab}`}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <table className="w-full text-left text-sm">
              <DoctorsTableHeader />
              <SortableContext
                items={visibleItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {visibleItems.map((doctor) => (
                    <SortableDoctorRow key={doctor.id} doctor={doctor} />
                  ))}
                </tbody>
              </SortableContext>
            </table>

            <DragOverlay dropAnimation={null}>
              {activeDoctor ? <DoctorRowOverlay doctor={activeDoctor} /> : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
}
