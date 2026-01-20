import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const bestSHOES = [
  {
    name: "Nike Gato",
    price: "$110.00",
    imageURL: "/carousel/shoe-1.avif", // Points to public/carousel/shoe-1.avif
    series: "Series 01 / Court",
  },
  {
    name: "Adidas Forum Blue",
    price: "$140.00",
    imageURL: "/carousel/shoe-2.avif",
    series: "Series 02 / Urban",
  },
  {
    name: "Air Jordan 11 Retro 'Gamma'",
    price: "$165.00",
    imageURL: "/carousel/shoe-3.avif",
    series: "Series 03 / Classic",
  },
  {
    name: "Nike AF1 '07",
    price: "$115.00",
    imageURL: "/carousel/shoe-4.avif",
    series: "Series 04 / Icon",
  },
  {
    name: "Nike Dunk Low Retro",
    price: "$130.00",
    imageURL: "/carousel/shoe-5.avif",
    series: "Series 05 / Essential",
  },
  {
    name: "NB 2002R Steel",
    price: "$150.00",
    imageURL: "/carousel/shoe-6.avif",
    series: "Series 06 / Heritage",
  },
];

function CarouselComponent() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="py-20 lg:py-24 bg-[#f8f8f8] overflow-hidden">
      {/* 1. Header Section */}
      <div className="max-w-[1400px] mx-auto px-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-neutral-100 pb-8">
          <div className="flex items-baseline gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 uppercase">
              Spotlight
            </h2>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase">
              / Final Selection
            </span>
          </div>
          <p className="text-[10px] font-mono text-neutral-400 mt-2 md:mt-0 uppercase tracking-widest">
            Elite Performance Series
          </p>
        </div>
      </div>

      {/* 2. Structured Focused Carousel */}
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "center", loop: true }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-6">
            {bestSHOES.map((shoe, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-[85%] md:basis-[70%] lg:basis-[60%] group cursor-grab active:cursor-grabbing"
              >
                <div className="flex flex-col">
                  {/* Neat Horizontal Card with Correct Height */}
                  <div className="relative overflow-hidden bg-white rounded-[3rem] h-[380px] md:h-[520px] border border-neutral-100 transition-all duration-700 hover:shadow-2xl">
                    <img
                      src={shoe.imageURL}
                      alt={shoe.name}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute top-8 right-8 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full border border-neutral-100 shadow-sm">
                      <p className="text-[9px] font-bold text-black uppercase tracking-widest">
                        {shoe.series}
                      </p>
                    </div>
                  </div>

                  {/* Clean Modern Text Styling */}
                  <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 md:px-6">
                    <div className="space-y-1">
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 uppercase leading-none">
                        {shoe.name}
                      </h3>
                      <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-600">
                        Official Solemate Release
                      </p>
                    </div>

                    <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                      <div className="text-left md:text-right">
                        <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">
                          Price
                        </p>
                        <p className="text-3xl font-medium tracking-tighter text-neutral-900">
                          {shoe.price}
                        </p>
                      </div>
                      <button className="h-14 px-10 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-600 active:scale-95">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="flex justify-center md:justify-end gap-3 mt-12 md:mr-20">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-neutral-100 bg-white" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-neutral-100 bg-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default CarouselComponent;
