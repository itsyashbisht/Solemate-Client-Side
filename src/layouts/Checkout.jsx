import { motion } from "framer-motion";

export default function AestheticHero() {
  return (
    <div className="relative w-full bg-[#f8f8f8] overflow-hidden py-24 md:py-44 flex justify-center items-center">
      {/* 1. The Bold "Monolith" Text 
          - Changed to solid Neutral-900 (Deep Black/Gray) for instant readability
          - Added a subtle text-shadow for a 3D feel
      */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          text-[18vw] 
          md:text-[20vw] 
          font-black 
          tracking-tighter 
          text-center 
          uppercase 
          select-none
          leading-[0.8]
          text-neutral-900
          drop-shadow-[0_20px_20px_rgba(0,0,0,0.05)]
        "
      >
        Solemate
      </motion.h1>

      {/* 2. Overlapping Modern Accents 
          Positioned slightly lower to not block the main text but add "Depth"
      */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none mt-12 md:mt-20">
        {/* Clean Modern Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-black px-6 py-2 md:px-10 md:py-3 shadow-2xl"
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] text-white">
            Collection 2026
          </p>
        </motion.div>

        {/* Supporting Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-[0.4em]"
        >
          The Future of Footwear
        </motion.p>
      </div>

      {/* 3. Decorative Sidebars (Tech Look) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        <div className="h-20 w-[2px] bg-neutral-200"></div>
        <p className="[writing-mode:vertical-lr] text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
          Authentic Design
        </p>
      </div>
    </div>
  );
}
