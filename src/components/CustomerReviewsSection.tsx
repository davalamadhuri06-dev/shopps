import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/initialData';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-neutral-500 dark:text-neutral-400">
            Real Customer Voices
          </p>
          <h2 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Loved by Over 14,000 Everyday Shoppers
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-neutral-900 dark:text-white">4.9 / 5.0 Global Rating</span>
            <span aria-hidden="true">·</span>
            <span>Based on verified orders</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 flex flex-col justify-between space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                  "{rev.title}"
                </h3>

                {/* Body Quote */}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">
                    {rev.author}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {rev.role}
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3 h-3" />
                    Verified Buyer
                  </span>
                  <p className="text-[10px] text-neutral-400 max-w-[120px] truncate">
                    {rev.productName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
