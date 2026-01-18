import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [showDetails, setShowDetails] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black tracking-tighter">
            Product not found
          </h1>
          <a
            href="/shop"
            className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1"
          >
            Return to shop
          </a>
        </div>
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) return;
    const payload = { color: selectedColor, size: selectedSize, quantity };
    dispatch(addItemToCart({ productId, payload }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left - Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square bg-[#F9F9F9] rounded-3xl overflow-hidden border border-neutral-100 group">
              <img
                src={activeImage?.url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-105"
              />

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isFavorite
                    ? "bg-black text-white"
                    : "bg-white/90 backdrop-blur-md text-black hover:bg-white"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>

              {product.originalPrice && (
                <div className="absolute top-6 left-6 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-[#F9F9F9] border transition-all duration-200 ${
                    activeImage?.url === img.url
                      ? "border-black ring-1 ring-black"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt="Thumbnail"
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 lg:self-start space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                {product.category}
              </span>
              <h1 className="text-4xl font-black tracking-tighter leading-none">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-300 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-neutral-500">
                    Colorway
                  </h3>
                  <span className="text-xs font-medium text-neutral-400">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-black scale-110"
                          : "border-transparent shadow-sm"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-neutral-500">
                    Size
                  </h3>
                  <button className="text-[10px] font-bold uppercase underline tracking-widest text-neutral-400 hover:text-black">
                    Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3.5 text-xs font-bold rounded-xl transition-all ${
                        selectedSize === size
                          ? "bg-black text-white shadow-lg"
                          : "bg-neutral-50 text-black hover:bg-neutral-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-1.5 bg-neutral-50 rounded-2xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white rounded-xl transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white rounded-xl transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* ACTION BUTTON */}
              <Button
                onClick={handleAddToBag}
                disabled={!product.stock || !selectedSize}
                className={`w-full py-7 text-base font-semibold rounded-full transition-all duration-300 ${
                  selectedSize && product.stock
                    ? "bg-foreground hover:bg-foreground/90 text-background"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {loadingToCart
                  ? "Adding to cart..."
                  : product.stock
                    ? `Add to Bag —  $${(product.price * quantity).toFixed(2)}`
                    : "Out of Stock"}
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-1 pt-4 border-t border-neutral-100">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "Returns" },
                { icon: Shield, label: "Authentic" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <item.icon className="w-4 h-4 text-neutral-300" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description Dropdown */}
            <div className="border-t border-neutral-100">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] py-5"
              >
                Product Description
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}
                />
              </button>
              {showDetails && (
                <p className="text-sm text-neutral-500 leading-relaxed pb-6 transition-all">
                  {product.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
