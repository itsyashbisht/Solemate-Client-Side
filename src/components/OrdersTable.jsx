import {useState} from "react";
import {CreditCard, Edit, Eye, MoreVertical, XCircle, ShoppingBag} from "lucide-react";
import StatusBadge from "./StatusBadge";
import {toast} from "react-toastify";
import UpdateOrderStatusModal from "@/components/updateOrderStatusModal.jsx";

const OrdersTable = ({orders = []}) => {
   const [activeMenu, setActiveMenu] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [orderId, setOrderId] = useState(null);

   const toggleMenu = (id) => {
      setActiveMenu(activeMenu === id ? null : id);
   };

   // Helper for currency
   const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
         style: 'currency',
         currency: 'INR',
         maximumFractionDigits: 0
      }).format(amount);
   };

   return (
      <div className="relative w-full rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
               <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Order Details</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Items</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th
                     className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Amount
                  </th>
                  <th
                     className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Actions
                  </th>
               </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
               {orders.map((order) => (
                  <tr key={order._id} className="group hover:bg-slate-800/40 transition-all duration-200">
                     <td className="px-6 py-4">
                        <span
                           className="text-sm font-mono font-medium text-indigo-400">#{order._id.slice(-6).toUpperCase()}</span>
                        <p className="text-[11px] text-slate-500 mt-1">
                           {new Date(order?.createdAt).toLocaleDateString("en-US", {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                           })}
                        </p>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span
                              className="text-sm font-semibold text-slate-200">{order.shippingAddress.fullname}</span>
                           <span className="text-xs text-slate-500">{order.shippingAddress.email}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-sm text-slate-300">
                        <div className="flex items-center gap-1.5">
                              <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">
                                 {order?.orderItems?.length} {order?.orderItems?.length === 1 ? 'item' : 'items'}
                              </span>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <StatusBadge status={order?.orderStatus}/>
                     </td>
                     <td className="px-6 py-4 text-sm font-bold text-white text-right">
                        {formatCurrency(order.totalAmount)}
                     </td>

                     <td className="px-6 py-4 text-center">
                        <div className="relative inline-block text-left">
                           <button
                              onClick={() => toggleMenu(order._id)}
                              className={`p-2 rounded-lg transition-all ${
                                 activeMenu === order._id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                           >
                              <MoreVertical className="w-5 h-5"/>
                           </button>

                           {activeMenu === order._id && (
                              <>
                                 <div className="fixed inset-0 z-30" onClick={() => setActiveMenu(null)}/>
                                 <div
                                    className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-slate-800 border border-slate-700 shadow-2xl z-40 py-1.5 animate-in fade-in zoom-in duration-150">
                                    <MenuAction icon={<Eye size={16}/>} label="View Details"/>
                                    <MenuAction
                                       icon={<Edit size={16}/>}
                                       label="Update Status"
                                       onClick={() => {
                                          setIsModalOpen(true);
                                          setOrderId(order._id);
                                          setActiveMenu(null);
                                       }}
                                    />
                                    <MenuAction icon={<CreditCard size={16}/>} label="Payment Info"/>
                                    <div className="my-1 border-t border-slate-700"/>
                                    <MenuAction icon={<XCircle size={16}/>} label="Cancel Order" variant="danger"/>
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
            <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-500"/>
               </div>
               <h3 className="text-slate-300 font-medium">No orders found</h3>
               <p className="text-slate-500 text-sm mt-1">When you receive orders, they will appear here.</p>
            </div>
         )}

         <UpdateOrderStatusModal
            isOpen={isModalOpen}
            orderId={orderId}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
               toast.success("Status updated successfully");
               setIsModalOpen(false);
            }}
         />
      </div>
   );
};

// Sub-component for cleaner menu items
const MenuAction = ({icon, label, onClick, variant = "default"}) => (
   <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
         variant === "danger"
            ? "text-red-400 hover:bg-red-500/10"
            : "text-slate-300 hover:bg-slate-700/50"
      }`}
   >
      {icon}
      {label}
   </button>
);

export default OrdersTable;