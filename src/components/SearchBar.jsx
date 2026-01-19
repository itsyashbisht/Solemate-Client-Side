import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full bg-transparent">
      {/* COMPRESSION: pt-6 pb-2 significantly reduces the gap before the grid */}
      <div className="max-w-[1400px] mx-auto px-6 pt-6 pb-2 flex flex-col items-center">
        {/* Header Section - Minimalist approach */}
        <div className="flex flex-col items-center mb-4 text-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-[1px] w-4 bg-blue-600"></div>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-blue-600">
              Inventory
            </span>
            <div className="h-[1px] w-4 bg-blue-600"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter text-neutral-900 uppercase leading-tight">
            Find Your Pair
          </h2>
        </div>

        {/* Search Bar - Slimmer height (h-12) */}
        <div className="w-full max-w-lg flex items-center relative group">
          <div className="flex-1 relative">
            <Search
              size={14}
              strokeWidth={2.5}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors"
            />
            <Input
              type="text"
              placeholder="Search models..."
              className="w-full pl-12 pr-24 h-11 md:h-12 text-xs font-medium bg-white border-neutral-200 rounded-full focus-visible:ring-0 focus-visible:border-black transition-all placeholder:text-neutral-300 placeholder:font-normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button className="absolute right-1.5 h-8 md:h-9 px-4 bg-black hover:bg-neutral-800 text-white text-[8px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95">
            Search
          </Button>
        </div>

        {/* Trending Tags - Tightened margin */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 items-center">
          <span className="text-[7px] font-bold text-neutral-300 uppercase tracking-[0.2em]">
            Trending:
          </span>
          {["Series 01", "Carbon Flux", "Aero Stealth"].map((tag) => (
            <button
              key={tag}
              className="text-[10px] font-medium text-neutral-500 hover:text-blue-600 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
