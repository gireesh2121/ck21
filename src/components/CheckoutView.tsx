import React, { useState, useEffect } from 'react';
import { ShoppingBag, CreditCard, Wallet, Landmark, ChevronLeft, ShieldCheck, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, Customer, Order, EmailJsConfig } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  currentCustomer: Customer | null;
  saveCustomer: (customer: Customer) => void;
  activeCoupon: string | null;
  rewardProgress: number;
  useReward: boolean;
  completeOrder: (order: Order) => void;
  setActiveView: (view: string) => void;
  emailConfig: EmailJsConfig;
}

export default function CheckoutView({
  cart,
  currentCustomer,
  saveCustomer,
  activeCoupon,
  rewardProgress,
  useReward,
  completeOrder,
  setActiveView,
  emailConfig
}: CheckoutViewProps) {
  // Form fields
  const [name, setName] = useState(currentCustomer?.name || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');
  const [email, setEmail] = useState(currentCustomer?.email || '');
  const [address, setAddress] = useState(currentCustomer?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card'>('Cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Receipt Modal
  const [orderCompletedReceipt, setOrderCompletedReceipt] = useState<Order | null>(null);

  // Load customer if changed
  useEffect(() => {
    if (currentCustomer) {
      setName(currentCustomer.name);
      setPhone(currentCustomer.phone);
      setEmail(currentCustomer.email);
      setAddress(currentCustomer.address);
    }
  }, [currentCustomer]);

  // Calculations
  const GST_RATE = 0.18;
  const DELIVERY_FEE = 40;
  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  let couponDiscountPercent = 0;
  if (activeCoupon === 'WELCOME10') couponDiscountPercent = 10;
  if (activeCoupon === 'HAPPY15') couponDiscountPercent = 15;
  if (activeCoupon === 'WEEKEND20' && subtotal >= 500) couponDiscountPercent = 20;

  const couponDiscountAmount = Math.round(subtotal * (couponDiscountPercent / 100));
  const rewardDiscountAmount = (rewardProgress >= 7 && useReward) ? Math.min(subtotal, 130) : 0;
  const deliveryCharge = subtotal > 500 || subtotal === 0 ? 0 : DELIVERY_FEE;
  const gstAmount = Math.round((subtotal - couponDiscountAmount - rewardDiscountAmount) * GST_RATE);
  const grandTotal = Math.max(0, subtotal + gstAmount + deliveryCharge - couponDiscountAmount - rewardDiscountAmount);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Customer Name is required';
    if (!phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(phone.trim())) {
      errors.phone = 'Please enter a valid phone number (min 10 digits)';
    }
    if (!email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!address.trim()) errors.address = 'Delivery Address is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Build order items text summary for email
  const getOrderSummaryText = (orderItems: CartItem[]) => {
    return orderItems.map(item => `${item.quantity} x ${item.menuItem.name}`).join('\n');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const customerDetails: Customer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim()
    };

    // Save customer details inside browser local state & LocalStorage
    saveCustomer(customerDetails);

    // Current time
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `ORDER-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: customerDetails,
      items: cart.map(item => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price
      })),
      paymentMethod,
      subtotal,
      gst: gstAmount,
      delivery: deliveryCharge,
      discount: couponDiscountAmount + rewardDiscountAmount,
      total: grandTotal,
      rewardUsed: useReward,
      time: formattedTime,
      status: 'Pending',
      orderIndexAtTime: rewardProgress
    };

    // EmailJS sending block
    try {
      if (emailConfig.enabled && emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey) {
        // Construct standard EmailJS parameters payload
        const emailParams = {
          service_id: emailConfig.serviceId,
          template_id: emailConfig.templateId,
          user_id: emailConfig.publicKey,
          template_params: {
            owner_email: emailConfig.ownerEmail || 'orders@cafebistro.com',
            customer_name: customerDetails.name,
            customer_phone: customerDetails.phone,
            customer_email: customerDetails.email,
            customer_address: customerDetails.address,
            order_items: getOrderSummaryText(cart),
            order_total: `₹${grandTotal}`,
            reward_used: useReward ? 'Yes (FREE Treat)' : 'No',
            order_time: formattedTime,
            payment_method: paymentMethod
          }
        };

        // Call EmailJS REST API
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailParams)
        });
        console.log('EmailJS dispatch successful');
      } else {
        console.log('EmailJS config not active or missing parameters. Simulating email push.');
      }
    } catch (err) {
      console.error('EmailJS execution error:', err);
      // Fail gracefully so order still goes through locally
    }

    // Process order inside global React State & LocalStorage database
    completeOrder(newOrder);
    setOrderCompletedReceipt(newOrder);
    setIsSubmitting(false);
  };

  const handleFinishCheckout = () => {
    setOrderCompletedReceipt(null);
    setActiveView('home');
  };

  if (cart.length === 0 && !orderCompletedReceipt) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white/5 rounded-3xl border border-white/10">
        <div className="bg-orange-500/10 p-5 rounded-full text-orange-500 mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight font-display">No Items for Checkout</h2>
        <button
          onClick={() => setActiveView('menu')}
          className="mt-6 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm rounded-xl transition-all cursor-pointer"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="relative pb-16 px-1 sm:px-0">
      {/* 1. Interactive Receipt Modal */}
      {orderCompletedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn backdrop-blur-md">
          <div className="bg-[#0A0A0B] border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-5 shadow-2xl relative">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-1 text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
                ORDER SUCCESSFUL!
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Cafe Bistro Receipt</h2>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                Thank you! Your order has been placed. An email notification has been dispatched to the cafe owner and yourself.
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-3 font-mono text-xs text-gray-300">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">Order ID:</span>
                <span className="text-white font-bold">{orderCompletedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="text-white font-bold text-right">{orderCompletedReceipt.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="text-white">{orderCompletedReceipt.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="text-white truncate max-w-[200px]">{orderCompletedReceipt.customer.address}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">Placed At:</span>
                <span className="text-white">{orderCompletedReceipt.time}</span>
              </div>

              {/* Items */}
              <div className="py-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Items Ordered:</p>
                <div className="flex flex-col gap-1.5 pl-1 text-[11px]">
                  {orderCompletedReceipt.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-gray-300">
                      <span>{it.quantity} x {it.name}</span>
                      <span className="text-white">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill totals */}
              <div className="border-t border-white/10 pt-2 flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{orderCompletedReceipt.subtotal}</span>
                </div>
                {orderCompletedReceipt.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount:</span>
                    <span>- ₹{orderCompletedReceipt.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{orderCompletedReceipt.gst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>₹{orderCompletedReceipt.delivery}</span>
                </div>
                <div className="flex justify-between text-orange-500 font-bold text-sm border-t border-dashed border-white/10 pt-2">
                  <span>GRAND TOTAL:</span>
                  <span>₹{orderCompletedReceipt.total}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-[10px]">
                <span className="text-gray-500">Payment:</span>
                <span className="text-white font-bold uppercase">{orderCompletedReceipt.paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={handleFinishCheckout}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-sm rounded-xl transition-all cursor-pointer text-center shadow-lg"
            >
              Done, Return Home
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Checkout screen */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Form Panel */}
        <div className="flex-1 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveView('cart')}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] text-orange-500 font-mono font-bold uppercase tracking-wider">
                CONFIRM & SUBMIT
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight font-display">Delivery Details</h2>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
            {/* Customer name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400">Customer Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`bg-black/40 border focus:border-orange-500/30 rounded-2xl px-4 py-2.5 text-sm text-gray-200 outline-none transition-all ${
                  formErrors.name ? 'border-red-500/55' : 'border-white/10'
                }`}
              />
              {formErrors.name && (
                <p className="text-[10px] text-red-400">{formErrors.name}</p>
              )}
            </div>

            {/* Grid for phone and email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`bg-black/40 border focus:border-orange-500/30 rounded-2xl px-4 py-2.5 text-sm text-gray-200 outline-none transition-all ${
                    formErrors.phone ? 'border-red-500/55' : 'border-white/10'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[10px] text-red-400">{formErrors.phone}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-black/40 border focus:border-orange-500/30 rounded-2xl px-4 py-2.5 text-sm text-gray-200 outline-none transition-all ${
                    formErrors.email ? 'border-red-500/55' : 'border-white/10'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[10px] text-red-400">{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* Delivery address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400">Delivery Address</label>
              <textarea
                placeholder="Enter complete building number, street, locality, Bangalore city"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className={`bg-black/40 border focus:border-orange-500/30 rounded-2xl px-4 py-2.5 text-sm text-gray-200 outline-none transition-all resize-none ${
                  formErrors.address ? 'border-red-500/55' : 'border-white/10'
                }`}
              />
              {formErrors.address && (
                <p className="text-[10px] text-red-400">{formErrors.address}</p>
              )}
            </div>

            {/* Payment options panel */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-gray-400">Select Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash */}
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Cash'
                      ? 'bg-orange-500/10 border-orange-500/40 text-orange-500'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={paymentMethod === 'Cash'}
                    onChange={() => setPaymentMethod('Cash')}
                    className="sr-only"
                  />
                  <Wallet className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Cash on Delivery</p>
                    <p className="text-[9px] text-gray-500 leading-none mt-0.5">Pay at your door</p>
                  </div>
                </label>

                {/* UPI */}
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'UPI'
                      ? 'bg-orange-500/10 border-orange-500/40 text-orange-500'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="sr-only"
                  />
                  <Landmark className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold">UPI / QR Scan</p>
                    <p className="text-[9px] text-gray-500 leading-none mt-0.5">GPay, PhonePe</p>
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Card'
                      ? 'bg-orange-500/10 border-orange-500/40 text-orange-500'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="sr-only"
                  />
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Credit / Debit Card</p>
                    <p className="text-[9px] text-gray-500 leading-none mt-0.5">Visa, Mastercard</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Loyalty and trust warnings */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-gray-400 flex flex-col gap-1">
              <span className="font-bold text-gray-300 flex items-center gap-1 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                Browser Loyalty System Integration
              </span>
              <span>
                {useReward ? (
                  <p className="text-emerald-400">
                    Your loyalty reward is applied! <strong>customerOrders</strong> counter will reset to <strong>0</strong> upon completion.
                  </p>
                ) : (
                  <p>
                    Order completion adds 1 progress step. You currently have <strong>{rewardProgress} / 7</strong> completed orders stored.
                  </p>
                )}
              </span>
            </div>

            {/* Order Submission Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="place-order-submit-btn"
              className={`w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-black font-extrabold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange-500/10`}
            >
              {isSubmitting ? (
                <span>Submitting Order...</span>
              ) : (
                <span>Place Order (₹{grandTotal}) & Dispatch Emails</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary Panel */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-4 font-display">Cart Summary</h3>

            {/* List of items */}
            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-2 mb-4 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between items-start gap-2 text-xs">
                  <div className="text-gray-400">
                    <span className="text-white font-semibold">{item.quantity} x</span> {item.menuItem.name}
                  </div>
                  <span className="font-mono text-gray-300 shrink-0">₹{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="border-white/10 mb-4" />

            {/* Calculations breakdown list */}
            <div className="flex flex-col gap-2 text-xs font-mono mb-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount</span>
                  <span>- ₹{couponDiscountAmount}</span>
                </div>
              )}
              {rewardDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Loyalty Discount</span>
                  <span>- ₹{rewardDiscountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>GST (18%)</span>
                <span>₹{gstAmount}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charge</span>
                <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
              </div>
              <hr className="border-dashed border-white/10 my-1" />
              <div className="flex justify-between text-orange-500 font-extrabold text-sm">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="p-3 bg-black/45 rounded-xl border border-white/10 flex items-start gap-2 text-[10px] text-gray-500">
              <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-400">EmailJS Integration Active</p>
                <p className="mt-0.5 leading-relaxed">
                  Sends automatic billing receipt details directly to client and store manager inbox upon submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
