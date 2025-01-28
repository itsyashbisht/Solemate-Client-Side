import Products from "./Products";
import Shoe1 from "../../public/Shoe1.png";
import Shoe2 from "../../public/Shoe2.png";
import Shoe3 from "../../public/Shoe3.png";
import Shoe4 from "../../public/Shoe4.png";

const shoeShowcase = [
  {
    name: "BLUSH RUNNER",
    price: 129.5,
    imageURL: Shoe1,
  },
  {
    name: "MIDNIGHT GLIDE",
    price: 129.5,
    imageURL: Shoe2,
  },
  {
    name: "BLUSH RUNNER",
    price: 129.5,
    imageURL: Shoe3,
  },
  {
    name: "BLUSH RUNNER",
    price: 129.5,
    imageURL: Shoe4,
  },
];

export default function BestProducts() {
  return (
    <section className="mt-24 h-dvh mx-20">
      <h1 className="uppercase mb-16 text-center text-3xl font-semibold ">
        product showcase
      </h1>
      <div className="grid h-3/5 justify-evenly gap-x-8 overflow-x-scroll grid-rows-1 grid-cols-4">
        {shoeShowcase.map((shoe, index) => (
          <Products shoe={shoe} key={index} />
        ))}
      </div>
    </section>
  );
}
