import Navigation from "../layouts/Navigation";
import { Button } from "../components/ui/button";
import {
  Check,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", orderNumber: "", message: "" });
    }, 3000);
  };

  const contactMethods = [
    { icon: Mail, label: "Email", value: "support@solemate.com" },
    { icon: Phone, label: "Phone", value: "+91-98765-43210" },
    { icon: MapPin, label: "Visit", value: "Sector 14, Gurgaon" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: MessageCircle, label: "WhatsApp", url: "#" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-black mb-6 sm:mb-8 tracking-tighter leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
              We're here to help. Reach out to our team and we'll respond within
              24 hours.
            </p>
          </div>
        </section>

        {/* Split Screen Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Side - Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8 sm:mb-12 tracking-tight">
                  Contact Information
                </h2>
                <div className="space-y-8">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div key={index} className="flex gap-6 items-start">
                        <Icon
                          size={24}
                          className="text-black flex-shrink-0 mt-1"
                        />
                        <div className="space-y-1">
                          <p className="text-sm uppercase tracking-wider text-neutral-600 font-medium">
                            {method.label}
                          </p>
                          <p className="text-lg sm:text-xl text-black font-light">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6 pt-8 border-t border-neutral-200">
                <p className="text-sm uppercase tracking-wider text-neutral-600 font-medium">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center animate-scale-in">
                    <Check size={32} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-black">
                      Message Received
                    </h3>
                    <p className="text-neutral-600 font-light">
                      We'll get back to you soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      placeholder=" "
                      required
                      className="w-full bg-transparent pb-3 text-lg border-b-2 border-neutral-300 focus:border-black outline-none transition-colors placeholder-transparent font-light"
                    />
                    <label
                      htmlFor="name"
                      className={`text-sm uppercase tracking-wider font-medium transition-all ${
                        formData.name || focusedField === "name"
                          ? "text-black"
                          : "text-neutral-500"
                      }`}
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      placeholder=" "
                      required
                      className="w-full bg-transparent pb-3 text-lg border-b-2 border-neutral-300 focus:border-black outline-none transition-colors placeholder-transparent font-light"
                    />
                    <label
                      htmlFor="email"
                      className={`text-sm uppercase tracking-wider font-medium transition-all ${
                        formData.email || focusedField === "email"
                          ? "text-black"
                          : "text-neutral-500"
                      }`}
                    >
                      Email
                    </label>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("orderNumber")}
                      onBlur={() => setFocusedField("")}
                      placeholder=" "
                      className="w-full bg-transparent pb-3 text-lg border-b-2 border-neutral-300 focus:border-black outline-none transition-colors placeholder-transparent font-light"
                    />
                    <label
                      htmlFor="orderNumber"
                      className={`text-sm uppercase tracking-wider font-medium transition-all ${
                        formData.orderNumber || focusedField === "orderNumber"
                          ? "text-black"
                          : "text-neutral-500"
                      }`}
                    >
                      Order # (Optional)
                    </label>
                  </div>

                  <div className="space-y-1 pt-4">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField("")}
                      placeholder=" "
                      rows={5}
                      required
                      className="w-full bg-transparent pb-3 text-lg border-b-2 border-neutral-300 focus:border-black outline-none transition-colors placeholder-transparent font-light resize-none"
                    />
                    <label
                      htmlFor="message"
                      className={`text-sm uppercase tracking-wider font-medium transition-all ${
                        formData.message || focusedField === "message"
                          ? "text-black"
                          : "text-neutral-500"
                      }`}
                    >
                      Message
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 bg-black text-white hover:bg-neutral-900 text-base sm:text-lg font-medium mt-8 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
