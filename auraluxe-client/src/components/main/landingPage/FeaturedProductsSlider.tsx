"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  images: string[];
  className?: string;
};

const FeaturedProductSlider: React.FC<Props> = ({ images, className }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  // Guard against empty images array - this should never happen if parent handles it
  if (total === 0) {
    return null; // Or return a placeholder
  }

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
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
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
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
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

  // Auto-slide effect
  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      goTo(current + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [current, total]);

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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={`Featured product ${i + 1}`}
                className="h-full w-full object-cover"
                priority={i === 0}
              />
            </div>
          </div>
        ))}

        {/* ======= buttons ======= */}
        {total > 2 && (
          <>
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Previous image"
              className="sc-500:left-[18%] bg-textMediumGray hover:bg-textMediumGray/80 absolute top-1/2 left-[16%] z-40 flex h-3 max-h-16 w-3 max-w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-none border-none text-white transition-colors md:left-[18%] md:h-7 md:w-7 lg:left-[10%] lg:h-16 lg:w-16"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </button>

            <button
              onClick={() => goTo(current + 1)}
              aria-label="Next image"
              className="sc-500:right-[18%] bg-textMediumGray hover:bg-textMediumGray/80 absolute top-1/2 right-[16%] z-40 flex h-3 max-h-16 w-3 max-w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-none border-none text-white transition-colors md:right-[18%] md:h-7 md:w-7 lg:right-[10%] lg:h-16 lg:w-16"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </button>
          </>
        )}

        {/* Navigation dots */}
        {total > 1 && (
          <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === current
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
};

export default FeaturedProductSlider;
