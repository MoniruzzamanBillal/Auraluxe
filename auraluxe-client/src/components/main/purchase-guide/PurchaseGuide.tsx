"use client";

import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import PurchaseGuideCards from "./PurchaseGuideCards";

export default function PurchaseGuide() {
  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Purchase Guide"}
        description={
          "Auraluxe reserves the right to update or modify these terms at any time"
        }
        image="/purchase_guide/purchase_header.jpg"
      />
      {/* ======= contents ======== */}
      <div className="lg:px-10 2xl:px-0">
        <PurchaseGuideCards />
      </div>
    </div>
  );
}
