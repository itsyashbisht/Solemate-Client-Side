import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Outlet />
    </div>
  );
}
