import ProductIMAGE from "../../public/image.png";

export default function ProductCard({ product }) {
  return (
    <div className="sm:w-48 sm:h-64 md:w-52 md:h-72 lg:w-56 border border-gray-200 lg:h-72 relative rounded-3xl overflow-hidden">
      <img
        src={product.Image}
        className="h-full object-cover"
        alt={product.Name}
      />
      <div className="text-center flex flex-col absolute  w-full bottom-5">
        <p className=" font-medium text-sm lg:text-lg font-pop">
          {product.Name}
        </p>
        <p className="font-medium text-xs lg:text-sm">{product.Price}</p>
      </div>
    </div>
  );
}
