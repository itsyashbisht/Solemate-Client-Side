import { MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";

const OrdersTable = ({ orders = [] }) => {
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
              PRODUCT
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
            orders.map((order, index) => (
              <tr
                key={order.id}
                className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="text-white font-medium">{order.customer}</p>
                    <p className="text-slate-400 text-xs">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {order.product}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white text-right">
                  {order.amount}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors inline-flex">
                    <MoreVertical className="w-4 h-4" />
                  </button>
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
