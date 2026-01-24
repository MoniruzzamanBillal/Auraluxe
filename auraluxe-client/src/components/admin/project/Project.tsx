"use client";

import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
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

  console.log(data?.data);

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
    /* ---------------- Project Image ---------------- */
    {
      accessorKey: "projectImg",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row.original.projectImg as string}
            alt={row.original.projectName}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },

    /* ---------------- Project Name ---------------- */
    { accessorKey: "projectName", header: "Project Name" },

    /* ---------------- Location ---------------- */
    { accessorKey: "location", header: "Location" },

    /* ---------------- Client ---------------- */
    { accessorKey: "client", header: "Client" },

    /* ---------------- Architects ---------------- */
    { accessorKey: "architects", header: "Architects" },

    /* ---------------- Material ---------------- */
    {
      header: "Material",
      cell: ({ row }) => row.original.material?.name || "—",
    },

    /* ---------------- Project Type ---------------- */
    {
      header: "Project Type",
      cell: ({ row }) => row.original.projectType?.name || "—",
    },

    /* ---------------- Created Date ---------------- */
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          <br />
          <span className="text-xs">
            {new Date(row.original.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ),
    },

    /* ---------------- Last Updated ---------------- */
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          <br />
          <span className="text-xs">
            {new Date(row.original.updatedAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ),
    },

    /* ---------------- Actions ---------------- */
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedProject(row.original);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <SquarePen size={16} /> Update
          </button>
          <button
            onClick={() => {
              setDeletedId(row.original.id);
              setIsDeleteOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
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
          className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
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
