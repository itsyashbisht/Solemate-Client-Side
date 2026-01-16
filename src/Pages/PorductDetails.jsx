import ProductDetail from "../components/ProductDetail";
import Footer from "../layouts/Footer";
import Navigation from "../layouts/Navigation";

export default function ProductDetails() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ProductDetail />
      </main>
      <Footer />
    </div>
  );
}
