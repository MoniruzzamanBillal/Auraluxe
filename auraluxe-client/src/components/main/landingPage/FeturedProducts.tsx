"use client";
import Heading from "@/components/share/common/Heading";
import { useFetchData } from "@/hooks/useApi";
import React from "react";
import FeaturedProductSlider from "./FeaturedProductsSlider";

const FeturedProducts: React.FC = () => {
  const { data, isLoading } = useFetchData(
    ["our-featured-product"],
    "/our-featured-product",
  );

  // Format API data into image URLs array
  const images = React.useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    // Filter out deleted items and map to image URLs
    return data.data
      .filter((item: any) => !item.isDeleted)
      .map((item: any) => item.imageUrl)
      .filter((url: string) => url && url.trim() !== ""); // Remove empty/null URLs
  }, [data]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="relative z-100 flex flex-col gap-5 overflow-hidden py-5 md:gap-8 md:py-8 lg:gap-12 lg:py-16 xl:gap-16">
        <div className="absolute inset-0 -z-10 grid h-full w-full grid-cols-2">
          <div className="h-full w-full bg-[#FFFFFF]"></div>
          <div className="h-full w-full bg-[#F8F8F5]"></div>
        </div>

        <Heading
          firstText="Our"
          secondText="Featured Products"
          backText="Featured"
          descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
        />

        <div className="sc-500:h-[40vh] flex max-h-[694px] min-h-[134px] w-full items-center justify-center overflow-hidden md:h-[45vh] lg:h-[60vh] 2xl:h-screen">
          <div className="h-full w-full animate-pulse bg-gray-200/50" />
        </div>
      </div>
    );
  }

  // Handle empty/no data state
  if (images.length === 0) {
    return (
      <div className="relative z-100 flex flex-col gap-5 overflow-hidden py-5 md:gap-8 md:py-8 lg:gap-12 lg:py-16 xl:gap-16">
        <div className="absolute inset-0 -z-10 grid h-full w-full grid-cols-2">
          <div className="h-full w-full bg-[#FFFFFF]"></div>
          <div className="h-full w-full bg-[#F8F8F5]"></div>
        </div>

        <Heading
          firstText="Our"
          secondText="Featured Products"
          backText="Featured"
          descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
        />

        <div className="sc-500:h-[40vh] flex max-h-[694px] min-h-[134px] w-full items-center justify-center overflow-hidden md:h-[45vh] lg:h-[60vh] 2xl:h-screen">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-600">
              No featured products available
            </p>
            <p className="text-sm text-gray-500 max-w-md">
              Add featured product images from the admin panel to display them
              here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-100 flex flex-col gap-5 overflow-hidden py-5 md:gap-8 md:py-8 lg:gap-12 lg:py-16 xl:gap-16">
      <div className="absolute inset-0 -z-10 grid h-full w-full grid-cols-2">
        <div className="h-full w-full bg-[#FFFFFF]"></div>
        <div className="h-full w-full bg-[#F8F8F5]"></div>
      </div>

      {/* ======= heading ======== */}
      <Heading
        firstText="Our"
        secondText="Featured Products"
        backText="Featured"
        descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
      />

      {/* ======= slider ======== */}
      <FeaturedProductSlider images={images} />
    </div>
  );
};

export default FeturedProducts;
