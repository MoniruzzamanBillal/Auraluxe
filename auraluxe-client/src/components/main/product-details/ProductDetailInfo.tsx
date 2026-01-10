import Image from "next/image";

import { Button } from "@/components/ui/button";

import ProjectDetailAccordian from "./ProjectDetailAccordian";

// import heartIcon from "/images/icons/whiteHeart.png";

import { useWishlist } from "@/hooks/useWishlist";
import { useState } from "react";
import whiteBgHeartIcon from "../../../../public/icons/bgWhiteHeart.png";
import redHeartIcon from "../../../../public/icons/redHeart.png";
import heartIcon from "../../../../public/icons/whiteHeart.png";
import ShareDialog from "./ShareDialog";

interface KeyFeature {
  id: number;
  key: string;
  value: string;
}

interface ColorData {
  id: number;
  label: string;
  bg: string;
}

interface IPageProps {
  brandLogo: string;
  productName: string;
  selectedColor: string;
  ColorsData: ColorData[];
  setSelectedColor: (color: string) => void;
  keyFeatures: KeyFeature[];
  productData: any;
}

export default function ProductDetailInfo({
  brandLogo,
  productName,
  selectedColor,
  ColorsData,
  setSelectedColor,
  keyFeatures,
  productData,
}: IPageProps) {
  const [showIcon, setShowIcon] = useState<boolean>(false);

  const { toggleWishlist, isInWishlist, isInitialized } = useWishlist();

  const isProductInWishlist = isInWishlist(productData?._id);

  // * for adding product in wishlist
  const handleAddToWishlist = () => {
    if (!productData) return;

    const wishlistItem = {
      id: productData._id,
      name: productData.name,
      image: productData.images?.[0] || "",
      code: productData.code || "",
      brandName: productData.brand?.name || "",
      price: productData.price || 0,
    };

    toggleWishlist(wishlistItem);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* band logo */}
      <div className="relative mb-5 h-5 w-28 sm:mb-5">
        <Image
          src={brandLogo}
          width={110}
          height={20}
          alt="brand_logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* product name  */}
      <h1 className="text-charcoolGray sc-500:text-3xl sc-laptop:text-5xl text-xl font-bold lg:text-4xl">
        {productName}
      </h1>

      {/* color section  */}
      <div className="color mt-2 sm:mt-4">
        <p className="sc-500:text-lg mb-1.5 text-base sm:mb-3">
          <span className="text-charcoolGray font-medium"> Color : </span>
          <span className="text-darkGray"> {selectedColor} </span>
        </p>

        <div className="flex items-center gap-4">
          {ColorsData?.map((color) => (
            <div
              key={color?.id}
              onClick={() => setSelectedColor(color?.label)}
              className={`mt-2 flex size-6 items-center justify-center rounded-full sm:size-8 ${color?.label === selectedColor ? "border-brandMain border" : "border border-transparent"} `}
            >
              <p
                className={`size-5 cursor-pointer rounded-full ${color?.label === "Silver" ? "bg-[#F5F5F5]" : color?.label === "Black" ? "bg-[#000000]" : "bg-[#C28558]"} `}
              ></p>
            </div>
          ))}
        </div>
      </div>

      {/* featues  */}
      <div className="features sc-500:text-base mt-5 text-sm sm:mt-8">
        <p className="text-darkGray mb-4 font-bold">Key Features:</p>

        {keyFeatures?.map((feature) => (
          <p key={feature?.id} className="mt-3">
            <span className="text-charcoolGray font-medium">
              {" "}
              {feature?.key} :{" "}
            </span>
            <span className="text-darkGray"> {feature?.value} </span>
          </p>
        ))}
      </div>

      {/* button section  */}
      <div className="btnSection sc-500:flex-row mt-8 flex flex-col gap-6 sm:mt-12">
        <Button
          className={`group flex h-12 w-56 cursor-pointer justify-center gap-x-3 rounded-lg border ${isProductInWishlist ? "bg-lightRed border-brandMain text-brandMain" : "bg-textBlack hover:bg-textBlack border-textBlack text-white"} `}
          onClick={() => handleAddToWishlist()}
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
        >
          <span className="h-6 w-[26px]">
            <Image
              alt="wishlist icon"
              // src={showIcon ? redHeartIcon : heartIcon }
              src={
                isProductInWishlist
                  ? redHeartIcon
                  : showIcon
                    ? whiteBgHeartIcon
                    : heartIcon
              }
              height={21}
              width={20}
              className="h-full w-full shrink-0"
            />
          </span>

          <span className="">
            {isProductInWishlist ? "Added to Wishlist" : "Add to Wishlist"}{" "}
          </span>
        </Button>

        {/* ======== share modal ======= */}
        <ShareDialog />
      </div>

      {/* accordian section  */}
      <div className="accordianSection sc-500:mt-12 mt-8">
        <hr />
        <ProjectDetailAccordian />
        <hr />
      </div>
    </div>
  );
}
