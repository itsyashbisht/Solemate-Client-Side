import ShoeSize from "./ShoeSize";
import ProductImage from "../../public/Product.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../thunks/product.thunk";

export default function ProductDetailGrid() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetails, status, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  return (
    <div className="grid grid-cols-2 mt-10 font-pop">
      <div className="rounded-lg grid grid-cols-[4fr_1fr] gap-x-3 mx-5 my-5 w-[480px] h-[480px] justify-self-center overflow-hidden ">
        <img
          src={productDetails.Image}
          alt=""
          className="object-cover rounded-lg"
        />
        <div className=" flex flex-col gap-1 overflow-y-scroll h-[400px]">
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
          <img
            src={ProductImage}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        <div className="self-end">
          <p className="text-xl font-semibold">{productDetails.Name}</p>
          <p className="text-gray-400 text-sm">{productDetails.Type}</p>
        </div>
        <div>
          <p className="font-semibold text-lg">
            PRICE:₹ {productDetails.Price}
          </p>
          <p className="text-gray-400 text-sm">Inclusive of all taxes</p>
        </div>
        <div className="w-1/2">
          <p className="font-semibold my-2">Sizes:</p>
          <div className="flex flex-wrap gap-1">
            <ShoeSize>40.1</ShoeSize>
            <ShoeSize>41</ShoeSize>
            <ShoeSize>42</ShoeSize>
            <ShoeSize>43</ShoeSize>
            <ShoeSize>44</ShoeSize>
            <ShoeSize>45</ShoeSize>
            <ShoeSize>46</ShoeSize>
          </div>
          <button className="text-white uppercase font-pop bg-black w-full px-6 py-2.5 my-3 rounded-xl">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
