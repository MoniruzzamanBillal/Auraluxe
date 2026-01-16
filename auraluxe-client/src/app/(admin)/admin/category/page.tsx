import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Category",
};
export default function page() {
  const Category = dynamic(
    () => import("@/components/admin/category/Category"),
    {
      loading: () => <Loader />,
    }
  );
  return <Category />;
}
