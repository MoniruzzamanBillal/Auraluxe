"use client";

import { THomeOurProduct } from "@/components/admin/homepage_our_product/schema/HomeOurProduct";
import Heading from "@/components/share/common/Heading";
import TextHoverEffect from "@/components/share/hoverEffects/TextHoverEffect";
import { useFetchData } from "@/hooks/useApi";
import Image from "next/image";

// <THomeOurProduct[]>

export default function OurProducts() {
  const { data, isLoading } = useFetchData(
    ["home-our-product"],
    "/home-our-product",
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-prime100">
        Loading products...
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
        {data?.data &&
          data?.data?.map((product: THomeOurProduct, index: number) => {
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
                    unoptimized
                    className="h-full w-full "
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

                  <p className="max-w-[348px] text-sm leading-5.5 text-mediumGray">
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
