import { motion } from 'framer-motion'; // Add this import
import Kids from '../data/Kids.png';
import Women from '../data/Women.png';
import Mens from '../data/Mens.png';
import TrendItem from './TrendItem';

const CATEGORY = [
  {
    title: 'KID\'S SHOES',
    Image: Kids,
    count: '12 Items',
  },
  {
    title: 'WOMEN\'S SHOES',
    Image: Women,
    count: '24 Items',
  },
  {
    title: 'MEN\'S SHOES',
    Image: Mens,
    count: '18 Items',
  },
];

function TrendingNowComponent () {
  return (
    <section className="py-24 bg-[#f8f8f8] px-4 sm:px-8 lg:px-24 overflow-hidden">
      {/* Header Section with Reveal Effect */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[1400px] mx-auto mb-16 flex flex-col items-start"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }} // 12 in tailwind = 48px
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[2px] bg-blue-600"
          ></motion.div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600">
            Current Hits
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 uppercase">
          Trending Now
        </h2>
      </motion.div>

      {/* Grid Container with Staggered Children */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Items appear one after another
            },
          },
        }}
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
      >
        {CATEGORY?.map((catTYPE) => (
          <motion.div
            key={catTYPE.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <TrendItem Item={catTYPE}/>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default TrendingNowComponent;