import UserDashboardSidebar from "@/components/user/dashboardSidebar/UserDashboardSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-textPrimary text-black">
      <UserDashboardSidebar>{children}</UserDashboardSidebar>
    </div>
  );
}
