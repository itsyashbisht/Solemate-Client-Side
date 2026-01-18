import Kids from "../data/Kids.png";
import Women from "../data/Women.png";
import Mens from "../data/Mens.png";
import TrendItem from "./TrendItem";

const CATEGORY = [
  {
    title: "KID'S SHOES",
    Image: Kids,
    count: "12 Items",
  },
  {
    title: "WOMEN'S SHOES",
    Image: Women,
    count: "24 Items",
  },
  {
    title: "MEN'S SHOES",
    Image: Mens,
    count: "18 Items",
  },
];

function TrendingNowComponent() {
  return (
    // Matching the #f8f8f8 background and spacing
    <section className="py-24 bg-[#f8f8f8] px-4 sm:px-8 lg:px-24">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto mb-16 flex flex-col items-start">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2px] w-12 bg-blue-600"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600">
            Current Hits
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 uppercase">
          Trending Now
        </h2>
      </div>

      {/* Grid Container - Fully Responsive */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {CATEGORY.map((catTYPE) => (
          <TrendItem Item={catTYPE} key={catTYPE.title} />
        ))}
      </div>
    </section>
  );
}

export default TrendingNowComponent;
