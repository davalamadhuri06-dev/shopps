import React from 'react';
import { 
  ShopProvider, 
  useShop 
} from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductCatalog } from './components/ProductCatalog';
import { CartDrawer } from './components/CartDrawer';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { OffersSection } from './components/OffersSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { AboutView, ContactView } from './components/AboutContactView';
import { ArrowRight, Sparkles, TrendingUp, Flame } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toast } = useShop();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-2 backdrop-blur-md ${
        toast.type === 'warning'
          ? 'bg-amber-950/90 text-amber-200 border-amber-800'
          : toast.type === 'info'
          ? 'bg-neutral-900/90 text-neutral-100 border-neutral-700'
          : 'bg-neutral-950/95 dark:bg-white/95 text-white dark:text-neutral-950 border-neutral-800 dark:border-neutral-200'
      }`}>
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>{toast.text}</span>
      </div>
    </div>
  );
};

const MainStoreContent: React.FC = () => {
  const { currentView, setCurrentView, products, setSelectedCategory } = useShop();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  // If in admin mode, display admin dashboard full-screen
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  // If on checkout page
  if (currentView === 'checkout') {
    return <CheckoutPage />;
  }

  // If on order success confirmation
  if (currentView === 'order-success') {
    return <OrderSuccessModal />;
  }

  // If on product detail page
  if (currentView === 'product-detail') {
    return <ProductDetailPage />;
  }

  // If on full cart page
  if (currentView === 'cart') {
    return <CartPage />;
  }

  // If on product catalog or categories explorer
  if (currentView === 'products' || currentView === 'categories') {
    return <ProductCatalog />;
  }

  // If on offers page
  if (currentView === 'offers') {
    return (
      <div className="space-y-6">
        <OffersSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">Eligible Promotion Items</h2>
            <p className="text-xs text-neutral-500">Apply code at checkout to enjoy discounts on these items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If on about page
  if (currentView === 'about') {
    return <AboutView />;
  }

  // If on contact page
  if (currentView === 'contact') {
    return <ContactView />;
  }

  // Default: HOME VIEW
  return (
    <div className="space-y-0">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Categories Section */}
      <CategoriesSection />

      {/* 3. Featured Products Grid */}
      <section className="py-14 sm:py-20 bg-neutral-50/60 dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Highlights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Featured Collection
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentView('products');
              }}
              className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
            >
              <span>Explore all {products.length} products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best-Selling Products Section */}
      <section className="py-14 sm:py-20 bg-white dark:bg-neutral-900/60 border-t border-neutral-200/80 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Best-Selling Products
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentView('products');
              }}
              className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
            >
              <span>View full catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Offers / Discount Section */}
      <OffersSection />

      {/* 6. New Arrivals Section */}
      <section className="py-14 sm:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Just Landed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentView('products');
              }}
              className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
            >
              <span>See what's new</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews Section */}
      <CustomerReviewsSection />

      {/* 8. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
        <Navbar />
        <main className="flex-1">
          <MainStoreContent />
        </main>
        <Footer />
        <CartDrawer />
        <AuthModal />
        <ToastNotification />
      </div>
    </ShopProvider>
  );
}
