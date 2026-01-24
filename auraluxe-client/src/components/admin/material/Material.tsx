"use client";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import CreateUpdateMaterial from "./form/CreateUpdateMaterial";
import { TMaterial } from "./schema/material.schema";

import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";

export default function MaterialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<TMaterial | null>(
    null,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["material"], "/material");

  console.log(data?.data);

  const deleteMutation = useDeleteData([["material"]]);

  const handleDelete = async () => {
    try {
      if (!deletedId) return;

      const result = await deleteMutation.mutateAsync({
        url: `/material/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setIsDeleteOpen(false);
        setDeletedId(null);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete product");
    }
  };

  const columns: ColumnDef<TMaterial>[] = [
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
        <p className="max-w-[350px] line-clamp-3 text-sm text-muted-foreground">
          {row.original.description}
        </p>
      ),
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
        <div className="flex items-center gap-x-3">
          <button
            onClick={() => {
              setSelectedMaterial(row.original);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <SquarePen size={16} />
            Edit
          </button>

          <button
            onClick={() => {
              setDeletedId(row.original.id);
              setIsDeleteOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Material</h2>
        <Button
          className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
          onClick={() => {
            setSelectedMaterial(null);
            setIsModalOpen(true);
          }}
        >
          Add Material
        </Button>
      </div>

      <GenericTable
        data={data?.data}
        columns={columns}
        filterKey="name"
        isLoading={isLoading}
      />

      <CreateUpdateMaterial
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedMaterial}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
