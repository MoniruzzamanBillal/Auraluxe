import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Material",
};
export default function page() {
  const Material = dynamic(
    () => import("@/components/admin/material/Material"),
    {
      loading: () => <Loader />,
    }
  );
  return <Material />;
}
