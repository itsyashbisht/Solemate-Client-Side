import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="w-full md:hidden h-12 items-center px-3 flex justify-between">
        <p className="text-gray1 uppercase text-xl font-bold">Solemate</p>
        <span className="text-gray1" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </span>
      </nav>

      {/* SIDEBAR NAVIGATION */}
      {isOpen && (
        <motion.ul
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 0.9 }}
          transition={{ duration: 0.4 }}
          className={`fixed h-full flex py-48 flex-col shadow-lg items-center justify-evenly top-0 left-0 w-full bg-white  z-50`}
        >
          <span
            className=" absolute top-5 right-5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <X size={32} />
          </span>
          <motion.li whileHover={{ scale: 1.2 }}>
            <NavLink
              className="text-4xl uppercase font-sans font-semibold"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }}>
            <NavLink
              className="text-4xl uppercase font-sans font-semibold"
              to="/shop"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }}>
            <NavLink
              className="text-4xl uppercase font-sans font-semibold"
              to="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }}>
            <NavLink
              className="text-4xl uppercase font-sans font-semibold"
              to="/cart"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </NavLink>
          </motion.li>
        </motion.ul>
      )}
    </div>
  );
}

export default MobileNavigation;
