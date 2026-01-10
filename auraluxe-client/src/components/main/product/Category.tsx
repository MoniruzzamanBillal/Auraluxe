"use client";
import { Accordion } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TbCategory } from "react-icons/tb";
import { TiStarOutline } from "react-icons/ti";
import CategoryAccordion from "./CategoryAccordian";
import { BrandList, CategoryList } from "./TempData";

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
  const isAllCatListLoading = false;
  const isAllBrandListLoading = false;

  const toggleCategorySelection = (id: string) => {
    setSelectedCat((prev: string) => (prev === id ? "" : id));
  };

  // const toggleCategorySelection = (name: string) => {
  //   setSelectedCat(name);
  // };
  // const toggleBrandSelection = (name: string) => {
  //   setSelectedBrand(name);
  // };
  const toggleBrandSelection = (name: string) => {
    setSelectedBrand((prev: string) => (prev === name ? "" : name));
  };

  // console.log(allBrandsList);

  return (
    <div>
      <div className="mt-4 flex items-center justify-start gap-2  ">
        <div>
          <TbCategory className="text-charcoolGray h-6 w-6" />
        </div>
        <p className="text-textBlack text-base font-medium">Category</p>
      </div>
      <hr className="text-grayLightPrimary mt-3" />

      {/* ========== category ========== */}
      <div className="mt-7  ">
        <Accordion type="single" className="space-y-2">
          {CategoryList.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              category={cat}
              level={1}
              setSelectedCat={setSelectedCat}
            />
          ))}
        </Accordion>
      </div>
      {/* {isAllCatListLoading ? (
        <>
          <NormalLoader />
        </>
      ) : (
        <div className="mt-7">
          <Accordion type="multiple" className="space-y-2">
            {CategoryList.map((cat) => (
              <CategoryAccordion
                key={cat.id}
                category={cat}
                level={1}
                setSelectedCat={setSelectedCat}
                handleOpenChange={handleOpenChange}
              />
            ))}
          </Accordion>
        </div>
      )} */}

      {/*=========== Brand ==========*/}
      <div className="mt-12 flex items-center justify-start gap-2">
        <div>
          <TiStarOutline className="text-textOptional h-6 w-6" />
        </div>
        <div className="text-textBlack text-base font-medium">Brand</div>
      </div>

      <hr className="text-grayLightPrimary mt-3" />

      <div className="mt-7">
        {BrandList.map((brand: any, index: number) => (
          <div
            key={index + 1}
            className={`hover:text-brandColor hover:bg-graySecondary flex cursor-pointer items-center gap-x-2 py-4 text-sm font-bold ${
              selectedBrand === brand.name
                ? "text-brandColor bg-graySecondary"
                : "text-secondary"
            }`}
            // onClick={() => toggleBrandSelection(brand.name)}
            // onClick={() => toggleBrandSelection(brand._id)}
          >
            <Checkbox
              id={brand?.name}
              checked={selectedBrand === brand?.name}
              className={` ${selectedBrand === brand?.name ? "bg-brandColor text-white" : "border-darkGray border"} `}
              // onCheckedChange={(checked) =>
              //   handleChangeFinish(Boolean(checked), data?.id)
              // }

              onCheckedChange={() => toggleBrandSelection(brand?.name)}
            />

            <Label htmlFor={brand?.name} className="text-darkGray font-medium">
              {brand?.name}
            </Label>
          </div>
        ))}
      </div>

      {/* {isAllBrandListLoading ? (
        <NormalLoader />
      ) : (
        <div className="mt-7">
          {BrandList.map((brand: any, index: number) => (
            <div
              key={index + 1}
              className={`hover:text-brandColor hover:bg-graySecondary flex cursor-pointer items-center gap-x-2 py-4 text-sm font-bold ${
                selectedBrand === brand._id
                  ? "text-brandColor bg-graySecondary"
                  : "text-secondary"
              }`}
              // onClick={() => toggleBrandSelection(brand.name)}
              // onClick={() => toggleBrandSelection(brand._id)}
            >
              <Checkbox
                id={brand?.id}
                checked={selectedBrand === brand?.id}
                className={` ${selectedBrand === brand?.id ? "bg-brandColor text-white" : "border-darkGray border"} cursor-pointer`}
                // onCheckedChange={(checked) =>
                //   handleChangeFinish(Boolean(checked), data?.id)
                // }

                onCheckedChange={() => {
                  toggleBrandSelection(brand.id);
                  if (handleOpenChange) {
                    handleOpenChange(false);
                  }
                }}
              />

              <Label htmlFor={brand?._id} className="text-darkGray font-medium">
                {brand?.name}
              </Label>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Category;
