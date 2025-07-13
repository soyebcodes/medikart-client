import { NavLink } from "react-router";
import {
  FaUsers,
  FaTags,
  FaMoneyBillAlt,
  FaChartLine,
  FaAd,
  FaHome,
} from "react-icons/fa";

const links = [
  { to: "/", label: "MediKart", icon: <FaHome /> },
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
      ? "bg-blue-600 text-white font-semibold"
      : "text-white hover:bg-blue-600 hover:text-white";

  return (
    <aside
      style={{ backgroundColor: "#4B5563" }} // Tailwind gray-600 hex
      className="w-20 md:w-64 p-4 h-screen sticky top-0 shadow-md flex flex-col"
    >
      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${navLinkClass({
                isActive,
              })} flex items-center gap-3 p-2 rounded-lg transition-colors duration-200`
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
