"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import GenericTable from "@/components/common/GenericTable";

import { Button } from "@/components/ui/button";

import DeleteDialog from "@/components/share/DeleteDialog";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import CreateUpdateBrandType from "./form/CreateUpdateBrandType";
import { TBrandType } from "./schema/brandType.schema";

export default function BrandType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrandType, setSelectedBrandType] = useState<TBrandType | null>(
    null,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["brand-type"], "/brand-type");

  const deleteMutation = useDeleteData([["brand-type"]]);

  const handleDelete = async () => {
    try {
      const res = await deleteMutation.mutateAsync({
        url: `/brand-type/delete/${deletedId}`,
      });

      if (res?.success) {
        toast.success(res.message);
        setDeletedId(null);
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete");
    }
  };

  const columns: ColumnDef<TBrandType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <p className="max-w-[300px] truncate text-sm text-muted-foreground">
          {row.original.description}
        </p>
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
              setSelectedBrandType(row.original);
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
        <h2 className="text-2xl font-bold">Brand Types</h2>
        <Button
          onClick={() => {
            setSelectedBrandType(null);
            setIsModalOpen(true);
          }}
        >
          Add Brand Type
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
      <CreateUpdateBrandType
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedBrandType}
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
