import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UserRoutes() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return isAuthenticated && role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/user/login" replace />
  );
}

export default UserRoutes;
