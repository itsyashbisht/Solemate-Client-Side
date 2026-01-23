import { MapPin, MoreVertical, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import FilterTabs from "../components/FilterTabs";
import Pagination from "../components/Pagination";
import SortDropdown from "../components/SortDropdown";

const UserView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8; // Synced with Pagination

  const roleConfig = {
    ADMIN: { bg: "bg-purple-500/20", text: "text-purple-300", label: "Admin" },
    SELLER: { bg: "bg-blue-500/20", text: "text-blue-300", label: "Seller" },
    USER: { bg: "bg-slate-500/20", text: "text-slate-300", label: "Customer" },
  };

  const mockUsers = [
    {
      id: "U-001",
      fullname: "Nina Williams",
      username: "nina_w",
      email: "nina@gmail.com",
      role: "ADMIN",
      city: "San Francisco",
      state: "CA",
      createdAt: "2024-01-15",
    },
    {
      id: "U-002",
      fullname: "Emma Watson",
      username: "emma_watson",
      email: "emma@gmail.com",
      role: "USER",
      city: "London",
      state: "UK",
      createdAt: "2024-02-10",
    },
    {
      id: "U-003",
      fullname: "Jin Kazama",
      username: "jin_k",
      email: "jin@tekken.com",
      role: "SELLER",
      city: "Tokyo",
      state: "JP",
      createdAt: "2024-02-20",
    },
  ];

  // Logic for filtering
  const filteredUsers = useMemo(() => {
    let result = [...mockUsers];
    if (activeTab !== "all")
      result = result.filter((u) => u.role === activeTab);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.fullname.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  // Pagination Calculations
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-end justify-between px-1">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Users
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Directory of registered accounts and roles
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/10 active:scale-95">
          <UserPlus size={16} /> Add User
        </button>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700/40 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Directory
            </h2>
            <div className="relative w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search users..."
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
              options={[{ label: "Newest", value: "newest" }]}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-900/40 text-slate-500 text-[10px] uppercase font-bold tracking-[0.1em]">
              <tr>
                <th className="px-6 py-5">Avatar</th>
                <th className="px-6 py-5">Username</th>
                <th className="px-6 py-5">Full Name</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">City</th>
                <th className="px-6 py-5">Joined</th>
                <th className="px-6 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paginatedUsers.map((u) => {
                const config = roleConfig[u.role];
                return (
                  <tr
                    key={u.id}
                    className="border-t border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/50 flex items-center justify-center text-blue-400 font-bold text-[11px] shadow-lg">
                        {u.fullname.charAt(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 font-medium text-[11px] tracking-wider">
                        @{u.username}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-200 font-medium">
                      {u.fullname}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${config.bg} ${config.text}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium">
                      {u.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <MapPin size={12} className="text-slate-600" />
                        {u.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                      {u.createdAt}
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

        {/* Corrected Pagination Call */}
        <div className="px-6 py-4 bg-slate-900/20 border-t border-slate-700/40">
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
    </div>
  );
};

export default UserView;
