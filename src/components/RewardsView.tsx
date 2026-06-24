import React from 'react';
import { Award, CheckCircle, Sparkles, Coffee, Gift, HelpCircle, Trophy, ArrowRight } from 'lucide-react';

interface RewardsViewProps {
  rewardProgress: number;
  addMockOrderProgress: () => void;
  resetProgress: () => void;
  setActiveView: (view: string) => void;
}

export default function RewardsView({
  rewardProgress,
  addMockOrderProgress,
  resetProgress,
  setActiveView
}: RewardsViewProps) {
  const steps = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10 pb-16 px-1 sm:px-0">
      {/* Page Header */}
      <div className="text-center">
        <span className="text-orange-500 font-mono text-xs font-bold tracking-wider uppercase">LOYALTY LOUNGE</span>
        <h1 className="text-3xl font-bold text-white tracking-tight mt-1 font-display">Cafe Loyalty & Rewards Program</h1>
        <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
          No database, no complex cards, no registration required. Every completed order at Cafe Bistro is tracked locally inside your browser cache.
        </p>
      </div>

      {/* Main loyalty tracker display card */}
      <div className="bg-white/5 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col gap-8">
        {/* Decorative ambient lights */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/5 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-orange-500 font-mono font-bold uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-xl border border-orange-500/15">
              CURRENT LOYALTY BALANCE
            </span>
            <h2 className="text-2xl font-bold font-display text-white mt-3 flex items-center justify-center sm:justify-start gap-2">
              <Trophy className="w-6 h-6 text-orange-400" />
              <span>{rewardProgress} / 7 Orders Stored</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              You are only <span className="text-orange-400 font-semibold">{7 - rewardProgress} order{7 - rewardProgress > 1 ? 's' : ''}</span> away from a FREE Coffee or Garlic Bread!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={addMockOrderProgress}
              id="rewards-mock-progress-btn"
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
              title="Adds 1 count to customerOrders state for testing"
            >
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Mock 1 Completed Order</span>
            </button>
            <button
              onClick={resetProgress}
              className="px-4 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-gray-400 hover:text-red-400 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Reset Counter
            </button>
          </div>
        </div>

        {/* Dynamic visual grid checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 mt-4">
          {steps.map((step) => {
            const isCompleted = rewardProgress >= step;
            const isLastStep = step === 7;

            return (
              <div
                key={step}
                className={`relative p-4 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
                  isCompleted
                    ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                    : 'bg-black/30 border-white/10 text-gray-600'
                } ${isLastStep && isCompleted ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-lg' : ''}`}
              >
                {/* Checkmark or number indicator */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border font-mono text-xs font-bold leading-none ${
                    isCompleted
                      ? 'bg-orange-500/10 border-orange-500/40 text-orange-400'
                      : 'bg-white/5 border-white/10 text-gray-600'
                  } ${isLastStep && isCompleted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : ''}`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4 shrink-0" /> : step}
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold">Order {step}</span>
                  {isLastStep && (
                    <span className="text-[8px] font-black uppercase text-orange-500 tracking-wider mt-1 block">
                      Gift
                    </span>
                  )}
                </div>

                {isLastStep && (
                  <div className={`absolute -top-1.5 -right-1.5 p-1 rounded-full border ${
                    isCompleted ? 'bg-emerald-500 border-emerald-600 text-black' : 'bg-white/5 border-white/10 text-gray-500'
                  }`}>
                    <Gift className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Congratulations block triggered at 7 orders */}
        {rewardProgress >= 7 && (
          <div className="bg-[#101914] border border-emerald-500/20 p-6 rounded-2xl animate-bounce flex flex-col md:flex-row items-center gap-6 mt-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="font-bold text-lg text-white font-display">Congratulations, Loyalty Champion!</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                You have successfully completed 7 orders! You earned a completely <span className="text-emerald-400 font-bold">FREE hot Cappuccino Coffee</span> or <span className="text-emerald-400 font-bold">Gourmet Garlic Bread</span> worth ₹130! 
                Redeem your discount directly inside the Shopping Cart now.
              </p>
            </div>
            <button
              onClick={() => setActiveView('cart')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>Redeem in Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Explainer FAQ cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 font-display">
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span>How does this loyalty card work?</span>
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every time you complete a checkout order, we increase your local counter <strong>customerOrders</strong>. 
            Once you hit your 7th order, the cart automatically activates a flat ₹130 deduction! 
            After you check out with your free reward, your counter resets to 0, repeating the cycle.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col gap-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 font-display">
            <Coffee className="w-4 h-4 text-orange-500" />
            <span>What free items can I get?</span>
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            We provide a flat ₹130 discount which matches our premium Iced Caramel Macchiato, hot Cappuccino Coffee, Paneer Tikka Sandwiches, peri peri crispy French Fries, or Red Velvet Pastry.
          </p>
        </div>
      </section>
    </div>
  );
}
