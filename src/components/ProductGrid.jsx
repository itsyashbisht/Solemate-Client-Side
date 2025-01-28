import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <div className="flex justify-center py-10">
      <div className="grid justify-center grid-cols-3 gap-x-5 gap-y-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
