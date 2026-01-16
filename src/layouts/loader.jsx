import { motion } from "framer-motion";

const ShoeCircularLoader = ({ size = "md" }) => {
  // Size mapping for flexibility
  const sizes = {
    sm: "h-8 w-8 border-2",
    md: "h-16 w-16 border-4",
    lg: "h-24 w-24 border-8",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer Rotating Ring */}
        <motion.div
          className={`${sizes[size]} border-gray-100 border-t-orange-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* Inner Pulsing Circle (Optional "Shoe Dot") */}
        <motion.div
          className="absolute inset-0 m-auto h-1/3 w-1/3 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading Text */}
      <p className="text-sm font-bold tracking-widest text-gray-500 uppercase animate-pulse">
        Lacing Up...
      </p>
    </div>
  );
};

export default ShoeCircularLoader;
