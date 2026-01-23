import { Card as UICard } from "@/components/ui/card";

import { TProduct } from "@/components/admin/product/schema/product.schema";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  name,
  productImage,
  brandName,
  price,
  id,

  categoryName,
  keyFeatures,
  specifications,
  productDes,
  shippingDelivery,
}: TProduct) {
  return (
    <UICard className="group relative  p-0 border-0 ">
      <Link href={`/product/${id}`}>
        <div className="bg-softGray relative flex  w-full items-center justify-center overflow-hidden rounded-lg border shadow h-[270px] sm:h-[290px] md:h-[250px]">
          <Image
            src={productImage as string}
            alt="image"
            width={1200}
            height={1200}
            className="h-full w-full  "
          />

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
