"use client";

import dynamic from "next/dynamic";
import loadingLottie from "../../../../public/animation/loading.json";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Player
        autoplay
        loop
        src={loadingLottie}
        className="w-[50%] lg:w-[30%]"
      />
    </div>
  );
}
