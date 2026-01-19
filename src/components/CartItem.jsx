import { Minus, Plus, Trash2 } from "lucide-react";

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
    <div className="group relative flex gap-5 p-5 bg-white border border-gray-200 rounded-lg transition-all duration-300">
      {/* IMAGE SECTION - Clean rounded edges, no heavy borders */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        <img
          src={item.product?.images[0]?.url || "/placeholder.svg"}
          alt={item.product?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* INFO SECTION - Balanced Typography */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="space-y-1.5">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-0.5">
              {/* Category: Light and subtle */}
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                {item.product?.category || "Premium Gear"}
              </span>
              {/* Product Name: Strong but not shouting (Sentence Case) */}
              <h3 className="text-[17px] font-bold text-black leading-tight tracking-tight">
                {item.product?.name || item.name}
              </h3>
            </div>
            <button
              onClick={handleRemoveCartItem}
              className="p-1 text-gray-300 hover:text-red-500 transition-colors"
              aria-label="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Attributes: Simple text, no uppercase excess */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {item.size && (
              <span>
                Size:{" "}
                <span className="text-black font-medium">{item.size}</span>
              </span>
            )}
            {item.color && (
              <div className="flex items-center gap-1.5">
                <span>Color:</span>
                <span
                  className="w-2.5 h-2.5 rounded-full border border-gray-200"
                  style={{ backgroundColor: item.color }}
                ></span>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION - Clean controls */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center border border-gray-200 rounded-lg h-8 bg-white overflow-hidden">
            <button
              onClick={() =>
                onUpdateQuantity(
                  item._id || item.id,
                  Math.max((item.quantity || 1) - 1, 1),
                )
              }
              className="px-2.5 h-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-xs font-semibold text-black">
              {item.quantity || 1}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item._id || item.id, (item.quantity || 1) + 1)
              }
              className="px-2.5 h-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold tracking-tight text-black">
              $
              {(
                ((item.product?.price || item.price) * (item.quantity || 1)) /
                100
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
