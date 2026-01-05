import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return isAuthenticated && role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="user/login" replace />
  );
}

export default AdminRoutes;
