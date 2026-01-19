import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartItemCard from "../components/CartItem";
import { Button } from "../components/ui/button";
import ShoeCircularLoader from "../layouts/loader";
import { fetchCart, removeItemFromCart } from "../thunks/cart.thunks";

export default function CartSection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const { items, loading, error, subtotal, tax, totalAmount } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to load cart");
  }, [error]);

  if (loading) return <ShoeCircularLoader />;

  const updateQuantity = (id, newQuantity) => {
    // Logic for updating quantity
  };

  const removeItem = ({ productId, payload }) => {
    dispatch(removeItemFromCart({ productId, payload }));
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1200px] w-full mx-auto px-6 py-12">
        {/* HEADER: Simplified to match Stepper style logic */}
        <header className="mb-10 flex items-baseline justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Your Bag
          </h1>
          <span className="text-sm font-medium text-gray-400">
            {items.length} {items.length === 1 ? "Unit" : "Units"}
          </span>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-sm font-medium text-gray-400 mb-6">
              Your inventory is currently empty
            </p>
            <Link to="/shop">
              <Button className="bg-black text-white px-8 py-6 rounded-lg text-sm font-medium hover:bg-gray-900 transition-all">
                Return to Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: CART ITEMS */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item, idx) => (
                <CartItemCard
                  key={idx}
                  item={item}
                  onRemoveItem={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <aside className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <h2 className="text-lg font-semibold text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-black">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Estimated Tax</span>
                    <span className="font-medium text-black">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-xs font-bold text-black uppercase tracking-widest">
                      Free
                    </span>
                  </div>

                  {/* Total Amount Section */}
                  <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Total Payable
                      </span>
                      <span className="text-xs text-gray-400">USD</span>
                    </div>
                    <span className="text-3xl font-bold tracking-tighter text-black">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Placed outside the card to match ShippingForm pattern */}
              <div className="space-y-4">
                <Link to="/cart/checkout" className="block">
                  <Button className="w-full py-7 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-all active:scale-[0.98] shadow-lg shadow-black/5">
                    Checkout Now
                  </Button>
                </Link>

                <Link to="/shop" className="block text-center">
                  <button className="text-xs font-medium text-gray-400 hover:text-black transition-colors py-2">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Secure Checkout Active
                </span>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
