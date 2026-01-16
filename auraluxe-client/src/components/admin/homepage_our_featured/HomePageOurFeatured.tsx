"use client";

import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
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
  })
);

export default function HomePageOurFeatured() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatured, setSelectedFeatured] =
    useState<THomeOurFeatured | null>(null);

  const handleEdit = (featured: THomeOurFeatured) => {
    setSelectedFeatured(featured);
    setIsModalOpen(true);
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
        >
          Add New Featured
        </Button>
      </div>

      {/* search section  */}
      <div>
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
                <TableCell colSpan={columns.length} className="text-center">
                  No featured items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <CreateUpdateHomeOurFeatured
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedFeatured}
      />
    </div>
  );
}
