import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Brand Type Setup",
};
export default function page() {
  const BrandTypeSetup = dynamic(
    () => import("@/components/admin/BrandType/BrandType"),
    {
      loading: () => <Loader />,
    }
  );
  return <BrandTypeSetup />;
}
