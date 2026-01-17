import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col h-full">
      <Link to={`/shop/product/${product._id}`}>
        <div className="relative rounded-3xl overflow-hidden flex-1 bg-white border border-gray-200 hover:shadow-xl transition-all duration-500 group">
          {/* Image Section with better aspect ratio */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
            <img
              src={product.images[0].url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content - spacious bottom section */}
          <div className="p-6 space-y-4">
            {/* Category tag */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                {product.category}
              </p>
              <h3 className="text-lg font-semibold text-black leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Description - improved spacing */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Pricing - cleaner layout */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-bold text-black">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Button - full width with better styling */}
            {/* <Button
              className={`w-full py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                product.stock
                  ? "bg-black hover:bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!product.stock || loading}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.stock ? "ADD TO CART" : "Out of Stock"}
            </Button> */}
          </div>
        </div>

        {/* Subscribe text - cleaner */}
        {product.badge && (
          <div className="text-center pt-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
              Save 16% with subscription
            </p>
          </div>
        )}
      </Link>
    </div>
  );
}
