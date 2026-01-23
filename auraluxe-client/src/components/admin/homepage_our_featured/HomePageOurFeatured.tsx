"use client";

import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";

import GenericTable from "@/components/common/GenericTable";

import DeleteDialog from "@/components/share/DeleteDialog";
import CreateUpdateHomeOurFeatured from "./form/CreateUpdateHomeOurFeatured";
import { THomeOurFeatured } from "./schema/homeOurFeatured.schema";

export default function HomePageOurFeatured() {
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatured, setSelectedFeatured] =
    useState<THomeOurFeatured | null>(null);

  const { data, isLoading } = useFetchData(
    ["home-our-featured"],
    "/home-our-featured",
  );

  const deleteMutation = useDeleteData([["home-our-featured"]]);

  const handleEdit = (featured: THomeOurFeatured) => {
    setSelectedFeatured(featured);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!deletedId) return;

      const result = await deleteMutation.mutateAsync({
        url: `/home-our-featured/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete featured item");
    }
  };

  /* -------------------- Columns -------------------- */
  const columns: ColumnDef<THomeOurFeatured>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row.original.imageUrl as string}
            alt="featured image"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <p className="max-w-[350px] truncate text-sm text-muted-foreground">
          {row.original.description}
        </p>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Home Our Featured</h2>
        <Button
          onClick={() => {
            setSelectedFeatured(null);
            setIsModalOpen(true);
          }}
        >
          Add New Featured
        </Button>
      </div>

      <GenericTable
        data={data?.data}
        columns={columns}
        filterKey="title"
        isLoading={isLoading}
      />

      {/* Modal */}
      <CreateUpdateHomeOurFeatured
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFeatured(null);
        }}
        initialValues={selectedFeatured}
      />

      {/* delete modal  */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        deleteMessage="This action cannot be undone. This will permanently delete the Data"
      />
    </div>
  );
}
