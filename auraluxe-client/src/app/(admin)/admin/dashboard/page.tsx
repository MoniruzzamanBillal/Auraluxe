import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Dashboard",
};
export default function page() {
  const Dashboard = dynamic(
    () => import("@/components/admin/dashboard/Dashboard"),
    {
      loading: () => <Loader />,
    },
  );
  return <Dashboard />;
}
