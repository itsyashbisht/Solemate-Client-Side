import Navigation from "../layouts/Navigation";
import { Button } from "../components/ui/button";
import {
  Check,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Marquee effect logic
  const textX = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", orderNumber: "", message: "" });
    }, 4000);
  };

  const contactMethods = [
    { icon: Mail, label: "Email", value: "support@solemate.com" },
    { icon: Phone, label: "Phone", value: "+91-98765-43210" },
    { icon: MapPin, label: "Visit", value: "Sector 14, Gurgaon" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-black selection:text-white">
      <Navigation />

      {/* BACKGROUND MARQUEE - Matches About Page */}
      <div className="fixed top-40 left-0 w-full pointer-events-none z-0 opacity-[0.04] select-none">
        <motion.div style={{ x: textX }} className="flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="text-[18vw] font-black uppercase tracking-tighter mx-10"
            >
              Contact
            </span>
          ))}
        </motion.div>
      </div>

      <main className="relative z-10 pt-32 sm:pt-48 pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 mb-24 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-black mb-8 tracking-tighter leading-[0.85]">
              Get in
              <br />
              Touch
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
              Questions about a drop? Need a size swap? Our team is standing by
              to keep you moving.
            </p>
          </motion.div>
        </section>

        {/* Form & Info Section */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column: Contact Methods */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-12">
                {contactMethods.map((method, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="group flex gap-8 items-start"
                  >
                    <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                      <method.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
                        {method.label}
                      </p>
                      <p className="text-xl sm:text-2xl text-black font-light tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                        {method.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Minimal Social Links */}
              <div className="pt-12 border-t border-neutral-100">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-8">
                  Socials
                </p>
                <div className="flex gap-4">
                  {[Instagram, MessageCircle].map((Icon, i) => (
                    <motion.a
                      whileHover={{ y: -5 }}
                      key={i}
                      href="#"
                      className="w-14 h-14 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                    >
                      <Icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-neutral-50/50 p-8 sm:p-12 rounded-[3rem] border border-neutral-100 backdrop-blur-sm">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center shadow-2xl">
                      <Check size={40} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold tracking-tighter mb-2">
                        Message Sent
                      </h3>
                      <p className="text-neutral-500 font-light">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid sm:grid-cols-2 gap-10">
                      <CustomInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        setFocus={setFocusedField}
                        focused={focusedField === "name"}
                      />
                      <CustomInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        setFocus={setFocusedField}
                        focused={focusedField === "email"}
                      />
                    </div>

                    <CustomInput
                      label="Order Number (Optional)"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      setFocus={setFocusedField}
                      focused={focusedField === "orderNumber"}
                    />

                    <div className="relative pt-4">
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField("")}
                        className="w-full bg-transparent border-b-2 border-neutral-200 focus:border-black outline-none transition-all py-2 text-xl font-light resize-none"
                      />
                      <label
                        className={`absolute left-0 top-0 text-xs uppercase tracking-widest font-bold transition-all ${focusedField === "message" || formData.message ? "text-black -translate-y-4" : "text-neutral-400 translate-y-6"}`}
                      >
                        Your Message
                      </label>
                    </div>

                    <Button className="w-full h-20 bg-black text-white hover:bg-neutral-900 rounded-2xl text-xl font-bold group overflow-hidden relative">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Send Inquiry
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </span>
                      <motion.div
                        whileHover={{ x: "100%" }}
                        className="absolute inset-0 bg-neutral-800 -translate-x-full transition-transform duration-500"
                      />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Reusable animated input component for cleaner code
function CustomInput({
  label,
  name,
  value,
  onChange,
  setFocus,
  focused,
  type = "text",
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(name)}
        onBlur={() => setFocus("")}
        className="w-full bg-transparent border-b-2 border-neutral-200 focus:border-black outline-none transition-all py-2 text-xl font-light"
      />
      <label
        className={`absolute left-0 top-0 text-xs uppercase tracking-widest font-bold transition-all ${focused || value ? "text-black -translate-y-4" : "text-neutral-400 translate-y-3"}`}
      >
        {label}
      </label>
    </div>
  );
}
