// components/DashboardHeader.jsx
import { useAuth } from "../../hooks/useAuth";

const DashboardHeader = ({ title }) => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full px-4 py-3 bg-base-100 border-b flex items-center justify-between shadow-sm z-10">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>

      <div className="flex items-center gap-4">
        <button className="btn btn-sm btn-ghost">🔔</button>
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
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
