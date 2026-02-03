'use client';

import { ChevronLeft, ChevronRight, Home, LayoutDashboard, Settings, Users, } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Orders', icon: Home },
    { path: '/admin/products', label: 'Products', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-slate-900/60 backdrop-blur border-r border-slate-700/50 transition-all duration-300 ease-in-out flex flex-col z-50 h-screen sticky top-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header / Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-700/50 overflow-hidden">
        <Logo isCollapsed={isCollapsed}/>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = item.label === activeView;
          return (
            <button
              key={item.path}
              onClick={() => {
                setActiveView(item.label);
                navigate(item.path);
              }}
              className={`
                relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-150 group outline-none
                ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400'
                  : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
              }
              `}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-lg"/>
              )}

              <item.icon
                className={`
                w-5 h-5 flex-shrink-0 transition-all duration-150
                ${isActive ? 'text-blue-500 scale-110' : 'group-hover:scale-110 group-hover:text-slate-300'}
              `}
              />

              {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis tracking-wide">
                  {item.label}
                </span>
              )}

              {/* Tooltip for Collapsed State */}
              {isCollapsed && (
                <div
                  className="fixed left-20 ml-4 px-3 py-1.5 bg-slate-800/90 backdrop-blur text-slate-100 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 border border-slate-700/60 shadow-lg translate-x-[-10px] group-hover:translate-x-0">
                  {item.label}
                  {/* Tooltip Arrow */}
                  <div
                    className="absolute top-1/2 left-[-4px] -translate-y-1/2 w-2 h-2 bg-slate-800/90 border-l border-b border-slate-700/60 rotate-45"/>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all duration-150 border border-slate-700/50 group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-150"/>
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4"/>

            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
