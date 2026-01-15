import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Homepage Our Product",
};
export default function page() {
  const HomePageOurProduct = dynamic(
    () => import("@/components/admin/homepage_our_product/HomePageOurProduct"),
    {
      loading: () => <Loader />,
    }
  );
  return <HomePageOurProduct />;
}
