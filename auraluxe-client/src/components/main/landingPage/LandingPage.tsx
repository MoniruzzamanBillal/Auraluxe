import AutoSlider from "./AutoSlider";
import OurProducts from "./OurProducts";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-5 lg:gap-16">
      {/*========= first slider ======= */}
      <AutoSlider />

      {/* ======= our products =========== */}
      <OurProducts />
    </div>
  );
}
