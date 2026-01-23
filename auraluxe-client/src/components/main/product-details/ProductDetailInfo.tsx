"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import heartIcon from "../../../../public/icons/whiteHeart.png";
import { TProductDetail } from "./ProductDetails";
import ShareDialog from "./ShareDialog";

interface IPageProps {
  productData: TProductDetail;
}

export default function ProductDetailInfo({ productData }: IPageProps) {
  return (
    <div className="flex flex-col">
      {/* band logo */}
      <div className="relative mb-5 h-5 w-28 sm:mb-5">
        <Image
          src={productData?.brand?.logo}
          width={110}
          height={20}
          alt="brand_logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* product name  */}
      <h1 className="text-charcoolGray sc-500:text-3xl sc-laptop:text-5xl text-xl font-bold lg:text-4xl">
        {productData?.name}
      </h1>

      {/* featues  */}
      <div className="features sc-500:text-base mt-5 text-sm sm:mt-8">
        <p className="text-darkGray mb-4 font-bold">Key Features:</p>

        <p className="mt-3">
          <span className="text-charcoolGray font-medium">
            {productData?.keyFeatures}
          </span>
        </p>
      </div>

      {/* featues  */}
      <div className="features sc-500:text-base mt-5 text-sm sm:mt-8">
        <p className="text-darkGray mb-4 font-bold">Specifications:</p>

        <p className="mt-3">
          <span className="text-charcoolGray font-medium">
            {productData?.specifications}
          </span>
        </p>
      </div>

      {/* shiiping delivery  */}
      <div className="features sc-500:text-base mt-5 text-sm sm:mt-8">
        <p className="text-darkGray mb-4 font-bold">Shiping & Delivery :</p>

        <p className="mt-3">
          <span className="text-charcoolGray font-medium">
            {productData?.shippingDelivery}
          </span>
        </p>
      </div>

      {/* button section  */}
      <div className="btnSection sc-500:flex-row mt-8 flex flex-col gap-6 sm:mt-12">
        <Button
          className={`group flex h-12 w-56 cursor-pointer justify-center gap-x-3 rounded-lg border bg-textBlack hover:bg-textBlack border-textBlack text-white `}
        >
          <span className="h-6 w-[26px]">
            <Image
              alt="wishlist icon"
              src={heartIcon}
              height={21}
              width={20}
              className="h-full w-full shrink-0"
            />
          </span>

          <span className="">Add to cart</span>
        </Button>

        {/* ======== share modal ======= */}
        <ShareDialog />
      </div>
    </div>
  );
}
