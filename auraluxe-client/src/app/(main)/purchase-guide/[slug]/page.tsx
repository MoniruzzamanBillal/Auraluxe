import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Purchase Guide Details",
};
export default function PurchaseGuideDetailsPage() {
  const PurchaseGuideDetails = dynamic(
    () =>
      import("@/components/main/purchase-guide-details/PurchaseGuideDetails"),
    {
      loading: () => <Loader />,
    }
  );
  return <PurchaseGuideDetails />;
}
