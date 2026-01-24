import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Portfolio",
};
export default function ProjectPortfolio() {
  const ProjectPortfolioDetails = dynamic(
    () =>
      import("@/components/main/project-portfolio-details/PortfolioDetails"),
    {
      loading: () => <Loader />,
    },
  );
  return <ProjectPortfolioDetails />;
}
