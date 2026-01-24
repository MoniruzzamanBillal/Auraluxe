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

// Updated navInfo structure
const navInfo = [
  {
    navName: "Products",
    href: "/product",
  },
  {
    navName: "Studio",
    children: [
      {
        name: "News & Updates",
        href: "/news-updates",
      },
      {
        name: "Contact Us",
        href: "/contact",
      },
    ],
  },
  {
    navName: "Projects",
    href: "/about",
  },
  {
    navName: "Connects",
    children: [
      {
        name: "Purchase Guide",
        href: "/purchase-guide",
      },
      {
        name: "Key Brands",
        href: "/key-brands",
      },
    ],
  },
];

import navLogo from "@/../public/logo-no-bg.png";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth.service";
import { ShoppingCart } from "lucide-react";
import { LuUser } from "react-icons/lu";

const Navbar = () => {
  const userData = getUserInfo();

  console.log("user data = ", userData);

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

  const getProfileUrl = () => {
    if (!userData) return "/login";

    switch (userData.role) {
      case "admin":
        return "/admin/profile";
      case "user":
        return "/user/profile";
      default:
        return "/";
    }
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
                  {navInfo?.map((list, index) => (
                    <NavigationMenuItem key={index}>
                      {list.children ? (
                        <>
                          <NavigationMenuTrigger className="cursor-pointer">
                            <div
                              className={`text-sm leading-5 font-medium text-black ${
                                pathName === list.href && "text-brandColor"
                              }`}
                            >
                              {list.navName}
                            </div>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent
                            onMouseLeave={handleMouseLeave}
                            className="absolute !top-6 -left-28 z-[1000] w-[330px] !rounded-none !border-none p-0 !shadow-none"
                          >
                            <div className="bg-bgSoftGray mt-9 flex h-full w-[330px] shadow-2xl">
                              <div className="relative flex w-full flex-col gap-4 py-5">
                                {list.children?.map((product, secIndex) => (
                                  <Link
                                    key={product.name}
                                    href={product.href}
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
                                    >
                                      {product.name}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="bg-deepRed absolute bottom-0 h-1.5 w-full"></div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link href={list.href || "#"}>
                          <div
                            className={`text-sm leading-5 font-medium text-black hover:text-brandColor cursor-pointer ${
                              pathName === list.href && "text-brandColor"
                            }`}
                          >
                            {list.navName}
                          </div>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              {/*========= right section button ======== */}
              <div className=" flex items-center gap-x-8 ">
                <Link
                  href={"/cart"}
                  className="hidden w-[20px] cursor-pointer lg:block"
                >
                  <ShoppingCart />
                </Link>

                {!userData ? (
                  <Link href={"/login"}>
                    <Button className=" -z-[1] text-xs sm:text-sm md:text-base bg-prime50 hover:bg-prime100 ">
                      Sign in
                    </Button>
                  </Link>
                ) : (
                  <div className="relative">
                    <Link
                      href={getProfileUrl()}
                      className="inline-block p-2 rounded-full bg-orange-100 cursor-pointer hover:bg-orange-200 transition-colors"
                      title={
                        userData.role === "admin"
                          ? "Admin Profile"
                          : "User Profile"
                      }
                    >
                      <LuUser className="text-2xl font-bold text-gray-800" />
                    </Link>
                  </div>
                )}
              </div>

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
    </div>
  );
};

export default Navbar;
