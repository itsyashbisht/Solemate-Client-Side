import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function AdminLayout() {

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
