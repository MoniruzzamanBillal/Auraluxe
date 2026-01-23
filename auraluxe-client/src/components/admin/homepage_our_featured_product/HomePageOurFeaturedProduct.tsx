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

  /* -------------------- Table -------------------- */
  const columns: ColumnDef<TOurFeaturedProduct>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row.original.imageUrl as string}
            alt="featured product"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },

    {
      header: "Action",
      id: "action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-muted-foreground hover:text-primary"
          >
            <SquarePen size={16} />
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setDeletedId(row?.original?.id);
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Our Featured Products</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
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
