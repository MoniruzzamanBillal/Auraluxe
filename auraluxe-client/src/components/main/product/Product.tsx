"use client";
import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";

import { useState } from "react";
import { TbPackageOff } from "react-icons/tb";
import Category from "./Category";
import ProductCard from "./ProductCard";
import ProductTitleAndSort from "./ProductTitleAndSort";

import { TProduct } from "@/components/admin/product/schema/product.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks/useApi";

const Product = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  //? Filters state
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Construct query string for API
  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", itemsPerPage.toString());

    if (selectedCat) params.append("categoryId", selectedCat);
    if (selectedBrand) params.append("brandId", selectedBrand);

    return params.toString();
  };

  const filterQuery = buildQueryString();

  const { data: productData, isLoading: isProductLoading } = useFetchData(
    ["products", selectedCat, selectedBrand],
    `/product?${filterQuery}`,
  );

  console.log("selected cat =>>", selectedCat);
  console.log("selected brand =>>", selectedBrand);
  // console.log("product data = ", productData?.data);
  console.log("API URL: ", `/product?${filterQuery}`);

  const allProductList = productData?.data || [];

  const meta = productData?.meta;

  const totalPages = meta?.totalPage || 1;
  const totalItems = meta?.total || 0;

  return (
    <div className="relative flex min-h-screen flex-col gap-0 overflow-hidden bg-white lg:gap-20">
      {/*========= header ==========*/}
      <CustomPageHeader
        pageTitle={"Product Details"}
        description={
          "Discover Every Detail - Ensuring Quality, Innovation, and Excellence in Every Product."
        }
      />

      {/*========== content ============ */}

      <div className="container mx-auto mb-10 max-w-[1536px] p-0 lg:mb-20 lg:p-4">
        <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-4 xl:p-0">
          {/*====== left filter section for big screen ====*/}
          <div className="lg:border-softGray col-span-1 border-r-transparent lg:border-r  ">
            <div className="flex gap-4">
              <div className="hidden w-[326px] xl:block xl:pr-3">
                <Category
                  selectedCat={selectedCat}
                  setSelectedCat={setSelectedCat}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                />
                <div className="flex flex-col justify-center gap-6"></div>
              </div>
            </div>
          </div>

          {/* product lists  & right section  */}
          <div className="col-span-3 p-6 px-0  ">
            <div className="hidden xl:block  ">
              <ProductTitleAndSort />
            </div>

            <div className="text-text my-6 text-3xl font-normal xl:hidden">
              <Breadcrumb />
            </div>

            {/* Product Cards */}

            {!isProductLoading && !allProductList?.length && <NoProductFound />}

            {isProductLoading ? (
              <div className="sc-500:grid-cols-2 grid grid-cols-1 gap-x-5 gap-y-10 pt-4 pb-22 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-16 lg:pt-12 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sc-500:grid-cols-2 grid grid-cols-1 gap-x-5 gap-y-10 pt-4 pb-22 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-16 lg:pt-12 xl:grid-cols-4">
                {allProductList?.length > 0 &&
                  allProductList.map((product: TProduct, index: number) => (
                    <div
                      key={product?.id || index}
                      className="relative cursor-pointer overflow-hidden"
                    >
                      <ProductCard {...product} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

const NoProductFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Icon */}
        <TbPackageOff className="text-6xl text-gray-400 md:text-7xl" />

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
          No Products Found
        </h2>

        {/* Subtext */}
        <p className="max-w-md text-gray-500">
          We couldn&apos;t find any products matching your search or selected
          category. Please try adjusting your filters or explore our full
          product collection.
        </p>
      </div>
    </div>
  );
};
