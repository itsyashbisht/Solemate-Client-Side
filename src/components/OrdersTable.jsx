import { useState } from "react";
import { MoreVertical, Eye, Edit, CreditCard, XCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

const OrdersTable = ({ orders = [] }) => {
  // State to track which dropdown is currently open
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
              ORDER ID
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
              CUSTOMER
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
              NO. OF ITEMS
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
              ORDER DATE
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
              STATUS
            </th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">
              AMOUNT
            </th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-slate-300">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                {/* ... existing cells ... */}
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {order._id}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="text-white font-medium">
                      {order.shippingAddress.fullname}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {order.shippingAddress.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {order.orderItems?.length}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {order.createdAt}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.orderStatus} />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white text-right">
                  {order.totalAmount}
                </td>

                {/* ACTION COLUMN */}
                <td className="px-6 py-4 text-center relative">
                  <button
                    onClick={() => toggleMenu(order._id)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors inline-flex"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === order._id && (
                    <>
                      {/* Click outside to close overlay */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      ></div>

                      <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                        <button className="w-full px-4 py-2.5 text-sm text-left text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                          <Eye className="w-4 h-4" /> View Details
                        </button>
                        <button className="w-full px-4 py-2.5 text-sm text-left text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                          <Edit className="w-4 h-4" /> Update Status
                        </button>
                        <button className="w-full px-4 py-2.5 text-sm text-left text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" /> Payment Status
                        </button>
                        <hr className="border-slate-700" />
                        <button className="w-full px-4 py-2.5 text-sm text-left text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                          <XCircle className="w-4 h-4" /> Cancel Order
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
