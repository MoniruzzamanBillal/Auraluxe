import dynamic from "next/dynamic";

export default function page() {
  const LandingPage = dynamic(
    () => import("@/components/main/landingPage/LandingPage"),
    { loading: () => <p>loading....</p> }
  );

  return <LandingPage />;
}
