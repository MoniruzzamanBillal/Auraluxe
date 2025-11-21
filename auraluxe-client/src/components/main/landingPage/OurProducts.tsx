import Heading from "@/components/share/common/Heading";
import TextHoverEffect from "@/components/share/hoverEffects/TextHoverEffect";
import Image from "next/image";
import { ourProducts } from "./LandingTempData";

export default function OurProducts() {
  return (
    <div className="relative z-100 flex min-h-100 flex-col gap-5 overflow-hidden lg:gap-16">
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
        {ourProducts?.map((product, index) => {
          const group = Math.floor(index / 2);
          const isReverse = group % 2 === 1;
          return (
            <div key={index + 1} className={`grid grid-cols-2`}>
              {/* ====== image ====== */}
              <div
                className={`relative overflow-hidden ${
                  isReverse ? "lg:order-2" : "lg:order-1"
                } ${index % 2 === 0 && "order-1"}`}
              >
                <div className="absolute h-full w-full md:hover:bg-black/20" />
                <Image
                  alt="product 1"
                  src={product?.image}
                  height={150}
                  width={150}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              {/* ====== texts ====== */}
              <div
                className={`felx group flex h-full flex-col justify-center gap-5 bg-white p-5 lg:p-10 ${
                  isReverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <TextHoverEffect text={product?.name} />
                <p className="text-mediumGray max-w-[348px] text-[0.625rem] leading-4 md:text-sm md:leading-5.5">
                  {product?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
