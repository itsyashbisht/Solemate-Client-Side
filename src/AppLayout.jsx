import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
}
