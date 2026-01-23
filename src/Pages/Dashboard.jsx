import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Import separate view components
import OrderView from "../components/OrderView";
import ProductView from "../components/ProductView";
import SettingView from "../components/SettingView";
import UserView from "../components/UserView";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard"); // Default tab

  // Function to render the correct component
  const renderContent = () => {
    switch (currentView) {
      case "home": //
        return <OrderView />;
      case "products":
        return <ProductView />;
      case "users": //
        return <UserView />;
      case "settings":
        return <SettingView />;
      default:
        return <OrderView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 antialiased overflow-hidden">
      {/* Sidebar now controls currentView */}
      <Sidebar activeView={currentView} onNavigate={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Yash Bisht" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-5">
            {/* Dynamic View Rendering */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
