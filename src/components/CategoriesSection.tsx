import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/initialData';

export const CategoriesSection: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useShop();

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
              Browse Curated Departments
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('categories');
            }}
            className="text-xs font-semibold text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Departments</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES_LIST.map(category => (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category.name)}
              className="group text-left flex flex-col rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all p-3 hover:-translate-y-1 shadow-xs"
            >
              {/* Category Image */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to neutral pattern if remote image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Title & Count */}
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-neutral-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>{category.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {category.itemCount} Items
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
