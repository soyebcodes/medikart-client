import { Link, NavLink } from "react-router";
import { FaCreditCard, FaHome } from "react-icons/fa";

const UserSidebar = () => {
  return (
    <div className="md:w-64 w-20 min-h-screen bg-base-100 shadow-lg p-4">
      <nav className="flex flex-col gap-4 mt-8">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all hover:bg-base-200"
        >
          <FaHome size={24} /> Medicart
        </Link>
        <NavLink
          to="/dashboard/user/payment-history"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-base-200 text-base-content"
            }`
          }
        >
          <FaCreditCard size={22} />
          <span className="hidden md:inline">Payment History</span>
        </NavLink>

        {/* Add more NavLinks here as needed */}
      </nav>
    </div>
  );
};

export default UserSidebar;
