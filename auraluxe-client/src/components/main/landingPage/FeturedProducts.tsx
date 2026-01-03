"use client";
import Heading from "@/components/share/common/Heading";
// import FeaturedProductSlider from "@/components/share/slider/FeaturedProductsSlider";
// import { useGet } from "@/hooks/useGet";
import React from "react";
import FeaturedProductSlider from "./FeaturedProductsSlider";

const images = [
  "/landingPage/our_featured_products/image1.jpg",
  "/landingPage/our_featured_products/image2.jpg",
  "/landingPage/our_featured_products/image3.jpg",
];

// type ApiRes = {
//   id: string;
//   image: string;
//   order: number;
//   status: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

const FeturedProducts: React.FC = () => {
  // const { data: homePageOurFeaturedProduct, isLoading } = useGet<ApiRes[]>(
  //   "/home_page_our_featured_products?status=active&limit=100",
  //   ["getAllhomePageOurFeaturedProduct"],
  // );

  // const images =
  //   homePageOurFeaturedProduct && homePageOurFeaturedProduct.length > 0
  //     ? getImageUrlsByOrder(homePageOurFeaturedProduct)
  //     : [];

  return (
    <div className="relative z-100 flex flex-col gap-5 overflow-hidden py-5 md:gap-8 md:py-8 lg:gap-12 lg:py-16 xl:gap-16">
      <div className="absolute inset-0 -z-10 grid h-full w-full grid-cols-2 bg-red-500">
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
      <>
        {/* {isLoading ? (
          <div className="sc-500:h-[40vh] flex max-h-[694px] min-h-[134px] w-full items-center justify-center overflow-hidden md:h-[45vh] lg:h-[60vh] 2xl:h-screen">
            <Skeleton className="h-full w-full bg-gray-400/50" />
          </div>
        ) : (
          <FeaturedProductSlider images={images} />
        )} */}

        <FeaturedProductSlider images={images} />
      </>
    </div>
  );
};

export default FeturedProducts;
