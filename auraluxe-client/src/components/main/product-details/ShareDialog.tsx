"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import shareIcon from "../../../../public/icons/Share.png";
import twitterIcon from "../../../../public/icons/devicon_twitter.png";
import facebookIcon from "../../../../public/icons/logos_facebook.png";
import copyIcon from "../../../../public/icons/lucide_copy.png";
import modalShareIcon from "../../../../public/icons/modalShare.png";
import instagramIcon from "../../../../public/icons/skill-icons_instagram.png";
import linkedinIcon from "../../../../public/icons/skill-icons_linkedin.png";
import SocialLinkCard from "./SocialLinkCard";

const ShareDialog = () => {
  const pathName = usePathname();
  const [fullUrl, setFullUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathName}`);
    }
  }, [pathName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsLinkCopied(true);
    } catch (error) {
      console.error("Failed to copy link:", error);
      setIsLinkCopied(false);
    }
  };

  const socialBtn = [
    {
      id: 1,
      title: "Facebook",
      icon: facebookIcon,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      id: 2,
      title: "Instagram",
      icon: instagramIcon,
      // Instagram doesn’t support direct web sharing
      shareUrl: `https://www.instagram.com/`,
    },
    {
      id: 3,
      title: "Twitter",
      icon: twitterIcon,
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=Check%20this%20out!`,
    },
    {
      id: 4,
      title: "LinkedIn",
      icon: linkedinIcon,
      shareUrl: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}`,
    },
  ];

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setIsLinkCopied(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="border-textBlack text-textBlack flex h-12 w-[155px] cursor-pointer justify-center gap-x-3 rounded-lg border bg-white py-4 hover:bg-gray-100">
          <span className="size-6">
            <Image
              alt="share icon"
              src={shareIcon}
              height={21}
              width={20}
              className="h-full w-full shrink-0"
            />
          </span>
          <span className="font-medium"> Share </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-[350px] w-[418px] rounded-lg bg-white"
        // closeIconClassName="hidden"
      >
        <DialogHeader className="">
          <DialogTitle className="flex items-center justify-between">
            {/* left title  */}

            <div className="flex items-center gap-x-3">
              <span className="size-5">
                <Image
                  alt="share icon"
                  src={modalShareIcon}
                  height={21}
                  width={20}
                  className="h-full w-full shrink-0"
                />
              </span>

              <span className="text-textBlack text-xl font-medium">
                Share this content{" "}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* body section  */}
        <div className="grid grid-cols-2 gap-4">
          {/* social links section  */}
          {socialBtn?.map((item) => (
            <SocialLinkCard key={item?.id} {...item} />
          ))}
        </div>

        <p className="text-black5 text-sm font-semibold">Or copy link</p>

        {/* link section  */}
        <div className="bg-lightNeutral flex w-auto items-center gap-x-5 rounded-lg px-3 py-5">
          <p className="text-black5 w-[70%] overflow-hidden text-sm">
            {fullUrl?.length > 29 ? `${fullUrl?.slice(0, 29)}...` : fullUrl}
          </p>

          {/* ======= copy button =========== */}
          <button
            onClick={handleCopy}
            className="flex w-[30%] cursor-pointer items-center gap-x-2.5 rounded-lg border border-[#D9D9D9] bg-white px-3 py-2"
          >
            <span className="size-4">
              <Image
                alt="copyIcon"
                src={copyIcon}
                height={21}
                width={20}
                className="h-full w-full shrink-0"
              />
            </span>

            <span className="text-black3 text-sm font-semibold">
              {isLinkCopied ? "Copied" : "Copy"}{" "}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
