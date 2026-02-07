import Navigation from '../layouts/Navigation';
import { Button } from '../components/ui/button';
import { ArrowRight, Truck, Users, Zap } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function AboutPage () {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textX = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);

  const values = [
    {
      id: '01',
      icon: Zap,
      title: 'Authenticity',
      description: 'Direct brand sourcing with expert verification of every single pair.'
    },
    {
      id: '02',
      icon: Users,
      title: 'Community',
      description: 'Exclusive events, drops, and discussions for the culture.'
    },
    {
      id: '03',
      icon: Truck,
      title: 'Speed',
      description: 'Logistics built for the modern age. Fast, trackable, and painless.'
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-black selection:text-white">
      <Navigation/>

      {/* BACKGROUND MARQUEE */}
      <div className="fixed top-40 left-0 w-full pointer-events-none z-0 opacity-[0.04] select-none">
        <motion.div style={{ x: textX }} className="flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[18vw] font-black uppercase tracking-tighter mx-10">
              Solemate
            </span>
          ))}
        </motion.div>
      </div>

      <main className="relative z-10 pt-32 sm:pt-48 pb-24">

        {/* 1. HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1
              className="text-5xl sm:text-7xl lg:text-[10rem] font-black text-black mb-8 tracking-tighter leading-[0.8]">
              More than
              <br/>
              just a step
            </h1>
            <p className="text-lg md:text-2xl text-neutral-800 max-w-2xl font-light leading-relaxed">
              Solemate is a modern, full-featured platform for browsing, purchasing, and managing footwear.
              We offer a seamless shopping experience crafted for both the community and the creators.
            </p>
          </motion.div>
        </section>

        {/* 2. THE ORIGIN SECTION */}
        <section className="max-w-6xl mx-auto px-6 mb-32 md:mb-44">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <div className="space-y-2">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The Origin</h2>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-neutral-300">Curating
                  Craft</h3>
              </div>
              <div className="h-1.5 w-20 bg-black"/>
              <p className="text-lg text-neutral-900 font-medium leading-relaxed max-w-sm">
                Finding the perfect shoe shouldn't be complicated. We curate comfort and style into every single thread.
              </p>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div
                className="bg-neutral-50 p-4 md:p-10 rounded-[3rem] md:rounded-[4rem] border border-neutral-100 shadow-xl">
                <div className="aspect-[4/3] md:aspect-video overflow-hidden rounded-[2.5rem] md:rounded-[3rem]">
                  <img
                    src="https://images.unsplash.com/photo-1630981495756-875fec48af03?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                    alt="The Craft"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ROLES / VALUES SECTION (Clean Editorial Style) */}
        <section className="max-w-6xl mx-auto px-6 mb-32 md:mb-44">
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-12">/ Core Philosophy</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:bg-black transition-all duration-500"
              >
                <div className="space-y-8">
                  <div
                    className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <v.icon size={24}/>
                  </div>
                  <div className="space-y-4">
                    <h3
                      className="text-3xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">{v.title}</h3>
                    <p
                      className="text-neutral-600 font-medium leading-snug group-hover:text-neutral-400 transition-colors">
                      {v.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. IMPACT NUMBERS */}
        <section className="max-w-6xl mx-auto px-4 mb-32">
          <div className="bg-black text-white rounded-[3rem] p-10 md:p-24 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Impact</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold">/ Global Reach 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-8 md:gap-16 border-l border-neutral-800 pl-8 md:pl-16">
                <div>
                  <p className="text-4xl md:text-6xl font-black tracking-tighter mb-1">50K+</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Community</p>
                </div>
                <div>
                  <p className="text-4xl md:text-6xl font-black tracking-tighter mb-1">15K+</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Drops</p>
                </div>
                <div>
                  <p className="text-4xl md:text-6xl font-black tracking-tighter mb-1">24/7</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Support</p>
                </div>
                <div>
                  <p className="text-4xl md:text-6xl font-black tracking-tighter mb-1">99%</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Verified</p>
                </div>
              </div>
            </div>

            <div
              className="absolute right-[-2%] bottom-[-10%] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <span className="text-[25vw] font-black italic text-white tracking-tighter leading-none">-26</span>
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION - Responsive Button Sizes */}
        <section className="text-center px-6">
          <Button
            className="w-full md:w-auto h-16 md:h-20 px-10 md:px-16 bg-black text-white hover:bg-neutral-800 rounded-2xl text-lg md:text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl">
            <span className="flex items-center gap-3 uppercase tracking-widest">
              Join the Movement
              <ArrowRight size={20} className="md:w-6 md:h-6"/>
            </span>
          </Button>
        </section>

      </main>
    </div>
  );
}