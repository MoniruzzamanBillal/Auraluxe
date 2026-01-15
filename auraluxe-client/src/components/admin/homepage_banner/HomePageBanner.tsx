"use client";

import { ArrowUpDown, SquarePen } from "lucide-react";

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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import CreateUpdateHomeBanner from "./CreateUpdateHomeBanner";

type TData = {
  title: string;
  description: string;
  status: boolean;
};

const dummyData: TData[] = [
  {
    title: "User Management",
    description: "Manage application users and roles",
    status: true,
  },
  {
    title: "Product Listing",
    description: "Display and manage product inventory",
    status: false,
  },
  {
    title: "Order Tracking",
    description: "Track customer orders and delivery status",
    status: true,
  },
  {
    title: "Reports & Analytics",
    description: "View sales and performance reports",
    status: true,
  },
  {
    title: "System Settings",
    description: "Configure application preferences",
    status: false,
  },
  {
    title: "User Management",
    description: "Manage application users and roles",
    status: true,
  },
  {
    title: "Product Listing",
    description: "Display and manage product inventory",
    status: false,
  },
  {
    title: "Order Tracking",
    description: "Track customer orders and delivery status",
    status: true,
  },
  {
    title: "Reports & Analytics",
    description: "View sales and performance reports",
    status: true,
  },
  {
    title: "System Settings",
    description: "Configure application preferences",
    status: false,
  },
  {
    title: "Product Listing",
    description: "Display and manage product inventory",
    status: false,
  },
  {
    title: "Order Tracking",
    description: "Track customer orders and delivery status",
    status: true,
  },
  {
    title: "Reports & Analytics",
    description: "View sales and performance reports",
    status: true,
  },
];

export default function HomePageBanner() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedBanner, setSelectedBanner] = useState({});

  const handleEdit = (row: any) => {
    console.log("row =  ", row);
    setSelectedBanner(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<TData>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      // header: "Description",
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusStyle =
          status === true
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";

        return (
          <span
            className={`rounded-full px-2 py-1 text-sm capitalize ${statusStyle}`}
          >
            {status === true ? "active" : "inactive"}
          </span>
        );
      },
    },

    {
      header: "Action",
      accessorKey: "edit",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex w-full items-center justify-center gap-3">
          <button onClick={() => handleEdit(row.original)} className="flex">
            <SquarePen size={16} />
          </button>
          {/* <button
        //  onClick={() => handleView(row.original)} 
         className="flex">
          <TooltipDiv name="View" />
        </button> */}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: dummyData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-whitePrimary rounded-2xl py-10">
        <h2 className="text-blackPrimary text-3xl font-bold">
          Home Page Banner
        </h2>

        {/* search section  */}
        <div>
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>

        <div>
          <Button onClick={() => setIsModalOpen(true)}> Add New Banner </Button>
        </div>

        {/* table  */}
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* pagination  */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
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
        </div>
        {/*  */}

        <CreateUpdateHomeBanner
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          initialValues={selectedBanner}
        />

        {/*  */}
      </div>
    </div>
  );
}
