import { motion } from 'framer-motion'; // Add this import
import Shoe1 from '../data/ExploreShoe1.png';
import Shoe2 from '../data/ExploreShoe2.png';
import Shoe3 from '../data/ExploreShoe3.png';

function ExploreNow () {
  // Animation variants for the container to coordinate the items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  return (
    <section className="py-10 lg:py-20 bg-[#f8f8f8] px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Header - Added Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto mb-10 flex flex-col items-start border-b border-neutral-200/50 pb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          {/* Line "draws" in */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-[1.5px] bg-blue-600"
          ></motion.div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600">
            Discover
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 uppercase">
          Explore Now
        </h2>
      </motion.div>

      {/* Grid Container - Added Stagger Logic */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1400px] mx-auto grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-10 lg:gap-x-14"
      >
        {/* COLUMN 1 */}
        <motion.div variants={itemVariants} className="flex flex-col group">
          <div
            className="overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img
              src={Shoe1}
              className="w-full aspect-[4/5] object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              alt="Solemate Core Collection"
            />
          </div>
          <div className="space-y-2 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600/70">
              01 / Comfort
            </span>
            <p className="text-left text-neutral-900 text-lg leading-snug font-normal tracking-tight">
              At Solemate, every step is a promise of comfort and timeless style.
            </p>
          </div>
        </motion.div>

        {/* COLUMN 2 - Staggered via Tailwind mt-12 (kept) */}
        <motion.div variants={itemVariants} className="flex flex-col group md:mt-12">
          <div
            className="overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img
              src={Shoe2}
              className="w-full aspect-[4/5] object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              alt="Solemate Lifestyle"
            />
          </div>
          <div className="space-y-2 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600/70">
              02 / Confidence
            </span>
            <p className="text-left text-neutral-900 text-lg leading-snug font-normal tracking-tight">
              Step into comfort and walk with confidence through every journey.
            </p>
          </div>
        </motion.div>

        {/* COLUMN 3 */}
        <motion.div variants={itemVariants} className="flex flex-col group">
          <div
            className="overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img
              src={Shoe3}
              className="w-full aspect-[4/5] object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              alt="Solemate Craft"
            />
          </div>
          <div className="space-y-2 px-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600/70">
              03 / Craft
            </span>
            <p className="text-left text-neutral-900 text-lg leading-snug font-normal tracking-tight">
              Every silhouette is crafted with precision for your daily rotation.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ExploreNow;