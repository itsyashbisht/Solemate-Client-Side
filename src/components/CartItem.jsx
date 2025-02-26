import Shoe from "../../public/Shoe3.png";

function CartItem() {
  return (
    <div className="flex gap-2 flex-col py-4 px-5 border border-gray-300 rounded-md w-[600px]">
      <div className="flex gap-x-5">
        <div>
          <img src={Shoe} className="w-40 m-4 h-40" alt="" />
        </div>
        <div className="flex gap-y-3 flex-col justify-between">
          <div className="">
            <p className="md:text-lg font-semibold">Nike C1TY 'Concrete'</p>
            <p className="text-gray-500">Shoes</p>
            <p className="text-gray-500">Size 8</p>
          </div>
          <div className="flex justify-center w-24 gap-5 py-2  border border-gray-300 rounded-full">
            <button>-</button>
            <span className="font-medium">1</span>
            <button>+</button>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium">MRP:₹ 8 695.00</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
