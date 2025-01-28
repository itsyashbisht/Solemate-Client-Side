import Navigation from "../layouts/Navigation";
import heroImage from "../../public/Hero.jpg";
import Arrow from "../layouts/Arrow";

function Home() {
  return (
    <section className="mx-24">
      <Navigation />
      <img
        className="w-full h-auto relative object-cover mt-4  rounded-xl"
        src={heroImage}
        alt="Nike Shoes"
      />
      <button className=" flex items-center justify-center absolute bottom-12 left-[12%]">
        <span className="font-medium">Explore</span>
        <Arrow />
      </button>
    </section>
  );
}

export default Home;
