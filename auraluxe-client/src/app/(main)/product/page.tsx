import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Product",
};

type IPageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function ProductPage({ searchParams }: IPageProps) {
  const resolvesParams = await searchParams;

  const entries = Object.entries(resolvesParams);

  const [queryKey, queryValue] =
    entries?.length > 0 ? entries[0] : [null, null];

  const Product = dynamic(() => import("@/components/main/product/Product"), {
    loading: () => <Loader />,
  });
  return <Product query={`${queryKey}=${queryValue}`} />;
}
