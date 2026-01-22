"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import GenericTable from "@/components/common/GenericTable";

import DeleteDialog from "@/components/share/DeleteDialog";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import CreateUpdateProject from "./form/CreateUpdateProject";
import { TProject } from "./schema/project.schema";

export default function ProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["project"], "/project");

  // ✅ Delete mutation
  const deleteMutation = useDeleteData([["project"]]);

  const handleDelete = async () => {
    try {
      const result = await deleteMutation.mutateAsync({
        url: `/project/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result?.message);
        setDeletedId(null);
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete project");
    }
  };

  const columns: ColumnDef<TProject>[] = [
    {
      accessorKey: "projectImg",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row?.original?.projectImg as string}
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

    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${row.original.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {row.original.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
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
        data={data?.data}
        columns={columns}
        filterKey="projectName"
        isLoading={isLoading}
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
