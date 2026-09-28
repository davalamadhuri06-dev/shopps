import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
    openProductDetail
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 shadow-2xl flex flex-col border-l border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900 dark:text-white" />
              <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-neutral-50 dark:bg-neutral-950 px-5 py-3 border-b border-neutral-200/80 dark:border-neutral-800 text-xs">
              {remainingForFreeShipping > 0 ? (
                <p className="text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Add <strong className="text-neutral-950 dark:text-white font-bold">${remainingForFreeShipping.toFixed(2)}</strong> more for <span className="text-emerald-600 font-semibold">Free Express Shipping</span>
                </p>
              ) : (
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  You've unlocked Free Express Shipping!
                </p>
              )}
              <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Explore our curated collections of fashion, tech, and lifestyle essentials.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('products');
                  }}
                  className="mt-2 px-5 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                  className="flex gap-3.5 pb-4 border-b border-neutral-100 dark:border-neutral-800"
                >
                  {/* Item Image */}
                  <div
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      openProductDetail(item.product.id);
                    }}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 cursor-pointer border border-neutral-200/60 dark:border-neutral-800"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            openProductDetail(item.product.id);
                          }}
                          className="text-xs font-semibold text-neutral-950 dark:text-white hover:text-amber-600 line-clamp-1 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                        {item.selectedSize && item.selectedColor ? ' · ' : ''}
                        {item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                      </p>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums text-neutral-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-neutral-950 dark:text-white tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon (e.g. SHOPEASE15)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-800 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                  <span className="font-medium">
                    Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent}% off)
                  </span>
                  <button onClick={removePromoCode} className="underline text-[11px] hover:text-emerald-900">
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
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

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-2 flex justify-between text-sm font-bold text-neutral-950 dark:text-white">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-base">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
