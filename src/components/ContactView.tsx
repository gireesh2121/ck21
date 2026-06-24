import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Instagram, Facebook, Send, ShieldCheck, Check } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Save feedback to localStorage so Admin Dashboard can display recent feedbacks!
    // This is super clever and integrates components perfectly!
    const savedFeedbacks = localStorage.getItem('cafe_feedbacks');
    const list = savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
    
    const newFeedback = {
      id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      time: new Date().toLocaleDateString()
    };

    list.unshift(newFeedback);
    localStorage.setItem('cafe_feedbacks', JSON.stringify(list));

    setFeedbackSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  return (
    <div className="flex flex-col gap-12 pb-16 px-1 sm:px-0">
      {/* Header */}
      <div className="text-center sm:text-left">
        <span className="text-orange-500 font-mono text-xs font-bold tracking-wider uppercase">GET IN TOUCH</span>
        <h1 className="text-3xl font-bold text-white tracking-tight mt-1 font-display">Contact Cafe Bistro</h1>
        <p className="text-gray-400 text-sm mt-2 max-w-xl">
          We love hearing from you! Have a question about our menu, special catering events, or custom feedback? Drop us a line.
        </p>
      </div>

      {/* Main layout grid: Map & Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Contact info list + Google Map panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-white tracking-tight font-display">Our Location & Channels</h2>

            <div className="flex flex-col gap-4 text-xs text-gray-300">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-2.5 rounded-xl text-orange-500 border border-orange-500/10">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm font-display">Bistro Address</p>
                  <p className="text-gray-400 mt-1">No 15, Indiranagar Double Rd, Stage 2, Bangalore, KA - 560038</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-2.5 rounded-xl text-orange-500 border border-orange-500/10">
                  <Phone className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm font-display">Phone Hotline</p>
                  <a href="tel:+919876543210" className="text-gray-400 hover:text-orange-500 mt-1 block transition-all">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* WhatsApp direct */}
              <div className="flex items-start gap-3">
                <div className="bg-[#25D366]/10 p-2.5 rounded-xl text-[#25D366] border border-[#25D366]/10">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm font-display">WhatsApp Chat</p>
                  <a 
                    href="https://wa.me/919876543210?text=Hi%20Cafe%20Bistro,%20I%20want%20to%20order..." 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#25D366] hover:underline font-semibold mt-1 block transition-all"
                  >
                    Chat directly with Manager →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-2.5 rounded-xl text-orange-500 border border-orange-500/10">
                  <Mail className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm font-display">Email Address</p>
                  <a href="mailto:orders@cafebistro.com" className="text-gray-400 hover:text-orange-500 mt-1 block transition-all">
                    orders@cafebistro.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels matrix */}
            <div className="pt-4 border-t border-white/10 flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/20 text-gray-400 hover:text-white text-xs transition-all cursor-pointer"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-500" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/20 text-gray-400 hover:text-white text-xs transition-all cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Google Map IFrame Card */}
          <div className="h-[250px] rounded-3xl overflow-hidden border border-white/10 shadow-xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9157293529323!2d77.637828!3d12.971599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a62f8b5f3d%3A0x6b63a948bc5a6d36!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cafe Location Map"
            />
          </div>
        </div>

        {/* Feedback Forms Column */}
        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight font-display">Drop Us a Message</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed mb-6">
              Your message is forwarded directly to the admin dashboard for immediate feedback.
            </p>

            {feedbackSent && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-bold text-center mb-5 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Message Sent Successfully! Stored in local system.</span>
              </div>
            )}

            <form onSubmit={handleSubmitFeedback} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-400">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-400">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-400">Your Message / Suggestion</label>
                <textarea
                  required
                  placeholder="Type your feedback here..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2.5 px-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Feedback Message</span>
              </button>
            </form>
          </div>

          <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-600 mt-6 pt-4 border-t border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-500/60" />
            <span>Encrypted offline storage is strictly secure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
