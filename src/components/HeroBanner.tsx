import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { heroImage } from '../data/initialData';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  return (
    <section className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase">
                <span>Autumn / Winter 2026 Collection</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-600 dark:text-amber-400">Curated Release</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1] text-balance">
                Shop the Latest <span className="italic font-serif font-normal">Trends</span> with Everyday Ease.
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
                Discover refined essentials designed for everyday living. From tactile European linen tailoring to studio-grade acoustics and handcrafted leather goods.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentView('products');
                }}
                className="px-6 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all flex items-center gap-2 group shadow-sm"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentView('offers')}
                className="px-6 py-3.5 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Special Offers</span>
              </button>
            </div>

            {/* Micro Trust Points (Unboxed metadata with typographic dots) */}
            <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium text-neutral-800 dark:text-neutral-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Verified Authentic
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 font-medium text-neutral-800 dark:text-neutral-200">
                <Truck className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                Fast Tracked Delivery
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 font-medium text-neutral-800 dark:text-neutral-200">
                <RefreshCw className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                30-Day Easy Returns
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-2xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-800 group">
              <img
                src={heroImage}
                alt="ShopEase curated collection preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">Spotlight Showcase</p>
                  <p className="text-base sm:text-lg font-semibold drop-shadow-sm">Minimalist Craft & Architecture</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('Fashion');
                    setCurrentView('products');
                  }}
                  className="px-3.5 py-1.5 bg-white/90 backdrop-blur text-neutral-900 text-xs font-semibold rounded-lg hover:bg-white transition-colors"
                >
                  Explore Fashion
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
