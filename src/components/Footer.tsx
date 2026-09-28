import React from 'react';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  CreditCard, 
  ShieldCheck, 
  ArrowUp,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useShop, ViewType } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/initialData';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleNav = (view: ViewType, cat?: string) => {
    if (cat) setSelectedCategory(cat);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => handleNav('home')}
              className="text-left group flex items-center gap-1.5 focus:outline-none"
            >
              <span className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white font-sans">
                Shop<span className="text-neutral-500 dark:text-neutral-400">Ease</span>
              </span>
            </button>
            <p className="text-xs leading-relaxed max-w-sm text-neutral-500 dark:text-neutral-400">
              Modern digital storefront bringing together enduring materials, studio acoustic devices, and artisanal home vessels for elevated daily living.
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>450 Hudson Yards, Suite 18, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+1 (800) 555-EASE · Mon–Fri 9am–6pm EST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>support@shopease.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
              Departments
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => handleNav('products', c.name)}
                    className="hover:text-neutral-950 dark:hover:text-white transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-neutral-950 dark:hover:text-white">
                  Help Center & Contact
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cart')} className="hover:text-neutral-950 dark:hover:text-white">
                  Track Existing Order
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-neutral-950 dark:hover:text-white">
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('offers')} className="hover:text-neutral-950 dark:hover:text-white">
                  Vouchers & Offers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                  Store Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-neutral-950 dark:hover:text-white">
                  Our Design Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-neutral-950 dark:hover:text-white">
                  Ethical Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-neutral-950 dark:hover:text-white">
                  Sustainability Report
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-neutral-950 dark:hover:text-white">
                  Press & Partnerships
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} ShopEase Global Retail Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Visa</span>
            <span aria-hidden="true">·</span>
            <span>Mastercard</span>
            <span aria-hidden="true">·</span>
            <span>Apple Pay</span>
            <span aria-hidden="true">·</span>
            <span>Cash on Delivery</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
