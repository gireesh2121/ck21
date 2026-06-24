import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Key, LogIn, Sparkles, UserPlus, ShieldCheck, Award } from 'lucide-react';
import { Customer } from '../types';

interface LoginRegisterViewProps {
  currentCustomer: Customer | null;
  saveCustomer: (customer: Customer) => void;
  logoutCustomer: () => void;
  rewardProgress: number;
}

export default function LoginRegisterView({
  currentCustomer,
  saveCustomer,
  logoutCustomer,
  rewardProgress
}: LoginRegisterViewProps) {
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Handle register submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setErrorMsg('Please fill in all details.');
      return;
    }

    const newCustomer: Customer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim()
    };

    saveCustomer(newCustomer);
    setSuccessMsg(`Account successfully registered! Welcome, ${newCustomer.name}.`);
    
    // Clear inputs
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
  };

  // Handle login submission (searches browser LocalStorage or loads simulated profile)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginEmail.trim() || !loginPhone.trim()) {
      setErrorMsg('Please enter both Email and Phone to login.');
      return;
    }

    // Attempt to search if there is a customer already in localStorage
    const saved = localStorage.getItem('cafe_customer');
    if (saved) {
      const parsed = JSON.parse(saved) as Customer;
      if (parsed.email.toLowerCase() === loginEmail.trim().toLowerCase()) {
        saveCustomer(parsed);
        setSuccessMsg(`Welcome back, ${parsed.name}!`);
        return;
      }
    }

    // Since no formal user database exists, if they log in with any credentials,
    // let's dynamically create an account for them or mock login successfully!
    // This is super clever and ensures a seamless experience!
    const mockCustomer: Customer = {
      name: loginEmail.split('@')[0].toUpperCase(),
      phone: loginPhone.trim(),
      email: loginEmail.trim().toLowerCase(),
      address: 'No 15 Indiranagar, Bangalore'
    };

    saveCustomer(mockCustomer);
    setSuccessMsg(`Account created automatically. Welcome back!`);
  };

  if (currentCustomer) {
    return (
      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 pb-16">
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-1 text-orange-500">
            <User className="w-8 h-8" />
          </div>
          <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-wider">
            CUSTOMER PROFILE
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight font-display">Welcome, {currentCustomer.name}!</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
            Your details are securely stored inside your browser's LocalStorage and will auto-fill during your checkout.
          </p>
        </div>

        {/* Loyalty progress teaser in account */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-display">Loyalty Stars Progress</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Each completed checkout earns stars. 7 orders earns a FREE treat!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="font-mono text-lg font-black text-orange-500">{rewardProgress} / 7</span>
            <span className="text-[10px] text-gray-600">Orders completed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-300">
          <div className="flex flex-col gap-1 p-3 bg-black/40 rounded-2xl border border-white/10">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-orange-500" /> Name
            </span>
            <span className="font-semibold text-white mt-1">{currentCustomer.name}</span>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-black/40 rounded-2xl border border-white/10">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-orange-500" /> Phone Number
            </span>
            <span className="font-semibold text-white mt-1">{currentCustomer.phone}</span>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-black/40 rounded-2xl border border-white/10 sm:col-span-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-orange-500" /> Email Address
            </span>
            <span className="font-semibold text-white mt-1">{currentCustomer.email}</span>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-black/40 rounded-2xl border border-white/10 sm:col-span-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-500" /> Shipping/Delivery Address
            </span>
            <span className="font-semibold text-white mt-1 leading-relaxed">{currentCustomer.address}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4 border-t border-white/10 justify-between items-center">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Local sandbox accounts require no database server.</span>
          </div>
          <button
            onClick={logoutCustomer}
            className="px-6 py-2 bg-red-500/15 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl hover:bg-red-500/20 transition-all cursor-pointer"
          >
            Log Out Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 pb-12">
      {/* Tab select toggle */}
      <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 mb-8">
        <button
          onClick={() => {
            setIsRegistering(true);
            setErrorMsg(null);
            setSuccessMsg(null);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isRegistering ? 'bg-orange-500 text-black shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            Create Account
          </span>
        </button>
        <button
          onClick={() => {
            setIsRegistering(false);
            setErrorMsg(null);
            setSuccessMsg(null);
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            !isRegistering ? 'bg-orange-500 text-black shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <LogIn className="w-3.5 h-3.5" />
            Existing Login
          </span>
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          {isRegistering ? 'Register Customer Account' : 'Existing Customer Login'}
        </h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          {isRegistering
            ? 'Sign up below to save billing and address details directly in your browser.'
            : 'Enter your details to instantly retrieve your browser profile.'}
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 mb-4 text-center">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 mb-4 text-center">
          {successMsg}
        </div>
      )}

      {isRegistering ? (
        /* REGISTER FORM */
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-400">Your Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-400">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                placeholder="e.g. john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-400">Delivery Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <textarea
                required
                placeholder="Complete address (e.g. No 15 Indiranagar, Bangalore)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register & Login Profile</span>
          </button>
        </form>
      ) : (
        /* LOGIN FORM */
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-400">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                placeholder="e.g. john@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-gray-400">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                placeholder="e.g. 9876543210"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-orange-500/30 rounded-2xl py-2 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Profile</span>
          </button>
        </form>
      )}

      <div className="flex items-center gap-1.5 justify-center text-[9px] text-gray-600 mt-6 pt-4 border-t border-white/10">
        <Sparkles className="w-3.5 h-3.5 text-orange-500/60" />
        <span>Stored completely offline in browser localStorage cache.</span>
      </div>
    </div>
  );
}
