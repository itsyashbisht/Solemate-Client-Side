import ProductDetailGrid from "../components/ProductDetailGrid";
import Navigation from "../layouts/Navigation";

export default function ProductDetails() {
  return (
    <div className="lg:mx-24 md:mx-16 sm:mx-12 mx-8">
      <Navigation />
      <ProductDetailGrid />
    </div>
  );
}
