import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluze | Profile",
};

export default function page() {
  const UserProfile = dynamic(
    () => import("@/components/user/userProfile/UserProfile"),
    {
      loading: () => <Loader />,
    },
  );

  return <UserProfile />;
}
