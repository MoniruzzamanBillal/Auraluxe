"use client";

import UserProfileDetail from "@/components/share/UserProfile/UserProfileDetail";
import UserProfileSkeleton from "@/components/share/UserProfile/UserProfileSkeleton";

import { useFetchData } from "@/hooks/useApi";
import { getUserInfo } from "@/services/auth.service";

export default function AdminProfile() {
  const userData = getUserInfo();

  const { data: userProfileData, isLoading } = useFetchData(
    [`user-${userData?.userId}`],
    `user/${userData?.userId}`,
    {
      enabled: !!userData?.userId,
    },
  );

  console.log("userProfileData = ", userProfileData?.data);

  let content = null;

  if (isLoading) {
    content = <UserProfileSkeleton />;
  }

  if (userProfileData?.data) {
    content = <UserProfileDetail userProfile={userProfileData?.data} />;
  }

  return (
    <div className="UserProfileContainer bg-gray-100/90 border border-gray-300  shadow rounded-md p-4  ">
      {content}
    </div>
  );
}
