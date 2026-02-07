import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

// CUSTOM IMPORTS
import CarouselComponent from '../components/CarouselComponent';
import ExploreNow from '../components/ExploreNow';
import Hero from '../components/Hero';
import TrendingNowComponent from '../components/TrendingNowComponent';
import Checkout from '../layouts/Checkout';

function Home () {
  const { scrollYProgress } = useScroll();

  // Smooths out the scroll data so the animation isn't "jittery"
  const scaleX = useSpring(scrollYProgress, {
    stagger: 0.001,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* 1. Constant Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <section className="bg-[#f8f8f8]">
        <Hero/>
        {/* We wrap sections in a specialized Scroll Wrapper */}
        <ScrollSection><CarouselComponent/></ScrollSection>
        <ScrollSection><ExploreNow/></ScrollSection>
        <ScrollSection><TrendingNowComponent/></ScrollSection>
        <ScrollSection><Checkout/></ScrollSection>
      </section>
    </>
  );
}

// 3. The "Every Scroll" Effect Wrapper
function ScrollSection ({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Triggers from when it enters to when it leaves
  });

  // This transforms the scroll position into visual changes
  // As you scroll: Opacity goes 0 -> 1 -> 0, Scale goes 0.8 -> 1 -> 0.8
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default Home;