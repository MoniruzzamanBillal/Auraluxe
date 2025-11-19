import Navbar from "@/components/share/navBar/Navbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-y-auto bg-[#F0EEEE]">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default layout;
