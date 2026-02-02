'use client';

import { useState } from 'react';
import { CreditCard, Edit, Eye, MoreVertical, ShoppingBag, XCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { toast } from 'react-toastify';
import UpdateOrderStatusModal from '@/components/updateOrderStatusModal.jsx';

const OrdersTable = ({ orders = [] }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // Helper for currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div
      className="relative w-full rounded-lg border border-slate-700/50 bg-slate-900/40 backdrop-blur overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
          <tr className="border-b border-slate-700/50 bg-slate-900/50">
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Order ID
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Customer
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Items
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Order Date
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-slate-700/20 transition-colors duration-150 group">
              <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-blue-400">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-white">
                    {order.shippingAddress.fullname}
                  </p>
                  <p className="text-xs text-slate-500">
                    {order.shippingAddress.email}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                  <span
                    className="inline-flex items-center bg-slate-700/40 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 border border-slate-600/30">
                    {order?.orderItems?.length} {order?.orderItems?.length === 1 ? 'item' : 'items'}
                  </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">
                {new Date(order?.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={order?.orderStatus}/>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-white">
                {formatCurrency(order.totalAmount)}
              </td>

              <td className="px-6 py-4 text-right">
                <div className="relative inline-block">
                  <button
                    onClick={() => toggleMenu(order._id)}
                    className={`p-2 rounded-lg transition-all duration-150 ${
                      activeMenu === order._id
                        ? 'bg-slate-700/60 text-white'
                        : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-200'
                    }`}
                  >
                    <MoreVertical className="w-5 h-5"/>
                  </button>

                  {activeMenu === order._id && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-slate-800 border border-slate-700/60 shadow-xl z-40 py-1 animate-in fade-in zoom-in-95 duration-150">
                        <MenuAction
                          icon={<Eye size={16}/>}
                          label="View Details"
                        />
                        <MenuAction
                          icon={<Edit size={16}/>}
                          label="Update Status"
                          onClick={() => {
                            setIsModalOpen(true);
                            setOrderId(order._id);
                            setActiveMenu(null);
                          }}
                        />
                        <MenuAction
                          icon={<CreditCard size={16}/>}
                          label="Payment Info"
                        />
                        <div className="my-1 border-t border-slate-700/40"/>
                        <MenuAction
                          icon={<XCircle size={16}/>}
                          label="Cancel Order"
                          variant="danger"
                        />
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-slate-700/30 p-4 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-slate-500"/>
          </div>
          <h3 className="text-slate-300 font-semibold">No orders found</h3>
          <p className="text-slate-500 text-sm mt-1">
            When you receive orders, they will appear here.
          </p>
        </div>
      )}

      <UpdateOrderStatusModal
        isOpen={isModalOpen}
        orderId={orderId}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          toast.success('Status updated successfully');
          setIsModalOpen(false);
        }}
      />
    </div>);
};

// Sub-component for cleaner menu items
const MenuAction = ({ icon, label, onClick, variant = 'default' }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2.5 text-sm flex items-center gap-3 transition-colors duration-150 ${
      variant === 'danger'
        ? 'text-red-400 hover:bg-red-500/15'
        : 'text-slate-300 hover:bg-slate-700/60 hover:text-slate-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default OrdersTable;
