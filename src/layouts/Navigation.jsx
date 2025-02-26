import { Link } from "react-router-dom";
import User from "../../public/User.png";

export default function Navigation() {
  return (
    <nav className="py-5 mx-12 md:block hidden">
      <ul className="flex gap-x-8 uppercase text-xl font-bold items-center justify-evenly">
        <Link to="/" className="mr-auto text-2xl uppercase font-sans">
          Solemate
        </Link>
        <Link
          className="hover:underline transition-all duration-300"
          to="/shop"
        >
          Shop
        </Link>
        <Link
          className="hover:underline transition-all duration-300"
          to="/about"
        >
          About
        </Link>
        <Link
          className="hover:underline transition-all duration-300"
          to="/cart"
        >
          Cart
        </Link>
        <Link to="authentication/login">
          <img src={User} alt="" className="h-9 w-9 rounded-full" />
        </Link>
      </ul>
    </nav>
  );
}
