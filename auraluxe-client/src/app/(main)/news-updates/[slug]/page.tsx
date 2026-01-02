import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | News & Updates Details",
};

interface IPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsAndUpdatesDetailsPage({
  params,
}: IPageProps) {
  const { slug } = await params;

  const NewsUpdatesDetails = dynamic(
    () => import("@/components/main/news-updates-details/NewsUpdatesDetails"),
    {
      loading: () => <Loader />,
    }
  );
  return <NewsUpdatesDetails />;
}
