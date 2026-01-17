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
import { useParams } from "react-router-dom";
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
  const [activeImage, setActiveImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // FETCH PRODUCT DETAILS
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

  // HANDLE ERROR TOAST
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!product) return;

    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }

    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (loading) return <ShoeCircularLoader />;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <a href="/shop" className="text-foreground underline">
              Return to shop
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) return;
    const payload = {
      color: selectedColor,
      size: selectedSize,
      quantity,
    };
    console.log("Adding to bag:", payload);

    dispatch(addItemToCart({ productId, payload }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left - Image Gallery */}
            <div className="space-y-4">
              {/* Main Image with gradient overlay */}
              <div className="relative aspect-[4/5] bg-secondary rounded-3xl overflow-hidden group">
                <img
                  src={
                    activeImage.url ||
                    product.images[0].url ||
                    "/placeholder.svg"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Favorite button floating */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isFavorite
                      ? "bg-foreground text-background"
                      : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>

                {/* Sale badge */}
                {product.originalPrice && (
                  <div className="absolute top-6 left-6 bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100,
                    )}
                    % OFF
                  </div>
                )}

                {/* Image dots indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImage === img
                          ? "bg-foreground w-6"
                          : "bg-foreground/30 hover:bg-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 overflow-x-auto py-2 px-2 scrollbar-hide">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                      activeImage === img
                        ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-fill"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      Color
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedColor}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full transition-all duration-300 ${
                          selectedColor === color
                            ? "ring-2 ring-foreground ring-offset-4 ring-offset-background scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection - Pill style */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Size</p>
                  <button className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 p-3 text-sm font-medium rounded-full bg-slate-100 transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-foreground text-background ring-2 ring-foreground ring-offset-1 ring-offset-background scale-105"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-sm text-destructive">
                    Please select a size to continue
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-secondary rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-secondary/80 rounded-l-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-foreground hover:bg-secondary/80 rounded-r-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Total:{" "}
                    <span className="font-semibold text-foreground">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>

              {/* Add to Bag Button */}
              <Button
                onClick={handleAddToBag}
                disabled={!selectedSize || !product.stock}
                className={`w-full py-7 text-base font-semibold rounded-full transition-all duration-300 ${
                  selectedSize && product.inStock
                    ? "bg-foreground hover:bg-foreground/90 text-background"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {product.stock
                  ? `Add to Bag —  $${(product.price * quantity).toFixed(2)}`
                  : "Out of Stock"}
              </Button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Truck className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Easy Returns
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Secure Pay
                  </span>
                </div>
              </div>

              {/* Expandable Description */}
              <div className="border-t border-border pt-6">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-between py-2 group"
                >
                  <span className="text-sm font-semibold text-foreground">
                    Product Details
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      showDetails ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    showDetails
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Color:
                      </span>{" "}
                      {selectedColor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Style Code:
                      </span>{" "}
                      PRD-
                      {product._id.toString().padStart(4, "0")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Material:
                      </span>{" "}
                      Premium leather & textile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
