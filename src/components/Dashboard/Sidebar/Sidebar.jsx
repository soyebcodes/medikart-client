import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-64 bg-base-100 shadow-md p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard/profile" className="hover:text-blue-500">
          My Profile
        </Link>
        <Link to="/dashboard/payment-history" className="hover:text-blue-500">
          Payment History
        </Link>
        {/* later add for admin or seller */}
      </nav>
    </div>
  );
};

export default Sidebar;
