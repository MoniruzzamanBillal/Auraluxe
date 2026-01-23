import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Key Brands",
};
export default function page() {
  const KeyBrand = dynamic(
    () => import("@/components/admin/Key_Brands/KeyBrand"),
    {
      loading: () => <Loader />,
    },
  );
  return <KeyBrand />;
}
