import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import ShoeCircularLoader from '../layouts/loader';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

function AdminRoutes () {
  // AUTH STATE
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state) => state.auth,
  );

  // USER PROFILE
  const {
    profile,
    loading: profileLoading,
    initialized,
  } = useSelector((state) => state.user);

  // If either slice is loading, show spinner
  if (authLoading || profileLoading) {
    return <ShoeCircularLoader size="lg"/>;
  }

  // If user session restoration hasn't completed yet, wait
  if (!initialized) {
    return <ShoeCircularLoader size="lg"/>;
  }

  // Not authenticated -> login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  // No profile -> login
  if (!profile) {
    return <Navigate to="/login" replace/>;
  }

  // If user is not admin, go to unauthorized
  if (profile.role !== 'ADMIN') {
    return <Navigate to="/unauthorized" replace/>;
  }

  // Admin allowed
  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 antialiased overflow-hidden">
      {/* Sidebar now controls currentView */}
      <Sidebar/>

      <div className="flex-1 flex flex-col min-w-0">
        <Header/>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-5">
            {/* Dynamic View Rendering */}
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );

}

export default AdminRoutes;
