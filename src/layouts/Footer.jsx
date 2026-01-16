import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
              Solemate
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Discover premium footwear that combines style, comfort, and
              innovation for every step of your journey.
            </p>
          </div>

          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {["Shop", "About", "Contact", "Returns"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">
              Information
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Shipping Info",
                "FAQ",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">
              Contact Us
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs sm:text-sm break-words">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs sm:text-sm break-words">
                  hello@solemate.com
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs sm:text-sm break-words">
                  123 Fashion Street, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              &copy; 2025 Solemate. All rights reserved.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
              {["Facebook", "Twitter", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
