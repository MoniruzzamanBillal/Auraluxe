"use client";

import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
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

  console.log(data?.data);

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
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Home Our Featured</h2>
        <Button
          className="bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer"
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
