import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Props = {
  image?: string;
  pageTitle: string;
  description: string;
};

export default function CustomPageHeader({
  image = "/images/key_brands/main_banner.jpg",
  pageTitle,
  description,
}: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className={`relative h-[200px] max-h-[480px] min-h-[126px] bg-cover bg-center bg-no-repeat sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-screen`}
    >
      {/*======= overlay =======*/}
      <div className="absolute inset-0 h-full w-full bg-black/70"></div>
      {/* ====== logo ======= */}
      <div className="absolute right-[50%] -bottom-3 h-6 w-6 translate-x-[50%] overflow-hidden rounded-full bg-white sm:-bottom-3.5 sm:h-[35px] sm:w-[35px] md:-bottom-5.5 md:h-[45px] md:w-[45px] lg:-bottom-7.5 lg:h-[60px] lg:w-[60px] xl:-bottom-9 xl:h-[71px] xl:w-[71px]">
        <Image
          alt="tilottoma Logo"
          src={"/images/logo/page_header_logo.png"}
          height={400}
          width={400}
          className="scale-110 object-fill"
        />
      </div>

      {/* ======= contents ======= */}
      <div className="sc-500:px-10 relative container flex h-full flex-col justify-center gap-4 text-white sm:justify-center sm:gap-7.5 md:gap-12 lg:gap-16 xl:gap-20">
        <div className="relative">
          {/* ===== description ======== */}
          <div className="absolute -bottom-1.5 flex items-center gap-4 sm:-bottom-3 md:-bottom-4 xl:-bottom-8">
            <p className="sc-500:w-[30px] sc-500:h-[2px] bg-brandMain h-[1px] w-[22px] max-w-[113px] sm:w-[50px] md:h-[2px] md:w-[60px] lg:h-[3px] lg:w-[90px] xl:w-[113px]" />
            <p className="hidden text-xs sm:block md:text-sm xl:text-lg">
              {description}
            </p>
          </div>
          {/* ========= page name ========== */}
          <p className="text-xl leading-6 font-bold text-white sm:text-4xl sm:leading-[52px] lg:text-5xl lg:leading-[72px] xl:text-6xl">
            {pageTitle}
          </p>
        </div>
        {/* ======= connect ====== */}
        <div className="flex items-center gap-3 pb-5 md:pb-0">
          <p className="text-xs leading-3.5 font-normal md:text-sm lg:text-lg">
            Connect with us:
          </p>
          {/* ======= social ==== */}
          <div className="flex items-center space-x-2 text-white">
            <Link
              href="#"
              aria-label="Facebook"
              className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
            >
              <FaFacebookF className="text-[10px] group-hover:text-black md:text-sm" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
            >
              <FaInstagram className="text-[10px] group-hover:text-black md:text-sm" />
            </Link>
            <Link
              href="#"
              aria-label="Linkedin"
              className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
            >
              <FaLinkedinIn className="text-[10px] group-hover:text-black md:text-sm" />
            </Link>
            <Link
              href="#"
              aria-label="X"
              className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
            >
              <FaXTwitter className="text-[10px] group-hover:text-black md:text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
