import { Metadata } from "next";
import { MessageCircle, MapPin, Clock, Phone, Heart, Sparkles, Award, Truck, Palette, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | DanishPress - Premium Wedding Invitations",
  description:
    "Learn about DanishPress - Your trusted partner for beautiful wedding invitation cards. Premium quality printing for Hindu and Muslim ceremonies.",
};

export default function AboutPage() {
  const features = [
    {
      icon: "💒",
      title: "Wide Collection",
      description: "Browse through our extensive collection of Hindu and Muslim wedding cards, designed to match your style and preferences.",
      gradient: "from-primary-500/10 to-secondary-500/10"
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description: "All our cards are printed on high-quality paper with attention to detail, ensuring your invitations make a lasting impression.",
      gradient: "from-secondary-500/10 to-accent-500/10"
    },
    {
      icon: "🎨",
      title: "Customization",
      description: "Personalize your cards with custom text, colors, and designs. We work with you to create the perfect invitation.",
      gradient: "from-accent-500/10 to-primary-500/10"
    },
    {
      icon: "💰",
      title: "Bulk Discounts",
      description: "Order in bulk and save! We offer special discounts for large orders. Contact us for a custom quote.",
      gradient: "from-primary-500/10 to-accent-500/10"
    }
  ];

  const stats = [
    { value: "1000+", label: "Happy Couples", icon: Users },
    { value: "500+", label: "Card Designs", icon: Palette },
    { value: "5+", label: "Years Experience", icon: Award },
    { value: "24/7", label: "Support", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50 overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold text-4xl shadow-xl shadow-primary-500/25 mb-8">
            D
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="gradient-text">DanishPress</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for beautiful and elegant wedding invitation
            cards. We specialize in Hindu and Muslim wedding invitations with
            premium quality and customization options.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex p-2 rounded-xl bg-white/10 mb-3">
                  <stat.icon className="w-5 h-5 text-primary-400" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge text-primary-600 mb-4">
              <Sparkles className="w-4 h-4" />
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Makes Us <span className="gradient-text">Special</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-5 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge text-primary-600 mb-4">
              <MessageCircle className="w-4 h-4" />
              CONTACT US
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get In <span className="gradient-text">Touch</span>
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-4">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-green-100/50 border border-green-100 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">Message us directly - Usually reply within 30 mins</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                <Phone className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-sm text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Working Hours</p>
                <p className="text-sm text-gray-600">Mon - Sat: 10 AM - 8 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-sm text-gray-600">Your City, State, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Let us help you create the perfect wedding invitations
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
          <p className="mt-4 text-gray-500 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Kashif Raja
          </p>
        </div>
      </section>
    </div>
  );
}
