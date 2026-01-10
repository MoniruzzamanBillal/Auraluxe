"use client";

import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../product/ProductCard";

interface IProduct {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
}

interface IProductCarouselSectionProps {
  title: string;
  products: IProduct[];
  isLoading: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
}

export default function ProductCarouselSection({
  title,
  products,
  isLoading = false,
  emptyMessage = "No products found",
  loadingMessage = "Loading...",
}: IProductCarouselSectionProps) {
  const swiperRef = useRef<any>(null);

  return (
    <section className=" ">
      {/* heading section  */}
      <div className="mb-7 flex items-center justify-between">
        <h1 className="text-charcoolGray sc-500:text-xl text-lg font-medium sm:text-2xl">
          {title}
        </h1>

        <div className="btnSection flex items-center gap-x-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="border-lightGray hover:bg-textBlack group sc-500:size-9 flex size-7 items-center justify-center rounded-full border bg-white transition-all duration-300 disabled:opacity-50 sm:size-12"
            aria-label="Previous slide"
            disabled={isLoading || products.length === 0}
          >
            <IoIosArrowBack className="text-textBlack sc-500:text-lg text-base transition-all duration-300 group-hover:text-white sm:text-xl" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="border-lightGray hover:bg-textBlack group sc-500:size-9 flex size-7 items-center justify-center rounded-full border bg-white transition-all duration-300 disabled:opacity-50 sm:size-12"
            aria-label="Next slide"
            disabled={isLoading || products.length === 0}
          >
            <IoIosArrowForward className="text-textBlack sc-500:text-lg text-base transition-all duration-300 group-hover:text-white sm:text-xl" />
          </button>
        </div>
      </div>

      {/* product lists  */}
      <div className="productLists">
        {isLoading && <p>{loadingMessage}</p>}

        {products?.length === 0 && !isLoading && <p>{emptyMessage}</p>}

        {products?.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            navigation={false}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              770: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1025: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {products.map((product: any, index: number) => (
              <SwiperSlide
                key={product.id || index}
                className="group relative h-auto cursor-pointer overflow-hidden"
              >
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
