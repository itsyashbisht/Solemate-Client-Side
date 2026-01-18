import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function AddToBagButton({
  product,
  selectedSize,
  quantity,
  cartRef,
  handleAddToBag,
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerFlyAnimation = () => {
    const cartElement = document.getElementById("cart-icon");
    const rect = cartElement.getBoundingClientRect();

    // This will make the shoe fly exactly to where the cart is
    // even if the user has scrolled or resized the window
    setTargetPos({ x: rect.left, y: rect.top });
    setIsAnimating(true);
  };

  return (
    <div className="relative w-full">
      {/* The Flying Sneaker Shadow */}
      <AnimatePresence>
        {isAnimating && (
          <motion.img
            src={product.image} // Ensure this is the direct URL to the sneaker image
            initial={{
              opacity: 0.8,
              scale: 0.6,
              fixed: true,
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              top: 20, // Coordinates of your cart icon
              left: "90%", // Coordinates of your cart icon
              scale: 0.1,
              opacity: 0,
              rotate: 45,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
            className="fixed pointer-events-none z-[9999] w-32 h-32 object-contain"
          />
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={triggerFlyAnimation}
        disabled={!product.stock || !selectedSize}
        className={`w-full py-5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${
          selectedSize && product.stock
            ? "bg-black text-white hover:bg-zinc-800"
            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        }`}
      >
        <ShoppingBag className="w-4 h-4" />
        <span>
          {product.stock
            ? `ADD TO BAG — $${(product.price * quantity).toFixed(2)}`
            : "OUT OF STOCK"}
        </span>
      </motion.button>
    </div>
  );
}
