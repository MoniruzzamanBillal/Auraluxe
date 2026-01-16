"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { Button } from "@/components/ui/button";

import CreateUpdateBrandType from "./form/CreateUpdateBrandType";
import { TBrandType } from "./schema/brandType.schema";

const brandTypeDummyData: TBrandType[] = [
  {
    id: "brand_1",
    name: "Luxury",
    description: "Premium and luxury brand products",
    status: true,
  },
  {
    id: "brand_2",
    name: "Economy",
    description: "Affordable and budget-friendly brands",
    status: true,
  },
  {
    id: "brand_3",
    name: "Exclusive",
    description: "Limited edition and exclusive brands",
    status: false,
  },
];

export default function BrandType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrandType, setSelectedBrandType] = useState<TBrandType | null>(
    null
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const columns: ColumnDef<TBrandType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            row.original.status
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedBrandType(row.original);
              setIsModalOpen(true);
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <SquarePen size={16} />
          </button>

          <button
            onClick={() => {
              setDeletedId(row.original.id);
              setIsDeleteOpen(true);
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Brand Types</h2>
        <Button
          onClick={() => {
            setSelectedBrandType(null);
            setIsModalOpen(true);
          }}
        >
          Add Brand Type
        </Button>
      </div>

      {/* Table */}
      <GenericTable
        data={brandTypeDummyData}
        columns={columns}
        filterKey="name"
      />

      {/* Modal */}
      <CreateUpdateBrandType
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedBrandType}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => {
          console.log("Delete brand type:", deletedId);
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
}
