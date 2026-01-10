"use client";

import Breadcrumb from "@/components/share/Breadcrumb";

import { useEffect, useState } from "react";

import CustomProductCarousel from "@/components/share/carousel/CustomProductCarousel";
import useRecentProduct from "@/hooks/useRecentProduct";
import { StaticImageData } from "next/image";
import { dummyProductData } from "../../../../data/productData";
import ProductDetailGallery from "./ProductDetailGallery";
import ProductDetailInfo from "./ProductDetailInfo";

const keyFeatures = [
  {
    id: 1,
    key: "Model",
    value: "538.01.441",
  },
  {
    id: 2,
    key: "Volume oven cavity",
    value: "28L",
  },
  {
    id: 3,
    key: "Enamel",
    value: "High temperature resistant enameling",
  },
  {
    id: 4,
    key: "Product Dimensions (WXDXH)",
    value: "595mm X 595mm X 568mm",
  },
  {
    id: 5,
    key: "Categories",
    value: "Appliances, Modular Kitchen Solutions, Oven",
  },
];

const ColorsData = [
  {
    id: 1,
    label: "Silver",
    bg: "#BBB1AF",
  },
  {
    id: 2,
    label: "Black",
    bg: "#000000",
  },
  {
    id: 3,
    label: "Amber",
    bg: "#C28558",
  },
];

export default function ProductDetails({ slug }: { slug: string }) {
  const [selectedColor, setSelectedColor] = useState("Silver");
  const [selectedImage, setSelectedImage] = useState<StaticImageData>();

  const productDetail = dummyProductData?.find(
    (product) => product?.slug === slug
  );

  const { addToRecentProducts, getRecentProductsExcluding, isInitialized } =
    useRecentProduct();

  // console.log(productDetail);

  useEffect(() => {
    if (!productDetail) return;

    setSelectedImage(productDetail?.images[0]);

    const recentProductData = {
      _id: productDetail._id,
      name: productDetail.name,
      slug: productDetail.slug,
      images: productDetail.images,
      code: productDetail?.code,
      brandName: productDetail?.brand?.name,
      price: productDetail?.price,
    };

    addToRecentProducts(recentProductData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  const recentlyViewedProducts =
    isInitialized && productDetail
      ? getRecentProductsExcluding(productDetail?._id)
      : [];

  // console.log(recentlyViewedProducts);

  if (!productDetail) {
    return <p>Failed to fetch dummy data !!!!</p>;
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
              ProductImages={productDetail?.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          {/*======== right , project detail section  */}
          <div className="projectDetail w-full lg:w-[50%]">
            <ProductDetailInfo
              brandLogo={productDetail?.brand?.logo}
              productName={productDetail?.name}
              selectedColor={selectedColor}
              ColorsData={ColorsData}
              setSelectedColor={setSelectedColor}
              keyFeatures={keyFeatures}
              productData={productDetail}
            />
          </div>
        </section>

        {/*======== related product section  ========*/}
        <section className="mt-22">
          <CustomProductCarousel
            data={dummyProductData}
            title={"Related Products"}
          />
        </section>

        {/*====== recently viewed product ======= */}
        {recentlyViewedProducts?.length > 0 && (
          <section>
            <CustomProductCarousel
              data={recentlyViewedProducts}
              title={"Recently Viewed"}
            />
          </section>
        )}
      </div>
    </div>
  );
}
