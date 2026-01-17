import { CircleUserRound, Menu, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart } from "../thunks/cart.thunks";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);

  const handleLoginNavigation = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, user?._id]);

  console.log(items);

  return (
    <nav className="bg-white-10 border-neutral-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-bold text-black tracking-tight "
            >
              Solemate
            </Link>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-black hover:text-neutral-600 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <div className="hidden md:flex gap-4 items-center">
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 text-black hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <div className="flex gap-2">
                  <ShoppingCart size={20} />
                  <span className="group-hover:w-full transition-all duration-300">
                    Cart
                  </span>
                </div>
                <span className="absolute top-1 left-5 bg-black text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                  {items?.length ?? "0"}
                </span>
              </button>
              <button
                onClick={handleLoginNavigation}
                className="relative p-2 text-black hover:bg-neutral-300 rounded-lg transition-colors"
              >
                <div className="flex gap-2">
                  <CircleUserRound size={24} />
                  <span className="  group-hover:w-full transition-all duration-300">
                    {user ? "Profile" : "Login"}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black hover:bg-neutral-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-neutral-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2 flex gap-2 pt-4 border-t border-neutral-200 mt-2">
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-neutral-100 transition-colors"
                >
                  <ShoppingCart size={18} />
                  Cart
                </button>
                <button
                  onClick={handleLoginNavigation}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-neutral-900 transition-colors"
                >
                  <User size={18} />
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
