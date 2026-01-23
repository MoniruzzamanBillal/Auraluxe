"use client";

import { THomePageBanner } from "@/components/admin/homepage_banner/schema/HomeBanner";
import { useFetchData } from "@/hooks/useApi";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // ! FETCH - using your hook
  const { data, isLoading } = useFetchData(["home-banner"], "/home-banner");

  const banners: THomePageBanner[] | [] = data?.data || [];

  // Auto-slide effect - only if we have banners
  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [banners.length]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="hidden h-[900px] w-full items-center justify-center bg-gray-100 lg:flex">
        <div className="text-xl text-gray-600">Loading banners...</div>
      </div>
    );
  }

  // Handle empty state
  if (banners.length === 0) {
    return (
      <div className="hidden h-[900px] w-full items-center justify-center bg-gray-100 lg:flex">
        <div className="text-xl text-gray-600">No banners available</div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative hidden h-[900px] w-full overflow-hidden lg:block">
        {/*======== Image Slides =========*/}
        <AnimatePresence custom={1} initial={false}>
          <motion.div
            key={banners[currentIndex]?.id}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute h-full w-full"
          >
            <Image
              src={banners[currentIndex]?.imageUrl as string}
              alt={banners[currentIndex]?.title || "Banner"}
              height={1280}
              width={1280}
              className=" w-full h-full "
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Text */}
        <div className="absolute top-[510px] left-40 z-20 max-w-[90%] sm:max-w-[554px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="flex w-[554px] flex-col gap-7">
                <div className="text-white">
                  <span className="heading5B">
                    {banners[currentIndex]?.title}
                  </span>
                </div>
                <div className="text-lightGray text-xl leading-8">
                  {banners[currentIndex]?.description}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
