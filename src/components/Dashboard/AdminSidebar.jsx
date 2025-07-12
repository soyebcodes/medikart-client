import { NavLink } from "react-router";
import {
  FaUsers,
  FaTags,
  FaMoneyBillAlt,
  FaChartLine,
  FaAd,
} from "react-icons/fa";

const links = [
  {
    to: "/dashboard/admin/manage-users",
    label: "Manage Users",
    icon: <FaUsers />,
  },
  {
    to: "/dashboard/admin/manage-categories",
    label: "Manage Categories",
    icon: <FaTags />,
  },
  {
    to: "/dashboard/admin/payments",
    label: "Payment Management",
    icon: <FaMoneyBillAlt />,
  },
  {
    to: "/dashboard/admin/sales-report",
    label: "Sales Report",
    icon: <FaChartLine />,
  },
  {
    to: "/dashboard/admin/manage-advertised",
    label: "Manage Advertise",
    icon: <FaAd />,
  },
];

const AdminSidebar = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-primary text-white"
      : "hover:bg-primary hover:text-white text-gray-900 dark:text-gray-800";

  return (
    <aside className="bg-base-200 dark:bg-base-300 w-20 md:w-64 p-4 h-screen sticky top-0 shadow-sm flex flex-col">
      <nav className="flex flex-col gap-2 mt-14">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${navLinkClass({
                isActive,
              })} flex items-center gap-3 p-2 rounded-lg transition-all duration-200`
            }
          >
            <span className="text-lg">{icon}</span>
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
