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

  if (loading) return <ShoeCircularLoader size="lg" />;
  if (error)
    return (
      <p className="text-center py-10 text-red-500 font-medium text-xs">
        {error}
      </p>
    );

  return (
    /* SPACE COMPRESSION: pt-0 ensures it sits right under SearchBar trending tags */
    <div className="w-full bg-white pt-0 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Sleek Line Header - High visual density */}
        <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black tracking-tighter text-neutral-900 uppercase">
              Our Collection
            </h2>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Catalog
            </span>
          </div>

          <p className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest">
            {products.length} Models Available
          </p>
        </div>

        {/* Grid - Standardized gap-y-8 keeps the products compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-neutral-300 text-[11px] uppercase tracking-widest">
              End of Catalog
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
