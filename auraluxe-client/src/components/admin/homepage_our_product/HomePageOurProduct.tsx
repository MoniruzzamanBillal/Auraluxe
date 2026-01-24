"use client";

import { format } from "date-fns";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

// temp image (same approach as banner page)
import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import CreateUpdateHomeOurProduct from "./form/CreateUpdateHomeOurProduct";
import { THomeOurProduct } from "./schema/HomeOurProduct";

/* -------------------- Component -------------------- */
export default function HomePageOurProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string | null>();
  const [selectedProduct, setSelectedProduct] =
    useState<THomeOurProduct | null>(null);

  // ! FETCH
  const { data, isLoading } = useFetchData(
    ["home-our-product"],
    "/home-our-product",
  );

  console.log(data?.data);

  // ! DELETE
  const deleteMutation = useDeleteData([["home-our-product"]]);

  const handleEdit = (row: THomeOurProduct) => {
    setSelectedProduct(row);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!deletedId) return;

      const result = await deleteMutation.mutateAsync({
        url: `/home-our-product/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete our product");
    }
  };

  /* -------------------- Columns -------------------- */
  const columns: ColumnDef<THomeOurProduct>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative size-24 overflow-hidden rounded-lg border">
          <Image
            src={row.original.imageUrl as string}
            alt={row.original.title}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <span className="font-medium text-gray-900">
            {row.original.title}
          </span>
          {row.original.isDeleted && (
            <div className="mt-1">
              <span className="inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                Deleted
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <p className="max-w-[300px] text-sm text-gray-600 line-clamp-3">
          {row.original.description}
        </p>
      ),
    },

    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {format(new Date(row?.original.createdAt), "dd MMM yyyy")}
          <br />
          <span className="text-xs">
            {format(new Date(row.original.createdAt), "hh:mm a")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {format(new Date(row.original.updatedAt), "dd MMM yyyy")}
          <br />
          <span className="text-xs">
            {format(new Date(row.original.updatedAt), "hh:mm a")}
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
            disabled={row.original.isDeleted}
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
            disabled={row.original.isDeleted}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      ),
    },
  ];

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Home Page Our Product</h2>
          <Button
            className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
          >
            Add New Product
          </Button>
        </div>

        {/* table  */}
        <GenericTable
          data={data?.data}
          columns={columns}
          filterKey="title"
          isLoading={isLoading}
        />

        {/* Modal */}
        <CreateUpdateHomeOurProduct
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          initialValues={selectedProduct}
        />

        {/* delete modal  */}

        <DeleteDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
