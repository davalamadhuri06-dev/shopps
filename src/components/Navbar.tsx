import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useShop, ViewType } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    wishlist,
    theme,
    toggleTheme,
    user,
    logout,
    setIsAuthModalOpen,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const navLinks: { label: string; view: ViewType; category?: string }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Categories', view: 'categories' },
    { label: 'Products', view: 'products' },
    { label: 'Special Offers', view: 'offers' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ViewType, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('products');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* Top Banner (Slim & dismissible) */}
      {showAnnouncement && (
        <div className="bg-neutral-900 text-white dark:bg-neutral-900 px-4 py-2 text-xs font-medium text-center relative flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span>Free express shipping on all orders over $100</span>
            <span className="opacity-50" aria-hidden="true">·</span>
            <span className="text-amber-300 font-semibold tracking-wide">Use code SHOPEASE15 for 15% off</span>
          </div>
          <button 
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-1.5 focus:outline-none"
            >
              <span className="text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-sans">
                Shop<span className="text-neutral-500 dark:text-neutral-400 group-hover:text-amber-500 transition-colors">Ease</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view, link.category)}
                  className={`text-sm font-medium transition-colors hover:text-neutral-950 dark:hover:text-white relative py-1 ${
                    isActive 
                      ? 'text-neutral-950 dark:text-white font-semibold' 
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 dark:bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Live Search Toggle/Bar */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search essentials, tech..."
                      autoFocus
                      className="w-48 sm:w-64 pl-8 pr-7 py-1.5 text-xs rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                    <Search className="w-3.5 h-3.5 absolute left-2.5 text-neutral-400" />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search products"
                  className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Wishlist"
              className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Admin Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(prev => !prev)}
                aria-label="User Account"
                className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Signed in as</p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      </div>

                      {/* Admin Mode Switcher */}
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                          Admin Dashboard
                        </span>
                        <ChevronRight className="w-3 h-3 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('cart');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                          My Cart & Orders
                        </span>
                      </button>

                      <div className="border-t border-neutral-100 dark:border-neutral-800 my-1" />

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-3 space-y-2">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Welcome to ShopEase</p>
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full py-2 px-3 text-xs font-semibold text-white bg-neutral-950 dark:bg-white dark:text-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        Sign In / Register
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full py-1.5 px-3 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                        Admin Demo Mode
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          </form>

          {/* Links */}
          <div className="flex flex-col space-y-1 pt-2">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.category)}
                className={`px-3 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                  currentView === link.view
                    ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentView('admin');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              Open Admin Dashboard
            </button>
            
            {!user ? (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-neutral-900 dark:text-white underline"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-rose-600"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
