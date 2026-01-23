"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks/useApi";
import { TbCategory } from "react-icons/tb";
import { TiStarOutline } from "react-icons/ti";

type Props = {
  selectedCat: string;
  setSelectedCat: React.Dispatch<React.SetStateAction<string>>;
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  handleOpenChange?: (isOpen: boolean) => void;
};

const Category = ({
  selectedCat,
  setSelectedCat,
  selectedBrand,
  setSelectedBrand,
  handleOpenChange,
}: Props) => {
  const { data: categoryData, isLoading: isAllCatListLoading } = useFetchData(
    ["category"],
    "/category",
  );

  const { data: brandData, isLoading: isAllBrandListLoading } = useFetchData(
    ["brand"],
    "/brand",
  );

  const toggleCategorySelection = (id: string) => {
    setSelectedCat((prev: string) => (prev === id ? "" : id));
  };

  const handleReset = () => {
    setSelectedCat("");
    setSelectedBrand("");
  };

  const toggleBrandSelection = (id: string) => {
    setSelectedBrand((prev: string) => (prev === id ? "" : id));
  };

  return (
    <div>
      <div className="mt-4 flex items-center justify-start gap-2  ">
        <div>
          <TbCategory className="text-charcoolGray h-6 w-6" />
        </div>
        <p className="text-textBlack text-base font-medium   ">Category</p>
      </div>
      <hr className="text-grayLightPrimary mt-3" />

      {/* ========== category ========== */}
      <div className="mt-7">
        {isAllCatListLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          categoryData?.data?.map((cat: any, index: number) => (
            <div
              key={index + 1}
              className={`hover:text-brandColor hover:bg-graySecondary flex cursor-pointer items-center gap-x-2 py-4 text-sm font-bold ${
                selectedCat === cat.id
                  ? "text-brandColor bg-graySecondary"
                  : "text-secondary"
              }`}
            >
              <Checkbox
                id={cat?.id}
                checked={selectedCat === cat?.id}
                className={` ${selectedCat === cat?.id ? "bg-brandColor text-white" : "border-darkGray border"} `}
                onCheckedChange={() => toggleCategorySelection(cat?.id)}
              />

              <Label htmlFor={cat?.id} className="text-darkGray font-medium">
                {cat?.name}
              </Label>
            </div>
          ))
        )}
      </div>

      {/*=========== Brand ==========*/}
      <div className="mt-12 flex items-center justify-start gap-2">
        <div>
          <TiStarOutline className="text-textOptional h-6 w-6" />
        </div>
        <div className="text-textBlack text-base font-medium">Brand</div>
      </div>

      <hr className="text-grayLightPrimary mt-3" />

      <div className="mt-7">
        {isAllBrandListLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          brandData?.data?.map((brand: any, index: number) => (
            <div
              key={index + 1}
              className={`hover:text-brandColor hover:bg-graySecondary flex cursor-pointer items-center gap-x-2 py-4 text-sm font-bold ${
                selectedBrand === brand.id
                  ? "text-brandColor bg-graySecondary"
                  : "text-secondary"
              }`}
            >
              <Checkbox
                id={brand?.id}
                checked={selectedBrand === brand?.id}
                className={` ${selectedBrand === brand?.id ? "bg-brandColor text-white" : "border-darkGray border"} `}
                onCheckedChange={() => toggleBrandSelection(brand?.id)}
              />

              <Label htmlFor={brand?.id} className="text-darkGray font-medium">
                {brand?.name}
              </Label>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 w-full">
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Category;
