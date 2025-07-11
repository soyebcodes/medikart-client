import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="loading loading-ring loading-lg text-primary"></span>
    );
  }

  if (!user || !user.role) {
    return <Navigate to="/" />;
  }

  if (user.role === "seller") {
    return <Navigate to="/dashboard/seller/home" replace />;
  } else if (user.role === "admin") {
    return <Navigate to="/dashboard/admin/home" replace />;
  } else {
    return <Navigate to="/dashboard/user/home" replace />;
  }
};

export default DashboardRedirect;
