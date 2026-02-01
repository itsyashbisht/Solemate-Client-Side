import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";
import ShoeCircularLoader from "./layouts/loader";
import { getMe } from "./thunks/user.thunk";
import { setInitialized } from "./Slices/user.slice";

export default function AppLayout() {
  const dispatch = useDispatch();

  // AUTH STATE - Check if authenticated
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state) => state.auth,
  );

  // USER STATE - Get profile data
  const { profile, loading: profileLoading } = useSelector(
    (state) => state.user,
  );

  // RESTORE USER SESSION ON MOUNT
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // IF TOKEN EXISTS BUT PROFILE NOT LOADED - FETCH USER DATA
    if (token && !profile) {
      dispatch(getMe());
    } else {
      // no token: mark initialization complete so route guards won't wait forever
      dispatch(setInitialized(true));
    }
  }, [profile]); // RUNS WHEN profile CHANGES

  // SHOW LOADING WHILE FETCHING
  if (authLoading || profileLoading) {
    return <ShoeCircularLoader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
