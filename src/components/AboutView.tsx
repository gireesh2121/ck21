import React from 'react';
import { Award, Clock, Heart, Users, MapPin, Coffee, Utensils } from 'lucide-react';

interface AboutViewProps {
  setActiveView: (view: string) => void;
}

export default function AboutView({ setActiveView }: AboutViewProps) {
  return (
    <div className="flex flex-col gap-16 pb-16 px-1 sm:px-0">
      {/* Hero Section */}
      <section className="relative h-[280px] rounded-3xl overflow-hidden border border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-black/30" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
          <span className="text-orange-500 font-mono text-xs font-bold tracking-wider uppercase mb-1">BEHIND THE SCENES</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">Our Passion, Your Comfort</h1>
          <p className="text-gray-300 text-sm max-w-xl mt-2">
            Learn more about Indiranagar’s favorite boutique coffee shop, gourmet kitchen, and local community hangout since 2018.
          </p>
        </div>
      </section>

      {/* Main Grid: Story & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Story */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-8 bg-orange-500" />
            <span className="text-orange-500 text-xs font-bold tracking-wider uppercase font-mono">SINCE 2018</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-tight">
            Brewing Joy & Crafting Culinary Delicacies in Bangalore
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            What started as a humble single-origin coffee cart in Indiranagar has blossomed into a full-scale gourmet bistro. 
            At Cafe Bistro, we believe that food and drink are more than just fuel—they are mediums of connection, comfort, and joy.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our woodfired pizzas are prepared using natural sourdough starters, cold-fermented for 48 hours for ultimate digestibility and crispiness. Our beef and chicken burgers are seasoned and flame-grilled to order, maintaining rich juices. Every espresso is pulled with absolute precision, utilizing micro-climate Arabica beans roasted locally.
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => setActiveView('menu')}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Order Online Now
            </button>
            <button
              onClick={() => setActiveView('contact')}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              Get Directions
            </button>
          </div>
        </div>

        {/* Right Side: Visual highlights with Grid Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg self-start">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white mt-1">45,000+</span>
            <span className="text-xs text-gray-500">Espressos Brewed</span>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg self-start">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white mt-1">12,000+</span>
            <span className="text-xs text-gray-500">Pizzas Served</span>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg self-start">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white mt-1">2,800+</span>
            <span className="text-xs text-gray-500">Loyalty Members</span>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg self-start">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white mt-1">8+ Years</span>
            <span className="text-xs text-gray-500">Of Serving Love</span>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-wider">OUR CORE VALUES</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">Why Cafe Bistro is Special</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            We are dedicated to sustainable business habits and premium local support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-3 rounded-2xl self-start mb-2 border border-orange-500/10">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Made With absolute Love</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every single meal is handcrafted with absolute hygienic standards and checked by our Head Chef before leaving the line.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-3 rounded-2xl self-start mb-2 border border-orange-500/10">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Community First Loyalty</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our unique zero-database loyalty rewards program runs locally in your browser. Complete 7 orders and win a completely free treat!
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-orange-500 bg-orange-500/10 p-3 rounded-2xl self-start mb-2 border border-orange-500/10">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Sustainable Local Sourcing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We source our fresh dairy, greens, and wheat from small-hold cooperative organic farmers surrounding Bangalore.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
