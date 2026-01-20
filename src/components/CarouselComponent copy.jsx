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
    name: "Apex Phantom",
    price: "$180.00",
    imageURL:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070",
    series: "Series 01 / Tech",
  },
  {
    name: "Lunar Glide",
    price: "$165.00",
    imageURL:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964",
    series: "Series 02 / Speed",
  },
  {
    name: "Carbon Flux",
    price: "$210.00",
    imageURL:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012",
    series: "Series 03 / Flux",
  },
  {
    name: "Desert Storm",
    price: "$155.00",
    imageURL:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012",
    series: "Series 04 / Terra",
  },
  {
    name: "Midnight Pro",
    price: "$195.00",
    imageURL:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974",
    series: "Series 05 / Night",
  },
  {
    name: "Aero Stealth",
    price: "$175.00",
    imageURL:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2070",
    series: "Series 06 / Aero",
  },
];

function CarouselComponent() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    /* ADJUSTED PADDING: Increased from py-12 to py-16 / py-28 for a balanced premium feel */
    <section className="py-16 lg:py-28 bg-[#f8f8f8] overflow-hidden">
      {/* 1. Header Section */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-neutral-100 pb-8">
          <div className="flex items-baseline gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 uppercase">
              Spotlight
            </h2>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase">
              / 2026 Collection
            </span>
          </div>
          <p className="text-[11px] font-mono text-neutral-400 mt-2 md:mt-0 uppercase tracking-widest">
            Elite Performance Series
          </p>
        </div>
      </div>

      {/* 2. The Carousel */}
      <div className="max-w-[1600px] mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "center", loop: true }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {bestSHOES.map((shoe, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 basis-[90%] lg:basis-[75%] group cursor-grab active:cursor-grabbing"
              >
                {/* Image Card Container */}
                <div className="relative overflow-hidden bg-white rounded-[2.5rem] md:rounded-[4rem] aspect-[16/10] md:aspect-[2.2/1] border border-neutral-100 flex items-center justify-center p-8 transition-all duration-700 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.1)]">
                  {/* Background Text */}
                  <span className="absolute inset-0 flex items-center justify-center text-[18vw] font-black text-neutral-900/[0.03] select-none pointer-events-none uppercase italic">
                    {shoe.name.split(" ")[0]}
                  </span>

                  {/* Technical Meta Tag */}
                  <div className="absolute top-10 right-10 text-right hidden sm:block">
                    <p className="text-[9px] font-mono text-neutral-300 uppercase leading-none mb-1">
                      Platform_Spec
                    </p>
                    <p className="text-[11px] font-bold text-neutral-900 tracking-tight">
                      {shoe.series}
                    </p>
                  </div>

                  {/* Main Product Image */}
                  <div className="relative w-full h-full flex items-center justify-center z-10">
                    <img
                      src={shoe.imageURL}
                      alt={shoe.name}
                      className="w-[85%] md:w-[75%] h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-2"
                    />
                  </div>
                </div>

                {/* Footer Info Section */}
                <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 md:px-12">
                  <div className="space-y-1">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 uppercase">
                      {shoe.name}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600/60">
                      Advanced Silhouette / Series 01
                    </p>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] uppercase font-bold text-neutral-300 tracking-widest">
                        Price
                      </p>
                      <p className="text-3xl font-medium tracking-tighter text-neutral-900">
                        {shoe.price}
                      </p>
                    </div>
                    <button className="h-14 px-10 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95">
                      Explore Model
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Clean Control Placement */}
          <div className="flex justify-center md:justify-end gap-3 mt-12 md:mt-8 md:mr-16">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-neutral-100 shadow-sm" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-neutral-100 shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default CarouselComponent;
