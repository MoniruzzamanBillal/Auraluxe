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
import modalShareIcon from "../../../../public/icons/modalShare.png";
import instagramIcon from "../../../../public/icons/skill-icons_instagram.png";
import linkedinIcon from "../../../../public/icons/skill-icons_linkedin.png";
import SocialLinkCard from "./SocialLinkCard";

const ShareDialog = () => {
  const pathName = usePathname();
  const [fullUrl, setFullUrl] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathName}`);
    }
  }, [pathName]);

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
        className=" rounded-lg bg-white"
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
        <div className="grid grid-cols-2 gap-y-10 ">
          {/* social links section  */}
          {socialBtn?.map((item) => (
            <SocialLinkCard key={item?.id} {...item} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
