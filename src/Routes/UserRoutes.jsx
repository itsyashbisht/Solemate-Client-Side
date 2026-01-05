import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // WHILE AUTH IS RESOLVING
  if (loading) {
    return <div>Loading ...</div>;
  }

  // IF NOT LOGGED IN -> RIDIRECT
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // ELSE -> ALLOW ACCES AS USER
  return <Outlet />;
};

export default ProtectedRoute;
