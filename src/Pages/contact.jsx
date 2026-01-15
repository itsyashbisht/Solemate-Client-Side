import Navigation from "../layouts/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@solemate.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91-98765-43210",
      description: "Monday to Friday, 9:00 AM - 6:00 PM IST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Sector 14, Gurgaon",
      description: "Haryana, India",
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "Mon - Fri, 9:00 AM - 6:00 PM",
      description: "IST (Indian Standard Time)",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Our
              support team is here to help with any inquiries.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="p-6 sm:p-8 border border-neutral-200 hover:border-black transition-colors"
                >
                  <Icon size={32} className="text-black mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">
                    {info.title}
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-black mb-2">
                    {info.value}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-600">
                    {info.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 sm:p-12 lg:p-16 border border-neutral-200">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2 sm:mb-3 tracking-tight">
              Send us a Message
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mb-8 sm:mb-12">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2 sm:space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-base sm:text-lg font-medium text-black"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="h-11 sm:h-12 text-base sm:text-lg border-neutral-300 focus:border-black placeholder:text-neutral-400"
                    required
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-base sm:text-lg font-medium text-black"
                  >
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="h-11 sm:h-12 text-base sm:text-lg border-neutral-300 focus:border-black placeholder:text-neutral-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="message"
                  className="text-base sm:text-lg font-medium text-black"
                >
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg border border-neutral-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 resize-none placeholder:text-neutral-400"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-black text-white hover:bg-neutral-900 text-base sm:text-lg font-medium transition-colors"
              >
                Send Message
              </Button>

              <p className="text-center text-xs sm:text-sm text-neutral-600">
                We aim to respond to all inquiries within 24 hours.
              </p>
            </form>
          </Card>
        </section>
      </main>
    </div>
  );
}
