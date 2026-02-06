import { Menu, ShoppingBag, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCart } from '../thunks/cart.thunks';
import UserDropdown from '@/components/userDropdown.jsx';

export default function Navigation () {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Unified links for the mobile menu inspired by the site
  const mobileLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Cart', href: '/cart', showCount: true },
    { label: 'Account', href: '/profile' },
  ];

  const navLinks = mobileLinks.slice(1, 4); // Original desktop links

  const profile = useSelector((state) => state.user?.profile);
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (profile?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, profile?._id]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation variants for the container and items
  const menuVariants = {
    closed: { opacity: 0, y: '-100%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    opened: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
  };

  const linkVariants = {
    initial: { y: 80, opacity: 0 },
    enter: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 + i * 0.1 }
    }),
    exit: (i) => ({
      y: 40,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }
    })
  };

  return (
    <nav className="relative w-full bg-transparent z-50">
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-24">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl md:text-3xl font-black text-black tracking-tighter">
              Solemate
            </Link>
          </div>

          {/* Desktop Links (Unchanged style) */}
          <div className="hidden md:flex items-center">
            <div className="flex gap-8 mr-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[15px] font-medium text-black hover:opacity-40 transition-all duration-300 relative group"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-500"/>
                </Link>
              ))}
            </div>

            <div className="flex gap-5 items-center pl-8 border-l border-black/10">
              <button onClick={() => navigate('/cart')} className="relative flex items-center gap-2 text-black">
                <ShoppingBag size={20} strokeWidth={2.5} />
                <span className="text-[14px] font-medium tracking-tight hidden lg:block">Cart</span>
                {items?.length > 0 && (
                  <span
                    className="absolute -top-2 -right-3 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <UserDropdown/>
            </div>
          </div>

          {/* Mobile UI Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart Icon visible on mobile too (per your request) */}
            <button onClick={() => navigate('/cart')} className="relative p-2 text-black">
              <ShoppingBag size={20} strokeWidth={2.5} />
              {items?.length > 0 && (
                <span
                  className="absolute top-1 right-0 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-[100] p-2 text-black transition-transform active:scale-90"
            >
              <AnimatePresence mode="wait">
                {isOpen ? <X size={32} key="close"/> : <Menu size={32} key="menu"/>}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Full-Screen Mobile Menu (Inspiration Style) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed inset-0 bg-white z-[90] flex flex-col justify-center px-10 md:hidden"
            >
              <div className="flex flex-col gap-4">
                {mobileLinks.map((link, i) => (
                  <div key={link.label} className="overflow-hidden"> {/* Container to clip the sliding text */}
                    <motion.div
                      custom={i}
                      variants={linkVariants}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    >
                      <Link
                        to={link.href}
                        className="inline-flex items-baseline gap-4 text-5xl font-black tracking-tighter text-black hover:italic transition-all duration-300"
                      >
                        {link.label}
                        {link.showCount && items?.length > 0 && (
                          <span className="text-2xl font-medium text-neutral-400">
                            ({items.length})
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Decorative Footer in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 left-10"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  © 2024 Solemate Collective
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}