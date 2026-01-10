import { Card as UICard } from "@/components/ui/card";

import { useWishlist } from "@/hooks/useWishlist";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import heartIcon from "../../../../public/icons/wishlist_icon.png";

interface IPageProps {
  _id: string;
  slug: string;
  name: string;
  code: string;
  brand: any;
  images: string[];
  price: number;
}

export default function ProductCard({
  slug,
  name,
  images,
  _id,
  code,
  brand,
  price,
}: IPageProps) {
  const { toggleWishlist, isInWishlist, isInitialized } = useWishlist();

  // console.log(images);

  const [showIcon, setShowIcon] = useState<boolean>(false);

  const isProductInWishlist = isInWishlist(_id);

  // * for adding product in wishlist
  const handleAddToWishlist = () => {
    const wishlistPayload = {
      id: _id,
      name: name,
      image: images[0] || "",
      code: code || "",
      brandName: brand?.name || "",
      price: price || 0,
    };

    toggleWishlist(wishlistPayload);
  };

  // console.log(isProductInWishlist);

  return (
    <UICard className="group relative  p-0 border-0 ">
      {/* heart icon  */}
      <div
        className="bg-graySecondary/80 lg:hover:bg-backgroundColor absolute top-3 right-3 z-30 flex size-5 items-center justify-center text-[24px] text-gray-400"
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        onClick={() => handleAddToWishlist()}
      >
        {isProductInWishlist ? (
          <FaHeart className="text-brandColor" />
        ) : showIcon ? (
          <FaHeart className="text-brandColor" />
        ) : (
          <Image src={heartIcon} className="h-full w-full" alt="wishlistIcon" />
        )}
      </div>

      <Link href={`/product/${slug}`}>
        <div className="bg-softGray relative flex  w-full items-center justify-center overflow-hidden rounded-lg border shadow h-[270px] sm:h-[290px] md:h-[316px]">
          <div className="flex w-[calc(100%-85px)] items-center justify-center md:w-[calc(100%-55px)]">
            {/* ======= brand logo ====== */}
            {/* <div className="absolute right-2 bottom-2 z-10 h-[30px] w-[50px]">
                <Image
                  src={brand?.logo}
                  alt={`${brand?.name} logo`}
                  width={400}
                  height={400}
                  className="h-full w-full object-contain"
                />
              </div> */}

            <Image
              src={images ? images[0] : ""}
              alt="image"
              width={400}
              height={400}
              className="h-full w-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-125"
            />
          </div>
          <div className="bg-textOptional bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 z-10 h-auto w-full transition-opacity duration-500" />
        </div>

        <div className="flex items-center justify-start">
          <p className="text-darkGray mt-4 line-clamp-1 text-sm font-medium sm:text-base">
            {name}
          </p>
        </div>
      </Link>
    </UICard>
  );
}
