import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ShoeCircularLoader from "../layouts/loader";

function AdminRoutes() {
  const { loading, profile } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(profile);

  if (loading) return <ShoeCircularLoader size="lg" />;

  if (!profile || !isAuthenticated) return <Navigate to="/login" replace />;

  if (profile?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default AdminRoutes;
