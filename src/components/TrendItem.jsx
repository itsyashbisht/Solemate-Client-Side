import Arrow from "../layouts/Arrow";

export default function TrendItem({ Item }) {
  const { Image, title } = Item;
  return (
    <div className="relative justify-self-center lg:h-[460px] lg:w-[360px]">
      <img src={Image} className=" object-cover w-full h-full" />
      <button className="bg-[#E7E7E7] flex gap-1 items-center absolute bottom-2 right-2 font-semibold text-base md:text-lg px-2 py-0.5">
        {title} <Arrow size={24} />
      </button>
    </div>
  );
}
