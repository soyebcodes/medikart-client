import { useState } from "react";
import { NavLink } from "react-router"; // Make sure to use react-router-dom

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="max-w-screen-xl mx-auto md:flex min-h-screen">
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center bg-base-200 p-4 md:hidden">
        <h2 className="text-xl font-semibold text-primary">User Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-outline btn-primary"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-base-100 text-base-content w-full md:w-64 p-4 space-y-4 shadow-md md:shadow-none md:block ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col space-y-2 mt-8">
          <NavLink
            to="/dashboard/user/payment-history"
            className="py-2 px-3 rounded-lg bg-primary hover:text-white transition"
          >
            Payment History
          </NavLink>
        </nav>
      </aside>

      {/* Main content container example */}
      {/* 
      <main className="flex-1 p-4">
        {children}
      </main> 
      */}
    </div>
  );
};

export default UserSidebar;
