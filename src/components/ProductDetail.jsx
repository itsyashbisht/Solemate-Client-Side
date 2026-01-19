import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import ShoeCircularLoader from "../layouts/loader";
import { addItemToCart } from "../thunks/cart.thunks";
import { getProductById } from "../thunks/product.thunk";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const productId = useParams()?.productId;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  const {
    loading,
    error,
    currentProduct: product,
  } = useSelector((state) => state.product);
  const { loadingToCart, errorCart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (error) toast.error(error);
    if (errorCart) toast.error(errorCart);
  }, [error, errorCart]);

  useEffect(() => {
    if (!product) return;
    if (product?.colors?.length) setSelectedColor(product.colors[0]);
    if (product?.sizes?.length) setSelectedSize(product.sizes[0]);
    if (product?.images?.length) setActiveImage(product.images[0]);
  }, [product]);

  if (loading) return <ShoeCircularLoader />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) return;
    const payload = { color: selectedColor, size: selectedSize, quantity };
    dispatch(addItemToCart({ productId, payload }));
  };

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <main className="max-w-[1200px] mx-auto px-6 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* LEFT: IMAGE SECTION */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-[#f6f6f6] rounded-2xl overflow-hidden group border border-neutral-100">
              <img
                src={activeImage?.url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition-all"
              >
                <Heart
                  size={16}
                  className={
                    isFavorite ? "fill-red-500 text-red-500" : "text-black"
                  }
                />
              </button>
            </div>

            {/* Thumbs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl border-2 transition-all flex-shrink-0 overflow-hidden ${
                    activeImage?.url === img.url
                      ? "border-black bg-white shadow-sm"
                      : "border-transparent opacity-40"
                  }`}
                >
                  <img src={img.url} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION (Optimized for density) */}
          <div className="flex flex-col space-y-6 pt-2">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">
                {product.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-tight leading-none">
                {product.name}
              </h1>
              <p className="text-xl font-medium tracking-tighter mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-6">
              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <span>Size Selection</span>
                  <button className="underline text-black decoration-neutral-200 underline-offset-2">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 text-[11px] font-bold rounded-lg border transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interaction Stack */}
              <div className="space-y-3">
                {/* Quantity - Slimmed Down */}
                <div className="flex items-center justify-between w-32 h-10 bg-neutral-50 rounded-lg border border-neutral-100 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-full flex items-center justify-center hover:bg-white rounded-md transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-full flex items-center justify-center hover:bg-white rounded-md transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Full-width CTA Button */}
                <Button
                  onClick={handleAddToBag}
                  disabled={!product.stock || !selectedSize || loadingToCart}
                  className="w-full h-12 rounded-lg bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/5 hover:bg-neutral-800 transition-all active:scale-[0.98]"
                >
                  {loadingToCart
                    ? "Adding..."
                    : `Add to Bag — $${(product.price * quantity).toFixed(2)}`}
                </Button>
              </div>

              {/* Enhanced Trust Icons */}
              <div className="grid grid-cols-3 gap-2 py-5 border-y border-neutral-100">
                {[
                  { icon: Truck, label: "Fast Ship", sub: "2-3 Business Days" },
                  { icon: RotateCcw, label: "Returns", sub: "30-Day Policy" },
                  { icon: Shield, label: "Verified", sub: "100% Authentic" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center space-y-1"
                  >
                    <item.icon size={14} className="text-blue-600" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-tight">
                        {item.label}
                      </span>
                      <span className="text-[7px] text-neutral-400 uppercase tracking-tighter leading-none">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-[11px] leading-relaxed text-neutral-600">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
