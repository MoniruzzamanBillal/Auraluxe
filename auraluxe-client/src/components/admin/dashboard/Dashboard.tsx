"use client";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHourglassEnd } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbBrandDatabricks } from "react-icons/tb";
// import { useGet } from "@/hooks/useGet";

export default function Dashboard() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Brands":
        return TbBrandDatabricks;
      case "Category":
        return BiCategoryAlt;
      case "Career":
        return FaHourglassEnd;
      case "Product":
        return MdOutlineProductionQuantityLimits;
      case "Project":
        return FaKitchenSet;
      default:
        return FaKitchenSet;
    }
  };

  const getCardColor = (name: string) => {
    switch (name) {
      case "Product":
        return "from-red-700 via-red-500 to-red-600";
      case "Project":
        return "from-blue-700 via-blue-500 to-blue-600";
      case "Brands":
        return "from-green-700 via-green-500 to-green-600";
      case "Category":
        return "from-purple-700 via-purple-500 to-purple-600";
      case "Career":
        return "from-yellow-700 via-yellow-500 to-yellow-600";
      default:
        return "from-gray-700 via-gray-500 to-gray-600";
    }
  };

  // const {
  //   isLoading,
  //   data: allDashboardStats,
  //   refetch,
  // } = useGet<[]>("/dashboard/summary", ["getAllDashboardStats"]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-brandColor">Tilottoma</span> Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Quick overview of your inventory stats
        </p>
      </div>

      {/* Dashboard Cards */}
      {/* {isLoading ? (
        <AdminLoader />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {allDashboardStats?.map((item: any, index: number) => {
            const IconComponent = getIcon(item.name);
            const gradient = getCardColor(item.name);

            return (
              <Card
                key={index + 1}
                className={`border-0 bg-gradient-to-br ${gradient} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-white">
                    {item.name}
                  </CardTitle>
                  <div className="rounded-full bg-white p-2 shadow-sm">
                    <IconComponent className="text-brandColor h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-3">
                  <div className="text-3xl font-extrabold text-white">
                    {item.count}
                  </div>
                  <p className="mt-1 text-xs text-white">
                    Total {item.name.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )} */}
    </div>
  );
}
