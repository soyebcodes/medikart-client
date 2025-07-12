import { Outlet } from "react-router";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import UserSidebar from "../components/Dashboard/UserSidebar";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user || !user.role) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <p>Please login to access the dashboard.</p>
      </div>
    );
  }

  // Show sidebar only for user and admin, NOT for seller
  const showSidebar = user.role === "user" || user.role === "admin";

  // Select sidebar if shown
  let Sidebar = null;
  if (user.role === "user") Sidebar = UserSidebar;
  else if (user.role === "admin") Sidebar = AdminSidebar;

  return (
    <div className="flex min-h-screen bg-base-200">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-1">
        <DashboardHeader
          title={`${
            user.role.charAt(0).toUpperCase() + user.role.slice(1)
          } Dashboard`}
        />
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
