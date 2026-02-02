'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterTabs from '../components/FilterTabs';
import OrdersTable from '../components/OrdersTable';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import StatsCards from '../components/StatsCards';
import { getAllOrders } from '../thunks/order.thunk';
import ShoeCircularLoader from '@/layouts/loader.jsx';

const OrdersView = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const itemsPerPage = 8;

  // --- CONFIG ---
  const filterTabs = [
    { id: 'ALL', label: 'All' },
    { id: 'CREATED', label: 'Created' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'OUT_FOR_DELIVERY', label: 'Out for delivery' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Date (Recent)' },
    { value: 'oldest', label: 'Date (Oldest)' },
    { value: 'highestPrice', label: 'Highest Price' },
    { value: 'lowestPrice', label: 'Lowest Price' },
  ];

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // --- LOGIC ---
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activeTab !== 'ALL') {
      result = result.filter((o) => o.orderStatus === activeTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((o) => o.shippingAddress.fullname.toLowerCase().includes(query) || o._id.toLowerCase().includes(query),);
    }

    result.sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);

      const priceA = parseFloat(a.totalAmount);
      const priceB = parseFloat(b.totalAmount);

      if (sortBy === 'highestPrice') return priceB - priceA;
      if (sortBy === 'lowestPrice') return priceA - priceB;
      return 0;
    });

    return result;
  }, [activeTab, searchQuery, sortBy, orders]);

  // Derived Pagination State
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage,);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Real-time orders and statistics
          </p>
        </div>
        <p
          className="hidden sm:block text-slate-500 text-xs font-medium uppercase tracking-wider bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/30">
          Updated 1 min ago
        </p>
      </div>

      <StatsCards/>

      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
        {/* Toolbar */}
        <div
          className="p-4 border-b border-slate-700/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              All Orders
            </h2>

            <div className="relative w-full sm:w-64 group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
              <input
                type="text"
                placeholder="Search ID or name..."
                className="w-full pl-10 pr-9 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent text-slate-200 placeholder:text-slate-500 transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={16}/>
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
            <div className="h-5 w-px bg-slate-700/50 hidden lg:block"/>
            <SortDropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <ShoeCircularLoader/>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-[420px]">
            {totalItems > 0 ? (
              <OrdersTable orders={paginatedOrders}/>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <Search className="w-10 h-10 text-slate-600/60 mb-4"/>
                <p className="font-medium text-slate-500">No orders found</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700/50">
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
