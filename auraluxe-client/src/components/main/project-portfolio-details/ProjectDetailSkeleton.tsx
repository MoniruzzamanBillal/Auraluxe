"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailSkeleton() {
  return (
    <div className="container flex flex-col gap-10 mt-10 ">
      <Skeleton className="h-10 w-1/4 bg-slate-50 " /> {/* Page header */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
        <Skeleton className="h-[30vh] w-full lg:h-[70vh] bg-slate-50" />{" "}
        {/* Image */}
        <div className="flex flex-col gap-4 px-5 lg:px-3 bg-slate-50">
          <Skeleton className="h-8 w-3/4 bg-slate-50" /> {/* Project Name */}
          <Skeleton className="h-6 w-1/2 bg-slate-50" /> {/* Location */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full bg-slate-200" />
            <Skeleton className="h-5 w-full bg-slate-200" />
            <Skeleton className="h-5 w-full bg-slate-200" />
          </div>
          <div className="flex space-x-3 mt-4">
            <Skeleton className="h-7 w-7 rounded-full bg-slate-200" />
            <Skeleton className="h-7 w-7 rounded-full bg-slate-200" />
            <Skeleton className="h-7 w-7 rounded-full bg-slate-200" />
            <Skeleton className="h-7 w-7 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
      <Skeleton className="h-48 w-full bg-slate-50 mb-14 " />{" "}
      {/* Description */}
    </div>
  );
}
