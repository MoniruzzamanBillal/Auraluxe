"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  projectsList: any[] | undefined;
  locations: { id: number | string; name: string; value: string }[];
  projectType: { id: number | string; name: string; value: string }[];
  onFilterChange: (filters: { location: string; project: string }) => void;
  initialProjectType: string;
};

export default function ProjectsFilter({
  projectsList,
  locations,
  projectType,
  onFilterChange,
  initialProjectType,
}: Props) {
  const [projectOpen, setProjectOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    project: initialProjectType || "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex min-h-[45px] w-full flex-col gap-10 sm:items-center lg:flex-row lg:justify-between">
      <div className="flex items-center gap-6">
        {/* ===== Project Type ===== */}
        <Select
          onValueChange={(value) => handleFilterChange("project", value)}
          onOpenChange={(open) => setProjectOpen(open)}
        >
          <SelectTrigger className="border-lightGray text-darkGray focus-within:ring-lightGray h-12 w-full cursor-pointer border sm:w-[220px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <SelectValue
                  className="text-textOptional text-base font-normal"
                  placeholder="All Category"
                />
              </div>

              <p
                className={`${
                  projectOpen ? "rotate-180" : "rotate-0"
                } text-[#939393] transition-transform duration-300 ease-in-out`}
              >
                <IoIosArrowDown size={20} />
              </p>
            </div>
          </SelectTrigger>

          <SelectContent className="text-darkGray bg-white text-sm">
            {projectType?.map((project, index) => (
              <SelectItem
                className="cursor-pointer py-3 text-black hover:bg-gray-100"
                key={index + 1}
                value={project?.value}
              >
                {project?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ===== Location ===== */}
        <Select
          onValueChange={(value) => handleFilterChange("location", value)}
          onOpenChange={(open) => setLocationOpen(open)}
        >
          <SelectTrigger className="border-lightGray text-darkGray focus-within:ring-lightGray h-12 w-full cursor-pointer border sm:w-[220px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <SelectValue
                  className="text-textOptional text-base font-normal"
                  placeholder="Select Location"
                />
              </div>

              <p
                className={`${
                  locationOpen ? "rotate-180" : "rotate-0"
                } text-[#939393] transition-transform duration-300 ease-in-out`}
              >
                <IoIosArrowDown size={20} />
              </p>
            </div>
          </SelectTrigger>

          <SelectContent className="text-darkGray bg-white text-sm">
            {locations?.map((location, index) => (
              <SelectItem
                className="cursor-pointer py-3 text-black hover:bg-gray-100"
                key={index + 1}
                value={location?.value}
              >
                {location?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
