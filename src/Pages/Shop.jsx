import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import Navigation from "../layouts/Navigation";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <SearchBar />
        <ProductGrid />
      </main>
    </div>
  );
}
