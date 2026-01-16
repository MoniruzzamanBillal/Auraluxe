"use client";

import { SquarePen } from "lucide-react";
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
import CreateUpdateOurFeaturedProduct from "./form/CreateUpdateOurFeaturedProduct";
import { TOurFeaturedProduct } from "./schema/OurFeaturedProduct";

/* -------------------- Dummy Data -------------------- */
export const ourFeaturedProductDummyData: TOurFeaturedProduct[] = Array.from(
  { length: 8 },
  (_, i) => ({
    id: `featured_${i + 1}`,
    imageUrl: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: i % 2 === 0,
    order: i + 1,
  })
);

export default function HomePageOurFeaturedProduct() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<TOurFeaturedProduct | null>(null);

  const handleEdit = (product: TOurFeaturedProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
      accessorKey: "status",
      header: "Status",
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
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-muted-foreground hover:text-primary"
          >
            <SquarePen size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: ourFeaturedProductDummyData,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Our Featured Products</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
      </div>

      {/* table  */}
      <GenericTable data={ourFeaturedProductDummyData} columns={columns} />

      <CreateUpdateOurFeaturedProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedProduct}
      />
    </div>
  );
}
