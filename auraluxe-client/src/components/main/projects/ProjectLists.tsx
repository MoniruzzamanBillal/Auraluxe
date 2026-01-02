/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { dummyProjectListData } from "./DummyprojectData";
import ProjectCard from "./ProjectCard";

export default function ProjectLists({
  initialProjectType,
}: {
  initialProjectType: string;
}) {
  const apiEndpoint = `/project?limit=500`;

  // const { isLoading, data: allProjectList } = useGetAll<[]>(apiEndpoint, [
  //   "getAllProjectList",
  // ]);

  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  // useEffect(() => {
  //   if (allProjectList?.data) {
  //     let initialFiltered = [...allProjectList.data];

  //     if (initialProjectType) {
  //       initialFiltered = initialFiltered.filter(
  //         (item: any) =>
  //           item.projectType?.name.toLowerCase() ===
  //           initialProjectType.toLowerCase(),
  //       );
  //     }

  //     setFilteredProjects(initialFiltered);
  //   }
  // }, [allProjectList, initialProjectType]);

  // const uniqueProjectTypes = Array.from(
  //   new Set(allProjectList?.data.map((p: any) => p.projectType?.name)),
  // ).map((name, index) => ({
  //   id: index + 5000,
  //   name,
  //   value: name.toLowerCase(),
  // }));

  // const uniqueLocations = Array.from(
  //   new Set(
  //     allProjectList?.data.map((p: any) =>
  //       p.location?.split(",")[0].trim().toLowerCase(),
  //     ),
  //   ),
  // ).map((loc, index) => ({
  //   id: index + 1,
  //   name: loc.charAt(0).toUpperCase() + loc.slice(1),
  //   value: loc,
  // }));

  // ====== FILTER FUNCTION ======
  // const handleFilter = (filters: { location: string; project: string }) => {
  //   if (!allProjectList?.data) return;

  //   let updated = [...allProjectList.data];

  //   if (filters.project) {
  //     updated = updated.filter(
  //       (item: any) => item.projectType.name.toLowerCase() === filters.project,
  //     );
  //   }

  //   if (filters.location) {
  //     updated = updated.filter((item: any) =>
  //       item.location.toLowerCase().includes(filters.location),
  //     );
  //   }

  //   setFilteredProjects(updated);
  // };

  return (
    <div className="flex flex-col gap-20">
      {/* ======= filter ========= */}
      <div className="w-full">
        {/* <ProjectsFilter
          projectsList={allProjectList?.data}
          locations={uniqueLocations}
          projectType={uniqueProjectTypes}
          onFilterChange={handleFilter}
          initialProjectType={initialProjectType}
        /> */}
      </div>

      {/*======= cards ======= */}
      {/* {isLoading ? (
        <>
          <AdminLoader />
        </>
      ) : (
        <div className="grid w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center border border-gray-300 border-dashed">
              <p className="text-center text-lg font-medium text-gray-500">
                No projects found. Please adjust your filters.
              </p>
            </div>
          ) : (
            filteredProjects.map((project: any, index: number) => (
              <ProjectCard
                key={index + 1}
                name={project.projectName}
                location={project.location}
                image={project.projectImg}
                slug={project.slug}
              />
            ))
          )}
        </div>
      )} */}

      <div className="grid w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {dummyProjectListData.map((project, index: number) => (
          <ProjectCard
            key={index + 1}
            name={project.projectName}
            location={project.location}
            image={project.projectImg?.src}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  );
}
