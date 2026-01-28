import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";
import ShoeCircularLoader from "./layouts/loader";
import { getMe } from "./thunks/user.thunk";

export default function AppLayout() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  if (isLoading) return <ShoeCircularLoader />;

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
}
