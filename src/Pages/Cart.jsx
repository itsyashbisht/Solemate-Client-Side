import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartItemCard from "../components/CartItem";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import ShoeCircularLoader from "../layouts/loader";
import Navigation from "../layouts/Navigation";
import { fetchCart } from "../thunks/cart.thunks";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Black & White Running Shoes",
      price: 129.99,
      quantity: 1,
      image: "/premium-black-and-white-running-shoes.jpg",
    },
    {
      id: 2,
      name: "White Canvas Sneaker",
      price: 89.99,
      quantity: 2,
      image: "/white-canvas-sneaker-shoes.jpg",
    },
    {
      id: 3,
      name: "Black Urban Street Shoes",
      price: 119.99,
      quantity: 1,
      image: "/black-urban-street-shoes.jpg",
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const { items, loading, error } = useSelector((state) => state.cart);

  if (error) return toast.error(error.message);
  if (loading) return <ShoeCircularLoader />;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-8">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
            <Button className="bg-black text-white hover:bg-gray-800">
              Continue Shopping
            </Button>
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
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base sm:text-lg font-semibold mb-3">
                  Proceed to Checkout
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
    </div>
  );
}
