import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerUser, OrderCustomer } from '../types/ecommerce';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS, PROMO_CODES } from '../data/initialData';

export type ViewType = 
  | 'home' 
  | 'products' 
  | 'categories' 
  | 'offers' 
  | 'about' 
  | 'contact' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'admin';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  customers: CustomerUser[];
  user: CustomerUser | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  openProductDetail: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedPromo: { code: string; percent: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  cartSubtotal: number;
  cartDiscountAmount: number;
  shippingFee: number;
  cartTotal: number;
  cartItemCount: number;
  lastOrder: Order | null;
  placeOrder: (customer: OrderCustomer, paymentMethod: Order['paymentMethod']) => Promise<Order>;
  login: (email: string, role?: 'customer' | 'admin', name?: string) => void;
  logout: () => void;
  adminAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  adminUpdateProduct: (product: Product) => void;
  adminDeleteProduct: (productId: string) => void;
  adminUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  toast: { text: string; type?: 'info' | 'success' | 'warning' } | null;
  showToast: (text: string, type?: 'info' | 'success' | 'warning') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('shopease_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Apply dark class to html document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('shopease_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Products state (persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shopease_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('shopease_products', JSON.stringify(products));
  }, [products]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shopease_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shopease_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shopease_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['prod-001', 'prod-005'];
  });

  useEffect(() => {
    localStorage.setItem('shopease_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('shopease_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('shopease_orders', JSON.stringify(orders));
  }, [orders]);

  // Customers state
  const [customers, setCustomers] = useState<CustomerUser[]>(() => {
    try {
      const saved = localStorage.getItem('shopease_customers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    localStorage.setItem('shopease_customers', JSON.stringify(customers));
  }, [customers]);

  // Current logged in user
  const [user, setUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('shopease_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CUSTOMERS[0]; // default logged in as Elena Rostova for frictionless experience
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shopease_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopease_user');
    }
  }, [user]);

  // Navigation & View state
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>({
    code: 'SHOPEASE15',
    percent: 15,
  });

  // Toast notifications
  const [toast, setToast] = useState<{ text: string; type?: 'info' | 'success' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'info' | 'success' | 'warning' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const openProductDetail = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedSize, selectedColor }];
    });
    showToast(`Added "${product.name}" to your cart!`);
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Promo code
  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted]) {
      const promo = PROMO_CODES[formatted];
      setAppliedPromo({ code: formatted, percent: promo.discountPercent });
      showToast(`Promo ${formatted} applied! (${promo.discountPercent}% off)`);
      return { success: true, message: `Code applied: ${promo.discountPercent}% off` };
    }
    showToast('Invalid promo code. Try "SHOPEASE15" or "WELCOME10"', 'warning');
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscountAmount = appliedPromo ? (cartSubtotal * appliedPromo.percent) / 100 : 0;
  // Free shipping over $100
  const shippingFee = cartSubtotal >= 100 || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscountAmount + (cartSubtotal > 0 ? shippingFee : 0));
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Order placement
  const placeOrder = async (customer: OrderCustomer, paymentMethod: Order['paymentMethod']): Promise<Order> => {
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discountAmount: cartDiscountAmount,
      discountCode: appliedPromo?.code,
      shippingFee,
      totalAmount: cartTotal,
      paymentMethod,
      status: 'Pending',
      estimatedDelivery: 'In 3-5 business days',
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setCurrentView('order-success');
    showToast(`Order #${newOrderId} confirmed!`);
    return newOrder;
  };

  // Authentication
  const login = (email: string, role: 'customer' | 'admin' = 'customer', name?: string) => {
    let matchedUser = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser) {
      matchedUser = {
        id: `usr-${Date.now()}`,
        name: name || (role === 'admin' ? 'Store Administrator' : email.split('@')[0]),
        email,
        role,
        joinedDate: 'Just now',
        ordersCount: 0,
        totalSpent: 0,
      };
      setCustomers(prev => [...prev, matchedUser!]);
    }
    setUser(matchedUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${matchedUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out.', 'info');
    if (currentView === 'admin') {
      setCurrentView('home');
    }
  };

  // Admin capabilities
  const adminAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const product: Product = {
      ...newProductData,
      id: newId,
    };
    setProducts(prev => [product, ...prev]);
    showToast(`Product "${product.name}" created!`);
  };

  const adminUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    showToast(`Product "${updatedProduct.name}" updated!`);
  };

  const adminDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product deleted from inventory', 'info');
  };

  const adminUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order #${orderId} status changed to ${status}`);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        customers,
        user,
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartSubtotal,
        cartDiscountAmount,
        shippingFee,
        cartTotal,
        cartItemCount,
        lastOrder,
        placeOrder,
        login,
        logout,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
        adminUpdateOrderStatus,
        toast,
        showToast,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
