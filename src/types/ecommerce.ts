export interface Product {
  id: string;
  name: string;
  category: 'Fashion' | 'Electronics' | 'Shoes' | 'Beauty' | 'Accessories' | 'Home & Lifestyle';
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  images: string[];
  availableSizes?: string[];
  availableColors?: { name: string; hex: string }[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  tag?: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'Credit / Debit Card' | 'UPI / Digital Wallet' | 'Cash on Delivery';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  phone?: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
}
