"use client";

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
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="max-w-[300px] truncate text-sm text-muted-foreground">
          {row.original.description}
        </p>
      ),
    },
    {
      header: "Image",
      accessorKey: "imageUrl",
      cell: ({ row }) => (
        <div className="size-32 overflow-hidden rounded-md">
          <Image
            src={row.original.imageUrl as string}
            alt={row.original.title}
            width={300}
            height={300}
            className="h-full w-full "
          />
        </div>
      ),
    },

    {
      header: "Action",
      id: "action",
      cell: ({ row }) => {
        // console.log("row =  ", row?.original);

        return (
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
        );
      },
    },
  ];

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Home Page Our Product</h2>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
          >
            Add New Banner
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
