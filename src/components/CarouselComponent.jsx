import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Shoe1 from "../../public/Shoe1.png";
import Shoe2 from "../../public/Shoe2.png";
import Shoe3 from "../../public/Shoe3.png";
import Shoe4 from "../../public/Shoe4.png";
import Shoe5 from "../../public/Shoe5.png";

const bestSHOES = [
  {
    name: "BLUSH RUNNER",
    price: 129.5,
    imageURL: Shoe4,
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
    imageURL: Shoe1,
  },
  {
    name: "BLUSH RUNNER",
    price: 125.4,
    imageURL: Shoe5,
  },
];

function CarouselComponent() {
  return (
    <section className="flex flex-col mb-20 justify-center h-[40vh] md:h-screen md:max-h-screen items-center lg:mx-24 md:mx-16 sm:mx-12 mx-0">
      <p className="uppercase w-full text-xl md:text-2xl lg:text-3xl font-semibold text-center">
        Feature Spotlight
      </p>
      <p className="mb-4 md:mb-10 text-sm md:text-xl font-normal text-center text-gray-500">
        More than products- experiences that inspire.
      </p>
      <Carousel className="w-full  rounded-none ">
        <CarouselContent>
          {bestSHOES.map((Shoe, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:w-full rounded-none h-[300px] basis-3/4 md:basis-2/3 md:h-[400px] lg:h-[600px]"
            >
              <img src={Shoe.imageURL} className="w-full h-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default CarouselComponent;
