import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Truck, 
  X,
  Search,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order } from '../types/ecommerce';
import { CATEGORIES_LIST } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    customers, 
    setCurrentView, 
    adminAddProduct, 
    adminUpdateProduct, 
    adminDeleteProduct,
    adminUpdateOrderStatus,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'categories'>('overview');
  
  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('All');

  // New product form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Fashion',
    price: 99,
    originalPrice: 129,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 1,
    description: '',
    features: ['Ethically produced', 'Premium materials', '1-year warranty'],
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    stockCount: 25,
    tag: 'New',
    sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
  });

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalStockItems = products.reduce((sum, p) => sum + (p.stockCount || 0), 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Please specify product name and price', 'warning');
      return;
    }

    if (editingProduct) {
      adminUpdateProduct({
        ...editingProduct,
        ...formData,
      } as Product);
      setEditingProduct(null);
    } else {
      adminAddProduct({
        name: formData.name!,
        category: (formData.category as any) || 'Fashion',
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        discountPercentage: Number(formData.discountPercentage || 0),
        rating: 4.9,
        reviewCount: 1,
        description: formData.description || 'High-end essential with modern ergonomic styling.',
        features: formData.features || ['Premium finish'],
        images: formData.images || ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
        inStock: formData.inStock ?? true,
        stockCount: Number(formData.stockCount || 20),
        tag: formData.tag || 'New',
        sku: formData.sku || `SKU-${Date.now()}`,
      });
    }

    setIsAddProductOpen(false);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setIsAddProductOpen(true);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    orderFilterStatus === 'All' ? true : o.status === orderFilterStatus
  );

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Storefront</span>
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                ShopEase Admin Console
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 rounded-md">
                Live Store Ops
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: '',
                  category: 'Fashion',
                  price: 99,
                  originalPrice: 129,
                  discountPercentage: 23,
                  description: '',
                  images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
                  inStock: true,
                  stockCount: 20,
                  sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                });
                setIsAddProductOpen(true);
              }}
              className="px-4 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (Segmented Controls) */}
        <div className="flex items-center gap-1 p-1 bg-neutral-200/70 dark:bg-neutral-900 rounded-xl overflow-x-auto max-w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'products'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'customers'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Categories ({CATEGORIES_LIST.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & SALES METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums">
                  ${totalRevenue.toFixed(2)}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  +18.4% vs previous 30 days
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums">
                  {totalOrders}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {orders.filter(o => o.status === 'Processing').length} awaiting fulfillment
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Average Order Value</span>
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums">
                  ${avgOrderValue.toFixed(2)}
                </p>
                <p className="text-[11px] text-neutral-400">
                  Across registered shoppers
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Inventory In Stock</span>
                  <Package className="w-4 h-4 text-indigo-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tabular-nums">
                  {totalStockItems} units
                </p>
                <p className="text-[11px] text-neutral-400">
                  Across {products.length} distinct SKUs
                </p>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                    Recent Customer Orders
                  </h2>
                  <p className="text-xs text-neutral-500">Real-time purchase flow & dispatch pipeline</p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-neutral-900 dark:text-white hover:underline"
                >
                  View All Orders
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Items</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                        <td className="py-3 px-3 font-bold text-neutral-900 dark:text-white tabular-nums">
                          {order.id}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-neutral-900 dark:text-white">{order.customer.fullName}</p>
                          <p className="text-neutral-400 text-[11px]">{order.customer.email}</p>
                        </td>
                        <td className="py-3 px-3 text-neutral-600 dark:text-neutral-400">
                          {order.items.length} items
                        </td>
                        <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white tabular-nums">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-neutral-500 tabular-nums">
                          {order.date}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => adminUpdateOrderStatus(order.id, e.target.value as any)}
                            className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-md px-2 py-1 text-xs border border-neutral-300 dark:border-neutral-700"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-6 space-y-6">
            
            {/* Search & Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search by name, SKU or category..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <span className="text-xs text-neutral-500">
                Total Products: <strong className="text-neutral-900 dark:text-white">{filteredProducts.length}</strong>
              </span>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock Units</th>
                    <th className="py-3 px-3">Rating</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-800"
                          />
                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-white">{p.name}</p>
                            <p className="text-[11px] text-neutral-400">{p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium text-neutral-600 dark:text-neutral-400">
                        {p.category}
                      </td>
                      <td className="py-3 px-3 font-bold text-neutral-900 dark:text-white tabular-nums">
                        ${p.price}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-semibold tabular-nums ${p.stockCount < 15 ? 'text-amber-600' : 'text-neutral-700 dark:text-neutral-300'}`}>
                          {p.stockCount} in stock
                        </span>
                      </td>
                      <td className="py-3 px-3 tabular-nums text-neutral-600 dark:text-neutral-400">
                        ★ {p.rating.toFixed(1)} ({p.reviewCount})
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => adminDeleteProduct(p.id)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                  Customer Orders Pipeline
                </h2>
                <p className="text-xs text-neutral-500">Review line items, shipping addresses & manage order fulfillment status</p>
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Filter Status:</span>
                <select
                  value={orderFilterStatus}
                  onChange={(e) => setOrderFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm text-neutral-950 dark:text-white tabular-nums">
                        {order.id}
                      </span>
                      <span className="text-xs text-neutral-400">· Placed on {order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-neutral-500">Update Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => adminUpdateOrderStatus(order.id, e.target.value as any)}
                        className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1 text-xs font-semibold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Customer & Contact</p>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{order.customer.fullName}</p>
                      <p className="text-neutral-400">{order.customer.email}</p>
                      <p className="text-neutral-400">{order.customer.phone}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Delivery Destination</p>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{order.customer.address}</p>
                      <p className="text-neutral-400">{order.customer.city}, {order.customer.postalCode}</p>
                      <p className="text-neutral-400">Method: {order.paymentMethod}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">Financials</p>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">Subtotal: ${order.subtotal.toFixed(2)}</p>
                      {order.discountAmount > 0 && (
                        <p className="text-emerald-600">Discount: -${order.discountAmount.toFixed(2)}</p>
                      )}
                      <p className="font-bold text-neutral-950 dark:text-white mt-1">Total: ${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="bg-white dark:bg-neutral-900 px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-800">
                        {item.quantity}x {item.product.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-6 space-y-4">
            <h2 className="text-base font-bold text-neutral-950 dark:text-white">
              Registered Customer Accounts
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-3">Customer Name</th>
                    <th className="py-3 px-3">Email Address</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Total Orders</th>
                    <th className="py-3 px-3">Lifetime Spend</th>
                    <th className="py-3 px-3">Member Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {customers.map(cust => (
                    <tr key={cust.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                      <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">
                        {cust.name}
                      </td>
                      <td className="py-3 px-3 text-neutral-500">
                        {cust.email}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                          cust.role === 'admin'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        }`}>
                          {cust.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 tabular-nums font-medium text-neutral-700 dark:text-neutral-300">
                        {cust.ordersCount} orders
                      </td>
                      <td className="py-3 px-3 font-bold text-neutral-900 dark:text-white tabular-nums">
                        ${cust.totalSpent.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-neutral-400">
                        {cust.joinedDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-6 space-y-6">
            <h2 className="text-base font-bold text-neutral-950 dark:text-white">
              Store Product Departments
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES_LIST.map(cat => (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex gap-3.5 items-center"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-neutral-200 dark:bg-neutral-800 shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-xs font-bold text-neutral-950 dark:text-white">{cat.name}</h3>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{cat.description}</p>
                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">{cat.itemCount} Active Items</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD / EDIT PRODUCT MODAL */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              onClick={() => setIsAddProductOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95">
                <button
                  onClick={() => setIsAddProductOpen(false)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                    {editingProduct ? 'Edit Product Item' : 'Create New Product'}
                  </h3>
                  <p className="text-xs text-neutral-500">Provide product specifications, pricing, and catalog tags</p>
                </div>

                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Minimalist Linen Shirt"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Department / Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      >
                        {CATEGORIES_LIST.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">SKU Code</label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Price ($) *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Original Price ($)</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stockCount}
                        onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={formData.tag || ''}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        placeholder="e.g. New Arrival, Best Seller"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">Image URL</label>
                      <input
                        type="url"
                        value={formData.images?.[0] || ''}
                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">Product Description</label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        placeholder="Describe the craftsmanship, materials, and fit..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setIsAddProductOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl hover:bg-neutral-800"
                    >
                      {editingProduct ? 'Save Changes' : 'Create Product'}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
