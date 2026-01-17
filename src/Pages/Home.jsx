import Hero from "../components/Hero";
import Checkout from "../layouts/Checkout";
import ExploreNow from "../components/ExploreNow";
import CarouselComponent from "../components/CarouselComponent";
import TrendingNowComponent from "../components/TrendingNowComponent";
import Footer from "../layouts/Footer";

function Home() {
  return (
    <section>
      <Hero />
      <CarouselComponent />
      <ExploreNow />
      <TrendingNowComponent />
      <Checkout />
      {/* <Footer /> */}
    </section>
  );
}

export default Home;
