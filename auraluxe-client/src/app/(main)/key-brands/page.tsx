import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Key Brands",
};
export default function KeyBrands() {
  const KeyBrands = dynamic(
    () => import("@/components/main/Key-brands/KeyBrands"),
    {
      loading: () => <Loader />,
    }
  );
  return <KeyBrands />;
}
