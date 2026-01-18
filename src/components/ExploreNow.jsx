import Shoe1 from "../data/ExploreShoe1.png";
import Shoe2 from "../data/ExploreShoe2.png";
import Shoe3 from "../data/ExploreShoe3.png";

function ExploreNow() {
  return (
    /* SPACE FIX: Reduced vertical padding from py-24/40 to py-12 lg:py-20 */
    <section className="py-12 lg:py-20 bg-[#f8f8f8] px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Header - Margin reduced to mb-10 to keep it close to the content */}
      <div className="max-w-[1400px] mx-auto mb-10 flex flex-col items-start border-b border-neutral-200/50 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1.5px] w-8 bg-blue-600"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600">
            Discover
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 uppercase">
          Explore Now
        </h2>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-10 lg:gap-x-14">
        {/* COLUMN 1 */}
        <div className="flex flex-col group">
          <div className="overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img
              src={Shoe1}
              className="w-full aspect-[4/5] object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              alt="Solemate Core Collection"
            />
          </div>
          <div className="space-y-2 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600/70">
              01 / Comfort
            </span>
            <p className="text-left text-neutral-900 text-lg leading-snug font-normal tracking-tight">
              At Solemate, every step is a promise of comfort and timeless
              style.
            </p>
          </div>
        </div>

        {/* COLUMN 2 - Balanced stagger */}
        <div className="flex flex-col group md:mt-12">
          <div className="overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img
              src={Shoe2}
              className="w-full aspect-[4/5] object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              alt="Solemate Lifestyle"
            />
          </div>
          <div className="space-y-2 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600/70">
              02 / Confidence
            </span>
            <p className="text-left text-neutral-900 text-lg leading-snug font-normal tracking-tight">
              Step into comfort and walk with confidence through every journey.
            </p>
          </div>
        </div>

        {/* COLUMN 3 */}
        <div className="flex flex-col group">
          <div className="overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img
              src={Shoe3}
              className="w-full aspect-[4/5] object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              alt="Solemate Craft"
            />
          </div>
          <div className="space-y-2 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600/70">
              03 / Craft
            </span>
            <p className="text-left text-neutral-900 text-lg leading-snug font-normal tracking-tight">
              Every silhouette is crafted with precision for your daily
              rotation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreNow;
