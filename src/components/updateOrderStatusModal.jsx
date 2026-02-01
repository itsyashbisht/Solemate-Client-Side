import {useState} from "react";
import {X} from "lucide-react";
import {useDispatch} from "react-redux";
import {updateOrderStatus} from "@/thunks/order.thunk.js";

const UpdateOrderStatusModal = ({isOpen, orderId, onClose, onSuccess}) => {
   const dispatch = useDispatch();
   const [selectedStatus, setSelectedStatus] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   // ORDER STATUS OPTIONS (from backend enum)
   const ORDER_STATUSES = [
      "CREATED",
      "PROCESSING",
      "OUT FOR DELIVERY",
      "DELIVERED",
      "CANCELLED",
   ];

   // HANDLE SUBMIT
   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      // VALIDATION
      if (!selectedStatus) {
         setError("Please select an order status");
         return;
      }
      const payload = {
         updatedOrderStatus: selectedStatus,
      }
      const updatedOrderStatus = await dispatch(updateOrderStatus({orderId, payload})).unwrap();


   };

   if (!isOpen) return null;

   return (
      <>
         {/* BACKDROP */}
         <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
         />

         {/* MODAL */}
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
               {/* HEADER */}
               <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-black">Update Order Status</h2>
                  <button
                     onClick={onClose}
                     className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                     <X size={20} className="text-gray-600"/>
                  </button>
               </div>

               {/* CONTENT */}
               <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* ORDER ID DISPLAY */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order ID
                     </label>
                     <input
                        type="text"
                        value={orderId}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                     />
                  </div>

                  {/* STATUS SELECT */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Status
                     </label>
                     <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     >
                        <option value="">-- Select Status --</option>
                        {ORDER_STATUSES.map((status) => (
                           <option key={status} value={status}>
                              {status}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* ERROR MESSAGE */}
                  {error && (
                     <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                     </div>
                  )}

                  {/* BUTTONS */}
                  <div className="flex gap-3 pt-4">
                     <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg transition-colors disabled:opacity-50"
                     >
                        {isLoading ? "Updating..." : "Update Status"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default UpdateOrderStatusModal;