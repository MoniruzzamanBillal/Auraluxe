"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";

import CreateUpdateProject from "./form/CreateUpdateProject";
import { TProject } from "./schema/project.schema";

/* ---------------- Dummy Data ---------------- */
const projectDummyData: TProject[] = [
  {
    id: "1",
    projectName: "Luxury Villa",
    projectImg: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    location: "Dhaka",
    client: "John Doe",
    architects: "XYZ Architects",
    website: "https://luxuryvilla.com",
    facebookLink: "https://facebook.com/luxuryvilla",
    instagramLink: "https://instagram.com/luxuryvilla",
    linkedinLink: "https://linkedin.com/luxuryvilla",
    xLink: "https://x.com/luxuryvilla",
    description: "Beautiful luxury villa project",
    status: true,
    projectTypeId: "1",

    materialId: "1",
  },
];

export default function ProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const handleDelete = () => {
    console.log("Deleted ID:", deletedId);
    setIsDeleteOpen(false);
    setDeletedId(null);
  };

  const columns = [
    {
      accessorKey: "projectImg",
      header: "Image",
      cell: ({ row }: any) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row.original.projectImg}
            alt="project"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },
    { accessorKey: "projectName", header: "Project Name" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "client", header: "Client" },
    { accessorKey: "projectTypeName", header: "Project Type" },
    { accessorKey: "materialName", header: "Material" },
    {
      accessorKey: "status",
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${row.original.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {row.original.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedProject(row.original);
              setIsModalOpen(true);
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <SquarePen size={16} />
          </button>
          <button
            onClick={() => {
              setDeletedId(row.original.id);
              setIsDeleteOpen(true);
            }}
            className="text-red-600 flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6  ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
        >
          Add Project
        </Button>
      </div>

      <GenericTable
        data={projectDummyData}
        columns={columns}
        filterKey="projectName"
      />

      <CreateUpdateProject
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedProject}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
