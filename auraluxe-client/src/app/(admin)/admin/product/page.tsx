import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Product",
};
export default function page() {
  const ProductSetup = dynamic(
    () => import("@/components/admin/product/Product"),
    {
      loading: () => <Loader />,
    },
  );
  return <ProductSetup />;
}
