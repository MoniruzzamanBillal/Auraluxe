"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsAlignCenter } from "react-icons/bs";
import { FaProductHunt, FaProjectDiagram } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBrand4Chan, TbCategory } from "react-icons/tb";

// import { logout } from "@/services/auth.service";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "../sidebar";

// import navLogo from "@/../public/logo-no-bg.png";
import headerLogo from "@/../public/dashboardHeaderImg.jpeg";
import navLogo from "@/../public/logo-no-bg.png";

const links = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LuLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Home Banner",
    href: "/admin/homepage_banner",
    icon: <BsAlignCenter className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Home Our Product",
    href: "/admin/homepage_our_product",
    icon: <BsAlignCenter className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Home Our Featured",
    href: "/admin/homepage_our_featured",
    icon: <BsAlignCenter className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Home Our Featured Product",
    href: "/admin/homepage_our_featured_product",
    icon: <BsAlignCenter className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Category",
    href: "/admin/category",
    icon: <TbCategory className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Brand Type",
    href: "/admin/brandType",
    icon: <TbBrand4Chan className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Brand",
    href: "/admin/brand",
    icon: <TbBrand4Chan className="h-5 w-5 shrink-0 text-neutral-200" />,
  },

  {
    label: "Product",
    href: "/admin/product",
    icon: <FaProductHunt className="h-5 w-5 shrink-0 text-neutral-200" />,
  },

  {
    label: "Key Brand",
    href: "/admin/key_Brands",
    icon: <TbBrand4Chan className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Material",
    href: "/admin/material",
    icon: <TbBrand4Chan className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Project Types",
    href: "/admin/project-types",
    icon: <TbBrand4Chan className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Project",
    href: "/admin/project",
    icon: <FaProjectDiagram className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
];

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    console.log("logout clicked!!!");

    // try {
    //   await logout();
    //   router.push("/login");
    // } catch (error) {
    //   console.error("Logout failed:", error);
    // }
  };
  return (
    <div
      className={cn(
        "flex h-screen w-full flex-1 flex-col rounded-md md:flex-row",
        "",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-black">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 mb-10 flex flex-col gap-2">
              {links.map((link, index) => (
                <SidebarLink key={index + 1} link={link} />
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <div className="">
            <button
              className="flex w-full shrink-0 cursor-pointer items-center gap-3 rounded-full text-white transition-colors duration-200 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut fontSize={20} />
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </div>

          {/* <div>
            <SidebarLink
              link={{
                label: "Mahfuz Islam",
                href: "#",
                icon: (
                  <Image
                    src={"/images/sidebar/mahfuz.JPG"}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div> */}
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="border-Tertiary bg-bg flex h-full w-full flex-1 flex-col gap-2 overflow-hidden overflow-y-scroll rounded-tl-2xl border p-2 md:px-10 md:py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <Image
        // src={"/images/logo/second_logo.png"}
        src={navLogo}
        alt="Logo"
        width={400}
        height={400}
        className="h-5 w-full object-contain"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      ></motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <Image
        src={headerLogo}
        alt="Logo"
        width={400}
        height={400}
        className="h-5 w-5"
      />
    </Link>
  );
};
