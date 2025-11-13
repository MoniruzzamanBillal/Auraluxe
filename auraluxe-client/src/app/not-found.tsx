"use client";

import Image from "next/image";
import Link from "next/link";

import notFoundImage from "@/../public/notFound.png";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white">
      {/* ======== image ========= */}
      <div>
        <Image
          alt="not found"
          src={notFoundImage}
          height={1080}
          width={1920}
          className="h-full w-full shrink-0 object-cover"
        />
      </div>

      <p className="max-w-[790px] text-center text-base leading-7 font-medium tracking-[1%] text-black">
        Page not found—just like that matching basin you saw last week. Head
        back to our homepage to explore all our solutions.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[linear-gradient(86.72deg,#2F0101_33.15%,#950303_107.88%)] px-7 py-3 text-white"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}
