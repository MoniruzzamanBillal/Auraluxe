"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, User } from "lucide-react";
import { useState } from "react";
import UpdateUserProfile from "./UpdateUserProfile";

// import coverImage from "@/../public/coverImage.jpg";
import coverImage from "../../../../public/coverImage.jpg";

import Image from "next/image";

export default function UserProfileDetail({
  userProfile,
}: {
  userProfile: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="UserProfileContainer w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Cover Photo Section */}
      <div className="relative w-full h-[30rem] bg-gray-300 overflow-hidden">
        <Image
          src={coverImage}
          alt="Cover Photo"
          height={1280}
          width={1280}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 -mt-16 sm:-mt-24 md:-mt-32 relative z-5">
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          <div className="relative size-32 sm:size-40 md:size-48 rounded-full border-4 border-white bg-gray-200 shadow-lg overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={
                  userProfile?.profileImg ||
                  "/placeholder.svg?height=120&width=120&query=user profile"
                }
                alt={userProfile?.name}
              />
              <AvatarFallback>
                <User className="h-24 w-24 text-gray-500" />
              </AvatarFallback>
            </Avatar>
          </div>
          {/* User Name - now centered below profile pic */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
            {userProfile?.name}
          </h1>
        </div>

        {/* User Details and Edit Button */}
        <div className="p-6  mt-8 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <p className="text-lg font-medium text-gray-800 mb-2">
                {userProfile?.email}
              </p>
            </div>

            <div onClick={() => setIsModalOpen(true)} className="mt-4 md:mt-0">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base cursor-pointer ">
                <Edit className="mr-2 h-4 w-4" />
                Edit profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <UpdateUserProfile
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        initialValue={userProfile}
      />
    </div>
  );
}
