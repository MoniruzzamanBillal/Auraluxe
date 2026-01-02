"use client";
import ProjectCard from "@/components/main/projects/ProjectCard";
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

const CustomProjectCarousel = ({ data, title }: Props) => {
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
    <div className={`bg-transparent py-8 md:py-20`}>
      <div
        className={`container mx-auto flex flex-col gap-4 pb-2 md:mt-10 md:gap-6 md:pb-8`}
      >
        <div className="flex min-h-12 items-center justify-between">
          <h1 className="text-xl leading-8 font-medium text-charcoolGray lg:text-[24px]">
            {title}
          </h1>

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
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div key={index + 1} className="mb-5 overflow-hidden shadow-md">
                  <ProjectCard
                    className="h-[395px] md:max-w-[320px]"
                    imageDivClass="max-h-[322px]"
                    name={d?.name}
                    location={d?.location}
                    image={d?.projectImg}
                    slug={d?.slug}
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

export default CustomProjectCarousel;
