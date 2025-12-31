"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import sliderpic1 from "../../../../public/landingPage/slider/sliderOne.jpg";
import sliderpic3 from "../../../../public/landingPage/slider/sliderThree.png";
import sliderpic2 from "../../../../public/landingPage/slider/sliderTwo.jpg";

const slides = [
  {
    id: 1,
    image: sliderpic1,
    text: (
      <div className="flex w-[554px] flex-col gap-7">
        <div className="text-white">
          <span className="heading5B">Indulge</span>{" "}
          <span className="heading5Light pl-4">in Stylish,</span>{" "}
          <p className="heading5B">
            <span className="heading5Light">Trendy</span> Living.
          </p>
        </div>
        <div className="text-lightGray text-xl leading-8">
          Living stylishly and embracing trendy lifestyles go beyond just
          fashion—it reflects in our homes.
        </div>
      </div>
    ),
  },
  {
    id: 2,
    image: sliderpic2,
    text: (
      <div className="flex w-[554px] flex-col gap-7">
        <div className="text-white">
          <span className="heading5B">Experience</span>{" "}
          <span className="heading5Light pl-4">the</span>{" "}
          <p className="heading5B">
            <span className="heading5Light">Top</span> Trends.
          </p>
        </div>
        <div className="text-lightGray text-xl leading-8">
          Modern stylish living embraces sustainability. Choosing eco-friendly
          fashion, ethical brands.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    image: sliderpic3,
    text: (
      <div className="flex w-[554px] flex-col gap-7">
        <div className="text-white">
          <span className="heading5B">Live</span>{" "}
          <span className="heading5Light pl-4">the Trend,</span>{" "}
          <p className="heading5B">
            <span className="heading5Light">Embrace</span> Style.
          </p>
        </div>
        <div className="text-lightGray text-xl leading-8">
          Indulge in Stylish, Trendy Living is about more than appearances—it’s
          a mindset that combines.
        </div>
      </div>
    ),
  },
];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="relative hidden h-[900px] w-full overflow-hidden lg:block">
        {/*======== Image Slides =========*/}
        <AnimatePresence custom={1} initial={false}>
          <motion.img
            key={slides[currentIndex]?.id}
            src={slides[currentIndex].image?.src}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute h-full w-full object-cover"
          />
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
              {slides[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
