import React from 'react';
import { Coffee, Phone, Mail, Instagram, Facebook, MessageCircle, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10 pt-16 pb-8 px-4 sm:px-8 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* About Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
            <div className="bg-orange-500/10 p-2 rounded-xl border border-orange-500/30">
              <Coffee className="w-5 h-5 text-orange-500" />
            </div>
            <span className="font-display font-bold text-lg text-white">Cafe Bistro</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Crafting premium pizzas, flame-grilled burgers, organic teas, and freshly roasted artisan coffee. Experience fine dining in our state-of-the-art glassmorphic ambient bistro.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 transition-all border border-white/10"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 transition-all border border-white/10"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all border border-white/10"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white tracking-wide text-sm uppercase">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button onClick={() => setActiveView('home')} className="hover:text-orange-500 transition-all cursor-pointer">
                Home / Offers
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('menu')} className="hover:text-orange-500 transition-all cursor-pointer">
                Interactive Menu
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('about')} className="hover:text-orange-500 transition-all cursor-pointer">
                Our Story (About)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('rewards')} className="hover:text-orange-500 transition-all cursor-pointer">
                Loyalty & Rewards
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('contact')} className="hover:text-orange-500 transition-all cursor-pointer">
                Google Map & Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Business Hours Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white tracking-wide text-sm uppercase">Bistro Hours</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-300 font-medium">Monday - Friday</p>
                <p className="text-xs text-gray-500">10:00 AM - 11:00 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-300 font-medium">Saturday - Sunday</p>
                <p className="text-xs text-gray-500">09:00 AM - Midnight</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contacts Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white tracking-wide text-sm uppercase">Contact Details</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-orange-500 shrink-0 mt-0.5" />
              <span className="text-gray-400">No 15, Indiranagar Double Rd, Stage 2, Bangalore, KA - 560038</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4.5 h-4.5 text-orange-500 shrink-0" />
              <a href="tel:+919876543210" className="hover:text-orange-500 transition-all">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 text-orange-500 shrink-0" />
              <a href="mailto:orders@cafebistro.com" className="hover:text-orange-500 transition-all">orders@cafebistro.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
        <p>© 2026 Cafe Bistro & Rewards. All rights reserved in Local Browser Cache.</p>
        <p>Crafted with premium glassmorphic dark theme and interactive features.</p>
      </div>
    </footer>
  );
}
