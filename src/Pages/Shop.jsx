import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import Navigation from "../layouts/Navigation";

export default function Shop() {
  return (
    <div className="lg:mx-24 md:mx-16 sm:mx-12 mx-8  ">
      <Navigation />
      <SearchBar />
      <ProductGrid />
    </div>
  );
}
