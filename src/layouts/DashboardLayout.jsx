import { Outlet } from "react-router";
import UserSidebar from "../components/Dashboard/UserSidebar";
import SellerSidebar from "../components/Dashboard/SellerSidebar";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  let SidebarComponent = UserSidebar; // default

  if (user?.role === "admin") SidebarComponent = AdminSidebar;
  else if (user?.role === "seller") SidebarComponent = SellerSidebar;

  return (
    <div className="flex min-h-screen">
      <SidebarComponent />
      <main className="flex-1 bg-base-200 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
