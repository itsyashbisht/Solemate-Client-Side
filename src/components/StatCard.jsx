import React from "react";
import { ArrowUpRight } from "lucide-react";

const StatCard = ({ title, value, change, icon: Icon, bgColor }) => {
  const colorMap = {
    "bg-blue-500": {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    "bg-green-500": {
      text: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    "bg-purple-500": {
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    "bg-orange-500": {
      text: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
  };

  const theme = colorMap[bgColor] || colorMap["bg-blue-500"];

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 transition-all hover:border-slate-600">
      <div className="flex items-center gap-4">
        {/* Smaller, fixed-size Icon Container */}
        <div
          className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-lg border ${theme.bg} ${theme.border}`}
        >
          <Icon className={`w-5 h-5 ${theme.text}`} />
        </div>

        {/* Text Content - Tighter Spacing */}
        <div className="min-w-0 flex-1">
          <p className="text-slate-400 text-xs font-medium truncate uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {value}
            </h3>
            <span className="text-emerald-400 text-[11px] font-bold flex items-center">
              {change}
              <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
