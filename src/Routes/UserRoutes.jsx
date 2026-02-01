import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ShoeCircularLoader from "../layouts/loader";

const ProtectedRoute = () => {
  // AUTH STATE
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state) => state.auth,
  );

  // USER PROFILE
  const { profile, loading: profileLoading } = useSelector(
    (state) => state.user,
  );

  // LOADING - SHOW SPINNER
  if (authLoading || profileLoading) {
    return <ShoeCircularLoader />;
  }

  // NOT AUTHENTICATED - REDIRECT TO LOGIN
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // NO PROFILE DATA - REDIRECT TO LOGIN
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // AUTHENTICATED - ALLOW ACCESS
  return <Outlet />;
};

export default ProtectedRoute;
