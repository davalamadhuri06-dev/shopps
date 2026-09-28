import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronLeft, 
  Check, 
  Share2,
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    setCurrentView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    showToast,
    setIsCartDrawerOpen
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes ? product.availableSizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors ? product.availableColors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">Product not found.</p>
        <button
          onClick={() => setCurrentView('products')}
          className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  // Related products from the same category or general featured
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('products')}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <button
            onClick={handleShare}
            aria-label="Share product"
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Product PDP Layout: Left Gallery / Right Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left: Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Frame */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {product.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 text-xs font-semibold bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white rounded-md shadow-xs backdrop-blur-xs">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-neutral-950 dark:border-white ring-2 ring-neutral-950/10'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase Module (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Category & Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500 dark:text-neutral-400">
                    {product.category} · SKU: {product.sku}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300 dark:text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold tabular-nums">{product.rating}</span>
                    <span className="text-neutral-400">({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price & Stock Status */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-neutral-950 dark:text-white tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-neutral-400 line-through tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 rounded-md">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock ({product.stockCount} left)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.availableColors && product.availableColors.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-900 dark:text-white">Color:</span>
                    <span className="text-neutral-500 dark:text-neutral-400">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.availableColors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          selectedColor === color.name
                            ? 'ring-2 ring-neutral-950 dark:ring-white ring-offset-2 dark:ring-offset-neutral-950 scale-105'
                            : 'opacity-80 hover:opacity-100'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full border border-neutral-300 dark:border-neutral-700"
                          style={{ backgroundColor: color.hex }}
                        />
                        {selectedColor === color.name && (
                          <Check className={`w-3.5 h-3.5 absolute ${['#FFFFFF', '#FAF9F6', '#F3F4F6'].includes(color.hex) ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-900 dark:text-white">Select Size / Fit:</span>
                    <span className="text-neutral-500 underline cursor-pointer hover:text-neutral-800">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSize === size
                            ? 'border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-950'
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Buy Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-900 p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-neutral-900 dark:text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
                      disabled={quantity >= product.stockCount}
                      className="w-8 h-8 flex items-center justify-center text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist toggle"
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-rose-600 hover:border-rose-300 dark:hover:border-rose-900 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Buy Now (Direct to Checkout) */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-5 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-neutral-950" />
                  <span>Buy Now with 1-Click Checkout</span>
                </button>
              </div>

              {/* Craftsmanship Features list */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                  Key Specifications
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery & Security Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  <span>Fast Delivery</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  <span>30-Day Returns</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  <span>2-Yr Warranty</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                You May Also Like
              </p>
              <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
                Related in {product.category}
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('products')}
              className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fallbackRelated.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
