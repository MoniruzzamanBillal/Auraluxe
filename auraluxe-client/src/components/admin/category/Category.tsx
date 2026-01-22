"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { Button } from "@/components/ui/button";

import CreateUpdateCategory from "./form/CreateUpdateCategory";
import { TCategory } from "./schema/category.schema";

import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";

export default function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["category"], "/category");

  const deleteMutation = useDeleteData([["category"]]);

  // ! for handling delete
  const handleDelete = async () => {
    try {
      const result = await deleteMutation.mutateAsync({
        url: `/category/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result?.message);

        setDeletedId(null);
      }
    } catch (error: any) {
      console.log("error response from delete category = ", error);
      toast.error(error?.message || error?.errorMessages || "Failed to delete");
    }
  };

  const columns: ColumnDef<TCategory>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {status ? "Active" : "Inactive"}
          </span>
        );
      },
    },

    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedCategory(row.original);
              setIsModalOpen(true);
            }}
            className="text-muted-foreground hover:underline hover:text-primary text-sm flex items-center gap-1"
          >
            <SquarePen size={16} />
            Update
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
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setIsModalOpen(true);
          }}
        >
          Add Category
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
      <CreateUpdateCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedCategory}
      />

      {/* Delete */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
}
