import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="bg-neutral-50/60 dark:bg-neutral-950 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400">
            About ShopEase
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Craftsmanship, Simplicity & Everyday Ease.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Founded with a conviction that online shopping should be intuitive, transparent, and built on authentic goods that stand the test of time.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">Curated Integrity</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every garment, acoustic headset, and lifestyle object is rigorously vetted for tactile material honesty and durability before entering our catalog.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">Conscious Sourcing</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We partner directly with certified workshops in Portugal, Normandy, and Japan, cutting out predatory intermediary markups.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">Zero-Friction Care</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              30-day hassle-free returns, genuine human concierge support, and transparent order tracking on every parcel.
            </p>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-neutral-950 dark:text-white">Ready to experience the difference?</h4>
            <p className="text-xs text-neutral-500">Explore the current Autumn / Winter collection with code SHOPEASE15.</p>
          </div>
          <button
            onClick={() => setCurrentView('products')}
            className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-800 shrink-0 transition-colors"
          >
            Explore The Shop
          </button>
        </div>

      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all contact fields', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! Our support team will reply within 4 hours.');
  };

  return (
    <div className="bg-neutral-50/60 dark:bg-neutral-950 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400">
            Get In Touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            Have questions about sizing, logistics, or custom corporate gifting? Send us a note below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="md:col-span-5 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 space-y-6 shadow-xs">
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neutral-700 dark:text-neutral-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">Customer Support</p>
                  <p>support@shopease.com</p>
                  <p className="text-neutral-400">Average response time &lt; 2 hrs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-neutral-700 dark:text-neutral-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">Toll-Free Helpline</p>
                  <p>+1 (800) 555-EASE</p>
                  <p className="text-neutral-400">Mon–Fri: 9:00 AM – 6:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-700 dark:text-neutral-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">Flagship Studio</p>
                  <p>450 Hudson Yards, Suite 18</p>
                  <p>New York, NY 10001, USA</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-[11px] text-neutral-500 space-y-1">
              <p className="font-semibold text-neutral-900 dark:text-white">Looking for Returns?</p>
              <p>You can generate a return shipping label right inside your order invoice within 30 days of receipt.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      placeholder="e.g. Elena Rostova"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      placeholder="elena@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  >
                    <option value="Order Inquiry">Order Inquiry / Tracking</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Product Sizing Advice">Product Sizing Advice</option>
                    <option value="Wholesale & Collaborations">Wholesale & Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    placeholder="How can we assist you today?..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-neutral-950 dark:text-white">Message Delivered</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Thank you for reaching out. A dedicated member of our concierge team will respond to {form.email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold underline text-neutral-900 dark:text-white mt-2"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
