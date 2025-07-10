import { NavLink } from "react-router";

const AdminSidebar = () => (
  <aside className="w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
    <nav className="flex flex-col space-y-3">
      <NavLink
        to="/dashboard/admin/manage-users"
        className="hover:text-blue-500"
      >
        Manage Users
      </NavLink>
      <NavLink
        to="/dashboard/admin/manage-categories"
        className="hover:text-blue-500"
      >
        Manage Categories
      </NavLink>
      <NavLink
        to="/dashboard/admin/payment-management"
        className="hover:text-blue-500"
      >
        Payment Management
      </NavLink>
      <NavLink
        to="/dashboard/admin/sales-report"
        className="hover:text-blue-500"
      >
        Sales Report
      </NavLink>
      <NavLink
        to="/dashboard/admin/manage-banner"
        className="hover:text-blue-500"
      >
        Manage Banner Advertise
      </NavLink>
      {/* add more admin links */}
    </nav>
  </aside>
);

export default AdminSidebar;
