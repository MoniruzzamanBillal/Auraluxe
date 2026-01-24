"use client";

import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Heading from "@/components/share/common/Heading";
import Pagination from "@/components/share/pagination/Pagination";
import Image from "next/image";
import { useState } from "react";
import NewsUpdatesCards from "./NewsUpdatesCards";

import bannerImage from "../../../../public/news_updates/second_bg-banner.png";

export default function NewsUpdates() {
  const [page, setPage] = useState(1);

  const currentPage = 1;
  const totalPages = 8;
  const isProductLoading = false;

  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"News & Updates"}
        description={
          "Auraluxe reserves the right to update or modify these terms at any time"
        }
        image="/news_updates/main_header.jpg"
      />
      {/* ======= contents ======== */}

      {/* ======= heading ======== */}
      <div className="relative z-100">
        <Heading
          firstText=""
          secondText="Trend News"
          backText="Trend"
          descripiton="Tilottoma.com is a leading destination for premium interior solutions, offering a perfect blend of style, innovation, and functionality."
        />
      </div>

      {/* ========== */}
      <div className="relative h-[70vh] max-h-[1058px] w-full xl:mb-28 xl:h-screen">
        {/* ==== image ====== */}
        <div className="h-[50vh] max-h-[884px] overflow-hidden xl:h-screen">
          <Image
            alt="banner"
            src={bannerImage}
            height={884}
            width={1920}
            className="h-full w-full shrink-0 object-cover"
          />
        </div>
        <div className="bg-textBlack sc-500:py-10 absolute bottom-0 flex max-h-[535px] w-full max-w-[1211px] items-center justify-center px-5 py-8 sm:px-10 sm:py-16 md:h-[40vh] md:w-[80%] lg:py-0 xl:h-screen xl:w-full xl:px-36">
          <div className="space-y-5 text-white">
            <p className="text-2xl font-bold sm:text-3xl md:text-4xl xl:text-5xl xl:leading-14.5">
              Choosing the Perfect Bathroom Sink: A Comprehensive Guide
            </p>
            <p className="bg-brandMain h-[1px] w-[50px] md:h-[3px] md:w-[77px]" />
            <p className="mb-10 text-sm font-medium tracking-[1%] md:text-[1rem] lg:text-lg lg:leading-7.5">
              Ideal for smaller spaces like powder rooms and guest baths,
              pedestal sinks are visually appealing with sleek lines that can
              make a room appear larger. They come in various styles and shapes.
              Wall-mount sinks are.
            </p>
            <p className="text-sidebarText text-sm font-bold lg:text-[1rem] lg:leading-6">
              Continue Reading....
            </p>
          </div>
        </div>
      </div>

      <div className="lg:px-10 2xl:px-0">
        <NewsUpdatesCards />
      </div>
      {/* ===== pagination ====== */}
      <div className="pb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isProductLoading}
        />
      </div>
    </div>
  );
}
