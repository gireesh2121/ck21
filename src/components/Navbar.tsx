import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Award, User, Lock, Coffee } from 'lucide-react';
import { CartItem, Customer } from '../types';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cart: CartItem[];
  currentCustomer: Customer | null;
  rewardProgress: number;
  logoutCustomer: () => void;
}

export default function Navbar({
  activeView,
  setActiveView,
  cart,
  currentCustomer,
  rewardProgress,
  logoutCustomer
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (viewId: string) => {
    setActiveView(viewId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-black text-xl transition-transform group-hover:scale-105">
            C
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase font-display text-white">
            Cafe<span className="text-orange-500 underline decoration-2 underline-offset-4">Bistro</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className={`font-semibold text-xs tracking-wider transition-all duration-200 relative py-1 cursor-pointer uppercase ${
                activeView === link.id ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {activeView === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Action Controls (Cart, Rewards, Customer, Admin) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Rewards */}
          <button
            id="nav-rewards-btn"
            onClick={() => handleLinkClick('rewards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeView === 'rewards'
                ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4 text-orange-400" />
            <span>Rewards ({rewardProgress}/7)</span>
          </button>

          {/* Cart Icon */}
          <button
            id="nav-cart-btn"
            onClick={() => handleLinkClick('cart')}
            className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeView === 'cart'
                ? 'bg-orange-500/10 border-orange-500/40 text-orange-500'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Customer Logged In / Login Link */}
          {currentCustomer ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <button
                id="nav-account-btn"
                onClick={() => handleLinkClick('login')}
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-orange-500 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">Logged in as</p>
                  <p className="font-semibold text-xs text-gray-200 truncate max-w-[80px]">{currentCustomer.name}</p>
                </div>
              </button>
            </div>
          ) : (
            <button
              id="nav-login-btn"
              onClick={() => handleLinkClick('login')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white/5 border border-white/10 rounded-xl text-gray-200 hover:bg-white/10 transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-400" />
              <span>Login</span>
            </button>
          )}

          {/* Admin Link */}
          <button
            id="nav-admin-btn"
            onClick={() => handleLinkClick('admin')}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeView === 'admin'
                ? 'bg-orange-500/15 border-orange-500/40 text-orange-500'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
            title="Admin Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Cart Icon Mobile */}
          <button
            id="nav-cart-btn-mobile"
            onClick={() => handleLinkClick('cart')}
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Loyalty Banner Mobile */}
          <button
            id="nav-rewards-btn-mobile"
            onClick={() => handleLinkClick('rewards')}
            className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 cursor-pointer"
          >
            <Award className="w-5 h-5" />
          </button>

          <button
            id="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 px-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-mobile-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeView === link.id ? 'bg-orange-500/15 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="h-[1px] bg-white/10 my-1" />

          {/* Mobile Loyalty Tracker Link */}
          <button
            id="nav-link-mobile-rewards"
            onClick={() => handleLinkClick('rewards')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeView === 'rewards' ? 'bg-orange-500/15 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-400" />
              Loyalty Rewards
            </span>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              {rewardProgress} / 7 Orders
            </span>
          </button>

          {/* Account/Login on mobile */}
          {currentCustomer ? (
            <div className="flex flex-col gap-1 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-semibold text-white truncate">{currentCustomer.name}</p>
              <button
                id="nav-mobile-logout"
                onClick={() => {
                  logoutCustomer();
                  setIsOpen(false);
                }}
                className="text-xs text-left text-red-400 mt-2 hover:underline cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              id="nav-link-mobile-login"
              onClick={() => handleLinkClick('login')}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black text-sm font-bold rounded-xl transition-all cursor-pointer text-center"
            >
              Login / Register
            </button>
          )}

          {/* Admin Dashboard on mobile */}
          <button
            id="nav-link-mobile-admin"
            onClick={() => handleLinkClick('admin')}
            className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              activeView === 'admin' ? 'bg-orange-500/15 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-orange-400" />
            <span>Admin Panel (Password Protect)</span>
          </button>
        </div>
      )}
    </nav>
  );
}
