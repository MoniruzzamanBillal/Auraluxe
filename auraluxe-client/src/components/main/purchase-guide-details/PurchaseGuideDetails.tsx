import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import PgDetails from "./PgDetails";

export default function PurchaseGuideDetails() {
  return (
    <div className="flex min-h-screen flex-col gap-5 overflow-hidden bg-white md:gap-10">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Purchase Guide"}
        description={
          "Auraluxe reserves the right to update or modify these terms at any time"
        }
        image="/purchase_guide/purchase_header.jpg"
      />
      {/* ======= contents ======== */}
      <div className="container flex flex-col gap-7 md:gap-11 lg:gap-16 mt-10 lg:mt-0">
        {/*========= breadcrum ======== */}
        <>
          <Breadcrumb />
        </>
        {/*====== details ====== */}
        <>
          <PgDetails />
        </>
      </div>
    </div>
  );
}
