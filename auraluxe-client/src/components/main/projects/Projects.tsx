"use client";
import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Heading from "@/components/share/common/Heading";
import { useSearchParams } from "next/navigation";
import ProjectLists from "./ProjectLists";

export default function Projects() {
  const searchParams = useSearchParams();
  const projectTypeFromURL = searchParams.get("type") || "";
  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Projects"}
        description={
          "Tilottoma.com reserves the right to update or modify these terms at any time"
        }
      />

      {/* ======= contents ======== */}
      <div className="container flex max-w-[1536px] flex-col gap-24">
        {/* ====== breadcrumb ======= */}
        <Breadcrumb />

        {/* ======= heading ====== */}
        <div className="relative z-100 lg:px-10 2xl:px-0">
          <Heading
            firstText="Our"
            secondText="Projects"
            backText="Projects"
            descripiton="Explore Our Projects—where innovation meets excellence. Discover how we bring ideas to life through creativity, craftsmanship, and cutting-edge solutions."
          />
        </div>

        {/* ======== projects list ======= */}
        <div className="container mb-20 max-w-[1460px] sm:mt-10">
          <ProjectLists initialProjectType={projectTypeFromURL} />
        </div>
      </div>
    </div>
  );
}
