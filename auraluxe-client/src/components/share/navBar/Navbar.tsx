/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const navInfo = [
  {
    navName: "Products",
    children: [
      {
        name: "Bath & Spa Solution",
        href: `/product?category=${encodeURIComponent("Bath and Spa Solution")}`,
      },
      {
        name: "Wall & Floor Solutions",
        href: `/product?category=${encodeURIComponent("Wall and Floor Solutions")}`,
      },
      {
        name: "Modular Kitchen Solutions",
        href: `/product?category=${encodeURIComponent("Modular Kitchen Solutions")}`,
      },
      {
        name: "Heating Solutions",
        href: `/product?category=${encodeURIComponent("Heating Solutions")}`,
      },
      {
        name: "Architectural Hardware",
        href: `/product?category=${encodeURIComponent("Architectural Hardware")}`,
      },
      {
        name: "Industrial Solutions",
        href: `/product?category=${encodeURIComponent("Industrial Solutions")}`,
      },
    ],
  },
  {
    navName: "Studio",
    children: [
      {
        name: "News & Updates",
        href: "/news-updates",
      },
      {
        name: "Our Stories",
        href: "/our-stories",
      },
      {
        name: "Contact Us",
        href: "/contact",
      },
    ],
  },
  {
    navName: "Projects",
    children: [
      {
        name: "Commercial Complex",
        href: "/projects",
      },
      {
        name: "Hotels and Resorts",
        href: "/projects",
      },
      {
        name: "Education",
        href: "/projects",
      },
      {
        name: "Premium Residence",
        href: "/projects",
      },
      {
        name: "Architectural Hardware",
        href: "/projects",
      },
      {
        name: "Industrial Solutions",
        href: "/projects",
      },
    ],
  },
  {
    navName: "Connects",
    children: [
      {
        name: "Purchase Guide",
        href: "/purchase-guide",
      },
      {
        name: "Brand Catalouge",
        href: "/",
      },
      {
        name: "Key Brands",
        href: "/key-brands",
      },
    ],
  },
];

import navLogo from "@/../public/logo-no-bg.png";
import wishlistLogo from "@/../public/icons/wishlist_icon.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleMouseEnter = (productName: string) => {
    setActiveProduct(productName);
  };

  const handleMouseLeave = () => {
    setActiveProduct(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="print:hidden">
      <div className="h-12 bg-white lg:h-20"></div>
      <div
        className={`navbar fixed top-0 left-0 z-[1000] h-12 w-full bg-white/60 font-semibold text-black shadow-md backdrop-blur-md lg:h-20`}
      >
        <div className="relative h-full">
          <div className="container h-full w-full lg:px-10 2xl:px-0">
            <div className="flex h-full w-full items-center justify-between">
              {/* ====== logo ======= */}
              <div>
                <Link href={"/"}>
                  <div className="my-5 hidden items-center lg:flex">
                    <Image
                      alt="tilottoma Logo"
                      src={navLogo}
                      height={150}
                      width={150}
                      className="shrink-0"
                    />
                  </div>
                </Link>

                {/* ====== small screen ======= */}
                <Link href={"/"}>
                  <div className="my-5 flex items-center lg:hidden">
                    <Image
                      alt="tilottoma Logo"
                      src={navLogo}
                      height={20}
                      width={90}
                      className="shrink-0"
                    />
                  </div>
                </Link>
              </div>

              {/* ============ navigations ========== */}
              <NavigationMenu
                className="hidden w-full lg:block"
                viewport={false}
              >
                <NavigationMenuList className="flex gap-12">
                  {navInfo?.map((list, firstIndex) => (
                    <NavigationMenuItem key={firstIndex + 1}>
                      <NavigationMenuTrigger className="cursor-pointer">
                        <div
                          className={`text-sm leading-5 font-medium text-black ${
                            pathName === " " && "text-brandColor"
                          }`}
                        >
                          {list?.navName}
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        onMouseLeave={handleMouseLeave}
                        // !top-16 (64px) bg-bgSoftGray
                        className="absolute !top-6 -left-28 z-[1000] w-[330px] !rounded-none !border-none p-0 !shadow-none"
                      >
                        {/* <div className="bg-bgSoftGray flex h-full w-[330px]"> */}
                        <div className="bg-bgSoftGray mt-9 flex h-full w-[330px] shadow-2xl">
                          <div className="relative flex w-full flex-col gap-4 py-5">
                            {list?.children?.map((product, secIndex) => (
                              <Link
                                key={product.name}
                                href={`${product.href}`}
                                className={`border-b-softGray border-b ${
                                  secIndex === list.children.length - 1 &&
                                  "border-none"
                                }`}
                              >
                                <div
                                  className={`hover:text-brandColor text-charcoolGray flex cursor-pointer items-center justify-between px-5 text-sm leading-5 font-medium ${
                                    secIndex === list.children.length - 1
                                      ? "pb-0"
                                      : "pb-4"
                                  }`}
                                  // onMouseEnter={() =>
                                  //   handleMouseEnter(product.name)
                                  // }
                                >
                                  {product.name}
                                  {/* {product?.submenu &&
                                  product?.submenu.length > 0 && (
                                    <IoIosArrowDown className="text-brandColor group-hover:text-white transition-transform duration-300 group-hover:-rotate-90 tran" />
                                  )} */}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="bg-deepRed absolute bottom-0 h-1.5 w-full"></div>
                          {/* ====== submenu ======= */}
                          {/* <div className="h-full pl-[50px]">
                          {activeProduct &&
                            expertiseInfo
                              .find((product) => product.name === activeProduct)
                              ?.submenu?.map((submenuItem) => (
                                <Link
                                  key={submenuItem.name}
                                  href={submenuItem.path}
                                >
                                  <div className="p-2 hover:text-brandColor cursor-pointer">
                                    {submenuItem.name}
                                  </div>
                                </Link>
                              ))}
                        </div> */}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              {/*========= wish list button ======== */}
              <Link
                href={"/wishlist"}
                className="hidden w-[20px] cursor-pointer lg:block"
              >
                <Image
                  alt="wishlist icon"
                  src={wishlistLogo}
                  height={21}
                  width={20}
                  className="shrink-0"
                />
              </Link>

              {/*====== small screen navbar =========*/}
              <div className="transition-all duration-300 lg:hidden">
                {isMobileMenuOpen ? (
                  <IoClose
                    className="hover:text-brandColor text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ) : (
                  <HiOutlineBars3
                    className="hover:text-brandColor cursor-pointer lg:hidden"
                    size={20}
                    onClick={toggleMobileMenu}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToggleNavbar
        isOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        pathName={pathName}
      /> */}
    </div>
  );
};

export default Navbar;
