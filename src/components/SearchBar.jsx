import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full bg-white border-gray-200">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
            <Input
              type="text"
              placeholder="Search for shoes, styles, brands..."
              className="w-full pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base rounded-l-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="h-10 sm:h-12 px-4 sm:px-8 bg-black hover:bg-gray-800 text-white text-sm sm:text-base font-medium rounded-r-full transition-colors duration-200 w-full sm:w-auto">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
