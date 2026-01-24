"use client";

import Breadcrumb from "@/components/share/Breadcrumb";

const ProductTitleAndSort = () => {
  return (
    <div className="flex items-center justify-between">
      {/*  */}
      <div className="hidden text-3xl font-normal xl:block">
        <Breadcrumb />
      </div>
    </div>
  );
};

export default ProductTitleAndSort;
