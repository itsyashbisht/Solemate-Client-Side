import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartItemCard from "../components/CartItem";
import { Button } from "../components/ui/button";
import ShoeCircularLoader from "../layouts/loader";
import { fetchCart, removeItemFromCart } from "../thunks/cart.thunks";
import { Card } from "./ui/card";

// TODO- Kal cart controllers mein cart slice seh fields daalni hai

export default function CartSection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const { items, loading, error, subtotal, tax, discount, totalAmount } =
    useSelector((state) => state.cart);

  if (error) return toast.error(error.message);
  if (loading) return <ShoeCircularLoader />;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
  };

  const removeItem = ({ productId, payload }) => {
    dispatch(removeItemFromCart({ productId, payload }));
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
          <Link to="/shop">
            <Button className="bg-black text-white hover:bg-gray-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <CartItemCard
                key={idx}
                item={item}
                onRemoveItem={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-gray-200 sticky top-20">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg sm:text-xl font-bold text-black">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base sm:text-lg font-semibold mb-3">
                <Link to="/cart/checkout">Proceed to Checkout</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-black text-black hover:bg-gray-50 py-3 text-base bg-transparent"
              >
                Continue Shopping
              </Button>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
