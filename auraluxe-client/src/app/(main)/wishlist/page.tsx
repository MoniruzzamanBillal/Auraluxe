import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Wishlist",
};
export default function WishlistPage() {
  const WishList = dynamic(
    () => import("@/components/main/wishlist/WishList"),
    {
      loading: () => <Loader />,
    }
  );
  return <WishList />;
}
