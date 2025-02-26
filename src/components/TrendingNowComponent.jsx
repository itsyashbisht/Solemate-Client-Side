import Kids from "../data/Kids.png";
import Women from "../data/Women.png";
import Mens from "../data/Mens.png";
import TrendItem from "./TrendItem";

const CATEGORY = [
  {
    title: "KID'S SHOES",
    Image: Kids,
  },
  {
    title: "WOMEN'S SHOES",
    Image: Women,
  },
  {
    title: "MEN'S SHOES",
    Image: Mens,
  },
];

function TrendingNowComponent() {
  return (
    <section className="lg:mb-16 lg:mx-24 md:mx-16 sm:mx-12 mx-1 ">
      <p className="uppercase w-full text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4 md:mb-10">
        Trending Now
      </p>
      <div className="grid grid-rows-[400px_400px_400px] grid-cols-[300px] md:grid-cols-3 md:grid-rows-1 md:gap-x-5 lg:gap-x-0 justify-center items-center">
        {CATEGORY.map((catTYPE) => (
          <TrendItem Item={catTYPE} key={catTYPE.title} />
        ))}
      </div>
    </section>
  );
}

export default TrendingNowComponent;
