import Navbar from "@/components/share/navBar/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#F0EEEE] min-h-screen ">
      <Navbar />

      {children}
    </div>
  );
}
