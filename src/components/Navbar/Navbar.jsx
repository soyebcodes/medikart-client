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
import { useCartStore } from "../../store/cartStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user, logOutUser } = useAuth();

  // Fix: return cart count from selector
  const cartCount = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.querySelector("html").setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-2 rounded hover:text-primary ${
      isActive ? "text-primary font-semibold" : ""
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        <FaHome /> Home
      </NavLink>
      <NavLink to="/shop" className={navLinkClass}>
        <FaStore /> Shop
      </NavLink>
      <NavLink
        to="/cart"
        className={navLinkClass}
        aria-label={`Cart with ${cartCount} items`}
      >
        <div className="relative flex items-center gap-1">
          <FaShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="absolute top-0 right-0 -mt-3 -mr-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full">
              {cartCount}
            </span>
          )}
        </div>
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
              aria-label="Toggle light/dark theme"
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
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-xl"
              aria-label="Toggle light/dark theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Cart icon with badge (mobile) */}
            <Link
              to="/cart"
              className="relative btn btn-ghost btn-circle"
              aria-label={`Cart with ${cartCount} items`}
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white bg-error rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
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
