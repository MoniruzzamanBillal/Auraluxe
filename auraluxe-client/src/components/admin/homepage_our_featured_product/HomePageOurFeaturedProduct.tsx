"use client";

import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import CreateUpdateOurFeaturedProduct from "./form/CreateUpdateOurFeaturedProduct";
import { TOurFeaturedProduct } from "./schema/OurFeaturedProduct";

export default function HomePageOurFeaturedProduct() {
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<TOurFeaturedProduct | null>(null);

  /* -------------------- API -------------------- */
  const { data, isLoading } = useFetchData(
    ["our-featured-product"],
    "/our-featured-product",
  );

  console.log(data?.data);

  const deleteMutation = useDeleteData([["our-featured-product"]]);

  /* -------------------- Actions -------------------- */
  const handleEdit = (product: TOurFeaturedProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!deletedId) return;

      const result = await deleteMutation.mutateAsync({
        url: `/our-featured-product/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete product");
    }
  };

  /* -------------------- Columns -------------------- */
  const columns: ColumnDef<TOurFeaturedProduct>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative size-24 overflow-hidden rounded-lg border">
          <Image
            src={row.original.imageUrl as string}
            alt={"featured product"}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
      ),
    },

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
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-3">
          <button
            onClick={() => handleEdit(row.original)}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <SquarePen size={16} />
            Edit
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setDeletedId(row.original.id);
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
        <h2 className="text-2xl font-bold">Our Featured Products</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
        >
          Add Featured Product
        </Button>
      </div>

      {/* table */}
      <GenericTable data={data?.data} columns={columns} isLoading={isLoading} />

      {/* modal */}
      <CreateUpdateOurFeaturedProduct
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        initialValues={selectedProduct}
      />

      {/* delete modal */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        deleteMessage="This action cannot be undone. This will permanently delete this data."
      />
    </div>
  );
}
