import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Product Details",
};

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: IPageProps) {
  const { id } = await params;

  const ProductDetails = dynamic(
    () => import("@/components/main/product-details/ProductDetails"),
    {
      loading: () => <Loader />,
    },
  );

  return <ProductDetails id={id} />;
}
