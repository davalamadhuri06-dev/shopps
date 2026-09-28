import React, { useState } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes?.[0];
    const defaultColor = product.availableColors?.[0]?.name;
    addToCart(product, 1, defaultSize, defaultColor);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const primaryImage = product.images[0] || '';
  const secondaryImage = product.images[1] || primaryImage;

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        {!imageError ? (
          <img
            src={isHovered && secondaryImage ? secondaryImage : primaryImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
            <span className="text-xs uppercase tracking-wider font-semibold">{product.category}</span>
            <span className="text-xs text-center font-medium mt-1">{product.name}</span>
          </div>
        )}

        {/* Subtle Editorial Tag (Top Left) */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white rounded-md shadow-xs backdrop-blur-xs">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Affordance (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xs flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-rose-600 hover:scale-110 transition-all shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay Button on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-neutral-950/90 dark:bg-white/95 text-white dark:text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-900 dark:hover:bg-white shadow-md flex items-center justify-center gap-1.5 backdrop-blur-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1">
          {/* Category & Rating Bar */}
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span className="uppercase tracking-wider font-semibold text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-neutral-950 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-950 dark:text-white tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon Button */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="sm:hidden p-2 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
