import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Ticket, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  updateCartQty: (itemId: string, newQty: number) => void;
  deleteCartItem: (itemId: string) => void;
  clearCart: () => void;
  setActiveView: (view: string) => void;
  activeCoupon: string | null;
  applyCoupon: (code: string | null) => void;
  rewardProgress: number;
  useReward: boolean;
  setUseReward: (use: boolean) => void;
}

export default function CartView({
  cart,
  updateCartQty,
  deleteCartItem,
  clearCart,
  setActiveView,
  activeCoupon,
  applyCoupon,
  rewardProgress,
  useReward,
  setUseReward
}: CartViewProps) {
  const [couponInput, setCouponInput] = useState(activeCoupon || '');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Constants
  const GST_RATE = 0.18; // 18% GST
  const DELIVERY_FEE = 40;

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  // Coupon Discount
  let couponDiscountPercent = 0;
  if (activeCoupon === 'WELCOME10') couponDiscountPercent = 10;
  if (activeCoupon === 'HAPPY15') couponDiscountPercent = 15;
  if (activeCoupon === 'WEEKEND20' && subtotal >= 500) couponDiscountPercent = 20;

  const couponDiscountAmount = Math.round(subtotal * (couponDiscountPercent / 100));

  // Reward Discount - If 7 orders complete (progress === 7) and they choose to use reward,
  // they get a FREE Coffee (valued at ₹120) or Garlic Bread (valued at ₹130).
  // Let's say a free Coffee discount of ₹120 or free garlic bread worth ₹130, let's give a flat ₹130 discount if they have items in cart.
  const rewardDiscountAmount = (rewardProgress >= 7 && useReward) ? Math.min(subtotal, 130) : 0;

  // Delivery: Free above ₹500
  const deliveryCharge = subtotal > 500 || subtotal === 0 ? 0 : DELIVERY_FEE;

  // GST calculation
  const gstAmount = Math.round((subtotal - couponDiscountAmount - rewardDiscountAmount) * GST_RATE);

  // Grand Total
  const grandTotal = Math.max(0, subtotal + gstAmount + deliveryCharge - couponDiscountAmount - rewardDiscountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();

    if (code === 'WELCOME10' || code === 'HAPPY15') {
      applyCoupon(code);
    } else if (code === 'WEEKEND20') {
      if (subtotal < 500) {
        setCouponError('WEEKEND20 requires a minimum subtotal of ₹500.');
      } else {
        applyCoupon(code);
      }
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10, HAPPY15 or WEEKEND20.');
    }
  };

  const handleRemoveCoupon = () => {
    applyCoupon(null);
    setCouponInput('');
    setCouponError(null);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white/5 rounded-3xl border border-white/10">
        <div className="bg-orange-500/10 p-5 rounded-full text-orange-500 mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight font-display">Your Cart is Empty</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-sm">
          Browse our delicious menu, choose pizzas, burgers, dessert brownies, or fresh coffee and add them here!
        </p>
        <button
          onClick={() => setActiveView('menu')}
          className="mt-6 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm rounded-xl transition-all cursor-pointer"
        >
          Explore Cafe Menu
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16 px-1 sm:px-0">
      {/* Items Section (Left 2 Columns) */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight font-display">
            Order Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 transition-all font-semibold hover:underline cursor-pointer"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.menuItem.id}
              className="flex items-center justify-between gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
            >
              {/* Product Thumbnail */}
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black/20">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold font-mono text-orange-500 uppercase">
                  {item.menuItem.category}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-white truncate leading-tight font-display">
                  {item.menuItem.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold mt-1">
                  ₹{item.menuItem.price} <span className="text-gray-600">each</span>
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3.5">
                {/* Quantity adjustments */}
                <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => updateCartQty(item.menuItem.id, item.quantity - 1)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center font-mono text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQty(item.menuItem.id, item.quantity + 1)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Subtotal of item */}
                <span className="font-mono text-xs font-bold text-gray-200 w-12 text-right">
                  ₹{item.menuItem.price * item.quantity}
                </span>

                {/* Trash Delete */}
                <button
                  onClick={() => deleteCartItem(item.menuItem.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <button
          onClick={() => setActiveView('menu')}
          className="text-xs text-orange-500 hover:text-orange-400 font-bold self-start mt-2 hover:translate-x-[-2px] transition-all cursor-pointer"
        >
          ← Continue adding food items
        </button>
      </div>

      {/* Summary Section (Right Column) */}
      <div className="flex flex-col gap-6">
        {/* Loyalty reward checker */}
        {rewardProgress >= 7 ? (
          <div className="bg-[#101914] border border-emerald-500/20 p-5 rounded-2xl flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 self-start uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> LOYALTY REWARD AVAILABLE
            </span>
            <h3 className="font-bold text-sm text-white font-display">Congratulations, loyalty star!</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              You completed 7 orders! Claim a <span className="text-emerald-400 font-semibold">FREE Coffee</span> or <span className="text-emerald-400 font-semibold">FREE Garlic Bread</span> (flat ₹130 discount).
            </p>
            <label className="flex items-center gap-2.5 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={useReward}
                onChange={(e) => setUseReward(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-white">Redeem my FREE treat discount</span>
            </label>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Loyalty Reward Progress:</span>
              <span className="font-bold text-orange-500">{rewardProgress} / 7 Orders</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(rewardProgress / 7) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-600 mt-1.5">
              Complete {7 - rewardProgress} more order{7 - rewardProgress > 1 ? 's' : ''} to unlock a free coffee or garlic bread.
            </p>
          </div>
        )}

        {/* Totals & Promo input panel */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col gap-5">
          <h3 className="font-bold text-white text-sm uppercase tracking-wide font-display">Order Bill Summary</h3>

          {/* Promo code form */}
          <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Promo Code (e.g. WELCOME10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl px-3 py-2 text-xs text-gray-200 outline-none uppercase font-mono"
              />
              {activeCoupon ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="px-3 py-2 bg-red-500/15 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Apply
                </button>
              )}
            </div>
            {couponError && (
              <p className="text-[10px] text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{couponError}</span>
              </p>
            )}
            {activeCoupon && (
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5" />
                <span>Coupon Applied: {activeCoupon} ({couponDiscountPercent}% discount)</span>
              </p>
            )}
          </form>

          <hr className="border-white/10" />

          {/* Pricing breakdown list */}
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Items Subtotal</span>
              <span className="font-mono font-semibold text-white">₹{subtotal}</span>
            </div>

            {couponDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span className="flex items-center gap-1">Promo Coupon ({activeCoupon})</span>
                <span className="font-mono font-semibold">- ₹{couponDiscountAmount}</span>
              </div>
            )}

            {rewardDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span className="flex items-center gap-1">Free Loyalty Reward</span>
                <span className="font-mono font-semibold">- ₹{rewardDiscountAmount}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-400">
              <span className="flex items-center gap-1">GST (18% rate)</span>
              <span className="font-mono font-semibold text-white">₹{gstAmount}</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Delivery Charge</span>
              {deliveryCharge === 0 ? (
                <span className="text-emerald-400 font-semibold uppercase text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">FREE</span>
              ) : (
                <span className="font-mono font-semibold text-white">₹{deliveryCharge}</span>
              )}
            </div>

            {deliveryCharge > 0 && (
              <p className="text-[9px] text-gray-500">
                Tip: Add ₹{500 - subtotal} more of tasty bites for FREE Delivery!
              </p>
            )}
          </div>

          <hr className="border-white/10" />

          {/* Grand total */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-white font-display">Grand Total</span>
            <span className="font-mono text-xl font-bold text-orange-500">₹{grandTotal}</span>
          </div>

          {/* Checkout CTA */}
          <button
            id="cart-checkout-btn"
            onClick={() => setActiveView('checkout')}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange-500/10"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-500 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            <span>Secure, instant order submission to bistro.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
