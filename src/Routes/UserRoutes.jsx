import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { profile, loading } = useSelector((state) => state.user);

  // WHILE AUTH IS RESOLVING
  if (loading) {
    return <div>Loading ...</div>;
  }

  // IF NOT LOGGED IN -> RIDIRECT
  if (!profile) return <Navigate to="/login" replace />;

  // ELSE -> ALLOW ACCES AS USER
  return <Outlet />;
};

export default ProtectedRoute;
