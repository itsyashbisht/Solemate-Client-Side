import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import MobileNavigation from "../layouts/MobileNavigation";
import Navigation from "../layouts/Navigation";
import Footer from "../layouts/Footer";

export default function Shop() {
  return (
    <div className="">
      <MobileNavigation />
      <Navigation />
      <SearchBar />
      <ProductGrid />
      <Footer />
    </div>
  );
}
