import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Brand",
};
export default function page() {
  const Brand = dynamic(() => import("@/components/admin/brand/Brand"), {
    loading: () => <Loader />,
  });
  return <Brand />;
}
