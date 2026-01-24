"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function KeyBrandSkeleton() {
  return (
    <div className="border-lightGray h-[75px] w-[120px] rounded-xl border p-5 sm:h-[91px] sm:w-[159px]">
      <Skeleton className="h-full w-full rounded-md" />
    </div>
  );
}
