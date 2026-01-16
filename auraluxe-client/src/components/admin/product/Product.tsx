"use client";

import GenericTable from "@/components/common/GenericTable";
import DeleteDialog from "@/components/share/DeleteDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreateUpdateProduct from "./form/CreateUpdateProduct";
import { TProduct } from "./schema/product.schema";

/* ---------------- Dummy Data ---------------- */
const productDummyData: TProduct[] = [
  {
    id: "1",
    name: "Premium Chair",
    productCode: "PC-001",
    brandId: "1",
    brandName: "Brand A",
    categoryId: "1",
    categoryName: "Furniture",
    price: 199.99,
    keyFeatures: "Ergonomic, Stylish",
    specifications: "Wood, Metal",
    productDes: "Comfortable premium chair",
    shippingDelivery: "Within 7 days",
    productImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
  },
];

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const handleDelete = () => {
    console.log("Deleted ID:", deletedId);
    setIsDeleteOpen(false);
    setDeletedId(null);
  };

  const columns = [
    {
      accessorKey: "productImages",
      header: "Image",
      cell: ({ row }: any) => (
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <Image
            src={row.original.productImage}
            alt="brand logo"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "productCode", header: "Code" },
    { accessorKey: "brandName", header: "Brand" },
    { accessorKey: "categoryName", header: "Category" },
    { accessorKey: "price", header: "Price" },
    {
      accessorKey: "status",
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${row.original.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {row.original.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setSelectedProduct(row.original);
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
        <h2 className="text-2xl font-bold">Products</h2>
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <GenericTable
        data={productDummyData}
        columns={columns}
        filterKey="name"
      />

      <CreateUpdateProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={selectedProduct}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
