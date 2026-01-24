"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsAlignCenter } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import headerLogo from "@/../public/dashboardHeaderImg.jpeg";
import navLogo from "@/../public/logo-no-bg.png";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { logout } from "@/services/auth.service";

const links = [
  {
    label: "Profile",
    href: "/user/profile",
    icon: <FaUserCircle className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
  {
    label: "Order History",
    href: "/user/order_history",
    icon: <BsAlignCenter className="h-5 w-5 shrink-0 text-neutral-200" />,
  },
];

export default function UserDashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    console.log("logout clicked!!!");

    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
