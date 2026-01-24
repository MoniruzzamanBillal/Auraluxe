"use client";
import { TProject } from "@/components/admin/project/schema/project.schema";
import ProjectCard from "./ProjectCard";

export default function ProjectLists({
  projectData,
}: {
  projectData: TProject[];
}) {
  return (
    <div className="flex flex-col gap-20">
      <div className="grid w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {projectData?.map((project: TProject, index: number) => (
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
