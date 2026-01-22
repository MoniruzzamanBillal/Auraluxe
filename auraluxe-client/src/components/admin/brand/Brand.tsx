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
import CreateUpdateBrand from "./form/CreateUpdateBrand";
import { TBrand } from "./schema/brand.schema";

export default function BrandPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<TBrand | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["brand"], "/brand");

  // ✅ Delete Brand
  const deleteMutation = useDeleteData([["brand"]]);
  const handleDelete = async () => {
    try {
      if (!deletedId) return;

      const result = await deleteMutation.mutateAsync({
        url: `/brand/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete brand");
    }
  };

  const columns: ColumnDef<TBrand>[] = [
    {
      accessorKey: "logo",
      header: "Logo",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row?.original?.logo as string}
            alt="brand logo"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },

    // {
    //   accessorKey: "brandTypeName",
    //   header: "Brand Type",
    //   cell: ({ row }) => <span>{row.original.brandTypeName}</span>,
    // },

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
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedBrand(row.original);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Brands</h2>
        <Button
          onClick={() => {
            setSelectedBrand(null);
            setIsModalOpen(true);
          }}
        >
          Add Brand
        </Button>
      </div>

      <GenericTable
        data={data?.data}
        columns={columns}
        filterKey="name"
        isLoading={isLoading}
      />

      <CreateUpdateBrand
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBrand(null);
        }}
        initialValues={selectedBrand}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
