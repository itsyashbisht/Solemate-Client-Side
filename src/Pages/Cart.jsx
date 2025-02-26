import Footer from "../layouts/Footer";
import Navigation from "../layouts/Navigation";
import MobileNavigation from "../layouts/MobileNavigation";
import CartItem from "../components/CartItem";

function Cart() {
  return (
    <section className="min-h-screen">
      <Navigation />
      <MobileNavigation />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <Footer />
    </section>
  );
}

export default Cart;
