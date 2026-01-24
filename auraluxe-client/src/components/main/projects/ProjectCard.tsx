import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  id: string;
  location: string;
  image: string;
  className?: string;
  imageDivClass?: string;
};

export default function ProjectCard({
  name,
  location,
  image,
  id,
  className,
  imageDivClass,
}: Props) {
  return (
    <Link
      href={`/projects/${id}`}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg shadow-lg md:max-w-[460px] bg-gray-100 ",
        className,
      )}
    >
      {/* ====== image ===== */}
      <div
        className={cn(
          "relative h-[30vh] max-h-[464px] w-full transition-all duration-1000 ease-in-out group-hover:scale-105 md:h-[35vh] lg:h-screen",
          imageDivClass,
        )}
      >
        {/* ===== overlay ======= */}
        <div className="absolute inset-0 left-full h-full w-full bg-black/30 transition-all duration-1000 ease-in-out group-hover:left-0" />
        <Image
          alt={name}
          src={image}
          height={464}
          width={460}
          className="h-full w-full shrink-0 object-cover"
        />
      </div>
      {/* ======== content ========= */}
      <div className="px-5 py-5">
        <p className="text-charcoolGray line-clamp-1 text-base font-bold lg:text-xl lg:leading-7">
          {name}
        </p>
        <p className="text-charcoolGray line-clamp-1 text-xs font-normal lg:text-sm lg:leading-5">
          {location}
        </p>
      </div>
    </Link>
  );
}
