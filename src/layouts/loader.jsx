import { motion } from "framer-motion";

const ShoeCircularLoader = ({
  size = "lg",
  fullscreen = false,
  text = "Lacing Up...",
}) => {
  const sizes = {
    sm: "h-8 w-8 border-2",
    md: "h-16 w-16 border-4",
    lg: "h-24 w-24 border-8",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${
        fullscreen ? "min-h-screen" : "py-10"
      }`}
    >
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className={`${sizes[size]} 
            border-slate-300/40 
            dark:border-slate-700/60 
            border-t-orange-500 
            rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* Inner Pulse */}
        <motion.div
          className="
            absolute inset-0 m-auto
            h-1/3 w-1/3
            bg-orange-500
            rounded-full
            shadow-[0_0_20px_rgba(249,115,22,0.6)]
          "
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Text */}
      <p
        className="
          mt-6 text-xs font-bold tracking-widest uppercase
          text-slate-500 dark:text-slate-400
          animate-pulse
        "
      >
        {text}
      </p>
    </div>
  );
};

export default ShoeCircularLoader;
