"use client";

import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Pagination from "@/components/share/pagination/Pagination";
import { useState } from "react";
import PurchaseGuideCards from "./PurchaseGuideCards";

export default function PurchaseGuide() {
  const [page, setPage] = useState(1);

  const currentPage = 1;
  const totalPages = 8;
  const isProductLoading = false;

  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Purchase Guide"}
        description={
          "Tilottoma.com reserves the right to update or modify these terms at any time"
        }
        image="/purchase_guide/purchase_header.jpg"
      />
      {/* ======= contents ======== */}
      <div className="lg:px-10 2xl:px-0">
        <PurchaseGuideCards />
      </div>

      {/* ===== pagination ====== */}
      <div className="pb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isProductLoading}
        />
      </div>
    </div>
  );
}
