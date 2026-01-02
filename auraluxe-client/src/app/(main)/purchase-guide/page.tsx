import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Purchase Guide",
};
export default function PurchaseGuidePage() {
  const PurchaseGuide = dynamic(
    () => import("@/components/main/purchase-guide/PurchaseGuide"),
    {
      loading: () => <Loader />,
    }
  );
  return <PurchaseGuide />;
}
