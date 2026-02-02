'use client';

import { MapPin, MoreVertical, Search, UserPlus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import FilterTabs from '../components/FilterTabs';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../thunks/user.thunk.js';
import { toast } from 'react-toastify';
import ShoeCircularLoader from '../layouts/loader.jsx';

const UserView = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  const roleConfig = {
    ADMIN: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Admin' },
    SELLER: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Seller' },
    USER: { bg: 'bg-slate-500/20', text: 'text-slate-300', label: 'Customer' },
  };

  const filterTabs = [
    { id: 'ALL', label: 'All' },
    { id: 'SELLER', label: 'Seller' },
    { id: 'ADMIN', label: 'Admin' },
    { id: 'USER', label: 'User' },
  ];

  const { loading, error, allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (!allUsers.length && !loading) {
      dispatch(getAllUsers());
    }
  }, [dispatch, allUsers.length, loading]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Logic for filtering
  const filteredUsers = useMemo(() => {
    if (!allUsers || !Array.isArray(allUsers)) return [];

    let result = [...allUsers];
    if (activeTab !== 'ALL') result = result.filter((u) => u.role === activeTab);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((u) => u.fullname.toLowerCase().includes(q) || u.username.toLowerCase().includes(q),);
    }
    return result;
  }, [activeTab, searchQuery, allUsers]);

  // Pagination Calculations
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage,);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Users
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Directory of registered accounts and roles
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-600/50 active:scale-95">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <ShoeCircularLoader />
        </div>
      ) : (
        <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-700/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Directory
              </h2>
              <div className="relative w-full sm:w-72 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent text-slate-200 placeholder:text-slate-500 transition-all"
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
                tabs={filterTabs}
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
              />
              <SortDropdown
                options={[{ label: 'Newest', value: 'newest' }]}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[420px]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Avatar</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
              {paginatedUsers.map((u) => {
                const config = roleConfig[u.role];
                return (
                  <tr
                    key={u._id}
                    className="hover:bg-slate-700/30 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/30 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {u.fullname.charAt(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-slate-400 font-medium text-sm">
                          @{u.username}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-slate-200 font-medium">
                      {u.fullname}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium text-sm">
                      {u.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <MapPin size={14} className="text-slate-500 flex-shrink-0" />
                        {u.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-150">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700/50">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPreviousPage={handlePrevious}
              onNextPage={handleNext}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;
