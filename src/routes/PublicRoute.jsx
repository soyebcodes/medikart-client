// src/routes/PublicRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#008236] border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
