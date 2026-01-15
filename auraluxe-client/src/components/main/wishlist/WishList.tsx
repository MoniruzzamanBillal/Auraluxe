import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Heading from "@/components/share/common/Heading";
import WishListTable from "./WishListTable";

export default function WishList() {
  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Career"}
        description={
          "Join Our Team - Build Your Future with Innovation, Growth, and Excellence."
        }
      />

      {/* ======= contents ======== */}
      <div className="container flex max-w-[1536px] flex-col gap-16 lg:gap-24">
        {/* ====== breadcrumb ======= */}
        <Breadcrumb />

        {/* ======= heading ====== */}
        <div className="relative z-100 lg:px-10 2xl:px-0">
          <Heading
            firstText="Our"
            secondText="My Wishlist"
            backText="Wishlist"
            descripiton="Your Wishlist is the ultimate space for saving and organizing your favorite interior selections, combining convenience, inspiration, and functionality."
          />
        </div>

        {/* ======== wishlist table ======= */}
        <div className="container max-w-[1536px]">
          <WishListTable />
        </div>
      </div>
    </div>
  );
}
