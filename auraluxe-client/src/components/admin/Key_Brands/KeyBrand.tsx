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
import CreateUpdateKeyBrand from "./form/CreateUpdateKeyBrand";
import { TKeyBrand } from "./schema/keyBrand.schema";

export default function KeyBrandsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<TKeyBrand | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  // ! FETCH DATA
  const { data, isLoading } = useFetchData(["key-brand"], "/key-brand");

  console.log(data?.data);

  // ! DELETE
  const deleteMutation = useDeleteData([["key-brand"]]);

  const handleDelete = async () => {
    try {
      const result = await deleteMutation.mutateAsync({
        url: `/key-brand/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      setDeletedId(null);
      setIsDeleteOpen(false);
      toast.error(error?.message || "Failed to delete key brand");
    }
  };

  const columns: ColumnDef<TKeyBrand>[] = [
    /* ---------------- Logo ---------------- */
    {
      accessorKey: "logo",
      header: "Logo",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md border">
          <Image
            src={row.original.logo as string}
            alt={row.original.name}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },

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
              setSelectedBrand(row.original);
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
        <h2 className="text-2xl font-bold">Key Brands</h2>
        <Button
          className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
          onClick={() => {
            setSelectedBrand(null);
            setIsModalOpen(true);
          }}
        >
          Add Brand
        </Button>
      </div>

      <GenericTable
        data={data?.data ?? []}
        columns={columns}
        filterKey="name"
        isLoading={isLoading}
      />

      <CreateUpdateKeyBrand
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
