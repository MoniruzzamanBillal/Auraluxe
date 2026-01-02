import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Auraluxe | Contact Us",
};
export default function ContactPage() {
  const ContactPage = dynamic(
    () => import("@/components/main/contact_page/ContactPage"),
    { loading: () => <Loader /> }
  );
  return <ContactPage />;
}
