"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  className?: string;
};

const FeaturedProductSlider: React.FC<Props> = ({ images, className }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const goTo = (i: number) => setCurrent((i + total) % total);

  const getStyle = (i: number) => {
    const pos = (i - current + total) % total;
    const base = "translateX(-50%) translateY(-50%)";
    if (pos === 0)
      return {
        transform: `${base} scale(1)`,
        zIndex: 30,
        opacity: 1,
        filter: "none",
        boxShadow: "0 8px 32px #0002",
        borderRadius: "8px",
      };
    if (pos === 1 || pos === total - 1)
      return {
        transform: `${base} scale(0.85) translateX(${
          pos === 1 ? "100%" : "-100%"
        })`,
        zIndex: 20,
        opacity: 1,
        filter: "brightness(0.2)",
        boxShadow: "0 4px 16px #0001",
        borderRadius: "8px",
      };
    return {
      transform: `${base} scale(0.6)`,
      zIndex: 10,
      opacity: 0,
      filter: "brightness(0.5)",
      borderRadius: "8px",
    };
  };

  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${
        className || ""
      }`}
    >
      <div className="sc-500:h-[40vh] relative flex max-h-[694px] min-h-[134px] w-full items-center justify-center overflow-hidden md:h-[45vh] lg:h-[60vh] 2xl:h-screen">
        {images.map((img: string, i: number) => (
          <div
            key={i}
            style={getStyle(i)}
            onClick={() => setCurrent(i)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setCurrent(i)
            }
            role="button"
            tabIndex={0}
            className="sc-500:w-[50vw] sc-500:h-[30vh] absolute top-1/2 left-1/2 h-[134px] w-[226px] max-w-[1172px] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:h-[40vh] lg:h-[50vh] lg:w-[65vw] xl:h-[60vh] 2xl:h-full 2xl:w-full"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={img}
                fill
                unoptimized
                alt={`product ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* ======= buttons ======= */}
        {total > 2 && (
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous image"
            className="sc-500:left-[18%] bg-textMediumGray hover:bg-textMediumGray absolute top-1/2 left-[16%] z-40 flex h-3 max-h-16 w-3 max-w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-none border-none text-white md:left-[18%] md:h-7 md:w-7 lg:left-[10%] lg:h-16 lg:w-16"
          >
            <ChevronLeft />
          </button>
        )}

        {total > 1 && (
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next image"
            className="sc-500:right-[18%] bg-textMediumGray hover:bg-textMediumGray absolute top-1/2 right-[16%] z-40 flex h-3 max-h-16 w-3 max-w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-none border-none text-white md:right-[18%] md:h-7 md:w-7 lg:right-[10%] lg:h-16 lg:w-16"
          >
            {/* <MdChevronRight className="" /> */}
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProductSlider;
