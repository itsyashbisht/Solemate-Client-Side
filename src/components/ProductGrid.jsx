import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../thunks/product.thunk";
import ProductCard from "./ProductCard";
import ShoeCircularLoader from "../layouts/loader";

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (loading) return <ShoeCircularLoader size="lg" />;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="w-full bg-white py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">
            Our Collection
          </h2>
        </div>

        {/* Grid - improved spacing and responsive gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
