import React from 'react';
import { Bell, Settings, LogOut, User } from 'lucide-react';

const Header = ({ userName }) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Orders Dashboard</h1>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* Dropdown Menu */}
            <div className="flex items-center gap-2 ml-2">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
