import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import NewsUpdatesDescription from "./NewsUpdatesDescription";

export default function NewsUpdatesDetails() {
  return (
    <div className="flex min-h-screen flex-col gap-5 overflow-hidden bg-white md:gap-10">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"News & Updates"}
        description={
          "Auraluxe reserves the right to update or modify these terms at any time"
        }
        image="/news_updates/main_header.jpg"
      />
      {/* ======= contents ======== */}
      <div className="container flex flex-col gap-7 md:gap-11 lg:gap-16 mt-10 lg:mt-0 mb-10 lg:mb-20">
        {/*========= breadcrum ======== */}
        <>
          <Breadcrumb />
        </>
        {/*====== details ====== */}
        <>
          <NewsUpdatesDescription />
        </>
      </div>
    </div>
  );
}
