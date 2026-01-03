"use client";
import Heading from "@/components/share/common/Heading";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  // ===== API CALL =====
  // const { data: homePageOurFeatured, isLoading } = useGet<
  //   Array<{
  //     id: string;
  //     title: string;
  //     description: string;
  //     image: string;
  //     order: number;
  //   }>
  // >("/home_page_our_featured?status=active&limit=100", [
  //   "getAllhomePageOurFeatured",
  // ]);

  // ===== FORMAT SLIDES =====
  // const slides = useMemo(() => {
  //   if (!homePageOurFeatured || homePageOurFeatured.length === 0) return [];

  //   return homePageOurFeatured
  //     .toSorted((a, b) => a.order - b.order)
  //     .map((item) => ({
  //       id: item.order.toString().padStart(2, "0"), // 1 => "01"
  //       title: item.title,
  //       description: item.description,
  //       image: item.image,
  //     }));
  // }, [homePageOurFeatured]);

  const [[currentIndex, direction], setIndex] = useState([0, 1]);

  // Avoid crash if slides are empty
  // const currentSlide = slides[currentIndex] || {
  //   id: "",
  //   image: "",
  //   title: "",
  //   description: "",
  // };

  const slides = [
    {
      id: "01",
      title: "Luxury Interior Solutions",
      description:
        "Experience premium interior materials curated to bring elegance, durability, and modern aesthetics into every living space.",
      image: "/landingPage/our_featured/first_image_slider.png",
    },
    {
      id: "02",
      title: "Imported Building Materials",
      description:
        "We source globally trusted building materials that ensure long-lasting quality and sophisticated architectural finishes.",
      image: "/landingPage/our_featured/second_image_slider.png",
    },
    {
      id: "03",
      title: "Modern Architectural Design",
      description:
        "Our design philosophy blends innovation with functionality, creating timeless architectural solutions for premium spaces.",
      image: "/landingPage/our_featured/image3.jpg",
    },
  ];

  const currentSlide = slides[currentIndex] || {
    id: "",
    image: "",
    title: "",
    description: "",
  };

  const texts = currentSlide.title.trim().split(" ");
  const lastWord = texts.pop();
  const restTitle = texts.join(" ");

  // Auto slide change
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setIndex(([prevIndex]) => [(prevIndex + 1) % slides.length, 1]);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="sc-500:gap-14 relative z-10 flex min-h-80 flex-col gap-5 overflow-hidden md:min-h-100 md:px-4 lg:gap-28">
      {/* ======= Heading ======== */}
      <Heading
        firstText="Our"
        secondText="Featured"
        backText="Featured"
        descripiton="Our products are designed to deliver excellence, combining innovation, quality, and reliability to meet diverse needs across industries."
      />

      {/*  */}

      <>
        {/* ========= Featured Slider for Large Screens ========= */}
        <section className="mx-auto hidden max-h-[681px] w-full max-w-[1289px] justify-end md:flex lg:p-0">
          {/*====== Background Image ========*/}
          <div className="relative h-[55vh] max-h-[681px] w-[67%] max-w-[1020px] overflow-hidden rounded-xl lg:h-[60vh] lg:w-[72%] xl:h-screen xl:w-[75%] 2xl:w-full ">
            <AnimatePresence custom={direction} initial={false}>
              <motion.img
                key={currentSlide.image}
                src={currentSlide.image}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/*======== Number + Text =========*/}
          <div className="absolute h-[48vh] max-h-[661px] w-[65%] max-w-[1020px] rounded-xl lg:h-[60vh] lg:w-[70%] xl:h-screen xl:w-[75%] 2xl:w-full ">
            {/*======== Number =======*/}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -35, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <span className="text-lightGray absolute -top-5 -left-[115px] z-10 text-[80px] font-bold lg:-left-[200px] lg:text-[130px]">
                  {currentSlide.id}
                </span>
              </motion.div>
            </AnimatePresence>

            {/*======= Overlay Card ========*/}
            <div className="absolute top-1/3 -left-1/3 max-h-[501px] min-h-[282px] w-[65%] max-w-[401px] overflow-hidden rounded-[20px] bg-black/80 p-5 text-white xl:-left-1/4 xl:min-h-[350px] xl:w-full xl:p-5">
              {/*======= Background texture =======*/}
              <div className="absolute inset-0">
                <div className="absolute h-full w-full  bg-black/80 " />
                <Image
                  alt="tilottoma Logo"
                  src={LogoImage}
                  height={150}
                  width={150}
                  className="h-full w-full object-cover"
                />
              </div>

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
                      <span className="pl-3 text-red-500">{lastWord}</span>
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

        {/* ========= SMALL SCREEN VERSION  ========= */}
        <div className="sc-500:px-[15%] sc-430:px-[15%] flex h-screen max-h-[300px] w-full items-center px-[5%] sm:px-[20%] md:hidden">
          <div className="relative">
            {/* ======== slider image ============= */}
            <div className="sc-500:h-[250px] sc-500:w-[300px] relative h-[180px] w-[226px] overflow-hidden rounded-lg">
              <div className="absolute h-full w-full bg-black/20" />
              <AnimatePresence custom={direction} initial={false}>
                <motion.img
                  key={currentSlide.image}
                  src={currentSlide.image}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="sc-500:min-h-[150px] absolute top-1 -right-[50%] min-h-[130px] w-[168px] -translate-x-8 translate-y-1/2 transform overflow-hidden rounded-lg bg-transparent sm:w-[200px]">
              {/* ======== overlay + background image ====== */}
              <div className="absolute inset-0 z-0">
                <div className="absolute h-full w-full bg-black/85" />
                <Image
                  alt="tilottoma Logo"
                  src={LogoImage}
                  height={150}
                  width={150}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* ======= number + text ============= */}
              <div className="absolute inset-0 h-full w-full p-3 text-white">
                {/* ====== text =========== */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <h2 className="px-0.5 pb-2 text-xs font-bold sm:text-sm">
                      {restTitle}
                      <span className="pl-2 text-red-500">{lastWord}</span>
                    </h2>

                    <p className="sc-500:text-xs line-clamp-5 text-[0.5rem] leading-4 font-normal">
                      {currentSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* =========== number ======== */}
            <div className="absolute top-3 -right-14 sm:top-5 sm:-right-20">
              {/* {slides[0]?.id} */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -35, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <span className="text-lightGray text-[2rem] leading-8 font-bold sm:text-[3rem]">
                    {currentSlide.id}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </>

      {/*  */}
    </div>
  );
}
