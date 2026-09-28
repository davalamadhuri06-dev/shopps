import React, { useState } from 'react';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  DollarSign, 
  Smartphone,
  Lock,
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderCustomer } from '../types/ecommerce';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscountAmount,
    shippingFee,
    cartTotal,
    appliedPromo,
    placeOrder,
    setCurrentView,
    user
  } = useShop();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'Credit / Debit Card' | 'UPI / Digital Wallet' | 'Cash on Delivery'>('Credit / Debit Card');

  // Card details state for simulation
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '888',
    cardName: user?.name || 'Elena Rostova',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center bg-white dark:bg-neutral-950 min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-sm text-neutral-500 mb-4">Please add products before checking out.</p>
        <button
          onClick={() => setCurrentView('products')}
          className="px-5 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-lg"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Delivery address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    // Simulate brief payment processing transition
    setTimeout(async () => {
      await placeOrder(formData, paymentMethod);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => setCurrentView('cart')}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Checkout & Order Review
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Complete your order details with instant confirmation and fast delivery dispatch.
          </p>
        </div>

        {/* Checkout Form & Order Summary */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Customer details & Payment (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Delivery Address */}
            <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                  Customer & Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    placeholder="e.g. Elena Rostova"
                  />
                  {formErrors.fullName && <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    placeholder="elena@example.com"
                  />
                  {formErrors.email && <p className="text-[11px] text-rose-500 mt-1">{formErrors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Phone Number (for Courier SMS updates) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    placeholder="+1 (555) 000-0000"
                  />
                  {formErrors.phone && <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    placeholder="Apartment, suite, building, street"
                  />
                  {formErrors.address && <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                  {formErrors.city && <p className="text-[11px] text-rose-500 mt-1">{formErrors.city}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                    />
                    {formErrors.postalCode && <p className="text-[11px] text-rose-500 mt-1">{formErrors.postalCode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                  Payment Method
                </h2>
              </div>

              {/* Payment Selectors */}
              <div className="space-y-3">
                {/* Credit / Debit Card */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Credit / Debit Card'
                    ? 'border-neutral-950 dark:border-white bg-neutral-50/50 dark:bg-neutral-800/40 ring-1 ring-neutral-950 dark:ring-white'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Credit / Debit Card'}
                    onChange={() => setPaymentMethod('Credit / Debit Card')}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-950 dark:text-white flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                        Credit or Debit Card
                      </span>
                      <span className="text-[11px] text-neutral-400">Visa, Mastercard, Amex</span>
                    </div>

                    {paymentMethod === 'Credit / Debit Card' && (
                      <div className="pt-2 space-y-3">
                        <div>
                          <input
                            type="text"
                            value={cardInfo.cardNumber}
                            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                            placeholder="Card Number"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                          />
                          <input
                            type="text"
                            value={cardInfo.cvc}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                            placeholder="CVC"
                            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* UPI / Digital Wallet */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'UPI / Digital Wallet'
                    ? 'border-neutral-950 dark:border-white bg-neutral-50/50 dark:bg-neutral-800/40 ring-1 ring-neutral-950 dark:ring-white'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'UPI / Digital Wallet'}
                    onChange={() => setPaymentMethod('UPI / Digital Wallet')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-neutral-950 dark:text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                      UPI / Instant Digital Wallet
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Pay instantly with Apple Pay, Google Pay, PhonePe, or UPI ID.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery (COD) */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-neutral-950 dark:border-white bg-neutral-50/50 dark:bg-neutral-800/40 ring-1 ring-neutral-950 dark:ring-white'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-neutral-950 dark:text-white flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                      Cash on Delivery (COD)
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Pay with cash or card upon delivery to your doorstep.
                    </p>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-neutral-950 dark:text-white flex items-center justify-between">
                <span>Items in Order</span>
                <span className="text-xs font-normal text-neutral-500">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items
                </span>
              </h2>

              {/* Items preview list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        Qty: {item.quantity} {item.selectedSize && `· ${item.selectedSize}`}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Math breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>

                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Promo Discount ({appliedPromo?.code})</span>
                    <span className="tabular-nums font-semibold">
                      -${cartDiscountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tracked Express Delivery</span>
                  <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 flex justify-between text-base font-bold text-neutral-950 dark:text-white">
                  <span>Total Due</span>
                  <span className="tabular-nums text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white dark:border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing & Placing Order...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order · ${cartTotal.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex flex-col items-center gap-1 text-[11px] text-neutral-400 text-center">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <span>By clicking place order you agree to ShopEase terms of service.</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
