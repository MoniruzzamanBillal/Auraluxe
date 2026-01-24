import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluze | Order history",
};

export default function page() {
  const UserOrderHistory = dynamic(
    () => import("@/components/user/orderHistory/UserOrderHistory"),
    {
      loading: () => <Loader />,
    },
  );

  return <UserOrderHistory />;
}
