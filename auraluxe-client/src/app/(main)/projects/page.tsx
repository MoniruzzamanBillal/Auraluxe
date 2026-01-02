import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Project",
};

export default function ProjectsPage() {
  const Projects = dynamic(
    () => import("@/components/main/projects/Projects"),
    {
      loading: () => <Loader />,
    }
  );
  return <Projects />;
}
