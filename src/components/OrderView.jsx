import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTabs from "../components/FilterTabs";
import OrdersTable from "../components/OrdersTable";
import Pagination from "../components/Pagination";
import SortDropdown from "../components/SortDropdown";
import StatsCards from "../components/StatsCards";
import { getAllOrders } from "../thunks/order.thunk";

const OrdersView = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;
  const dispatch = useDispatch();

  // --- CONFIG ---
  const filterTabs = [
    { id: "all", label: "All" },
    { id: "confirmed", label: "Confirmed" },
    { id: "shipped", label: "Shipped" },
    { id: "unconfirmed", label: "Unconfirmed" },
  ];

  const sortOptions = [
    { value: "recent", label: "Date (Recent)" },
    { value: "oldest", label: "Date (Oldest)" },
    { value: "highestPrice", label: "Highest Price" },
    { value: "lowestPrice", label: "Lowest Price" },
  ];

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  console.log(orders);

  // --- LOGIC ---
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activeTab !== "all") {
      result = result.filter((o) => o.status === activeTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.customer.toLowerCase().includes(query) ||
          o.id.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "recent")
        return new Date(b.orderDate) - new Date(a.orderDate);
      if (sortBy === "oldest")
        return new Date(a.orderDate) - new Date(b.orderDate);

      const priceA = parseFloat(a.amount.replace(/[$,]/g, ""));
      const priceB = parseFloat(b.amount.replace(/[$,]/g, ""));

      if (sortBy === "highestPrice") return priceB - priceA;
      if (sortBy === "lowestPrice") return priceA - priceB;
      return 0;
    });

    return result;
  }, [activeTab, searchQuery, sortBy, orders]);

  // Derived Pagination State
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between px-1">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Real-time orders and statistics
          </p>
        </div>
        <p className="hidden sm:block text-slate-500 text-[10px] font-bold uppercase tracking-widest bg-slate-800/50 px-2 py-1 rounded border border-slate-700/30">
          Updated 1 min ago
        </p>
      </div>

      <StatsCards />

      <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700/40 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Recent Orders
              </h2>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20 font-bold">
                {totalItems}
              </span>
            </div>

            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search ID or name..."
                className="w-full pl-9 pr-8 py-2 bg-slate-900/40 border border-slate-700/50 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FilterTabs
              tabs={filterTabs}
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            />
            <div className="h-6 w-[1px] bg-slate-700/50 hidden xl:block" />
            <SortDropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto min-h-[420px]">
          {totalItems > 0 ? (
            <OrdersTable orders={paginatedOrders} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-600">
              <Search className="w-8 h-8 opacity-20 mb-4" />
              <p className="font-medium text-sm text-slate-500">
                No orders found
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Corrected with all props */}
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

export default OrdersView;
