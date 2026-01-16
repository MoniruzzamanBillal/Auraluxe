"use client";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import CreateUpdateMaterial from "./form/CreateUpdateMaterial";
import { TMaterial } from "./schema/material.schema";

/* ---------------- Dummy Data ---------------- */
const materialDummyData: TMaterial[] = [
  {
    id: "1",
    name: "Wood",
    description: "High quality wooden material",
    status: true,
  },
  {
    id: "2",
    name: "Steel",
    description: "Durable steel material",
    status: false,
  },
];

export default function MaterialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<TMaterial | null>(
    null
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const handleDelete = () => {
    console.log("Deleted ID:", deletedId);
    setIsDeleteOpen(false);
    setDeletedId(null);
  };

  const columns: ColumnDef<TMaterial>[] = [
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
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedMaterial(row.original);
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
            className="text-red-600 flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Material</h2>
        <Button
          onClick={() => {
            setSelectedMaterial(null);
            setIsModalOpen(true);
          }}
        >
          Add Material
        </Button>
      </div>

      <GenericTable
        data={materialDummyData}
        columns={columns}
        filterKey="name"
      />

      <CreateUpdateMaterial
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedMaterial}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
