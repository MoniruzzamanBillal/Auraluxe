import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Product",
};

export default async function ProductPage() {
  const Product = dynamic(() => import("@/components/main/product/Product"), {
    loading: () => <Loader />,
  });
  return <Product />;
}
