import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../thunks/product.thunk';
import ProductCard from './ProductCard';
import ShoeCircularLoader from '../layouts/loader';
import { toast } from 'react-toastify';

export default function ProductGrid ({ searchTerm }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Something went wrong while fetching products.');
    }
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchTerm) return products;

    const searchQuery = searchTerm.toLowerCase();

    // SEARCH RESULT
    let result = [...products];
    result = result.filter((p) =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.brand.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
    return result;

  }, [products, searchTerm]);

  if (loading) return <ShoeCircularLoader size="lg"/>;

  return (
    /* SPACE COMPRESSION: pt-0 ensures it sits right under SearchBar trending tags */
    <div className="w-full bg-white pt-0 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Sleek Line Header - High visual density */}
        <div className="mb-6 flex flex-row items-center justify-between border-b border-neutral-100 pb-3 gap-4">
          {/* Left Side: Title & Badge */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <h2 className="text-lg md:text-xl font-black tracking-tighter text-neutral-900 uppercase">
              Our Collection
            </h2>
            <span
              className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
      Catalog
    </span>
          </div>

          {/* Right Side: Product Count (Improved Visibility) */}
          <p
            className="text-[10px] md:text-[11px] font-mono text-neutral-500 font-medium uppercase tracking-wider text-right">
            {products.length} Models Available
          </p>
        </div>


        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        ) : (
          /* Search No Results State */
          <div className="py-24 text-center">
            <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.5em]">
              No matches found for "{searchTerm}"
            </p>
          </div>
        )}

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
