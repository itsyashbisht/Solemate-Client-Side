import Navigation from "../layouts/Navigation";
import { Button } from "../components/ui/button";
import { ArrowRight, Zap, Users, Truck } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Authenticity",
      description:
        "Every shoe is verified and authentic, sourced from trusted brands worldwide.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We're more than a store—we're a community of sneaker enthusiasts and collectors.",
    },
    {
      icon: Truck,
      title: "Speed",
      description:
        "Fast, reliable shipping with hassle-free returns and customer support.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Feet" },
    { number: "15K+", label: "Shoe Styles" },
    { number: "24/7", label: "Support" },
    { number: "99%", label: "Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-black mb-6 sm:mb-8 tracking-tighter leading-tight">
              More than just
              <br className="hidden sm:block" />a step
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
              Every great journey starts with the perfect pair. At Solemate, we
              believe your feet deserve nothing less than the best.
            </p>
          </div>
        </section>

        {/* The Origin Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight">
              The Origin
            </h2>
            <div className="prose max-w-4xl">
              <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed font-light">
                Born from a simple idea: finding the perfect shoe shouldn't be
                complicated. We started Solemate because we were tired of
                endless browsing, poor recommendations, and shoes that didn't
                fit our style or feet.
              </p>
              <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed font-light mt-6">
                Today, we're the bridge between sneaker culture and everyday
                comfort—helping thousands discover their sole mate, every single
                day.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-16 sm:mb-20 tracking-tight">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value, index) => (
              <div key={index} className="space-y-6">
                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
                  <value.icon size={28} className="text-black" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  {value.title}
                </h3>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* By the Numbers Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <div className="bg-black text-white rounded-2xl p-12 sm:p-16 lg:p-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 sm:mb-20 tracking-tight">
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                    {stat.number}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-400 font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              Ready to find your sole mate?
            </h2>
            <Button className="bg-black text-white hover:bg-neutral-900 h-12 sm:h-14 px-8 sm:px-12 text-base sm:text-lg font-medium group">
              Start Shopping
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
