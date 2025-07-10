import { NavLink } from "react-router";

const SellerSidebar = () => (
  <aside className="w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
    <nav className="flex flex-col space-y-3">
      <NavLink
        to="/dashboard/seller/manage-medicines"
        className="hover:text-blue-500"
      >
        Manage Medicines
      </NavLink>
      <NavLink
        to="/dashboard/seller/payment-history"
        className="hover:text-blue-500"
      >
        Payment History
      </NavLink>
      <NavLink
        to="/dashboard/seller/advertisement"
        className="hover:text-blue-500"
      >
        Ask For Advertisement
      </NavLink>
      {/* add more seller links */}
    </nav>
  </aside>
);

export default SellerSidebar;
