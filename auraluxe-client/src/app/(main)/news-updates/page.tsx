import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | News & Updates",
};
export default function NewsAndUpdates() {
  const NewsUpdates = dynamic(
    () => import("@/components/main/news-updates/NewsUpdates"),
    {
      loading: () => <Loader />,
    }
  );
  return <NewsUpdates />;
}
