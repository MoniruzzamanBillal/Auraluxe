"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import GenericTable from "@/components/common/GenericTable";

import { Button } from "@/components/ui/button";

import DeleteDialog from "@/components/share/DeleteDialog";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import CreateUpdateProjectType from "./form/CreateUpdateProjectType";
import { TProjectType } from "./schema/projectType.schema";

export default function ProjectType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] =
    useState<TProjectType | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["project-type"], "/project-type");

  console.log(data?.data);

  // ✅ Delete mutation
  const deleteMutation = useDeleteData([["project-type"]]);

  // ! handle delete
  const handleDelete = async () => {
    try {
      const result = await deleteMutation.mutateAsync({
        url: `/project-type/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result?.message);
        setDeletedId(null);
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete");
    }
  };

  const columns: ColumnDef<TProjectType>[] = [
    /* ---------------- Name ---------------- */
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-gray-900">{row.original.name}</span>
      ),
    },

    /* ---------------- Description ---------------- */
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <p className="max-w-[300px] line-clamp-3 text-sm text-muted-foreground">
          {row.original.description}
        </p>
      ),
    },

    /* ---------------- Created Date ---------------- */
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
              setSelectedProjectType(row.original);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <SquarePen size={16} /> Edit
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Types</h2>
        <Button
          className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
          onClick={() => {
            setSelectedProjectType(null);
            setIsModalOpen(true);
          }}
        >
          Add Project Type
        </Button>
      </div>

      {/* Table */}
      <GenericTable
        data={data?.data}
        columns={columns}
        filterKey="name"
        isLoading={isLoading}
      />

      {/* Modal */}
      <CreateUpdateProjectType
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedProjectType}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
