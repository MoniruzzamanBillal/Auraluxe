"use client";

import Breadcrumb from "@/components/share/Breadcrumb";

import { TProduct } from "@/components/admin/product/schema/product.schema";
import CustomProductCarousel from "@/components/share/carousel/CustomProductCarousel";
import { useFetchData } from "@/hooks/useApi";

import { dummyProductData } from "../../../../data/productData";
import ProductDetailGallery from "./ProductDetailGallery";
import ProductDetailInfo from "./ProductDetailInfo";

export type TProductDetail = TProduct & {
  brand: {
    id: string;
    name: string;
    logo: string;
  };

  category: {
    id: string;
    name: string;
  };
};

export default function ProductDetails({ id }: { id: string }) {
  const { data: productDetailData, isLoading: isProductLoading } = useFetchData(
    [`product-detail-${id}`],
    `/product/${id}`,
    {
      enabled: !!id,
    },
  );

  if (isProductLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!productDetailData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="sc-500:pb-32 min-h-screen bg-white pb-20">
      <div className="container">
        <div className="pt-14 lg:pt-6">
          <Breadcrumb />
        </div>

        {/*========= top , project detail section ========*/}
        <section className="projectDetailContainer sc-500:gap-16 sc-laptop:gap-26 flex flex-col justify-between gap-10 pt-6 lg:flex-row">
          {/*======== left , project image section  ========*/}
          <div className="projectImage w-full lg:w-[50%]">
            <ProductDetailGallery
              ProductImage={productDetailData?.data?.productImage}
            />
          </div>

          {/*======== right , project detail section  */}
          <div className="projectDetail w-full lg:w-[50%]">
            <ProductDetailInfo
              productData={productDetailData?.data as TProductDetail}
            />
          </div>
        </section>

        {/* {/* description - start  */}
        <div className="mt-6 py-6 ">
          <div
            className=" textEditor "
            dangerouslySetInnerHTML={{
              __html: productDetailData?.data?.productDes,
            }}
          ></div>
        </div>

        {/*======== related product section  ========*/}
        <section className="mt-22">
          <CustomProductCarousel
            data={dummyProductData}
            title={"Related Products"}
          />
        </section>
      </div>
    </div>
  );
}
