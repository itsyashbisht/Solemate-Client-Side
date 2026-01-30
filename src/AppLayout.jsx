import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";
import ShoeCircularLoader from "./layouts/loader";
import { getMe } from "./thunks/user.thunk";

export default function AppLayout() {
  const dispatch = useDispatch();
  const { loading, profile } = useSelector((state) => state.user);

  // PREVENT MULTIPLE getMe CALLS
  const hasFetchedUser = useRef(false);

  // RESTORE USER SESSION ON MOUNT
  useEffect(() => {
    // PREVENT DUPLICATE CALLS
    if (hasFetchedUser.current) return;

    const token = localStorage.getItem("accessToken");

    // ONLY FETCH IF: token exists AND profile not loaded
    if (token && !profile) {
      hasFetchedUser.current = true;
      dispatch(getMe());
    }
  }, []); // ✅ EMPTY DEPENDENCY ARRAY

  if (loading) return <ShoeCircularLoader />;

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
}
