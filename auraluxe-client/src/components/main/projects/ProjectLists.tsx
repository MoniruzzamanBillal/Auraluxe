"use client";
import { TProject } from "@/components/admin/project/schema/project.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks/useApi";
import ProjectCard from "./ProjectCard";

export default function ProjectLists() {
  const { data: projectData, isLoading } = useFetchData(
    ["project"],
    "/project",
  );

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 })?.map((_, idx) => (
          <div
            key={idx}
            className="group overflow-hidden rounded-lg bg-gray-100 shadow-lg"
          >
            {/* Image skeleton */}
            <Skeleton className="h-[30vh] w-full md:h-[35vh] lg:h-[40vh]" />
            {/* Content skeleton */}
            <div className="px-5 py-5 space-y-2">
              <Skeleton className="h-5 w-3/4" /> {/* Project Name */}
              <Skeleton className="h-4 w-1/2" /> {/* Location */}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="grid w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {projectData?.data &&
          projectData?.data?.map((project: TProject, index: number) => (
            <ProjectCard
              key={index + 1}
              name={project.projectName}
              location={project.location}
              image={project?.projectImg as string}
              id={project?.id}
            />
          ))}
      </div>
    </div>
  );
}
