import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Project",
};
export default function page() {
  const Project = dynamic(() => import("@/components/admin/project/Project"), {
    loading: () => <Loader />,
  });
  return <Project />;
}
