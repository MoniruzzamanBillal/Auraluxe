import AutoSlider from "./AutoSlider";
import Elevating from "./Elevating";
import FeturedProducts from "./FeturedProducts";
import OurFeatures from "./OurFeatures";
import OurProducts from "./OurProducts";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-5 lg:gap-16">
      {/*========= first slider ======= */}
      <AutoSlider />

      {/* ======= our products =========== */}
      <OurProducts />

      {/*=== our features ==========*/}
      <div className="sc-500:my-10 my-5 md:my-20">
        <OurFeatures />
      </div>

      {/* ======= Elevating ========== */}
      <div className="">
        <Elevating />
      </div>

      {/*======= featured products ======== */}
      <div className="mb-5 lg:mb-10">
        <FeturedProducts />
      </div>
    </div>
  );
}
