import ProductDetail from "../components/ProductDetail";
import Navigation from "../layouts/Navigation";

export default function ProductDetails() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ProductDetail />
      </main>
    </div>
  );
}
