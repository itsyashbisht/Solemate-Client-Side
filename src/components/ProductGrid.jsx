import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Slices/ProductsSlice";

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex justify-center py-10">
      <div className="grid justify-center grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
}
