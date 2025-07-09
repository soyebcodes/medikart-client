import { Link, NavLink } from "react-router";
import { useState } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaStore,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="flex items-center gap-1 px-3 py-2 hover:text-blue-500"
      >
        <FaHome /> Home
      </NavLink>
      <NavLink
        to="/shop"
        className="flex items-center gap-1 px-3 py-2 hover:text-blue-500"
      >
        <FaStore /> Shop
      </NavLink>
      <NavLink
        to="/cart"
        className="flex items-center gap-1 px-3 py-2 hover:text-blue-500"
      >
        <FaShoppingCart /> Cart
      </NavLink>
    </>
  );

  return (
    <nav className="shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MediKart
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navLinks}
            {user ? (
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/100"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/update-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Join Us
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t">
          <div className="flex flex-col px-4 py-2 space-y-1">
            {navLinks}
            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 hover:text-blue-500">
                  Dashboard
                </Link>
                <Link
                  to="/update-profile"
                  className="px-3 py-2 hover:text-blue-500"
                >
                  Update Profile
                </Link>
                <button
                  onClick={logOut}
                  className="px-3 py-2 text-left hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 bg-blue-500 text-white rounded text-center"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
