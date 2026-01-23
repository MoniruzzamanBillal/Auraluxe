"use client";
import Heading from "@/components/share/common/Heading";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { useFetchData } from "@/hooks/useApi";
import LogoImage from "../../../../public/logo-no-bg.png";

const variants = {
  enter: {
    x: "100%",
    opacity: 1,
    zIndex: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    zIndex: 0,
  },
  exit: {
    x: "-100%",
    opacity: 1,
    zIndex: 0,
  },
};

export default function OurFeatures() {
  // Fetch data from API
  const { data, isLoading } = useFetchData(
    ["home-our-featured"],
    "/home-our-featured",
  );

  const [[currentIndex, direction], setIndex] = useState([0, 1]);

  // Format API data into slides
  const slides = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      // Return empty array if no data
      return [];
    }

    // Filter out deleted items and map to slide format
    return data.data
      .filter((item: any) => !item.isDeleted)
      .map((item: any, index: number) => ({
        id: (index + 1).toString().padStart(2, "0"), // "01", "02", etc.
        title: item.title || "",
        description: item.description || "",
        image: item.imageUrl || "",
        apiId: item.id, // Keep original ID if needed
      }));
  }, [data]);

  // Get current slide safely
  const currentSlide = slides[currentIndex] || {
    id: "01",
    title: "No Content Available",
    description: "Please add content in the admin panel",
    image: "/placeholder-image.jpg", // You should add a placeholder image
  };

  // Split title for styling
  const texts = currentSlide.title.trim().split(" ");
  const lastWord = texts.pop();
  const restTitle = texts.join(" ");

  // Auto slide change
  useEffect(() => {
    if (slides.length <= 1) return; // Don't auto-slide if only 1 or 0 slides

    const timer = setInterval(() => {
      setIndex(([prevIndex]) => [(prevIndex + 1) % slides.length, 1]);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="sc-500:gap-14 relative z-10 flex min-h-80 flex-col gap-5 overflow-hidden md:min-h-100 md:px-4 lg:gap-28">
        <Heading
          firstText="Our"
          secondText="Featured"
          backText="Featured"
          descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
        />
        <div className="flex h-96 items-center justify-center">
          <div className="text-lg text-gray-600">
            Loading featured content...
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (slides.length === 0) {
    return (
      <div className="sc-500:gap-14 relative z-10 flex min-h-80 flex-col gap-5 overflow-hidden md:min-h-100 md:px-4 lg:gap-28">
        <Heading
          firstText="Our"
          secondText="Featured"
          backText="Featured"
          descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
        />
        <div className="flex h-96 items-center justify-center">
          <div className="text-lg text-gray-600">
            No featured content available yet.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sc-500:gap-14 relative z-10 flex min-h-80 flex-col gap-5 overflow-hidden md:min-h-100 md:px-4 lg:gap-28">
      {/* ======= Heading ======== */}
      <Heading
        firstText="Our"
        secondText="Featured"
        backText="Featured"
        descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
      />

      {/* ========= Featured Slider for Large Screens ========= */}
      <section className="mx-auto hidden max-h-[681px] w-full max-w-[1289px] justify-end md:flex lg:p-0">
        {/*====== Background Image ========*/}
        <div className="relative h-[55vh] max-h-[681px] w-[67%] max-w-[1020px] overflow-hidden rounded-xl lg:h-[60vh] lg:w-[72%] xl:h-screen xl:w-[75%] 2xl:w-full  ">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute h-full w-full"
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/*======== Number + Text =========*/}
        <div className="absolute h-[48vh] max-h-[661px] w-[65%] max-w-[1020px] rounded-xl lg:h-[60vh] lg:w-[70%] xl:h-screen xl:w-[75%] 2xl:w-full">
          {/*======== Number =======*/}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -35, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <span className="text-lightGray absolute -top-5 -left-[115px] z-10 text-[80px] font-bold lg:-left-[200px] lg:text-[130px]  ">
                {currentSlide.id}
              </span>
            </motion.div>
          </AnimatePresence>

          {/*======= Overlay Card ========*/}
          <div className="absolute top-1/3 -left-1/3 max-h-[501px] min-h-[282px] w-[65%] max-w-[401px] overflow-hidden rounded-[20px] bg-black/80 p-5 text-white xl:-left-1/4 xl:min-h-[350px] xl:w-full xl:p-5  ">
            {/*======= Text =========*/}
            <div className="relative z-100 p-1 lg:p-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <h2 className="text-xl leading-snug font-semibold md:text-2xl xl:text-[36px] xl:leading-10">
                    {restTitle}
                    <span className="pl-3 text-prime100">{lastWord}</span>
                  </h2>

                  <p className="mt-3 text-sm text-gray-300 xl:text-lg xl:leading-7">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/*===== Logo ========*/}
            <div className="absolute bottom-10 left-10 flex items-center gap-3">
              <div className="h-[1px] w-[69px] bg-white" />
              <Image
                alt="tilottoma logo"
                src={LogoImage}
                height={21}
                width={98}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
