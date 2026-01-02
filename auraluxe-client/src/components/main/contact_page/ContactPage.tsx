import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import ContactPageDetails from "./ContactPageDetails";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Get in Touch"}
        description={
          "Reach Out to Us for Any Assistance - Your Satisfaction is Our Priority."
        }
      />
      {/* ======= contents ======== */}
      <div className="lg:px-10 2xl:px-0">
        <ContactPageDetails />
      </div>
    </div>
  );
}
