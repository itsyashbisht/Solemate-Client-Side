import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  if (loading) return <div>Loading... </div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default AdminRoutes;
