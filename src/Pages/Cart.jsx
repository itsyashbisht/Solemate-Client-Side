import CartSection from "../components/CartSection";
import Navigation from "../layouts/Navigation";

// TODO- Kal cart controllers mein cart slice seh fields daalni hai
export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <CartSection />
    </div>
  );
}
