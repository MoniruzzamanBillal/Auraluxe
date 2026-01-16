"use client";

import { ArrowUpDown, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import CreateUpdateHomeBanner from "./CreateUpdateHomeBanner";
import { THomePageBanner } from "./schema/HomeBanner";

export const homePageBannerDummyData: THomePageBanner[] = [
  {
    id: "banner_01",
    title: "Luxury Interior Finishes",
    description:
      "Premium interior finishes designed to elevate modern living with elegance, durability, and timeless aesthetics.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 1,
  },
  {
    id: "banner_02",
    title: "Imported Building Materials",
    description:
      "Sourced from globally trusted brands, our materials ensure superior quality and long-lasting performance.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 2,
  },
  {
    id: "banner_03",
    title: "Modern Architectural Design",
    description:
      "Innovative architectural concepts blending functionality, sustainability, and premium craftsmanship.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 3,
  },
  {
    id: "banner_04",
    title: "Timeless Living Spaces",
    description:
      "Design solutions that create harmonious living spaces reflecting comfort, elegance, and refined taste.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 4,
  },
  {
    id: "banner_05",
    title: "Elegant Kitchen Solutions",
    description:
      "High-end kitchen designs combining modern technology with sophisticated European craftsmanship.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 5,
  },
  {
    id: "banner_06",
    title: "Premium Bathroom Concepts",
    description:
      "Luxury bathroom solutions featuring imported fittings, modern layouts, and minimalist aesthetics.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 6,
  },
  {
    id: "banner_07",
    title: "Smart Home Integration",
    description:
      "Advanced smart home solutions that seamlessly integrate technology with elegant interior design.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: false,
    order: 7,
  },
  {
    id: "banner_08",
    title: "Commercial Interior Excellence",
    description:
      "Premium commercial interior solutions crafted to enhance brand presence and workspace efficiency.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 8,
  },
  {
    id: "banner_09",
    title: "Sustainable Design Solutions",
    description:
      "Eco-conscious design approaches that combine sustainability with modern luxury standards.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 9,
  },
  {
    id: "banner_10",
    title: "Signature Auraluxe Projects",
    description:
      "Explore our signature projects showcasing refined craftsmanship, innovation, and premium materials.",
    bannerImage: "https://i.postimg.cc/fbZkT6j4/slider-Three.png",
    status: true,
    order: 10,
  },
];

import testImage from "@/../public/landingPage/slider/sliderThree.png";
import GenericTable from "@/components/common/GenericTable";

export default function HomePageBanner() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedBanner, setSelectedBanner] =
    useState<THomePageBanner | null>();

  const handleEdit = (row: any) => {
    setSelectedBanner(row);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<THomePageBanner>[] = [
    {
      header: "Title",
      accessorKey: "title",
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
      accessorKey: "image",
      cell: ({ row }) => {
        // console.log(row?.original?.bannerImage);

        return (
          <div className=" size-32 rounded-md overflow-hidden ">
            <Image
              // src={row?.original?.bannerImage as string}
              src={testImage}
              alt="bannerImage"
              width={1200}
              height={1200}
              className=" w-full h-full "
            />
          </div>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
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
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
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
    data: homePageBannerDummyData,
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

        <div>
          <Button onClick={() => setIsModalOpen(true)}> Add New Banner </Button>
        </div>

        {/* table  */}
        <GenericTable
          data={homePageBannerDummyData}
          columns={columns}
          filterKey="title"
        />

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
