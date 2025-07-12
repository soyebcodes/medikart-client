import { Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaStore,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user, logOutUser } = useAuth();

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.querySelector("html").setAttribute("data-theme", stored);
  }, []);

  // Toggle theme and save
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="flex items-center gap-1 px-3 py-2 rounded hover:text-primary"
      >
        <FaHome /> Home
      </NavLink>
      <NavLink
        to="/shop"
        className="flex items-center gap-1 px-3 py-2 rounded hover:text-primary"
      >
        <FaStore /> Shop
      </NavLink>
      <NavLink
        to="/cart"
        className="flex items-center gap-1 px-3 py-2 rounded hover:text-primary"
      >
        <FaShoppingCart /> Cart
      </NavLink>
    </>
  );

  return (
    <nav className="shadow sticky top-0 z-50 bg-base-100 text-base-content transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            MediKart
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-xl"
              title="Toggle Theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* User dropdown */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" />
                    ) : (
                      <FaUserCircle className="text-3xl" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48"
                >
                  <li>
                    <Link to="/update-profile">Update Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOutUser}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/register" className="btn btn-primary">
                Join Us
              </Link>
            )}
          </div>

          {/* Mobile toggle buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="text-xl">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-base-100">
          <div className="flex flex-col px-4 py-2 space-y-1">
            {navLinks}
            {user ? (
              <>
                <Link
                  to="/update-profile"
                  className="px-3 py-2 hover:text-primary"
                >
                  Update Profile
                </Link>
                <Link to="/dashboard" className="px-3 py-2 hover:text-primary">
                  Dashboard
                </Link>
                <button
                  onClick={logOutUser}
                  className="px-3 py-2 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                className="btn btn-primary mt-2 w-full text-center"
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
