import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Homepage Banner",
};
export default function page() {
  const HomePageBanner = dynamic(
    () => import("@/components/admin/homepage_banner/HomePageBanner"),
    {
      loading: () => <Loader />,
    },
  );
  return <HomePageBanner />;
}
