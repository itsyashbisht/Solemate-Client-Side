import {
  CircleUserRound,
  Menu,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white-10 border-neutral-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-3xl font-bold text-black tracking-tight "
            >
              Solemate
            </a>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-black hover:text-neutral-600 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            <div className="hidden md:flex gap-4 items-center">
              <button className="relative p-2 text-black hover:bg-neutral-100 rounded-lg transition-colors">
                <ShoppingBag size={20} />
                <span className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                  0
                </span>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="text-black p-2  hover:bg-neutral-100"
              >
                <CircleUserRound size={24} />
              </Button>
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
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-neutral-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-3 py-2 flex gap-2 pt-4 border-t border-neutral-200 mt-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-neutral-100 transition-colors">
                  <ShoppingCart size={18} />
                  Cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-neutral-900 transition-colors">
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
