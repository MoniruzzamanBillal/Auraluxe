"use client";

import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { projectDummyData } from "./dummyData";

export interface IProject {
  id: string;
  location: string;
  slug: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;
  projectType: {
    _id: string;
    name: string;
  };
  client: string;
  architects: string[];
  material: {
    _id: string;
    name: string;
  };
  description: string;
  website: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  relatedProjects: {
    id: string;
    projectName: string;
    slug: string;
    projectImg: string;
    location: string;
    status: boolean;
    createdAt: string;
  }[];
  xLink: string;
  projectImg: string;
  status: boolean;
}

export default function PortfolioDetails() {
  const { slug } = useParams();

  console.log("slug in  PortfolioDetails = ", slug);

  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Portfolio"}
        description={
          "Tilottoma.com reserves the right to update or modify these terms at any time"
        }
      />

      {/* ======= contents ======== */}
      <div className="container mb-32 flex max-w-[1400px] flex-col gap-10 md:gap-16">
        {/* ====== breadcrumb ======= */}
        <Breadcrumb />
        {/* ======= details ======== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          {/*==== image ==== */}
          <div className="w-full lg:h-screen lg:max-h-[833px]">
            <Image
              alt="portfolio image"
              src={projectDummyData?.projectImg}
              height={833}
              width={748}
              unoptimized
              className="h-full w-full shrink-0 object-cover"
            />
          </div>
          {/* ====== information ======= */}
          <div className="flex w-full flex-col gap-5 px-5 lg:px-3">
            {/* ==== title ======= */}
            <p className="text-2xl font-bold text-black md:text-[2rem] md:leading-10 lg:text-[3rem] lg:leading-14.5">
              {projectDummyData?.projectName}
            </p>
            {/* ======= address ======= */}
            <p className="text-charcoolGray font-medium sm:text-base lg:text-xl">
              {projectDummyData?.location}
            </p>
            {/* ===== description ===== */}
            <div className="text-darkGray text-xs md:text-sm lg:text-base lg:leading-8">
              {projectDummyData?.description}
            </div>
            {/* ===== table details ===== */}
            <div className="lg:pr-20">
              <table className="w-full">
                <tbody className="">
                  <tr className="border-softGray w-full border-b border-dashed">
                    <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                      Client
                    </td>
                    <td className="text-darkGray py-4 text-right text-sm lg:text-base">
                      {projectDummyData?.client}
                    </td>
                  </tr>
                  <tr className="border-softGray border-b border-dashed">
                    <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                      Architects
                    </td>
                    <td className="text-darkGray py-4 text-right text-sm lg:text-base">
                      {projectDummyData?.architects}
                    </td>
                  </tr>
                  <tr className="border-softGray border-b border-dashed">
                    <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                      Materials
                    </td>
                    <td className="text-darkGray py-2 text-right text-sm lg:text-base">
                      {projectDummyData?.material.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                      Website
                    </td>
                    <td className="text-darkGray py-2 text-right text-sm lg:text-base">
                      <a
                        href={projectDummyData?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {projectDummyData?.website}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* =========== social ======= */}
            <div className="mt-10 lg:pr-16">
              <div className="border-t-lightGray flex flex-wrap items-center justify-between border-t">
                <p className="text-darkGray text-base font-medium lg:text-xl">
                  Social Media
                </p>
                <div className="mt-4 flex items-center space-x-3 text-white">
                  <Link
                    href={projectDummyData?.facebookLink}
                    aria-label="Facebook"
                    className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                  >
                    <div className="text-white">
                      <FaFacebookF className="text-sm" />
                    </div>
                  </Link>
                  <Link
                    href={projectDummyData?.instagramLink}
                    aria-label="Instagram"
                    className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                  >
                    <div className="text-white">
                      <FaInstagram className="text-sm" />
                    </div>
                  </Link>
                  <Link
                    href={projectDummyData?.linkedinLink}
                    aria-label="Linkedin"
                    className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                  >
                    <div className="text-white">
                      <FaLinkedinIn className="text-sm" />
                    </div>
                  </Link>
                  <Link
                    href={projectDummyData?.xLink}
                    aria-label="X"
                    className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                  >
                    <div className="text-white">
                      <FaXTwitter className="text-sm" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ====== related ========= */}
        {/* <div className="mt-20 lg:mt-0">
          <CustomProjectCarousel
            data={projectDummyData?.relatedProjects}
            title="Related Projects"
          />
        </div> */}
      </div>
    </div>
  );
}
