import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/initialData';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    sortBy,
    setSortBy
  } = useShop();

  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, sortBy]);

  const categoriesWithAll = ['All', ...CATEGORIES_LIST.map(c => c.name)];

  return (
    <div className="bg-neutral-50/60 dark:bg-neutral-950 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Search Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                The ShopEase Collection
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Department`}
              </h1>
            </div>

            {/* Sort & Filter Controls (Zone 3) */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                <label htmlFor="sort-select" className="text-neutral-500">Sort:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-neutral-900 dark:text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
            {categoriesWithAll.map(categoryName => {
              const isActive = selectedCategory === categoryName;
              return (
                <button
                  key={categoryName}
                  onClick={() => setSelectedCategory(categoryName)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {categoryName}
                </button>
              );
            })}
          </div>

          {/* Search Query / Active Filter Indicator */}
          {(searchQuery || selectedCategory !== 'All') && (
            <div className="flex items-center gap-2 pt-1 text-xs text-neutral-600 dark:text-neutral-400">
              <span>Filtering by:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}>
                    <X className="w-3 h-3 hover:text-rose-500" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 hover:text-rose-500" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-neutral-500 underline ml-2 hover:text-neutral-900 dark:hover:text-white"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              <span>Showing <strong className="text-neutral-900 dark:text-white">{filteredProducts.length}</strong> items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 space-y-4">
            <Search className="w-10 h-10 mx-auto text-neutral-400" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                No matching products found
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try adjusting your search term or category.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
