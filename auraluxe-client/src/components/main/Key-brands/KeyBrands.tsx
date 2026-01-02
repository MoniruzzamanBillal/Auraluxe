"use client";

import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Heading from "@/components/share/common/Heading";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function KeyBrands() {
  const keyBrandList = [
    { id: 1, image: "/key_brands/american_standard.png" },
    { id: 2, image: "/key_brands/azteca.png" },
    { id: 3, image: "/key_brands/baldocer.png" },
    { id: 4, image: "/key_brands/bestile.png" },
    { id: 5, image: "/key_brands/blum.png" },
    { id: 6, image: "/key_brands/capucino.png" },
    { id: 7, image: "/key_brands/cerarock.png" },
    { id: 8, image: "/key_brands/colorker.png" },
    { id: 9, image: "/key_brands/dorn.png" },
    { id: 10, image: "/key_brands/emigres.png" },
    { id: 11, image: "/key_brands/garcia.png" },
    { id: 12, image: "/key_brands/gayafores.png" },
    { id: 13, image: "/key_brands/grass.png" },
    { id: 14, image: "/key_brands/grohe.png" },
    { id: 15, image: "/key_brands/hafel.png" },
    { id: 16, image: "/key_brands/icc.png" },
    { id: 17, image: "/key_brands/itacc.png" },
    { id: 18, image: "/key_brands/jvd.png" },
    { id: 19, image: "/key_brands/kawajun.png" },
    { id: 20, image: "/key_brands/kessebohmi.png" },
    { id: 21, image: "/key_brands/myKitchen.png" },
    { id: 22, image: "/key_brands/nextblock.png" },
    { id: 23, image: "/key_brands/ninka.png" },
    { id: 24, image: "/key_brands/peronda.png" },
    { id: 25, image: "/key_brands/ramonsoler.png" },
    { id: 26, image: "/key_brands/realonda.png" },
    { id: 27, image: "/key_brands/restile2.png" },
    { id: 28, image: "/key_brands/teka.png" },
    { id: 29, image: "/key_brands/tesy.png" },
    { id: 30, image: "/key_brands/toto.png" },
    { id: 31, image: "/key_brands/vauthSagel.png" },
  ];

  // ====== api call
  //   const { data: keyBrandList, isLoading } = useGet<ApiRes[]>(
  //     "/keyBrand/allKeyBrand?status=active",
  //     ["getAllKeyBrandList"],
  //   );

  // console.log("key brand =>", keyBrandList);

  const [turnNormal, setTurnNormal] = useState(false);

  useEffect(() => {
    const timeInterval = setTimeout(() => {
      setTurnNormal(true);
    }, 2000);

    return () => clearTimeout(timeInterval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white pb-20 sm:gap-20 lg:pb-36">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Key Brands"}
        description={
          "Reach Out to Us for Any Assistance - Your Satisfaction is Our Priority."
        }
        image="/key_brands/main_banner.jpg"
      />

      {/* ======= heading ======== */}
      <div className="relative z-100">
        <Heading
          firstText="Our"
          secondText="Key Brands"
          backText="Brands"
          title={"TOP INTERNATIONAL BRANDS UNDER ONE ROOF"}
          descripiton="Whether you're looking for premium home décor, high-end furniture, luxury fittings, or top-tier lifestyle products."
        />
      </div>

      {/* ======= brands images ======= */}
      <div className="container mt-5 flex min-h-[517px] max-w-[1520px] flex-wrap justify-center gap-x-7 gap-y-10 md:mt-10 2xl:justify-start">
        {keyBrandList?.map((brand, index) => {
          const isEven = (index + 1) % 2 === 0;

          return (
            <div
              key={index + 1}
              className={`border-lightGray h-[75px] w-[120px] overflow-hidden rounded-xl border p-5 sm:h-[91px] sm:w-[159px] ${isEven ? "rotate-15" : "-rotate-15"} ${turnNormal && "!rotate-0"} transition-all duration-300 ease-in-out`}
            >
              <Image
                alt={` logo`}
                src={brand?.image}
                height={28}
                width={150}
                className="h-full w-full shrink-0 object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
