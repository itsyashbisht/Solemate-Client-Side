const Logo = ({ isCollapsed }) => {
  return (
    <div className="flex items-center gap-3 select-none group">
      {/* The Styled Circle Logo */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
          <div className="flex flex-col items-center leading-none">
            {/* The "S" */}
            <span className="text-2xl font-black text-black leading-none mt-1">
              S
            </span>
            {/* The Sole Underline */}
            <div className="w-4 h-[2.5px] bg-black rounded-full -mt-0.5" />
          </div>
        </div>

        {/* Decorative Status Dot (Optional - remove if you want it exactly like the pic) */}
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 border-2 border-slate-900 rounded-full" />
      </div>

      {/* Brand Text */}
      {!isCollapsed && (
        <div className="flex flex-col">
          <h1 className="flex items-center text-lg tracking-tight leading-none">
            <span className="font-extrabold text-white">SOLE</span>
            <span className="font-medium text-slate-400">MATE</span>
          </h1>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
            Admin Panel
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
