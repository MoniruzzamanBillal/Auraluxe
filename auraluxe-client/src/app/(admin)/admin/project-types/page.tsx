import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Project Type Setup",
};
export default function page() {
  const ProjectType = dynamic(
    () => import("@/components/admin/ProjectType/ProjectType"),
    {
      loading: () => <Loader />,
    }
  );
  return <ProjectType />;
}
