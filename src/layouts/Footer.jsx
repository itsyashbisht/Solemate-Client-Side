import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer () {
  return (
    <footer className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-10 lg:px-8 py-24 md:py-32">

        {/* Grid: items-center for mobile centering, sm:items-start for desktop alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 mb-16">

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tighter uppercase">
              Solemate
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Discover premium footwear that combines style, comfort, and
              innovation for every step of your journey.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Shop', 'About', 'Contact', 'Returns'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-6">
              Information
            </h4>
            <ul className="space-y-3">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Shipping Info',
                'FAQ',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-6">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center sm:items-start gap-3">
                <Phone className="w-4 h-4 text-white flex-shrink-0"/>
                <span className="text-gray-400 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center sm:items-start gap-3">
                <Mail className="w-4 h-4 text-white flex-shrink-0"/>
                <span className="text-gray-400 text-sm break-all">
                  hello@solemate.com
                </span>
              </div>
              <div className="flex items-center sm:items-start gap-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0"/>
                <span className="text-gray-400 text-sm">
                  123 Fashion Street, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-[10px] uppercase tracking-widest text-center sm:text-left">
              &copy; 2026 Solemate. All rights reserved.
            </p>
            <div className="flex gap-8 justify-center">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-[10px] uppercase tracking-widest"
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