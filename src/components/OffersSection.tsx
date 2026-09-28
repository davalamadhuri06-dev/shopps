import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, ArrowRight, Percent, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PROMO_CODES } from '../data/initialData';

export const OffersSection: React.FC = () => {
  const { applyPromoCode, showToast, setCurrentView } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    applyPromoCode(code);
    showToast(`Code "${code}" copied and applied!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const dealHighlights = [
    {
      code: 'SHOPEASE15',
      discount: '15% OFF',
      title: 'Site-Wide Seasonal Warmup',
      description: 'Applicable on every catalog item including new arrivals and essentials.',
      expiry: 'Valid through Sunday',
    },
    {
      code: 'WELCOME10',
      discount: '10% OFF',
      title: 'First-Time Shopper Privilege',
      description: 'Enjoy 10% off your entire first purchase when registered with email.',
      expiry: 'Permanent active offer',
    },
    {
      code: 'FREESHIP',
      discount: 'FREE SHIP + 5%',
      title: 'Zero Delivery Threshold',
      description: 'Zero minimum order delivery fee plus extra 5% reduction at checkout.',
      expiry: 'Limited weekly run',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-neutral-100/60 dark:bg-neutral-900/60 border-t border-b border-neutral-200/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Offers & Promotions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Curated Savings for Discerning Tastes
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Click any voucher code below to instantly apply savings directly to your shopping bag.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dealHighlights.map(deal => (
            <div
              key={deal.code}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-500/60 transition-all shadow-xs relative overflow-hidden group"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-neutral-950 dark:text-white tracking-tight">
                    {deal.discount}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3" />
                    <span>{deal.expiry}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {deal.description}
                  </p>
                </div>
              </div>

              {/* Promo copy button */}
              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                <div className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 tracking-wider">
                  {deal.code}
                </div>

                <button
                  onClick={() => handleCopyCode(deal.code)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                    copiedCode === deal.code
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800'
                  }`}
                >
                  {copiedCode === deal.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy & Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-neutral-950 text-white dark:bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">Bundle More, Save 20% on Orders Over $250</h4>
            <p className="text-xs text-neutral-400">Automatic volume discount calculated in checkout with code FALL20.</p>
          </div>
          <button
            onClick={() => setCurrentView('products')}
            className="px-5 py-2.5 bg-white text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-100 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Shop The Full Range</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
