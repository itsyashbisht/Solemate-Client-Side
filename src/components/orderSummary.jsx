export default function OrderSummary({ cartItems = [], tax, subTotal, total }) {
  const shipping = 0;

  return (
    <div className="hidden lg:flex flex-col w-full lg:w-1/2 bg-white">
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-black">Order Summary</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No items in cart</p>
        ) : (
          cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
            >
              <img
                src={item.product?.images?.[0].url || "/placeholder.jpg"}
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded-lg bg-gray-100"
              />
              <div className="flex-1">
                <h3 className="font-medium text-black text-sm">
                  {item.product?.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="font-semibold text-black mt-2">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-8 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subTotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600">FREE</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax (18%)</span>
          <span>${tax}</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold text-black">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}
