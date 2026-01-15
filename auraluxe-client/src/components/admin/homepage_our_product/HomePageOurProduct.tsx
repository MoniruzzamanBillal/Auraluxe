"use client";

import { ArrowUpDown, SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// temp image (same approach as banner page)
import testImage from "@/../public/landingPage/slider/sliderThree.png";
import CreateUpdateHomeOurProduct from "./form/CreateUpdateHomeOurProduct";
import { THomeOurProduct } from "./schema/HomeOurProduct";

/* -------------------- Dummy Data -------------------- */
export const homeOurProductDummyData: THomeOurProduct[] = [
  {
    id: "product_01",
    title: "Luxury Interior Materials",
    description: "Premium materials crafted for elegant living spaces.",
    imageUrl: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",

    status: true,
    order: 1,
  },
  {
    id: "product_02",
    title: "Imported Tiles Collection",
    description: "High quality tiles sourced from global brands.",
    imageUrl: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",

    status: true,
    order: 2,
  },
];

/* -------------------- Component -------------------- */
export default function HomePageOurProduct() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<THomeOurProduct | null>(null);

  const handleEdit = (row: THomeOurProduct) => {
    setSelectedProduct(row);
    setIsModalOpen(true);
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
      cell: () => (
        <div className="size-32 overflow-hidden rounded-md">
          <Image
            src={testImage}
            alt="product"
            width={300}
            height={300}
            className="h-full w-full "
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
        <button
          onClick={() => handleEdit(row.original)}
          className="text-muted-foreground hover:text-primary"
        >
          <SquarePen size={16} />
        </button>
      ),
    },
  ];

  /* -------------------- Table -------------------- */
  const table = useReactTable({
    data: homeOurProductDummyData,
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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-white py-10">
        <h2 className="text-3xl font-bold text-black">Home Page Our Product</h2>

        {/* Search */}
        <div className="mt-4">
          <Input
            placeholder="Search by title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        </div>

        {/* Add Button */}
        <div className="mt-4">
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
          >
            Add New Product
          </Button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        {/* Modal */}
        <CreateUpdateHomeOurProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialValues={selectedProduct}
        />
      </div>
    </div>
  );
}
