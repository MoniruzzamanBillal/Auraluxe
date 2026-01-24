"use client";

import Breadcrumb from "@/components/share/Breadcrumb";
import CustomPageHeader from "@/components/share/common/CustomPageHeader";
import { useFetchData } from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import ProjectDetailSkeleton from "./ProjectDetailSkeleton";

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
  const { id } = useParams();

  const { data: projectDetailData, isLoading } = useFetchData(
    [`proejct-detail-${id}`],
    `/project/${id}`,
    {
      enabled: !!id,
    },
  );

  const project = projectDetailData?.data;

  console.log(projectDetailData?.data);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col gap-10 overflow-hidden bg-white sm:gap-20">
      {/*======== header ==========*/}
      <CustomPageHeader
        pageTitle={"Portfolio"}
        description={
          "Auraluxe reserves the right to update or modify these terms at any time"
        }
      />

      {/* ======= contents ======== */}
      <div className="container mb-32 flex max-w-[1400px] flex-col gap-10 md:gap-16">
        {/* ====== breadcrumb ======= */}
        <Breadcrumb />
        {/* ======= details ======== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          {/*==== image ==== */}
          <div className="w-full h-[600px] rounded-md overflow-hidden ">
            <Image
              alt={project.projectName}
              src={project.projectImg as string}
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
              {project.projectName}
            </p>
            {/* ======= address ======= */}
            <p className="text-charcoolGray font-medium sm:text-base lg:text-xl">
              {project.location}
            </p>

            {/* Table details */}
            <div className="lg:pr-20">
              <table className="w-full">
                <tbody>
                  {project?.client && (
                    <tr className="border-softGray w-full border-b border-dashed">
                      <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                        Client
                      </td>
                      <td className="text-darkGray py-4 text-right text-sm lg:text-base">
                        {project.client}
                      </td>
                    </tr>
                  )}

                  {project?.architects && (
                    <tr className="border-softGray border-b border-dashed">
                      <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                        Architects
                      </td>
                      <td className="text-darkGray py-4 text-right text-sm lg:text-base">
                        {project.architects}
                      </td>
                    </tr>
                  )}

                  {project.material?.name && (
                    <tr className="border-softGray border-b border-dashed">
                      <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                        Materials
                      </td>
                      <td className="text-darkGray py-2 text-right text-sm lg:text-base">
                        {project.material?.name}
                      </td>
                    </tr>
                  )}

                  {project.website && (
                    <tr>
                      <td className="text-darkGray py-4 text-base font-medium lg:text-xl">
                        Website
                      </td>
                      <td className="text-darkGray py-2 text-right text-sm lg:text-base">
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.website}
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/*  */}

            {/* Social Media */}
            <div className="mt-10 lg:pr-16">
              <div className="border-t-lightGray flex flex-wrap items-center justify-between border-t">
                <p className="text-darkGray text-base font-medium lg:text-xl">
                  Social Media
                </p>
                <div className="mt-4 flex items-center space-x-3 text-white">
                  {project?.facebookLink && (
                    <Link
                      href={project.facebookLink}
                      aria-label="Facebook"
                      className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                    >
                      <FaFacebookF className="text-sm text-white" />
                    </Link>
                  )}

                  {project?.instagramLink && (
                    <Link
                      href={project.instagramLink}
                      aria-label="Instagram"
                      className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                    >
                      <FaInstagram className="text-sm text-white" />
                    </Link>
                  )}

                  {project?.linkedinLink && (
                    <Link
                      href={project.linkedinLink}
                      aria-label="Linkedin"
                      className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                    >
                      <FaLinkedinIn className="text-sm text-white" />
                    </Link>
                  )}

                  {project?.xLink && (
                    <Link
                      href={project.xLink}
                      aria-label="X"
                      className="bg-darkGray flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8"
                    >
                      <FaXTwitter className="text-sm text-white" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/*  */}
          </div>

          {/*  */}

          {/*  */}
        </div>

        {/* ===== description ===== */}

        <div className="mt-6  ">
          <div
            className=" textEditor "
            dangerouslySetInnerHTML={{
              __html: projectDetailData?.data?.description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
