import CarouselComponent from "../components/CarouselComponent";
import ExploreNow from "../components/ExploreNow";
import Hero from "../components/Hero";
import TrendingNowComponent from "../components/TrendingNowComponent";
import Checkout from "../layouts/Checkout";

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
