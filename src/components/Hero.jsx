import hero from "../data/Hero1.jpg";
import Navigation from "../layouts/Navigation";
import Arrow from "../layouts/Arrow";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      className="h-[70vh] md:h-screen w-full relative bg-cover bg-no-repeat bg-center md:bg-fixed overflow-hidden"
      style={{
        // Added a deeper gradient at the bottom for better text contrast
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%), url(${hero})`,
      }}
    >
      <Navigation />

      {/* 1. HERO TITLE: Asymmetrical & Massive 
          Positioned lower and slightly off-right for a boutique look
      */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-16 lg:px-24">
        <div className="flex flex-col items-end w-full">
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="font-black text-white uppercase text-7xl md:text-[12rem] lg:text-[16rem] leading-[0.75] tracking-tighter"
          >
            Solemate
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-[320px] md:max-w-[450px] mt-6 text-right"
          >
            <p className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.5em] mb-3">
              Elite Series / 2026
            </p>
            <p className="text-sm md:text-lg font-medium text-neutral-300 leading-snug uppercase tracking-tight opacity-80">
              Crafting the perfect silhouette for your daily movement.
              Engineering comfort into every thread.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. MODERN BUTTON: Minimal & High-Contrast 
          Positioned at the bottom-left to create a diagonal visual path
      */}
      <div className="absolute left-6 md:left-16 lg:left-24 bottom-10 md:bottom-16">
        <button className="group flex flex-col items-start gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 hover:border-white transition-all duration-500 overflow-hidden">
            {/* Hover Fill Effect */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <Arrow
              size={32}
              className="relative z-10 text-white group-hover:text-black transition-colors duration-500"
            />
          </div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white">
            Explore <br /> Collection
          </span>
        </button>
      </div>

      {/* 3. DESIGN DETAIL: Vertical Technical Tag */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6">
        <span className="h-32 w-[1px] bg-white/20"></span>
        <p className="[writing-mode:vertical-lr] text-[9px] font-mono text-white/40 uppercase tracking-[0.5em]">
          Verified_Product // SM_01
        </p>
      </div>
    </section>
  );
}

export default Hero;
