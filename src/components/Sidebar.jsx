import {
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

const Sidebar = ({ activeView = "orders", onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Products", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-[#0f172a] border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col z-50 h-screen sticky top-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header / Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/50 overflow-hidden">
        <Logo isCollapsed={isCollapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = item.id === activeView;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`
                relative w-full flex items-center gap-3 px-3 py-3 rounded-xl 
                transition-all duration-200 group outline-none
                ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }
              `}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-blue-500 rounded-r-full" />
              )}

              <item.icon
                className={`
                w-5 h-5 flex-shrink-0 transition-all duration-300
                ${isActive ? "text-blue-500 scale-110" : "group-hover:scale-110 group-hover:text-white"}
              `}
              />

              {!isCollapsed && (
                <span className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis tracking-wide">
                  {item.label}
                </span>
              )}

              {/* Tooltip for Collapsed State */}
              {isCollapsed && (
                <div className="fixed left-20 ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-slate-700 shadow-xl translate-x-[-10px] group-hover:translate-x-0">
                  {item.label}
                  {/* Tooltip Arrow */}
                  <div className="absolute top-1/2 left-[-4px] -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45" />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700/30 group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Collapse Menu
              </span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
