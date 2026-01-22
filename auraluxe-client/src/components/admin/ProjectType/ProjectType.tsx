"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
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
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="">{row.original.name}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <p className="max-w-[200px] truncate  ">{row.original.description}</p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            row.original.status
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedProjectType(row.original);
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
            className="text-darkLiver hover:underline text-sm flex items-center gap-1"
          >
            <Trash2 size={16} />
            Delete
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
