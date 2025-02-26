import Shoe1 from "../data/ExploreShoe1.png";
import Shoe2 from "../data/ExploreShoe2.png";
import Shoe3 from "../data/ExploreShoe3.png";

function ExploreNow() {
  return (
    <section className="mb-12 md:mb-16 md:h-screen lg:mb-20 lg:mx-20 md:mx-12 sm:mx-6 mx-1">
      <p className="uppercase w-full text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4 md:mb-10">
        Explore Now
      </p>
      <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:gap-x-3 md:grid-rows-1 lg:gap-x-0">
        {/* GRID 1 */}
        <div className="grid justify-self-center gap-y-3 md:grid-row-[2fr_4fr]">
          <p className="text-center justify-self-center md:row-start-1 row-start-2 text-[#6e6d6d] lg:w-[400px] w-[300px] text-sm md:text-lg  tracking-tight">
            At Solemate, every step is a promise of comfort and style.
          </p>
          <img
            src={Shoe1}
            className="justify-self-center w-[320px] h-[400px] md:h-full md:w-full object-center object-cover"
            alt=""
          />
        </div>

        {/* GRID 2 */}
        <div className="grid gap-y-3 justify-self-center md:grid-row-[4fr_2fr]">
          <img
            src={Shoe2}
            className="justify-self-center object-cover w-[320px] h-[400px] md:h-full md:w-full"
            alt=""
          />
          <p className="text-center text-[#6e6d6d] justify-self-center  w-[300px] lg:w-[400px] tracking-tight text-sm md:text-lg">
            Step into comfort, walk with confidence with Solemate.
          </p>
        </div>

        {/*GRID 3  */}
        <div className="grid gap-y-3 justify-self-center md:grid-row-[2fr_4fr]">
          <p className="text-center md:row-start-1 justify-self-center  w-[300px] row-start-2 text-[#6e6d6d] lg:w-[400px] text-sm md:text-lg tracking-tight">
            Every shoe here crafted with care for your every step.
          </p>
          <img
            src={Shoe3}
            className="justify-self-center object-cover w-[320px] h-[400px] md:h-full md:w-full"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default ExploreNow;
