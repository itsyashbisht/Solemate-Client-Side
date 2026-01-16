import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import Footer from "../layouts/Footer";
import Navigation from "../layouts/Navigation";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Navigation />
        <SearchBar />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
