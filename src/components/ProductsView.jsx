'use client';

import { MoreVertical, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductModal } from '../components/addProductModal';
import FilterTabs from '../components/FilterTabs';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import ShoeCircularLoader from '../layouts/loader';
import { createProduct, getAllProducts } from '../thunks/product.thunk';
import { toast } from 'react-toastify';

const ProductsView = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const dispatch = useDispatch();
  const itemsPerPage = 8;

  const statusConfig = {
    inStock: {
      bg: 'bg-green-500/20',
      text: 'text-green-300',
      label: 'In Stock',
    },
    lowStock: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-300',
      label: 'Low Stock',
    },
    outOfStock: {
      bg: 'bg-rose-500/20',
      text: 'text-rose-300',
      label: 'Out of Stock',
    },
  };

  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
  }, [error]);

  const onAddProduct = (formData) => {
    dispatch(createProduct(formData));
  };

  // --- LOGIC ---
  const filteredProducts = useMemo(() => {
    if (loading) return [];
    let result = [...products];
    if (activeTab !== 'all') {
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
  }, [activeTab, searchQuery, products, loading]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  console.log(paginatedProducts);

  // Ensure that the loading state is handled correctly in the return statement
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Products
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Inventory management and stock control
          </p>
        </div>
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-600/50 active:scale-95"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Inventory
            </h2>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search catalog..."
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
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            />
            <SortDropdown
              options={[{ label: 'Recent', value: 'recent' }]}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-12">
              <ShoeCircularLoader />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
              {paginatedProducts?.map((p) => {
                const statusKey =
                  p.stock > 10 ? 'inStock' : p.stock > 0 ? 'lowStock' : 'outOfStock';
                const config = statusConfig[statusKey];

                return (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-700/30 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <div className="w-11 h-11 rounded-lg bg-slate-900/60 border border-slate-700/50 overflow-hidden shadow-sm group-hover:border-slate-600/70 transition-colors">
                        <img
                          src={p.images[0].url || "/placeholder.svg"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          alt={p.name}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-slate-400 font-medium uppercase text-xs tracking-wider bg-slate-700/30 px-2.5 py-1 rounded-md border border-slate-600/30">
                          {p.brand}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-slate-200 font-medium block max-w-xs truncate">
                          {p.name}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium text-sm">
                      {p.category}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold text-sm">
                     ₹ {p.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium text-sm">
                      {p.stock} units
                    </td>
                    <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap inline-block ${config.bg} ${config.text}`}
                        >
                          {config.label}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700/40 transition-all duration-150">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Section */}
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

      {/* MODAL */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onAddProduct={onAddProduct}
        onClose={() => setIsAddProductOpen(false)}
      />
    </div>
  );
};

export default ProductsView;
