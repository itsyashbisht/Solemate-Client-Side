import { Minus, Plus, Trash2 } from "lucide-react";
import { Card } from "./ui/card";

export default function CartItemCard({ item, onUpdateQuantity, onRemoveItem }) {
  const payload = {
    color: item.color,
    size: item.size,
  };
  const productId = item._id;

  const handleRemoveCartItem = () => {
    onRemoveItem({ productId, payload });
  };

  return (
    <Card className="overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="flex gap-6 p-5 sm:p-6 md:p-7">
        {/* Product Image - Enhanced with subtle shadow and better proportions */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <img
            src={item.product?.images[0]?.url || "/placeholder.svg"}
            alt={item.product?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info - Refined layout and typography */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Section: Name and Variant Info */}
          <div className="space-y-3 mb-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black line-clamp-2 hover:text-gray-700 transition">
              {item.product?.name || item.name}
            </h3>

            {/* Variant Info - Cleaner styling */}
            <div className="flex items-center gap-4 flex-wrap">
              {item.size && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                  <span className="font-medium">Size:</span>
                  <span className="font-semibold text-black">{item.size}</span>
                </div>
              )}
              {item.color && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                  <span className="font-medium">Color:</span>
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: item.color }}
                  ></span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Price, Quantity, Remove */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
            {/* Price - Prominent and clear */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Price
              </span>
              <span className="text-xl sm:text-2xl font-bold text-black mt-1">
                ${((item.product?.price || item.price) / 100).toFixed(2)}
              </span>
            </div>

            {/* Quantity Controls - Modern and interactive */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
              <button
                onClick={() =>
                  onUpdateQuantity(
                    item._id || item.id,
                    Math.max((item.quantity || 1) - 1, 1),
                  )
                }
                className="p-2 hover:bg-white transition-all duration-200 text-gray-600 hover:text-black rounded-lg"
                aria-label="Decrease quantity"
              >
                <Minus size={16} strokeWidth={2.5} />
              </button>
              <span className="px-4 py-2 text-sm font-bold text-black min-w-[2.5rem] text-center">
                {item.quantity || 1}
              </span>
              <button
                onClick={() =>
                  onUpdateQuantity(
                    item._id || item.id,
                    (item.quantity || 1) + 1,
                  )
                }
                className="p-2 hover:bg-white transition-all duration-200 text-gray-600 hover:text-black rounded-lg"
                aria-label="Increase quantity"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Remove Button - Premium delete action */}
            <button
              onClick={handleRemoveCartItem}
              className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Remove item"
            >
              <Trash2 size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
