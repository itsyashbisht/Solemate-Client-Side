import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ShoeCircularLoader from "../layouts/loader";

const ProtectedRoute = () => {
  // REDUX SELECTORS
  const { profile, loading } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // WHILE LOADING
  if (loading) {
    return <ShoeCircularLoader size="lg" />;
  }

  // NOT AUTHENTICATED - REDIRECT TO LOGIN
  if (!isAuthenticated || !profile) {
    return <Navigate to="/login" replace />;
  }

  // AUTHENTICATED - ALLOW ACCESS
  return <Outlet />;
};

export default ProtectedRoute;
