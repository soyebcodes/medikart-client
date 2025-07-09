import useUserRole from "../../../hooks/useUserRole";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router";

const Sidebar = () => {
  const { user } = useAuth();
  const [role] = useUserRole(user?.email);

  return (
    <div className="w-64 bg-blue-100 dark:bg-gray-900 text-black dark:text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/profile">Update Profile</Link>
        </li>

        {role === "admin" && (
          <>
            <li>
              <Link to="/dashboard/manage-users">Manage Users</Link>
            </li>
            <li>
              <Link to="/dashboard/sales-report">Sales Report</Link>
            </li>
          </>
        )}

        {role === "seller" && (
          <>
            <li>
              <Link to="/dashboard/manage-medicines">Manage Medicines</Link>
            </li>
            <li>
              <Link to="/dashboard/advertisements">Ask for Advertisements</Link>
            </li>
          </>
        )}

        {role === "user" && (
          <li>
            <Link to="/dashboard/payment-history">Payment History</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
