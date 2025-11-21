import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  className?: string;
  alt?: string;
};

export default function RotateImage({
  className,
  image,
  alt = "image",
}: Props) {
  return (
    <div
      className={cn("shrink-0 group relative h-[345px] w-full max-w-[705px] mx-auto", className)}
    >
      {/* ===== overlay ====== */}
      <div className="border-brandMain h-full w-full -rotate-9 rounded-[25px] border"></div>
      <Image
        alt={alt}
        src={image}
        fill
        className="h-full w-full shrink-0 overflow-hidden rounded-[25px] object-cover transition-all duration-300 ease-in-out group-hover:-rotate-[4deg]"
      />
    </div>
  );
}
