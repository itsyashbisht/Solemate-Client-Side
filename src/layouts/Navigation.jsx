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

  return (
    <nav className="relative w-full bg-transparent z-50">
      {/* Increased max-width and reduced padding to move items more to the right */}
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Kept bold for brand identity */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-black text-black tracking-tighter"
            >
              Solemate
            </Link>
          </div>

          {/* Desktop Links Container */}
          <div className="hidden md:flex items-center">
            {/* 1. Tab Links - Made Thinner (font-medium) and closer gap */}
            <div className="flex gap-8 mr-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[15px] font-medium text-black hover:opacity-40 transition-all duration-300 relative group"
                >
                  {link.label}
                  {/* Underline made thinner to match the text */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>

            {/* 2. Icons Group - Tightened spacing to push to far right */}
            <div className="flex gap-5 items-center pl-8 border-l border-black/10">
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-2 group text-black"
              >
                <ShoppingCart size={19} strokeWidth={2} />
                <span className="text-[14px] font-medium tracking-tight hidden lg:block">
                  Cart
                </span>
                {items?.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>

              <button
                onClick={handleLoginNavigation}
                className="flex items-center gap-2 group text-black"
              >
                <CircleUserRound size={21} strokeWidth={2} />
                <span className="text-[14px] font-medium tracking-tight hidden lg:block">
                  {user ? "Account" : "Login"}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute left-0 top-full w-full bg-white text-black px-8 py-10 z-50 border-t border-neutral-100 shadow-xl">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl font-bold tracking-tighter"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
