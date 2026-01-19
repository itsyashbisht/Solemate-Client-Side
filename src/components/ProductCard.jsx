import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col h-full">
      <Link
        to={`/shop/product/${product._id}`}
        className="group h-full flex flex-col"
      >
        {/* Card Container - Keeping your Rounded-3xl and Thin Border */}
        <div className="relative rounded-[2rem] overflow-hidden flex-1 bg-white border border-gray-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col">
          {/* Image Section - Fully occupied by the image */}
          <div className="relative w-full aspect-square bg-[#fcfcfc] overflow-hidden">
            <img
              src={product.images?.[0]?.url || "/placeholder.svg"}
              alt={product.name}
              /* CLEAN ZOOM: Pure center scale, no tilt. h-full w-full ensures it occupies the section */
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Minimalist Badge - Only if category exists */}
            {product.category && (
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-black border border-gray-100">
                  {product.category}
                </span>
              </div>
            )}
          </div>

          {/* Content Section - Spacious and Thinner Text */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium text-black leading-tight tracking-tight">
                {product.name}
              </h3>
              <div className="text-right">
                <span className="text-lg font-normal text-black">
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Description - Thinner and spacious */}
            <p className="text-sm text-gray-500 font-normal leading-relaxed line-clamp-2 mb-4">
              {product.description}
            </p>

            {/* Pricing / Original Price Logic */}
            {product.originalPrice && (
              <div className="mt-auto pt-2">
                <span className="text-xs text-gray-300 line-through">
                  Originally ${product.originalPrice}
                </span>
              </div>
            )}

            {/* Subscribe text - Styled to match your Discover/Explore style */}
            {product.badge && (
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-[10px] text-blue-600 font-medium uppercase tracking-[0.15em]">
                  Save 16% with subscription
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
