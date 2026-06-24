import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import LoginRegisterView from './components/LoginRegisterView';
import RewardsView from './components/RewardsView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';

import { CartItem, Customer, Order, MenuItem, EmailJsConfig } from './types';
import { Sparkles, X, Gift, Award, Coffee } from 'lucide-react';

export default function App() {
  // Global States
  const [activeView, setActiveView] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [rewardProgress, setRewardProgress] = useState<number>(0);
  const [useReward, setUseReward] = useState<boolean>(false);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);

  // Email Config
  const [emailConfig, setEmailConfig] = useState<EmailJsConfig>({
    serviceId: '',
    templateId: '',
    publicKey: '',
    ownerEmail: 'orders@cafebistro.com',
    enabled: false
  });

  // Congratulatory Rewards Pop-up Overlay
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      // Customer
      const savedCustomer = localStorage.getItem('cafe_customer');
      if (savedCustomer) {
        setCurrentCustomer(JSON.parse(savedCustomer));
      }

      // Orders
      const savedOrders = localStorage.getItem('cafe_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      // Loyalty Reward progress (customerOrders)
      const savedProgress = localStorage.getItem('customerOrders');
      if (savedProgress) {
        setRewardProgress(parseInt(savedProgress, 10));
      }

      // Email Config
      const savedEmailConfig = localStorage.getItem('cafe_email_config');
      if (savedEmailConfig) {
        setEmailConfig(JSON.parse(savedEmailConfig));
      }

      // Cart
      const savedCart = localStorage.getItem('cafe_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error reading localStorage config:', e);
    }
  }, []);

  // Save Cart to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('cafe_cart', JSON.stringify(cart));
  }, [cart]);

  // Handler: Add Item to Cart
  const addToCart = (item: MenuItem, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { menuItem: item, quantity: qty }];
    });
  };

  // Handler: Update Cart Quantity
  const updateCartQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      deleteCartItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.menuItem.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  // Handler: Delete Cart Item
  const deleteCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  // Handler: Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Handler: Save Customer Profile Info
  const saveCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    localStorage.setItem('cafe_customer', JSON.stringify(customer));
  };

  // Handler: Logout Customer
  const logoutCustomer = () => {
    setCurrentCustomer(null);
    localStorage.removeItem('cafe_customer');
  };

  // Handler: Apply Coupon
  const applyCoupon = (code: string | null) => {
    setActiveCoupon(code);
  };

  // Handler: Complete Checkout Order
  const completeOrder = (order: Order) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('cafe_orders', JSON.stringify(updatedOrders));

    // Clear cart & applied coupon
    setCart([]);
    setActiveCoupon(null);

    // Update Loyalty Progress (customerOrders)
    if (useReward) {
      // They redeemed their FREE treat, so reset back to 0!
      setRewardProgress(0);
      localStorage.setItem('customerOrders', '0');
      setUseReward(false);
    } else {
      // Incremented progress by 1
      const nextProgress = rewardProgress + 1;
      setRewardProgress(nextProgress);
      localStorage.setItem('customerOrders', nextProgress.toString());

      // Check if they reached the magic 7 limit!
      if (nextProgress === 7) {
        setShowRewardModal(true);
      }
    }
  };

  // Handler: Mock Order Progress for Testing
  const addMockOrderProgress = () => {
    const nextProgress = Math.min(7, rewardProgress + 1);
    setRewardProgress(nextProgress);
    localStorage.setItem('customerOrders', nextProgress.toString());

    if (nextProgress === 7) {
      setShowRewardModal(true);
    }
  };

  // Handler: Reset Reward Progress
  const resetProgress = () => {
    setRewardProgress(0);
    localStorage.setItem('customerOrders', '0');
    setUseReward(false);
  };

  // Handler: Toggle order status (Admin)
  const updateOrderStatus = (orderId: string, status: 'Pending' | 'Completed') => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem('cafe_orders', JSON.stringify(updated));
  };

  // Handler: Delete order record (Admin)
  const deleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem('cafe_orders', JSON.stringify(updated));
  };

  // Handler: Wipe session data
  const resetAllData = () => {
    setOrders([]);
    setCart([]);
    setRewardProgress(0);
    setActiveCoupon(null);
    setUseReward(false);
    localStorage.removeItem('cafe_orders');
    localStorage.removeItem('customerOrders');
    localStorage.removeItem('cafe_cart');
    alert('Bistro Session Storage Database successfully reset to fresh factory values.');
  };

  // Handler: Save EmailJS config
  const saveEmailConfig = (config: EmailJsConfig) => {
    setEmailConfig(config);
    localStorage.setItem('cafe_email_config', JSON.stringify(config));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-200 font-sans flex flex-col justify-between selection:bg-orange-500/35 selection:text-white">
      {/* 1. Global Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cart={cart}
        currentCustomer={currentCustomer}
        rewardProgress={rewardProgress}
        logoutCustomer={logoutCustomer}
      />

      {/* 2. Congratulatory Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0f1115]/90 border border-orange-500/35 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center flex flex-col gap-5 relative shadow-2xl">
            {/* Confetti styling glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent rounded-3xl pointer-events-none" />
            
            <button
              onClick={() => setShowRewardModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto text-orange-400">
              <Gift className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-orange-500 uppercase">
                CONGRATULATIONS!
              </span>
              <h2 className="text-2xl font-bold font-display text-white mt-1">Free Loyalty Reward Unlocked!</h2>
              <p className="text-xs text-gray-400 leading-relaxed mt-2.5">
                You have reached <span className="text-orange-500 font-semibold">7 Completed Orders</span> inside your browser cache! 
                You are rewarded with a completely <span className="text-emerald-400 font-bold">FREE hot Espresso, Cappuccino,</span> or <span className="text-emerald-400 font-bold">Garlic Bread</span> (flat ₹130 discount)!
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 font-medium">Bistro Reward Discount</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">- ₹130</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setUseReward(true);
                  setShowRewardModal(false);
                  setActiveView('cart');
                }}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-sm rounded-xl transition-all cursor-pointer"
              >
                Apply Reward to Cart Now
              </button>
              <button
                onClick={() => setShowRewardModal(false)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Awesome, I will redeem it later!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Render Active Route View Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12">
        {activeView === 'home' && (
          <HomeView
            setActiveView={setActiveView}
            addToCart={addToCart}
            applyCoupon={applyCoupon}
            activeCoupon={activeCoupon}
          />
        )}

        {activeView === 'about' && (
          <AboutView setActiveView={setActiveView} />
        )}

        {activeView === 'menu' && (
          <MenuView
            addToCart={addToCart}
            cart={cart}
          />
        )}

        {activeView === 'cart' && (
          <CartView
            cart={cart}
            updateCartQty={updateCartQty}
            deleteCartItem={deleteCartItem}
            clearCart={clearCart}
            setActiveView={setActiveView}
            activeCoupon={activeCoupon}
            applyCoupon={applyCoupon}
            rewardProgress={rewardProgress}
            useReward={useReward}
            setUseReward={setUseReward}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutView
            cart={cart}
            currentCustomer={currentCustomer}
            saveCustomer={saveCustomer}
            activeCoupon={activeCoupon}
            rewardProgress={rewardProgress}
            useReward={useReward}
            completeOrder={completeOrder}
            setActiveView={setActiveView}
            emailConfig={emailConfig}
          />
        )}

        {activeView === 'login' && (
          <LoginRegisterView
            currentCustomer={currentCustomer}
            saveCustomer={saveCustomer}
            logoutCustomer={logoutCustomer}
            rewardProgress={rewardProgress}
          />
        )}

        {activeView === 'rewards' && (
          <RewardsView
            rewardProgress={rewardProgress}
            addMockOrderProgress={addMockOrderProgress}
            resetProgress={resetProgress}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'contact' && (
          <ContactView />
        )}

        {activeView === 'admin' && (
          <AdminView
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            deleteOrder={deleteOrder}
            resetAllData={resetAllData}
            emailConfig={emailConfig}
            saveEmailConfig={saveEmailConfig}
            rewardProgress={rewardProgress}
          />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
