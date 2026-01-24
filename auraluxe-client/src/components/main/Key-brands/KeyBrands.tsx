"use client";

import { TKeyBrand } from "@/components/admin/Key_Brands/schema/keyBrand.schema";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Heading from "@/components/share/common/Heading";
import { useFetchData } from "@/hooks/useApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import KeyBrandSkeleton from "./KeyBrandSkeleton";

export default function KeyBrands() {
  const { data, isLoading } = useFetchData(["key-brand"], "/key-brand");

  const brands: TKeyBrand[] = data?.data || [];

  const [turnNormal, setTurnNormal] = useState(false);

  useEffect(() => {
    const timeInterval = setTimeout(() => {
      setTurnNormal(true);
    }, 2000);

    return () => clearTimeout(timeInterval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white pb-20 sm:gap-20 lg:pb-36">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle="Key Brands"
        description="Reach Out to Us for Any Assistance - Your Satisfaction is Our Priority."
        image="/key_brands/main_banner.jpg"
      />

      {/* ======= heading ======== */}
      <div className="relative z-100">
        <Heading
          firstText="Our"
          secondText="Key Brands"
          backText="Brands"
          title="TOP INTERNATIONAL BRANDS UNDER ONE ROOF"
          descripiton="Whether you're looking for premium home décor, high-end furniture, luxury fittings, or top-tier lifestyle products."
        />
      </div>

      {/* ======= brands images ======= */}
      <div className="container mt-5 flex  max-w-[1520px] flex-wrap justify-center gap-x-7 gap-y-10 md:mt-10 2xl:justify-start">
        {/* ===== Skeleton Loading ===== */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <KeyBrandSkeleton key={index} />
          ))}

        {/* ===== Actual Data ===== */}
        {!isLoading &&
          brands.map((brand, index) => {
            const isEven = (index + 1) % 2 === 0;

            return (
              <div
                key={brand.id}
                className={`border-lightGray h-[75px] w-[120px] overflow-hidden rounded-xl border  sm:h-[120px] sm:w-[180px]
                ${isEven ? "rotate-15" : "-rotate-15"}
                ${turnNormal && "!rotate-0"}
                transition-all duration-300 ease-in-out`}
              >
                <Image
                  alt={brand.name}
                  src={brand.logo as string}
                  height={40}
                  width={150}
                  className="h-full w-full "
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
