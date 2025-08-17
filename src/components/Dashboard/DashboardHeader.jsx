import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://medikart-server-pjna.onrender.com");
const DashboardHeader = ({ title }) => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Listen for socket notifications
  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("notification");
  }, []);

  return (
    <header className="w-full px-4 py-3 bg-base-100 border-b flex items-center justify-between shadow-sm z-10">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>

      <div className="flex items-center gap-4 relative">
        {/* Notifications Button */}
        <button
          className="btn btn-sm btn-ghost relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          🔔
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showDropdown && (
          <ul className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-base-200 shadow-lg rounded-lg p-2 z-20">
            {notifications.length === 0 ? (
              <li className="p-2 text-gray-500">No notifications</li>
            ) : (
              notifications.map((n, i) => (
                <li
                  key={i}
                  className="p-2 mb-1 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col shadow-sm"
                >
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {n.message}
                  </span>
                  {n.ad && (
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      Ad Description: {n.ad.description}
                    </span>
                  )}
                  {n.user && (
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      User Email: {n.user.email}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                    {new Date(n.timestamp || Date.now()).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}

        {/* User Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar cursor-pointer">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL || "/default-avatar.png"} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li>
              <p>{user?.email}</p>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
