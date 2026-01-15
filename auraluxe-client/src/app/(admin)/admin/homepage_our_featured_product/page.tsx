import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Homepage Our Featured",
};
export default function page() {
  const HomePageOurFeaturedProduct = dynamic(
    () =>
      import(
        "@/components/admin/homepage_our_featured_product/HomePageOurFeaturedProduct"
      ),
    {
      loading: () => <Loader />,
    }
  );
  return <HomePageOurFeaturedProduct />;
}
