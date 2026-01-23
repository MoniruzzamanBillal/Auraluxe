"use client";

import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";

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
        <p className="max-w-[300px] truncate text-sm text-muted-foreground">
          {row.original.description}
        </p>
      ),
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="size-32 rounded-md overflow-hidden">
          <Image
            src={row.original.imageUrl as string}
            alt="banner"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {status ? "Active" : "Inactive"}
          </span>
        );
      },
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
              setDeletedId(row.original.id);
              setIsDeleteModalOpen(true);
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
      <div className="bg-whitePrimary rounded-2xl py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Home Page Banner</h2>
          <Button
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
