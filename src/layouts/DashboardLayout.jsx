import { Outlet } from "react-router";
import UserSidebar from "../components/Dashboard/UserSidebar";
import SellerSidebar from "../components/Dashboard/SellerSidebar";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading || !user || !user.role) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  let SidebarComponent = UserSidebar;

  if (user.role === "admin") SidebarComponent = AdminSidebar;
  else if (user.role === "seller") SidebarComponent = SellerSidebar;

  return (
    <div className="flex min-h-screen bg-base-200">
      <SidebarComponent />
      <div className="flex flex-col flex-1">
        <DashboardHeader userRole={user.role} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
