import React from 'react';
import { CheckCircle2, Package, ArrowRight, Truck, Calendar, MapPin, Printer } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastOrder, setCurrentView, showToast } = useShop();

  if (!lastOrder) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">No recent order found.</p>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="p-8 sm:p-10 text-center bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400">
                Payment & Order Confirmed
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
                Thank you for your order, {lastOrder.customer.fullName}!
              </h1>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                We've sent a detailed confirmation receipt and tracking link to{' '}
                <strong className="text-neutral-900 dark:text-white font-semibold">{lastOrder.customer.email}</strong>.
              </p>
            </div>

            {/* Quick Meta */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
              <span>Order ID: <strong className="font-bold text-neutral-950 dark:text-white">{lastOrder.id}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Date: {lastOrder.date}</span>
              <span aria-hidden="true">·</span>
              <span>Method: {lastOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Logistics & Delivery Card */}
          <div className="p-6 sm:p-8 border-t border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950/50 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-neutral-600 dark:text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-neutral-950 dark:text-white">Estimated Delivery</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{lastOrder.estimatedDelivery}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Status: Standard Processing</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-600 dark:text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-neutral-950 dark:text-white">Shipping To</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {lastOrder.customer.address}, {lastOrder.customer.city}, {lastOrder.customer.postalCode}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">Phone: {lastOrder.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Itemized Order Breakdown */}
          <div className="p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-neutral-950 dark:text-white">
              Purchased Items ({lastOrder.items.reduce((a, b) => a + b.quantity, 0)})
            </h2>

            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-800"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">{item.product.name}</p>
                      <p className="text-neutral-400 text-[11px]">
                        Qty: {item.quantity} {item.selectedSize ? `· Size ${item.selectedSize}` : ''} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold">${lastOrder.subtotal.toFixed(2)}</span>
              </div>
              {lastOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount ({lastOrder.discountCode})</span>
                  <span className="tabular-nums font-semibold">-${lastOrder.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="tabular-nums font-semibold">
                  {lastOrder.shippingFee === 0 ? 'FREE' : `$${lastOrder.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 dark:text-white pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <span>Total Paid</span>
                <span className="tabular-nums text-base">${lastOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrintReceipt}
              className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
