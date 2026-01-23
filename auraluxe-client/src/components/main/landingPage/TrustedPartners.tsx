"use client";
import Heading from "@/components/share/common/Heading";
import Image from "next/image";
import { useEffect, useState } from "react";

// Sample brand data - replace with your actual brand images
const brands = [
  {
    id: 1,

    logo: "/landingPage/trusted_brands/anz.png",
  },
  {
    id: 2,

    logo: "/landingPage/trusted_brands/assurance.png",
  },
  {
    id: 3,

    logo: "/landingPage/trusted_brands/edison.png",
  },
  {
    id: 4,

    logo: "/landingPage/trusted_brands/ehl.png",
  },
  {
    id: 5,

    logo: "/landingPage/trusted_brands/navana.png",
  },
  {
    id: 6,

    logo: "/landingPage/trusted_brands/rangs.png",
  },
  {
    id: 7,

    logo: "/landingPage/trusted_brands/sanmar.png",
  },
  {
    id: 8,

    logo: "/landingPage/trusted_brands/sel.png",
  },
  {
    id: 9,

    logo: "/landingPage/trusted_brands/southBreeze.png",
  },
  {
    id: 10,

    logo: "/landingPage/trusted_brands/suvastu.png",
  },
  {
    id: 11,

    logo: "/landingPage/trusted_brands/suvastuSpace.png",
  },
  {
    id: 8,
    logo: "/landingPage/trusted_brands/ventura.png",
  },
];

export default function TrustedPartners() {
  return (
    <div className="sc-500:h-[30vh] mx-auto grid max-h-[406px] min-h-[202px] max-w-[1536px] grid-cols-2 overflow-hidden md:h-[50vh] lg:h-[30vh] xl:h-screen">
      {/* ======= heading ======== */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <Heading
          firstText="Our"
          secondText="Trusted Partners"
          backText="Trusted"
          borderPresent={false}
        />
      </div>
      {/* ===== partners ======= */}
      <BrandShowPart />
    </div>
  );
}

const BrandShowPart = () => {
  const [visibleDivs, setVisibleDivs] = useState(4);

  // State to track current brand for each grid position (max 8 for desktop)
  const [currentBrands, setCurrentBrands] = useState(() => {
    // Initialize with unique brands for each position
    const initialBrands = [];
    const usedBrands = new Set();

    for (let i = 0; i < 8; i++) {
      let brandIndex = i % brands.length;
      // Ensure no duplicates in initial state
      while (usedBrands.has(brandIndex) && usedBrands.size < brands.length) {
        brandIndex = (brandIndex + 1) % brands.length;
      }
      initialBrands.push(brandIndex);
      usedBrands.add(brandIndex);
    }

    return initialBrands;
  });

  // State to track transition state for each position
  const [isTransitioning, setIsTransitioning] = useState(Array(8).fill(false));

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setVisibleDivs(8);
      } else {
        setVisibleDivs(4);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to get random interval between min and max seconds
  const getRandomInterval = (min = 5000, max = 5000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to get next brand index (avoiding current one and currently visible brands)
  const getNextBrandIndex = (
    currentIndex: any,
    totalBrands: any,
    currentlyVisible: any,
  ) => {
    const availableBrands = [];

    // Find all brands that are not currently visible
    for (let i = 0; i < totalBrands; i++) {
      if (!currentlyVisible.includes(i)) {
        availableBrands.push(i);
      }
    }

    // If no brands are available (shouldn't happen with 8+ brands), fallback to any brand except current
    if (availableBrands.length === 0) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * totalBrands);
      } while (nextIndex === currentIndex);
      return nextIndex;
    }

    // Return random brand from available ones
    return availableBrands[Math.floor(Math.random() * availableBrands.length)];
  };

  // Set up individual timers for each grid position
  useEffect(() => {
    const timers: any = [];

    // Create a timer for each visible grid position
    for (let position = 0; position < visibleDivs; position++) {
      const createTimer = () => {
        return setTimeout(() => {
          // Start transition
          setIsTransitioning((prev) => {
            const newState = [...prev];
            newState[position] = true;
            return newState;
          });

          // After fade out completes, change brand and fade in
          setTimeout(() => {
            setCurrentBrands((prev) => {
              const newBrands = [...prev];
              // Get currently visible brands (only for the positions that are actually shown)
              const currentlyVisible = prev
                .slice(0, visibleDivs)
                .filter((_, idx) => idx !== position);
              newBrands[position] = getNextBrandIndex(
                prev[position],
                brands.length,
                currentlyVisible,
              );
              return newBrands;
            });

            // End transition
            setTimeout(() => {
              setIsTransitioning((prev) => {
                const newState = [...prev];
                newState[position] = false;
                return newState;
              });
            }, 50);
          }, 300); // Half of transition duration

          // Set up next timer for this position
          timers[position] = createTimer();
        }, getRandomInterval());
      };

      // Initial timer setup with random delay
      setTimeout(() => {
        timers[position] = createTimer();
      }, Math.random() * 2000); // Random initial delay up to 2 seconds
    }

    // Cleanup function
    return () => {
      timers.forEach((timer: any) => timer && clearTimeout(timer));
    };
  }, [visibleDivs]);

  return (
    <div className="flex h-full w-full flex-col justify-center p-4 lg:p-0">
      <div className="grid h-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {Array.from({ length: visibleDivs }).map((_, index) => {
          const currentBrand = brands[currentBrands[index]];
          return (
            <div
              key={index}
              className="relative flex h-full items-center justify-center overflow-hidden bg-white p-4 lg:p-6"
            >
              <div
                className={`absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-600 ease-in-out md:p-4 lg:p-5 ${
                  isTransitioning[index] ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  alt="tilottoma Logo"
                  src={currentBrand.logo}
                  height={156}
                  width={156}
                  className="w-16 shrink-0 object-contain md:w-24 lg:h-full lg:w-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
