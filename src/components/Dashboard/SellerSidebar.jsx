import { NavLink, Outlet } from "react-router";
import DashboardHeader from "./DashboardHeader";

const SellerSidebar = () => (
  <div>
    <DashboardHeader />
    <Outlet />
  </div>
);

export default SellerSidebar;
