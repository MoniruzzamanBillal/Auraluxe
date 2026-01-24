"use client";

import GenericTable from "@/components/common/GenericTable";

import DeleteDialog from "@/components/share/DeleteDialog";
import { Button } from "@/components/ui/button";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateUpdateProduct from "./form/CreateUpdateProduct";
import { TProduct } from "./schema/product.schema";

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const { data, isLoading } = useFetchData(["product"], "/product");
  const deleteMutation = useDeleteData([["product"]]);

  const handleDelete = async () => {
    try {
      const result = await deleteMutation.mutateAsync({
        url: `/product/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteOpen(false);
      }
    } catch (error: any) {
      setDeletedId(null);
      setIsDeleteOpen(false);
      toast.error(error?.message || "Failed to delete product");
    }
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "productImages",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row.original.productImage as string}
            alt="brand logo"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "productCode", header: "Code" },
    { accessorKey: "brandName", header: "Brand" },
    { accessorKey: "categoryName", header: "Category" },
    { accessorKey: "price", header: "Price" },
    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       className="px-0"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Status <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => (
    //     <span
    //       className={`rounded-full px-2 py-1 text-xs font-medium ${row.original.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
    //     >
    //       {row.original.status ? "Active" : "Inactive"}
    //     </span>
    //   ),
    // },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedProduct(row.original);
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

  // console.log("selected product = ", selectedProduct);

  return (
    <div className="space-y-6  ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <GenericTable
        data={data?.data}
        columns={columns}
        filterKey="name"
        isLoading={isLoading}
      />

      <CreateUpdateProduct
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        initialValues={selectedProduct}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
