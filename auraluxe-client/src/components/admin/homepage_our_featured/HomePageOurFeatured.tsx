"use client";

import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import CreateUpdateHomeOurFeatured from "./form/CreateUpdateHomeOurFeatured";
import { THomeOurFeatured } from "./schema/homeOurFeatured.schema";

/* -------------------- Dummy Data -------------------- */
export const homeOurFeaturedDummyData: THomeOurFeatured[] = Array.from(
  { length: 6 },
  (_, i) => ({
    id: `featured_${i + 1}`,
    title: `Featured Title ${i + 1}`,
    description:
      "Premium materials crafted with elegance and durability in mind.",
    imageUrl: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: i % 2 === 0,
    order: i + 1,
  }),
);

export default function HomePageOurFeatured() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<string | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatured, setSelectedFeatured] =
    useState<THomeOurFeatured | null>(null);

  const handleEdit = (featured: THomeOurFeatured) => {
    setSelectedFeatured(featured);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    console.log("deleted id =  ", deletedId);
    setIsDeleteModalOpen(false);
    setDeletedId(null);
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

  const table = useReactTable({
    data: homeOurFeaturedDummyData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
          className=" bg-prime100 hover:bg-prime200 text-gray-50 cursor-pointer "
        >
          Add New Featured
        </Button>
      </div>

      {/* table  */}
      <GenericTable
        data={homeOurFeaturedDummyData}
        columns={columns}
        filterKey="title"
      />

      {/* Modal */}
      <CreateUpdateHomeOurFeatured
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
