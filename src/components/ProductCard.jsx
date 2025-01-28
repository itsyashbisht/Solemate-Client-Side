import ProductIMAGE from "../../public/image.png";

export default function ProductCard() {
  return (
    <div className="sm:w-48 sm:h-64 md:w-52 md:h-72  lg:w-56 border border-gray-200 lg:h-72 relative rounded-3xl overflow-hidden">
      <img src={ProductIMAGE} className="h-full object-cover" alt="" />
      <div className="text-center flex flex-col absolute  w-full bottom-5">
        <p className=" font-medium lg:text-md font-pop">Nike Dunk Low Retro</p>
        <p className=" font-medium lg:text-sm">₹ 8,295.00</p>
      </div>
    </div>
  );
}
