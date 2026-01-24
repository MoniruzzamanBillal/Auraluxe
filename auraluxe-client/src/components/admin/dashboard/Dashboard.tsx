"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchData } from "@/hooks/useApi";
import AdminStatCard from "./stat/AdminStatCard";
import AdminStatCardSkeleton from "./stat/AdminStatCardSkeleton";
import RevenueChartSkeleton from "./stat/RevenueChartSkeleton";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CategoryDistributionChartSkeleton from "./stat/CategoryDistributionChartSkeleton";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

type TAdminStatItem = {
  title: string;
  value: number;
};

type TAdminRevenueData = {
  month: string;
  revenue: number;
  orders: number;
};

type TAdminCategoryPercentage = {
  name: string;
  value: number;
};

export default function Dashboard() {
  const { data: adminStatData, isLoading } = useFetchData(
    ["admin-stat"],
    "/order/stats",
  );

  console.log(adminStatData?.data);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-prime200 ">Auraluxe</span> Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Quick overview of your inventory stats
        </p>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 3 }).map((_, ind) => (
            <AdminStatCardSkeleton key={ind} />
          ))}

        {adminStatData?.data?.statsData?.map(
          (item: { value: number; title: string }, ind: number) => (
            <AdminStatCard key={ind} data={item} />
          ),
        )}
      </div>

      {/* ================= Revenue Chart ================= */}
      <div className="border border-gray-300 rounded-md mt-6 ">
        {isLoading && <RevenueChartSkeleton />}

        {adminStatData?.data?.revenueDatas?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
              <CardDescription>
                Monthly revenue and order volume
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={adminStatData?.data.revenueDatas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" name="Revenue" />
                  <Bar dataKey="orders" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ================= Category Distribution ================= */}
      <div className="border border-gray-300 rounded-md mt-6">
        {isLoading && <CategoryDistributionChartSkeleton />}

        {adminStatData?.data?.categoryDataPercentage?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Product categories breakdown</CardDescription>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={adminStatData.data.categoryDataPercentage}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {adminStatData.data.categoryDataPercentage.map(
                      (entry: TAdminCategoryPercentage, index: number) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ),
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2  ">
                {adminStatData.data.categoryDataPercentage.map(
                  (category: TAdminCategoryPercentage, index: number) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">{category.value}%</span>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/*  */}
    </div>
  );
}
