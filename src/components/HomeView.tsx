import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Copy, Check, Star, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';
import { OFFERS, TESTIMONIALS, MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface HomeViewProps {
  setActiveView: (view: string) => void;
  addToCart: (item: MenuItem, qty: number) => void;
  applyCoupon: (code: string) => void;
  activeCoupon: string | null;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    title: 'Artisan Crafted Coffees & Roasts',
    subtitle: 'Brewed under high pressure by professional baristas using fine single-origin Arabica beans.',
    badge: 'FRESHLY BREWED DAILY'
  },
  {
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    title: 'Gourmet Wood-Fired Pizzas',
    subtitle: 'Crisp sourdough crust topped with premium fresh mozzarella and locally sourced farm ingredients.',
    badge: '100% HANDMADE CRUST'
  },
  {
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    title: 'Flame-Grilled Sizzling Burgers',
    subtitle: 'Juicy patties stacked with cheddar cheese, crispy greens, and chef-made dynamic spreads.',
    badge: 'JUICY & FRESH'
  }
];

export default function HomeView({ setActiveView, addToCart, applyCoupon, activeCoupon }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const popularItems = MENU_ITEMS.filter((item) => item.isPopular);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* 1. Hero Image Slider */}
      <section className="relative h-[460px] md:h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mx-1 sm:mx-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background image overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/65 to-transparent" />
            <div className="absolute inset-0 bg-black/35" />

            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col items-start gap-4 max-w-3xl">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider">
                {slide.badge}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed md:max-w-2xl">
                {slide.subtitle}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  id="hero-menu-cta"
                  onClick={() => setActiveView('menu')}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm rounded-xl transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Interactive Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="hero-rewards-cta"
                  onClick={() => setActiveView('rewards')}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/10 transition-all cursor-pointer"
                >
                  Loyalty Rewards
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Dots */}
        <div className="absolute bottom-6 right-6 z-25 flex items-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Carousel Navigation Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 transition-all cursor-pointer hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 transition-all cursor-pointer hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* 2. Offers / Coupons Section */}
      <section className="px-1 sm:px-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> EXCLUSIVE BISTRO DISCOUNTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">Today's Special Offers</h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md">
            Copy and apply coupon codes directly to claim amazing discounts. No registration required!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10 hover:border-orange-500/25 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
            >
              {/* Card visual background image */}
              <div 
                className="h-32 w-full rounded-2xl bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${offer.image})` }}
              />

              <div className="flex flex-col gap-1.5 flex-1">
                <span className="text-xs text-orange-500 font-semibold bg-orange-500/10 px-2.5 py-1 rounded-xl border border-orange-500/20 self-start">
                  Save {offer.discountPercent}% OFF
                </span>
                <h3 className="font-bold font-display text-lg text-white mt-1 group-hover:text-orange-400 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Coupon Copy Trigger */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-black/40 border border-white/10">
                <span className="font-mono text-xs font-bold text-gray-300 uppercase pl-1.5">
                  Code: <span className="text-orange-400 font-extrabold">{offer.code}</span>
                </span>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCoupon === offer.code || copiedCode === offer.code
                      ? 'bg-emerald-500 text-black'
                      : 'bg-orange-500 hover:bg-orange-600 text-black'
                  }`}
                >
                  {activeCoupon === offer.code || copiedCode === offer.code ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Items Grid */}
      <section className="px-1 sm:px-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-orange-500 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5" /> HOT SELLING DELICACIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">Our Most Popular Items</h2>
          </div>
          <button
            onClick={() => setActiveView('menu')}
            className="text-sm font-semibold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition-all cursor-pointer hover:translate-x-0.5"
          >
            <span>View Full Cafe Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-orange-500/25 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Popular
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-sm font-bold text-orange-400 border border-white/10">
                  ₹{item.price}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-orange-500/80 uppercase font-mono tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-bold font-display text-sm text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="w-full py-2 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white hover:text-black font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Add to Order Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-orange-500 text-xs font-mono font-bold tracking-wider uppercase">
            CAFE TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">What Our Food Lovers Say</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Real reviews stored directly in our community directory. Join us and leave your review in the feedback channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-4 justify-between"
            >
              <div className="flex flex-col gap-3">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4.5 h-4.5 ${
                        i < test.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 italic leading-relaxed">
                  "{test.text}"
                </p>
              </div>

              {/* Avatar Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-xs text-white leading-none">{test.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Features Trust Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center gap-2 p-4">
          <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-2xl mb-1 text-orange-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">100% Quality Ingredients</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Fresh meat, organic farm greens, and premium, hand-picked tea and coffee leaves.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4">
          <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-2xl mb-1 text-orange-500">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">Lightning Fast Delivery</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Dispatched hot directly from the wood oven to your address within 30 minutes.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 p-4">
          <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-2xl mb-1 text-orange-500">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">Earn Loyalty Coffee</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every 7 completed orders triggers an automatic coupon for a FREE espresso or garlic bread.
          </p>
        </div>
      </section>
    </div>
  );
}
