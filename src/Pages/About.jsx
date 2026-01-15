import Navigation from "../layouts/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Code2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
              About Solemate
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We believe that your feet deserve the perfect pair — every time.
              Welcome to a world where shoe shopping feels as satisfying as
              finding your soulmate.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-4 sm:mb-6">
                At Solemate, our mission is to make shoe shopping effortless and
                enjoyable. We connect customers with the right pair of shoes by
                offering a wide variety of trending and classic footwear,
                easy-to-use browsing and filtering options, competitive prices
                and seasonal deals, and trusted quality with customer
                satisfaction at our core.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed">
                We are passionate about helping every customer find their soul
                mate… for their soles — a shoe that feels like it was made just
                for you.
              </p>
            </div>
            <div className="bg-neutral-100 rounded-lg h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <Target size={80} className="text-neutral-400" />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-neutral-100 rounded-lg h-64 sm:h-80 lg:h-96 flex items-center justify-center order-last md:order-first">
              <Eye size={80} className="text-neutral-400" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
                Our Vision
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed">
                We envision a world where buying shoes online feels as
                satisfying as trying them on in-store — with accurate
                descriptions, real photos, size guides, and reviews that help
                you choose with confidence. Every step you take in our shoes
                should feel like a step towards something great.
              </p>
            </div>
          </div>
        </section>

        {/* Built With Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white rounded-lg p-8 sm:p-12 lg:p-16">
            <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Code2 size={32} className="flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
                  Built with Modern Technology
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed mb-4 sm:mb-6">
                  This platform is built using modern technologies such as React
                  (frontend), Next.js for seamless server-side rendering, and a
                  robust backend API to support seamless user experiences.
                </p>
                <Button className="bg-white text-black hover:bg-neutral-100 w-full sm:w-auto">
                  View Our Tech Stack
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
