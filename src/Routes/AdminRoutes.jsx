import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const { loading, profile } = useSelector((state) => state.auth);

  if (loading) return <div>Loading... </div>;

  if (!profile) return <Navigate to="/login" replace />;

  if (profile?.user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default AdminRoutes;
