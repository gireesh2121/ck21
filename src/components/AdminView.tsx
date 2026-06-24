import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, Coins, ListFilter, RotateCcw, TrendingUp, Sparkles, Check, Trash2, Mail, MailCheck, AlertCircle, MessageSquare } from 'lucide-react';
import { Order, EmailJsConfig } from '../types';

interface AdminViewProps {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: 'Pending' | 'Completed') => void;
  deleteOrder: (orderId: string) => void;
  resetAllData: () => void;
  emailConfig: EmailJsConfig;
  saveEmailConfig: (config: EmailJsConfig) => void;
  rewardProgress: number;
}

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  message: string;
  time: string;
}

export default function AdminView({
  orders,
  updateOrderStatus,
  deleteOrder,
  resetAllData,
  emailConfig,
  saveEmailConfig,
  rewardProgress
}: AdminViewProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Email Config Form states
  const [serviceId, setServiceId] = useState(emailConfig.serviceId);
  const [templateId, setTemplateId] = useState(emailConfig.templateId);
  const [publicKey, setPublicKey] = useState(emailConfig.publicKey);
  const [ownerEmail, setOwnerEmail] = useState(emailConfig.ownerEmail);
  const [enabled, setEnabled] = useState(emailConfig.enabled);
  const [configSuccess, setConfigSuccess] = useState(false);

  // Tab control in Admin: 'orders' or 'emailjs' or 'feedback'
  const [activeTab, setActiveTab] = useState<'orders' | 'emailjs' | 'feedback'>('orders');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Cafe@123') {
      setIsAuthenticated(true);
      setErrorMsg(null);
    } else {
      setErrorMsg('Incorrect password. Try Cafe@123');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveEmailConfig({
      serviceId: serviceId.trim(),
      templateId: templateId.trim(),
      publicKey: publicKey.trim(),
      ownerEmail: ownerEmail.trim(),
      enabled
    });
    setConfigSuccess(true);
    setTimeout(() => setConfigSuccess(false), 3000);
  };

  // Load Feedbacks from localStorage
  const getFeedbacks = (): FeedbackItem[] => {
    const saved = localStorage.getItem('cafe_feedbacks');
    return saved ? JSON.parse(saved) : [];
  };

  const clearFeedbacks = () => {
    localStorage.removeItem('cafe_feedbacks');
    // force re-render by doing a dummy update if needed, but simple reload or local clear works
  };

  // Calculations for stats
  const todayOrdersCount = orders.length;
  const todayRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  
  // Reward customers logic: active reward progress is at 7 (or they have completed multiple sets of 7 orders)
  const loyaltyMembersCount = rewardProgress >= 7 ? 1 : 0; 

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 pb-16 mt-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-1 text-orange-500">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-wider">
            RESTRICTED ENTRY
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight font-display">Admin Authentication</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
            Enter the authorized password to access Cafe Bistro statistics, order queue list, and EmailJS sender configuration.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-gray-400">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                placeholder="Enter admin password (e.g. Cafe@123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <Unlock className="w-4 h-4" />
            <span>Authenticate Admin Panel</span>
          </button>
        </form>

        <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-600 mt-6 pt-4 border-t border-white/10">
          <ShieldAlert className="w-4 h-4 text-orange-500/60" />
          <span>Note: Standard access token is <strong>Cafe@123</strong>.</span>
        </div>
      </div>
    );
  }

  const feedbacksList = getFeedbacks();

  return (
    <div className="flex flex-col gap-8 pb-16 px-1 sm:px-0 animate-fadeIn font-sans">
      {/* Page Header with Tab Selectors */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-orange-500 font-mono text-xs font-bold tracking-wider uppercase">
            SECURED DASHBOARD
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight mt-1 font-display">Cafe Bistro Management</h1>
        </div>

        {/* Action Toggle buttons */}
        <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 w-full md:w-auto self-stretch md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-orange-500 text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Orders Queue
          </button>
          <button
            onClick={() => setActiveTab('emailjs')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'emailjs' ? 'bg-orange-500 text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            EmailJS setup
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'feedback' ? 'bg-orange-500 text-black shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Feedbacks ({feedbacksList.length})
          </button>
        </div>
      </div>

      {/* 1. Core Analytics Counters */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Today's Orders</span>
          <h2 className="text-3xl font-black text-white font-display">{todayOrdersCount}</h2>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 leading-none mt-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5" /> +100% since start
          </span>
        </div>

        {/* Revenue */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Today's Revenue</span>
          <h2 className="text-3xl font-black text-orange-500 font-display">₹{todayRevenue}</h2>
          <span className="text-[10px] text-gray-500 leading-none mt-1">Calculated in real-time</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Pending Orders</span>
          <h2 className={`text-3xl font-black font-display ${pendingOrdersCount > 0 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {pendingOrdersCount}
          </h2>
          <span className="text-[10px] text-gray-500 leading-none mt-1">Awaiting dispatch</span>
        </div>

        {/* Reward Customers */}
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Reward Customers</span>
          <h2 className="text-3xl font-black text-emerald-400 font-display">{loyaltyMembersCount}</h2>
          <span className="text-[10px] text-gray-500 leading-none mt-1">With 7 orders active</span>
        </div>
      </section>

      {/* 2. Tab Contents */}

      {/* TAB A: Orders Queue */}
      {activeTab === 'orders' && (
        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-base font-display">Active Customer Orders Queue</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage order statuses and toggle Completion flags.
              </p>
            </div>
            <button
              onClick={resetAllData}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear/Reset Storage Database</span>
            </button>
          </div>

          {orders.length > 0 ? (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-2">Order ID</th>
                    <th className="py-3 px-2">Customer Details</th>
                    <th className="py-3 px-2">Items Detail</th>
                    <th className="py-3 px-2">Bill Total</th>
                    <th className="py-3 px-2">Loyalty Progress At Placement</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-all">
                      <td className="py-4 px-2 font-mono font-bold text-white">
                        {order.id}
                        <p className="text-[10px] text-gray-500 font-normal mt-0.5">{order.time}</p>
                      </td>
                      <td className="py-4 px-2">
                        <p className="font-bold text-white">{order.customer.name}</p>
                        <p className="text-gray-500 text-[11px]">{order.customer.phone}</p>
                        <p className="text-[10px] text-gray-600 truncate max-w-[150px]">{order.customer.address}</p>
                      </td>
                      <td className="py-4 px-2 max-w-[180px]">
                        <ul className="flex flex-col gap-0.5 text-xs text-gray-400 font-mono">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="truncate">
                              <span className="text-orange-500 font-semibold">{item.quantity} x</span> {item.name}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-mono font-bold text-orange-500">₹{order.total}</span>
                        <p className="text-[10px] text-gray-500 mt-0.5 uppercase">{order.paymentMethod}</p>
                        {order.rewardUsed && (
                          <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded uppercase mt-1 inline-block">
                            Reward Used
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-2 font-mono text-gray-500">
                        {order.orderIndexAtTime} / 7
                      </td>
                      <td className="py-4 px-2">
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              order.status === 'Pending' ? 'Completed' : 'Pending'
                            )
                          }
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                            order.status === 'Completed'
                              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                              : 'bg-red-500/15 border border-red-500/30 text-red-400 animate-pulse'
                          }`}
                        >
                          {order.status}
                        </button>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer inline-block"
                          title="Delete Order Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
              <ListFilter className="w-8 h-8 text-gray-600" />
              <p className="text-gray-500 text-sm">No orders recorded in this session yet.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB B: EmailJS Configuration setup */}
      {activeTab === 'emailjs' && (
        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div>
            <span className="text-orange-500 font-mono text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/30">
              EMAIL AUTOMATION
            </span>
            <h3 className="font-bold text-white text-base mt-3 font-display">EmailJS Integration Panel</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Connect your real EmailJS keys to trigger actual email receipts to the Bistro owner and the customer upon successful checkout! Use templates matching the variables specified in checkout.
            </p>
          </div>

          {configSuccess && (
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-2">
              <MailCheck className="w-4 h-4 animate-bounce" />
              <span>EmailJS configuration values updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveConfig} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-gray-300">
            {/* Service ID */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-400">EmailJS Service ID</label>
              <input
                type="text"
                placeholder="e.g. service_xxxx"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none transition-all font-mono"
              />
            </div>

            {/* Template ID */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-400">EmailJS Template ID</label>
              <input
                type="text"
                placeholder="e.g. template_xxxx"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none transition-all font-mono"
              />
            </div>

            {/* Public Key */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-400">EmailJS Public Key / User ID</label>
              <input
                type="text"
                placeholder="e.g. xxxx_xxxx_xxxx"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none transition-all font-mono"
              />
            </div>

            {/* Owner email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-400">Cafe Owner Email (Receives Orders)</label>
              <input
                type="email"
                placeholder="e.g. manager@cafebistro.com"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none transition-all"
              />
            </div>

            {/* Enable checkbox */}
            <div className="md:col-span-2 p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-white font-display">Enable Email Sending</p>
                <p className="text-[10px] text-gray-500">Toggle on to run real fetch send requests instead of mock simulation.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save EmailJS Service Configuration</span>
              </button>
            </div>
          </form>

          {/* Setup tips panel */}
          <div className="p-4 bg-orange-500/5 rounded-3xl border border-orange-500/10 flex items-start gap-3 mt-4 text-xs">
            <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-orange-400 font-display">Variables expected inside EmailJS Template:</p>
              <ul className="list-disc list-inside mt-2 text-gray-400 flex flex-col gap-1 text-[11px] font-mono">
                <li>{"{{customer_name}}"}</li>
                <li>{"{{customer_phone}}"}</li>
                <li>{"{{customer_email}}"}</li>
                <li>{"{{customer_address}}"}</li>
                <li>{"{{order_items}}"}</li>
                <li>{"{{order_total}}"}</li>
                <li>{"{{payment_method}}"}</li>
                <li>{"{{order_time}}"}</li>
                <li>{"{{reward_used}}"}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB C: Customer Feedback panel */}
      {activeTab === 'feedback' && (
        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-base font-display">Customer Feedback Submissions</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Review ratings, comments, and inquiries submitted by your cafe audience.
              </p>
            </div>
            {feedbacksList.length > 0 && (
              <button
                onClick={clearFeedbacks}
                className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Clear Feedbacks List
              </button>
            )}
          </div>

          {feedbacksList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-gray-300">
              {feedbacksList.map((fb) => (
                <div
                  key={fb.id}
                  className="bg-black/40 p-5 rounded-2xl border border-white/10 flex flex-col justify-between gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm font-display">{fb.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{fb.time}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{fb.email}</span>
                    <p className="text-xs text-gray-400 mt-1 italic leading-relaxed">
                      "{fb.message}"
                    </p>
                  </div>
                  <div className="flex gap-2 self-end">
                    <a
                      href={`mailto:${fb.email}?subject=RE:%20Cafe%20Bistro%20Feedback`}
                      className="text-[10px] text-orange-500 hover:text-orange-400 flex items-center gap-1 font-semibold transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
              <MessageSquare className="w-8 h-8 text-gray-600" />
              <p className="text-gray-500 text-sm">No feedback messages received yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
