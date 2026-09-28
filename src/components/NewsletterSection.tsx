import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing! Your 10% welcome voucher has been generated.');
  };

  return (
    <section className="py-14 sm:py-20 bg-neutral-950 text-white dark:bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-bold text-amber-400">
            Join the ShopEase Circle
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Receive 10% Off Your First Order
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Stay ahead of seasonal drops, private collector archives, and exclusive promotions. Unsubscribe at any time with one click.
          </p>
        </div>

        {/* Form */}
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email..."
                className="w-full pl-9 pr-4 py-3 text-xs rounded-xl bg-neutral-900 dark:bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-white text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>You're in! Check your inbox for voucher code <strong>WELCOME10</strong>.</span>
          </div>
        )}

        <p className="text-[11px] text-neutral-500">
          No spam, ever. We strictly safeguard your privacy under GDPR & CCPA standards.
        </p>

      </div>
    </section>
  );
};
