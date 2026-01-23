import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPreviousPage,
  onNextPage,
  onPageChange, // Added this if you want to click numbers
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-slate-500">
        Showing <span className="text-slate-200">{startItem}</span> to{" "}
        <span className="text-slate-200">{endItem}</span> of{" "}
        <span className="text-slate-200">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
          Prev
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)} // Optional: jump to page
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-500 hover:bg-slate-700/50 hover:text-slate-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalItems === 0}
          className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
