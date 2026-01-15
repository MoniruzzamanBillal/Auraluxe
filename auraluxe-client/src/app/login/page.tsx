import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tilottoma | Login",
};
export default function page() {
  const Login = dynamic(() => import("@/components/main/login/Login"), {
    loading: () => <Loader />,
  });
  return <Login />;
}
