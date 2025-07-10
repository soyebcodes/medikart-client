import { NavLink } from "react-router";

const UserSidebar = () => (
  <aside className="w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
    <nav className="flex flex-col space-y-3">
      <NavLink
        to="/dashboard/user/payment-history"
        className="hover:text-blue-500"
      >
        Payment History
      </NavLink>
      <NavLink to="/dashboard/user/cart" className="hover:text-blue-500">
        Cart
      </NavLink>
      {/* add more user links */}
    </nav>
  </aside>
);

export default UserSidebar;
