import userImage from "../../public/User.png";
import { Heart, ShoppingCart } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="mt-4 font-pop">
      <ul className="flex gap-x-5 items-center font-normal">
        <li>
          <div className="flex items-center gap-x-3">
            <img className="h-10 w-10 rounded-full" src={userImage} alt="" />
            <span>Hello, User</span>
          </div>
        </li>
        <li className="mx-auto uppercase font-semibold text-xl">Solemate</li>
        <li className="flex rounded-full bg-gray-100 px-2.5 py-2.5">
          <Heart strokeWidth={1.5} size={20} />
        </li>
        <li className="flex rounded-full bg-gray-100 px-2.5 py-2.5">
          <ShoppingCart size={20} strokeWidth={1.5} />
        </li>
      </ul>
    </nav>
  );
}
