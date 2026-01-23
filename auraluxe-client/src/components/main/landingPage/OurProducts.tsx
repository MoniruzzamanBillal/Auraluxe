"use client";

import { THomeOurProduct } from "@/components/admin/homepage_our_product/schema/HomeOurProduct";
import Heading from "@/components/share/common/Heading";
import TextHoverEffect from "@/components/share/hoverEffects/TextHoverEffect";
import { useFetchData } from "@/hooks/useApi";
import Image from "next/image";
import { useMemo } from "react";

export default function OurProducts() {
  const { data, isLoading } = useFetchData(
    ["home-our-product"],
    "/home-our-product",
  );

  // Use useMemo to filter and memoize the products data
  const products = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    // Filter out deleted products
    return data.data.filter((product: THomeOurProduct) => !product.isDeleted);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-prime100">
        Loading products...
      </div>
    );
  }

  // Handle empty state
  if (products.length === 0) {
    return (
      <div className="relative z-10 flex min-h-[400px] flex-col gap-5 overflow-hidden lg:gap-16">
        <Heading
          firstText="Our"
          secondText="Products"
          backText="Products"
          descripiton="Our products are designed to deliver excellence, combining
            innovation, quality, and reliability to meet diverse needs across
            industries."
        />
        <div className="flex min-h-[300px] items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg">No products available</p>
            <p className="text-sm">Add products from the admin panel</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex min-h-[400px] flex-col gap-5 overflow-hidden lg:gap-16">
      {/* ======= heading ======== */}
      <Heading
        firstText="Our"
        secondText="Products"
        backText="Products"
        descripiton="Our products are designed to deliver excellence, combining
          innovation, quality, and reliability to meet diverse needs across
          industries."
      />

      {/*======== products with description ========== */}
      <div className="grid grid-cols-1 gap-8 sm:gap-0 lg:grid-cols-2">
        {products.map((product: THomeOurProduct, index: number) => {
          const group = Math.floor(index / 2);
          const isReverse = group % 2 === 1;

          return (
            <div key={product.id} className="grid grid-cols-2">
              {/* ====== image ====== */}
              <div
                className={`relative overflow-hidden ${
                  isReverse ? "lg:order-2" : "lg:order-1"
                } ${index % 2 === 0 && "order-1"}`}
              >
                {/* hover overlay */}
                <div className="absolute inset-0 transition-all duration-300 hover:bg-prime100/10" />

                <Image
                  alt={product?.title}
                  src={product?.imageUrl as string}
                  height={400}
                  width={400}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* ====== texts ====== */}
              <div
                className={`group flex h-full flex-col justify-center gap-5 bg-prime50/5 p-5 lg:p-10 ${
                  isReverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <TextHoverEffect
                  text={product?.title}
                  className="text-prime200"
                />

                <p className="max-w-[348px] text-sm leading-5.5 text-gray-700 ">
                  {product.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
