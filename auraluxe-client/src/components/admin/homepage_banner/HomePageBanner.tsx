"use client";

import { format } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import CreateUpdateHomeBanner from "./CreateUpdateHomeBanner";
import { THomePageBanner } from "./schema/HomeBanner";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";

export default function HomePageBanner() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string | null>();

  const [selectedBanner, setSelectedBanner] =
    useState<THomePageBanner | null>();

  // ! FETCH
  const { data, isLoading } = useFetchData(["home-banner"], "/home-banner");

  console.log("data = ", data?.data);

  // ! DELETE
  const deleteMutation = useDeleteData([["home-banner"]]);

  const handleEdit = (row: any) => {
    setSelectedBanner(row);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!deletedId) return;

      const result = await deleteMutation.mutateAsync({
        url: `/home-banner/${deletedId}`,
      });

      if (result?.success) {
        toast.success(result.message);
        setDeletedId(null);
        setIsDeleteModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete banner");
    }
  };

  const columns: ColumnDef<THomePageBanner>[] = [
    {
      accessorKey: "imageUrl",
      header: "Banner Image",
      cell: ({ row }) => (
        <div className="size-32 rounded-md overflow-hidden border">
          <Image
            src={row.original.imageUrl as string}
            alt={row.original.title}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="space-y-1">
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
        <p className="max-w-[300px] text-sm text-gray-600 line-clamp-2">
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
              setDeletedId(row.original.id);
              setIsDeleteModalOpen(true);
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

  return (
    <div className="space-y-6">
      <div className="bg-whitePrimary rounded-2xl py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Home Page Banner</h2>
          <Button
            className=" bg-prime100 hover:bg-prime200 text-slate-100 font-semibold cursor-pointer "
            onClick={() => {
              setSelectedBanner(null);
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

        {/*  */}

        <CreateUpdateHomeBanner
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBanner(null);
          }}
          initialValues={selectedBanner}
        />

        {/* delete modal  */}
        <DeleteDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDelete}
        />

        {/*  */}
      </div>
    </div>
  );
}
