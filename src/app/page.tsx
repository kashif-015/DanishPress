"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CardGrid, FilterTabs } from "@/components/cards";
import { CardWithImages, CardCategory } from "@/types";
import { 
  Sparkles, 
  Star, 
  MessageCircle, 
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Award,
  Truck,
  Palette,
  Shield,
  Clock,
  Heart,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Play,
  Gem,
  Crown
} from "lucide-react";

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="animate-pulse p-4">
        <div className="h-48 bg-gray-200 rounded-xl mb-4" />
        <div className="h-12 bg-gray-200 rounded-lg mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as CardCategory | null;

  const [cards, setCards] = useState<CardWithImages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | "all">(
    categoryParam || "all"
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setIsConfigured(false);
      setIsLoading(false);
      return;
    }

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      let query = supabase
        .from("cards")
        .select(`*, images:card_images(*)`)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching cards:", error);
      } else {
        const cardsWithSortedImages = (data || []).map((card) => ({
          ...card,
          images: (card.images || []).sort(
            (a: { display_order: number }, b: { display_order: number }) =>
              a.display_order - b.display_order
          ),
        }));
        setCards(cardsWithSortedImages);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsConfigured(false);
    }

    setIsLoading(false);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Data
  const benefits = [
    { icon: Zap, title: "Quick Response", desc: "Instant WhatsApp support" },
    { icon: Palette, title: "Customizable", desc: "Personalize every detail" },
    { icon: Truck, title: "Fast Delivery", desc: "On-time, every time" },
    { icon: Shield, title: "Quality Assured", desc: "Premium materials only" },
  ];

  const features = [
    {
      icon: Crown,
      title: "Premium Quality",
      description: "Finest paper stock with rich, vibrant colors that make your invitations stand out",
      color: "from-primary-500 to-accent-500",
      size: "lg:col-span-2"
    },
    {
      icon: Gem,
      title: "Elegant Designs",
      description: "Handcrafted designs for Hindu and Muslim ceremonies",
      color: "from-secondary-500 to-secondary-600",
      size: ""
    },
    {
      icon: Users,
      title: "1000+ Happy Couples",
      description: "Trusted by thousands of families across India",
      color: "from-accent-500 to-primary-500",
      size: ""
    },
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Expertise in creating memorable wedding invitations",
      color: "from-secondary-500 to-primary-500",
      size: "lg:col-span-2"
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      text: "Absolutely stunning cards! The quality exceeded our expectations. Everyone at the wedding loved them. Will definitely recommend!",
      rating: 5,
      image: "PS"
    },
    {
      name: "Mohammed Ali",
      location: "Mumbai",
      text: "Professional service and beautiful nikah cards. They understood exactly what we wanted and delivered perfectly.",
      rating: 5,
      image: "MA"
    },
    {
      name: "Rahul Verma",
      location: "Bangalore",
      text: "Quick delivery and exceptional quality. DanishPress made our wedding invitations truly special!",
      rating: 5,
      image: "RV"
    },
  ];

  const faqs = [
    {
      q: "How long does it take to receive my order?",
      a: "Standard orders are delivered within 5-7 business days. Express delivery is available for urgent orders."
    },
    {
      q: "Can I customize the card design?",
      a: "Absolutely! We offer full customization including colors, text, fonts, and layout. Share your ideas and we'll bring them to life."
    },
    {
      q: "What's the minimum order quantity?",
      a: "Our minimum order is 50 cards. We offer bulk discounts for orders above 200 cards."
    },
    {
      q: "Do you provide samples before bulk orders?",
      a: "Yes, we provide sample cards for a small fee which is adjusted in your final order."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!isConfigured) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-6xl mb-6">🔧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Setup Required</h2>
          <p className="text-gray-600 mb-6">Please configure your Supabase environment variables.</p>
          <div className="bg-gray-50 rounded-2xl p-4 text-left text-sm">
            <code className="text-gray-600 block whitespace-pre-wrap">
{`NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key`}
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[80vh] flex items-center hero-gradient overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg shadow-gray-200/50 border border-gray-100 mb-4"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-600">Trusted by 1000+ Happy Couples</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
            >
              Make Your Wedding
              <br />
              <span className="gradient-text">Invitations Special</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed"
            >
              Discover our exclusive collection of premium wedding invitation cards.
              Handcrafted designs for Hindu and Muslim ceremonies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a 
                href="#collection" 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300 btn-shine"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-secondary-500 hover:text-secondary-600 shadow-lg hover:shadow-secondary-500/20 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ===== COLLECTION SECTION ===== */}
      <section id="collection" className="py-12 md:py-16 scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="section-badge text-primary-600 mb-3">
              <Sparkles className="w-4 h-4" />
              COLLECTION
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore Our <span className="gradient-text">Beautiful Cards</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of beautifully designed wedding cards
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <FilterTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>

          {/* Cards Grid */}
          <CardGrid cards={cards} isLoading={isLoading} />

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi! I'd like to see more card designs.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group"
            >
              Want to see more designs? Contact us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES BENTO GRID ===== */}
      <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="section-badge text-primary-600 mb-3">
              <Award className="w-4 h-4" />
              FEATURES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Why Choose <span className="gradient-text">DanishPress</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine tradition with modern design excellence
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`bento-item group ${feature.size}`}
              >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="section-badge text-primary-600 mb-3">
              <Star className="w-4 h-4" />
              TESTIMONIALS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join hundreds of satisfied customers
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="card-modern p-8 card-glow"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                    {t.image}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-12 md:py-16 bg-gray-50 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="section-badge text-primary-600 mb-3">
              <MessageCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <div className={`p-2 rounded-full bg-gray-100 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Order Your <span className="text-primary-400">Perfect Cards?</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Get in touch with us on WhatsApp for personalized assistance, 
              custom designs, and exclusive bulk order discounts.
            </p>
            
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi! I'm interested in your wedding invitation cards.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6" />
              Start Conversation on WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <p className="mt-6 text-gray-400 text-sm flex items-center justify-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Usually reply within 30 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white pt-10 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.png"
                  alt="DanishPress Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="font-bold text-2xl">DanishPress</span>
                  <p className="text-gray-400 text-sm">Premium Wedding Invitations</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Your trusted partner for premium wedding invitation cards. 
                We specialize in Hindu and Muslim wedding cards with elegant 
                designs, quality printing, and personalized service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#collection" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> Browse Cards
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> About Us
                  </a>
                </li>
                <li>
                  <a 
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" /> Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gray-800">
                    <MapPin className="w-4 h-4 text-primary-400" />
                  </div>
                  <p className="text-sm">Koran Sarai, Buxar</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gray-800">
                    <Clock className="w-4 h-4 text-primary-400" />
                  </div>
                  <div className="text-sm">
                    <p>Sat - Sun: 9 AM - 7 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} DanishPress. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Kashif Raja
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
