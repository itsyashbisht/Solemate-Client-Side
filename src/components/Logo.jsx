const Logo = ({ isCollapsed }) => {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* The Styled Circle Logo */}
      <div className="relative flex-shrink-0">
        <div
          className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all duration-200 group-hover:shadow-blue-600/40 group-hover:scale-105 border border-blue-500/30">
          <div className="flex flex-col items-center leading-none">
            {/* The "S" */}
            <span className="text-2xl font-black text-white leading-none mt-0.5">
              S
            </span>
            {/* The Sole Underline */}
            <div className="w-4 h-0.5 bg-blue-200 rounded-full -mt-1"/>
          </div>
        </div>

        {/* Decorative Status Dot */}
        <div
          className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 border-2 border-slate-900 rounded-full shadow-md"/>
      </div>

      {/* Brand Text */}
      {!isCollapsed && (
        <div className="flex flex-col">
          <h1 className="flex items-center text-base tracking-tight leading-tight">
            <span className="font-bold text-white">SOLE</span>
            <span className="font-medium text-slate-400 ml-0.5">MATE</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Admin
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
