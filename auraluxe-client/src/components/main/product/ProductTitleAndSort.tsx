"use client";

import Breadcrumb from "@/components/share/Breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaArrowDownAZ, FaArrowDownZA } from "react-icons/fa6";
interface ProductTitleAndSortProps {
  onSortChange: (sort: string) => void;
}
const ProductTitleAndSort: React.FC<ProductTitleAndSortProps> = ({
  onSortChange,
}) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleValueChange = (value: string) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  const renderIconAndText = () => {
    switch (selectedSort) {
      case "price low to high":
        return {
          //icon: <PiCurrencyDollarBold />,
          text: "Price Low to High",
        };
      case "price high to low":
        return {
          //icon: <PiCurrencyDollarBold />,
          text: "Price High to Low",
        };
      case "new arrivals":
        return {
          icon: null,
          text: "Newest Arrivals",
        };
      case "top rated":
        return {
          icon: null,
          text: "Top Rated",
        };
      case "featured":
        return {
          //icon: <MdOutlineStars />,
          text: "Featured",
        };
      case "a to z":
        return {
          // icon: <FaArrowDownAZ className="w-4 h-4" />,
          text: "A to Z",
        };
      case "z to a":
        return {
          //icon: <FaArrowDownZA className="w-4 h-4" />,
          text: "Z to A",
        };
      default:
        return {
          icon: <CiFilter className="h-5 w-5" />,
          text: "Sort by",
        };
    }
  };

  const { icon, text } = renderIconAndText();

  return (
    <div className="flex items-center justify-between">
      {/*  */}
      <div className="hidden text-3xl font-normal xl:block">
        <Breadcrumb />
      </div>

      <div className="flex items-center justify-end">
        <div>
          <Select
            onOpenChange={(open) => {
              setIsOpen(open);
            }}
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="h-[40px] w-[200px] rounded-none px-2 lg:px-2">
              <div className="flex w-full items-center justify-between">
                {/* text and icon */}
                <div className="flex items-center gap-2">
                  {icon}
                  <SelectValue
                    className="text-textOptional text-base font-normal"
                    placeholder={text}
                  />
                </div>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-gray-100">
              {/* ===== Price Low to High ======= */}
              {/* <SelectItem
                value="price low to high"
                className="hover:bg-graySecondary group "
              >
                <div className="flex justify-center items-center gap-2 cursor-pointer rounded-sm py-1 group-hover:text-brandColor">
                  <PiCurrencyDollarBold className="w-4 h-4  " />
                  <div className=" font-bold text-sm text-textSecondary group-hover:text-brandColor">
                    Price Low to High
                  </div>
                </div>
              </SelectItem> */}

              {/* === Price High to Low ==== */}
              {/* <SelectItem
                value="price high to low"
                className="hover:bg-graySecondary group"
              >
                <div className="flex justify-center items-center gap-2 cursor-pointer  rounded-sm py-1 group-hover:text-brandColor">
                  <PiCurrencyDollarBold className="w-4 h-4 " />
                  <p className="font-bold text-sm text-textSecondary group-hover:text-brandColor">
                    Price High to Low
                  </p>
                </div>{" "}
              </SelectItem> */}

              {/* === Newest Arrivals ===  */}
              {/* <SelectItem
                value="new arrivals"
                className="hover:bg-graySecondary group "
              >
                <div className="flex justify-center items-center gap-2 cursor-pointer rounded-sm py-1 group-hover:text-brandColor">
                  <div className="w-4 h-4 ">
                    <Icon11 />
                  </div>

                  <p className="font-bold text-sm text-textSecondary group-hover:text-brandColor">
                    Newest Arrivals
                  </p>
                </div>{" "}
              </SelectItem> */}

              {/* ==== top rated ==== */}
              {/* <SelectItem
                value="top rated"
                className="hover:bg-graySecondary group"
              >
                <div className="flex justify-center items-center gap-2 rounded-sm py-1 cursor-pointer">
                  <div className="w-4 h-4 group-hover:text-brandColor">
                    <Icon12 />
                  </div>
                  <p className="font-bold text-sm text-textSecondary group-hover:text-brandColor">
                    Top Rated
                  </p>
                </div>{" "}
              </SelectItem> */}

              {/* === featured === */}
              {/* <SelectItem
                value="featured"
                className="hover:bg-graySecondary group"
              >
                <div className="flex justify-center items-center gap-2 cursor-pointer rounded-sm py-1">
                  <MdOutlineStars className="w-4 h-4 group-hover:text-brandColor" />
                  <p className="font-bold text-sm text-textSecondary group-hover:text-brandColor">
                    Featured
                  </p>
                </div>{" "}
              </SelectItem> */}

              {/* ==== a to z */}
              <SelectItem value="a to z" className="hover:bg-softGray group">
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded-sm py-1">
                  <FaArrowDownAZ className="group-hover:text-brandColor h-4 w-4" />
                  <p className="text-textSecondary group-hover:text-brandColor text-sm font-bold">
                    A to Z
                  </p>
                </div>{" "}
              </SelectItem>

              {/* === z to a === */}
              <SelectItem value="z to a" className="hover:bg-softGray group">
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded-sm py-1">
                  <FaArrowDownZA className="group-hover:text-brandColor h-4 w-4" />
                  <p className="text-textSecondary group-hover:text-brandColor text-sm font-bold">
                    Z to A
                  </p>
                </div>{" "}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductTitleAndSort;
