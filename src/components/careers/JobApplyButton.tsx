"use client";

import { useState } from "react";
import CareerApplyModal from "@/components/careers/CareerApplyModal";
import { cn } from "@/lib/utils";

type JobApplyButtonProps = {
  jobSlug: string;
  jobTitle: string;
  className?: string;
};

export default function JobApplyButton({ jobSlug, jobTitle, className }: JobApplyButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700",
          className
        )}
      >
        Apply online
      </button>

      <CareerApplyModal
        open={open}
        onOpenChange={setOpen}
        jobSlug={jobSlug}
        jobTitle={jobTitle}
      />
    </>
  );
}
