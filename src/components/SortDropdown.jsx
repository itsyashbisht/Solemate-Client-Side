import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SortDropdown = ({ options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options?.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 
          ${
            isOpen
              ? "bg-slate-800 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10"
              : "bg-slate-900/40 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
          }`}
      >
        <span className="whitespace-nowrap">
          {selectedOption?.label || "Sort by"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#1e293b]/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-[100] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Sort Options
          </div>
          {options?.length > 0 &&
            options?.map((option) => {
              const isSelected = value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-all
                  ${
                    isSelected
                      ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white border-l-2 border-transparent"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
