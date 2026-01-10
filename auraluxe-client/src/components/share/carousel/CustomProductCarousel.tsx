"use client";
import ProductCard from "@/components/main/product/ProductCard";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  data: any;
  title?: string;
}

const CustomProductCarousel = ({ data, title }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className={`bg-transparent py-8 md:py-10`}>
      <div
        className={`container mx-auto flex flex-col gap-4 pb-2 md:mt-10 md:gap-6 md:pb-8`}
      >
        <div className="flex min-h-[48px] items-center justify-between">
          <h1 className="text-xl leading-8 font-medium text-[#363739] lg:text-[24px]">
            {title}
          </h1>

          {/* top right --> navigate btn (left , right navigation ) */}
          {data?.length > 5 && (
            <div className="flex gap-3 text-white">
              <button
                className="border-lightGray flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-transparent text-black transition-all duration-500 ease-in-out hover:bg-black hover:text-white md:h-10 md:w-10 lg:h-12 lg:w-12"
                onClick={() => api?.scrollTo(current - 1)}
              >
                <FaChevronLeft className="h-3 w-3 md:h-4 md:w-5" />
              </button>
              <button
                className="border-lightGray flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-transparent text-black transition-all duration-500 ease-in-out hover:bg-black hover:text-white md:h-10 md:w-10 lg:h-12 lg:w-12"
                onClick={() => api?.scrollTo(current + 1)}
              >
                <FaChevronRight className="h-3 w-3 md:h-4 md:w-5" />
              </button>
            </div>
          )}
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {data?.map((d: any, index: number) => (
              <CarouselItem
                key={index + 1}
                className="sc-500:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/5"
              >
                <div key={index + 1} className="mb-5 overflow-hidden">
                  <ProductCard
                    slug={d.slug}
                    name={d.name}
                    images={d.images}
                    _id={d._id}
                    code={d.code}
                    brand={d.brand}
                    price={d.price}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomProductCarousel;
