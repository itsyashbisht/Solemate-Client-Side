import hero from "../data/Hero1.jpg";
import Navigation from "../layouts/Navigation";
import Arrow from "../layouts/Arrow";

function Hero() {
  return (
    <section
      className="h-[50vh] md:min-h-screen mb-20 md:h-screen w-full relative bg-cover bg-no-repeat bg-center md:bg-fixed"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      {/* <MobileNavigation /> */}
      <Navigation />
      <div className="absolute flex flex-col right-[2%] max-w-[550px] bottom-[12%] md:bottom-[10%]">
        <p className="text-right font-semibold md:mb-3 mb-1 text-white uppercase text-2xl lg:text-8xl font-sans tracking-tight">
          Solemate
        </p>
        <p className="text-right text-sm font-medium text-gray-100">
          Step into style with Solemate – where every pair feels like the
          perfect match for your journey!
        </p>
      </div>
      <button className="flex right-[3%] bottom-[3%] items-center justify-center absolute md:bottom-[15%] md:right-[82%]">
        <span className="font-medium uppercase mx-1 text-base md:text-2xl ">
          Explore
        </span>
        <Arrow size={32} />
      </button>
    </section>
  );
}

export default Hero;
