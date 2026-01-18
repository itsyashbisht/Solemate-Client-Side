import { useRef } from "react";
import Navigation from "../layouts/Navigation";
import { Button } from "../components/ui/button";
import { ArrowRight, Zap, Users, Truck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const textX = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const reverseTextX = useTransform(smoothProgress, [0, 1], ["-50%", "0%"]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const secondaryImageY = useTransform(smoothProgress, [0, 1], [0, 80]);

  const values = [
    {
      id: "01",
      icon: Zap,
      title: "Authenticity",
      description:
        "We source directly from brands. Every stitch, sole, and lace is verified by our experts before it reaches your door.",
    },
    {
      id: "02",
      icon: Users,
      title: "Community",
      description:
        "More than a marketplace. We host events, drops, and discussions for those who live and breathe sneaker culture.",
    },
    {
      id: "03",
      icon: Truck,
      title: "Speed",
      description:
        "Our logistics network is built for the modern age. Fast shipping and a return process that doesn't give you a headache.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-black selection:text-white">
      <Navigation />

      {/* BACKGROUND MARQUEE */}
      <div className="fixed top-32 left-0 w-full pointer-events-none z-0 opacity-[0.05] select-none">
        <motion.div style={{ x: textX }} className="flex whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[15vw] font-black uppercase tracking-tighter mx-10"
            >
              Solemate
            </span>
          ))}
        </motion.div>
      </div>

      <main className="relative z-10 pt-32 sm:pt-48 pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 mb-40 text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-black mb-8 tracking-tighter leading-[0.85]">
            More than just
            <br />a step
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
            Every great journey starts with the perfect pair. We bridge the gap
            between street culture and elite performance.
          </p>
        </section>

        {/* DUAL IMAGE SECTION */}
        <section className="max-w-7xl mx-auto px-4 mb-64 relative grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 relative z-20">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">
              The Origin
            </h2>
            <p className="text-xl text-neutral-700 leading-relaxed font-light max-w-md">
              Born from a simple idea: finding the perfect shoe shouldn't be
              complicated. We started Solemate because we were tired of endless
              browsing.
            </p>
          </div>

          <div className="relative h-[600px] flex items-center justify-center">
            <motion.div
              style={{ y: imageY }}
              className="absolute w-[90%] h-[450px] lg:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-[12px] border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070"
                className="w-full h-full object-cover"
                alt="Craft"
              />
            </motion.div>
            <motion.div
              style={{ y: secondaryImageY }}
              className="absolute -bottom-16 -left-12 w-3/5 h-[320px] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-[8px] border-white hidden sm:block"
            >
              <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964"
                className="w-full h-full object-cover grayscale"
                alt="Detail"
              />
            </motion.div>
          </div>
        </section>

        {/* IMPROVED UX CORE VALUES SECTION */}
        <section className="max-w-6xl mx-auto px-4 mb-56">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">
              Our Values
            </h2>
            <p className="text-neutral-400 font-medium uppercase tracking-[0.2em] text-sm pb-2">
              / How we roll
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="group relative p-10 rounded-[3rem] bg-neutral-50 border border-neutral-100 overflow-hidden transition-all duration-500 hover:bg-black hover:border-black"
              >
                {/* ID Number Watermark */}
                <span className="absolute top-8 right-10 text-5xl font-black opacity-[0.03] group-hover:opacity-10 group-hover:text-white transition-opacity italic">
                  {value.id}
                </span>

                <div className="relative z-10 space-y-12">
                  <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <value.icon size={24} />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold tracking-tight group-hover:text-white transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-neutral-500 font-light leading-relaxed group-hover:text-neutral-400 transition-colors">
                      {value.description}
                    </p>
                  </div>

                  {/* Interactive Footer */}
                  <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:text-white transition-all translate-y-4 group-hover:translate-y-0">
                    Learn more <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Numbers Section */}
        <section className="max-w-6xl mx-auto px-4 mb-48">
          <div className="bg-black text-white rounded-[4rem] p-16 sm:p-24 relative overflow-hidden group">
            <h2 className="text-5xl sm:text-7xl font-black mb-20 tracking-tighter italic">
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
              {[
                { n: "50K+", l: "Happy Feet" },
                { n: "15K+", l: "Shoe Styles" },
                { n: "24/7", l: "Support" },
                { n: "99%", l: "Satisfaction" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-5xl sm:text-7xl font-black tracking-tighter mb-2">
                    {s.n}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-black">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-24 px-4">
          <Button className="bg-black text-white hover:bg-neutral-900 rounded-full px-16 h-20 text-xl font-black uppercase tracking-widest group shadow-2xl transition-transform hover:scale-105">
            Start Your Journey
            <ArrowRight
              className="ml-3 group-hover:translate-x-2 transition-transform"
              size={24}
            />
          </Button>
        </section>
      </main>
    </div>
  );
}
