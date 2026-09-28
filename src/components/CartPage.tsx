import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscountAmount,
    shippingFee,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setCurrentView,
    openProductDetail,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-neutral-50 dark:bg-neutral-950 min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 max-w-md w-full shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-xs text-neutral-500">
            You haven't added any products to your cart yet. Explore our latest arrivals and timeless staples.
          </p>
          <button
            onClick={() => setCurrentView('products')}
            className="w-full py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Explore All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => setCurrentView('products')}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </h1>
          </div>
        </div>

        {/* 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Items list (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs divide-y divide-neutral-100 dark:divide-neutral-800">
            
            {/* Free shipping banner */}
            <div className="p-4 bg-neutral-100/60 dark:bg-neutral-800/40 text-xs flex items-center justify-between">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-bold text-neutral-900 dark:text-white">${remainingForFreeShipping.toFixed(2)}</strong> more to qualify for Free Shipping.
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Your order qualifies for Free Standard Delivery!
                </span>
              )}
            </div>

            {/* Product Rows */}
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => openProductDetail(item.product.id)}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 cursor-pointer border border-neutral-200/60 dark:border-neutral-800"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => openProductDetail(item.product.id)}
                      className="text-sm font-semibold text-neutral-950 dark:text-white hover:text-amber-600 cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' · '}
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                    </p>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white sm:hidden">
                      ${item.product.price} each
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 p-0.5">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold tabular-nums text-neutral-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-bold text-neutral-950 dark:text-white tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                Order Summary
              </h2>

              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon (e.g. SHOPEASE15)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-800 text-white rounded-lg hover:bg-neutral-800"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                  <span className="font-medium">
                    Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent}% off)
                  </span>
                  <button onClick={removePromoCode} className="underline text-[11px] hover:text-emerald-900">
                    Remove
                  </button>
                </div>
              )}

              {/* Itemized math */}
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>

                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">
                      -${cartDiscountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 flex justify-between text-base font-bold text-neutral-950 dark:text-white">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Encrypted Checkout · 256-Bit Protection</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
