import { MoreVertical, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import FilterTabs from "../components/FilterTabs";
import Pagination from "../components/Pagination";
import SortDropdown from "../components/SortDropdown";

const ProductsView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  const statusConfig = {
    inStock: {
      bg: "bg-green-500/20",
      text: "text-green-300",
      label: "In Stock",
    },
    lowStock: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-300",
      label: "Low Stock",
    },
    outOfStock: {
      bg: "bg-rose-500/20",
      text: "text-rose-300",
      label: "Out of Stock",
    },
  };

  const mockProducts = [
    {
      id: "P-01",
      name: "Air Max Pro 2025",
      brand: "Nike",
      category: "Running",
      price: 120,
      stock: 45,
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: "P-02",
      name: "Jordan Retro 1 High OG",
      brand: "Jordan",
      category: "Basketball",
      price: 190,
      stock: 0,
      img: "https://images.unsplash.com/photo-1597045566774-ed45ae4b304d",
    },
    {
      id: "P-03",
      name: "Yeezy Boost 350 V2 Carbon",
      brand: "Adidas",
      category: "Lifestyle",
      price: 220,
      stock: 8,
      img: "https://images.unsplash.com/photo-1584486520270-19eca1efcce5",
    },
  ];

  // --- LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];
    if (activeTab !== "all") {
      // Logic for specific status tabs can go here
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-end justify-between px-1">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight capitalize">
            Products
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Inventory management and stock control
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/10 active:scale-95">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700/40 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Inventory
            </h2>
            <div className="relative w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full pl-10 pr-8 py-2.5 bg-slate-900/40 border border-slate-700/50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FilterTabs
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            />
            <SortDropdown
              options={[{ label: "Recent", value: "recent" }]}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Atomic Grid Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/40 text-slate-500 text-[10px] uppercase font-bold tracking-[0.1em]">
              <tr>
                <th className="px-6 py-5">Preview</th>
                <th className="px-6 py-5">Brand</th>
                <th className="px-6 py-5">Product Name</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Stock</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paginatedProducts.map((p) => {
                const statusKey =
                  p.stock > 10
                    ? "inStock"
                    : p.stock > 0
                      ? "lowStock"
                      : "outOfStock";
                const config = statusConfig[statusKey];

                return (
                  <tr
                    key={p.id}
                    className="border-t border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/50 overflow-hidden shadow-inner group-hover:border-slate-500 transition-colors">
                        <img
                          src={p.img}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 font-medium uppercase text-[10px] tracking-[0.15em] bg-slate-900/50 px-2 py-1 rounded-md border border-slate-700/30">
                        {p.brand}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-200 font-medium truncate max-w-[220px] block">
                        {p.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium">
                      {p.category}
                    </td>
                    <td className="px-6 py-4 text-white font-medium font-mono">
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium">
                      {p.stock} units
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap ${config.bg} ${config.text}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-500 hover:text-white transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-6 py-4 bg-slate-900/20 border-t border-slate-700/40">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPreviousPage={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            onNextPage={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
