export default function OrderSummary({ cartItems = [], tax, subTotal, total }) {
  return (
    <div className="w-full bg-white animate-in fade-in duration-700">
      {/* HEADER: Mirrored from Shipping Form Stepper style */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-black tracking-tight">
            Review Manifest
          </span>
        </div>
        <div className="h-px flex-1 mx-4 bg-gray-100"></div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {cartItems.length} Units
        </div>
      </div>

      {/* MAIN CONTAINER: Similar to the 'Shipping Address' box in your form */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
            Order Items
          </h3>
          <button className="text-xs text-gray-500 hover:text-black transition border-b border-transparent hover:border-black">
            Edit Cart
          </button>
        </div>

        {/* ITEMS LIST: Increased height for a "Grand" presence */}
        <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-6 p-6 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 transition-colors"
            >
              {/* IMAGE: Larger (w-32 h-32) and fills the space as requested */}
              <div className="w-32 h-32 flex-shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden relative">
                <img
                  src={item.product?.images?.[0].url || "/placeholder.jpg"}
                  alt={item.product?.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* PRODUCT DETAILS: Clean Typography from your form */}
              <div className="flex-1 flex flex-col py-1">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-[15px] font-semibold text-black leading-tight uppercase tracking-tight">
                    {item.product?.name}
                  </h4>
                  <span className="text-base font-medium text-black tracking-tighter">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      Size
                    </span>
                    <span className="text-xs font-medium text-black bg-gray-100 w-fit px-2 py-1 rounded">
                      {item.size}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      Quantity
                    </span>
                    <span className="text-xs font-medium text-black">
                      × {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINANCIAL SUMMARY: Taking the "Continue to Payment" button style for the footer */}
        <div className="p-8 bg-white border-t border-gray-100 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-black">${subTotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="font-bold text-black text-[10px] uppercase tracking-widest">
              Complimentary
            </span>
          </div>
          <div className="flex justify-between text-sm pb-4">
            <span className="text-gray-500">Estimated Tax</span>
            <span className="font-medium text-black">${tax}</span>
          </div>

          {/* TOTAL SECTION: Mirrored from your main action button's weight */}
          <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">
                Total Payable
              </p>
              <p className="text-xs text-gray-400">VAT & Duties included</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-bold tracking-tighter text-black">
                ${total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badge: Added for extra visual length/detail */}
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-[10px] uppercase tracking-widest font-medium">
          End-to-End Encrypted Transaction
        </span>
      </div>
    </div>
  );
}
