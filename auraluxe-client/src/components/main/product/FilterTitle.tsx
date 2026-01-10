"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaSliders } from "react-icons/fa6";
import Category from "./Category";
import { useState } from "react";

type Props = {
  selectedCat: string;
  setSelectedCat: React.Dispatch<React.SetStateAction<string>>;
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  handleApply: any;
};

const FilterTitle = ({
  selectedCat,
  setSelectedCat,
  selectedBrand,
  setSelectedBrand,
  handleApply,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <div className="mt-0 flex cursor-pointer items-center justify-start gap-2 rounded-none border border-black px-2 py-1 lg:mt-4 lg:cursor-default">
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <div>
          <SheetTrigger asChild>
            <div>
              <button className="text-text flex items-center gap-2 text-base font-normal">
                <FaSliders className="text-textOptional h-4 w-4" />
                <p>Filter</p>
              </button>
            </div>
          </SheetTrigger>
        </div>
        {/*==== To enable vertical scrolling for the content when it exceeds the modal's height. ===*/}
        <SheetContent className="z-[10000] h-[100vh] w-full overflow-y-auto bg-white px-[40px]">
          <div className="">
            <Category
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              handleOpenChange={handleOpenChange}
            />
            {/*====== apply button for small devices only ========== */}
            {/* <div className="cus mt-5">
              <button
                onClick={handleApply}
                className="bg-brandColOne w-full py-2 text-base font-medium text-white"
              >
                Apply
              </button>
            </div> */}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default FilterTitle;
