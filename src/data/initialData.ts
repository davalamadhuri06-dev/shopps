import { Product, Order, CustomerUser, Review } from '../types/ecommerce';

// Import local generated images
import heroImage from '../assets/images/hero_shopease_lifestyle_1790604582966.jpg';
import headphonesImage from '../assets/images/product_headphones_studio_1790604597730.jpg';
import linenBlazerImage from '../assets/images/product_linen_blazer_1790604611607.jpg';
import leatherSneakersImage from '../assets/images/product_leather_sneakers_1790604625777.jpg';

export { heroImage };

export const CATEGORIES_LIST = [
  {
    id: 'Fashion',
    name: 'Fashion',
    description: 'Effortless tailoring, timeless silhouettes & premium natural fabrics',
    image: linenBlazerImage,
    itemCount: 28,
  },
  {
    id: 'Electronics',
    name: 'Electronics',
    description: 'Precision acoustics, minimalist desktop chargers & wireless sound',
    image: headphonesImage,
    itemCount: 22,
  },
  {
    id: 'Shoes',
    name: 'Shoes',
    description: 'Handcrafted calfskin sneakers, chelsea boots & performance runners',
    image: leatherSneakersImage,
    itemCount: 19,
  },
  {
    id: 'Beauty',
    name: 'Beauty',
    description: 'Clean botanicals, restorative facial serums & nourishing balms',
    image: 'https://images.unsplash.com/photo-1608248597359-25389658d550?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    description: 'Fine Italian leather goods, minimal dials & polarized eyewear',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
  },
  {
    id: 'Home & Lifestyle',
    name: 'Home & Lifestyle',
    description: 'Sculptural ceramics, French flax bedding & aromatic diffusers',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
  },
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'FSH-BLZ-01',
    name: 'Tailored Sand Linen Blazer',
    category: 'Fashion',
    price: 189,
    originalPrice: 249,
    discountPercentage: 24,
    rating: 4.9,
    reviewCount: 142,
    description: 'Engineered from unbleached European flax linen with a relaxed shoulder structure. Breathable, naturally textured, and tailored for effortless layering from warm daytime meetings to evening gatherings.',
    features: [
      '100% sustainably harvested European flax linen',
      'Soft unstructured shoulder pads for relaxed drape',
      'Dual interior welt pockets and horn buttons',
      'Breathable organic cotton half-lining',
      'Dry clean or gentle cold wash cycle'
    ],
    images: [
      linenBlazerImage,
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Sand Beige', hex: '#D7C7B0' },
      { name: 'Oatmeal', hex: '#E6E0D4' },
      { name: 'Midnight Slate', hex: '#26292B' },
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isBestSeller: true,
    tag: 'Best Seller',
  },
  {
    id: 'prod-002',
    sku: 'ELC-HDP-01',
    name: 'Studio Pro Active Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 279,
    originalPrice: 349,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 389,
    description: 'Precision engineered 40mm custom beryllium dynamic drivers paired with adaptive active noise cancellation. Delivers expansive studio-grade spatial audio, ultra-low latency, and 45 hours of continuous wireless listening.',
    features: [
      'Hybrid active noise cancellation with transparency mode',
      'Up to 45 hours battery life with quick-charge (15 min for 5 hrs)',
      'Memory foam magnetic ear cushions with supple protein leather',
      'Spatial 3D audio calibration and dual beamforming voice mics',
      'Bluetooth 5.4 with multipoint pairing for seamless device switching'
    ],
    images: [
      headphonesImage,
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    availableColors: [
      { name: 'Matte Obsidian', hex: '#1C1C1E' },
      { name: 'Brushed Silver', hex: '#D1D5DB' },
      { name: 'Warm Sand', hex: '#C2B69D' },
    ],
    inStock: true,
    stockCount: 34,
    isFeatured: true,
    isBestSeller: true,
    tag: 'Editor Choice',
  },
  {
    id: 'prod-003',
    sku: 'SHO-SNK-01',
    name: 'Crafted Calfskin Low-Top Sneakers',
    category: 'Shoes',
    price: 165,
    originalPrice: 195,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 215,
    description: 'Masterfully built from buttery full-grain Italian calfskin leather with a cushioned Margom-style natural gum sole. A minimalist icon engineered to comfortably contour to your foot with every wear.',
    features: [
      'Supple full-grain Italian calfskin leather upper',
      'Reinforced natural gum rubber cupsole for durability',
      'Orthopedic memory foam footbed lined with vegetable-tanned leather',
      'Waxed organic cotton laces with reinforced eyelets',
      'Handcrafted in Porto with ethical artisan standards'
    ],
    images: [
      leatherSneakersImage,
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    availableColors: [
      { name: 'Pure Chalk & Gum', hex: '#F3F4F6' },
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Shadow Black', hex: '#111827' },
    ],
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isNewArrival: true,
    tag: 'New Arrival',
  },
  {
    id: 'prod-004',
    sku: 'BEA-SRM-01',
    name: 'Radiance Botanical Glow Serum',
    category: 'Beauty',
    price: 68,
    originalPrice: 85,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 168,
    description: 'An antioxidant-rich facial elixir formulated with multi-weight hyaluronic acid, stabilized vitamin C, and cold-pressed squalane. Restores luminous skin barrier hydration and evens skin tone.',
    features: [
      '15% Stabilized Vitamin C + Ferulic Acid antioxidant complex',
      'Multi-molecular weight hyaluronic acid for deep hydration',
      'Plant-derived squalane locks in moisture without clogging pores',
      '100% cruelty-free, vegan, and fragrance-free formulation',
      'Packaged in UV-filtering amber apothecary glass'
    ],
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-25389658d550?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['30ml / 1.0 fl oz', '50ml / 1.7 fl oz'],
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    isBestSeller: true,
    tag: 'Trending',
  },
  {
    id: 'prod-005',
    sku: 'ACC-WTC-01',
    name: 'Minimalist Bauhaus Automatic Watch',
    category: 'Accessories',
    price: 320,
    originalPrice: 395,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 94,
    description: 'A celebration of German functionalist design with a spotless matte white dial, ultra-slim 316L surgical steel casing, and a sapphire crystal glass lens with anti-reflective coating.',
    features: [
      'Japanese Miyota 9015 mechanical automatic movement (42h reserve)',
      'Ultra-hard scratch-resistant sapphire crystal glass',
      'Quick-release vegetable-tanned Horween leather strap',
      '5 ATM water resistance (safe for showering and rain)',
      'Subtle date aperture at 6 o’clock with Bauhaus typography'
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    availableColors: [
      { name: 'Cognac Leather & Silver', hex: '#9A5B32' },
      { name: 'Midnight Black & Gunmetal', hex: '#1E232A' },
      { name: 'Olive Suede', hex: '#4B5320' },
    ],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isNewArrival: false,
    tag: 'Limited Edition',
  },
  {
    id: 'prod-006',
    sku: 'HME-CER-01',
    name: 'Sculptural Ceramic Balance Vessel',
    category: 'Home & Lifestyle',
    price: 94,
    originalPrice: 110,
    discountPercentage: 14,
    rating: 4.7,
    reviewCount: 78,
    description: 'Wheel-thrown by studio artisans from coarse stoneware clay and finished in a tactile matte chalk glaze. An architectural accent that harmonizes dried botanical stems or stands purely as sculpture.',
    features: [
      'Handcrafted individually from high-fire natural stoneware',
      'Raw unglazed base with matte satin protective glaze inside',
      'Waterproof interior safe for fresh floristry or dried florals',
      'Architectural geometric silhouette inspired by Brancusi forms',
      'Dimensions: 24cm H x 18cm W, weight 1.4kg'
    ],
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    availableColors: [
      { name: 'Chalk White', hex: '#F0EFEA' },
      { name: 'Raw Terracotta', hex: '#C86D51' },
      { name: 'Basalt Charcoal', hex: '#333333' },
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    isNewArrival: true,
    tag: 'Artisan Made',
  },
  {
    id: 'prod-007',
    sku: 'FSH-SWT-02',
    name: 'Fine Merino Mock-Neck Sweater',
    category: 'Fashion',
    price: 135,
    originalPrice: 160,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 112,
    description: 'Spun from 19.5-micron extra-fine Australian Merino wool. Offers lightweight thermal regulation, incredible softness against bare skin, and seamless 3D knit comfort.',
    features: [
      '100% Extra-fine 19.5 micron Australian Merino wool',
      'Zero-waste seamless 3D circular knit technology',
      'Naturally odor-resistant, temperature-regulating fiber',
      'Ribbed collar, cuffs, and hem retain perfect shape',
      'Hand wash cold or dry clean'
    ],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Heather Charcoal', hex: '#374151' },
      { name: 'Forest Moss', hex: '#2F4F4F' },
      { name: 'Ivory Cream', hex: '#FAF9F6' },
    ],
    inStock: true,
    stockCount: 20,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: 'prod-008',
    sku: 'ELC-CHR-02',
    name: 'Alloy 3-in-1 Magnetic Wireless Station',
    category: 'Electronics',
    price: 119,
    originalPrice: 145,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 204,
    description: 'Anodized aerospace aluminum dock that simultaneously fast-charges your smartphone, smartwatch, and wireless earbuds with a single braided USB-C cable.',
    features: [
      '15W Qi2 certified fast magnetic smartphone charger',
      'Fast-charging magnetic pad for Apple Watch & Galaxy Watch',
      'Recessed 5W charging nest for AirPods and wireless cases',
      'Weighted CNC aluminum base with non-slip silicone feet',
      'Integrated thermal dissipation and overvoltage safety chip'
    ],
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    ],
    availableColors: [
      { name: 'Space Gray', hex: '#4B4846' },
      { name: 'Silver Matte', hex: '#E5E7EB' },
    ],
    inStock: true,
    stockCount: 28,
    isFeatured: false,
    isNewArrival: true,
    tag: 'New',
  },
  {
    id: 'prod-009',
    sku: 'SHO-BTS-02',
    name: 'Heritage Weatherproof Chelsea Boots',
    category: 'Shoes',
    price: 215,
    originalPrice: 260,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 167,
    description: 'Crafted with wax-infused oiled nubuck leather and a Goodyear welt construction. Equipped with elasticated gore panels and a lugged Vibram rubber outsole for all-weather traction.',
    features: [
      'Waterproof oiled nubuck leather with weather-sealed welt',
      'Goodyear welted construction can be resoled indefinitely',
      'Durable Vibram Commando rubber outsole with deep lugs',
      'Double heavy-duty pull tabs for effortless slip-on fit',
      'Cork filler midsole molds custom to your arch over time'
    ],
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    availableColors: [
      { name: 'Dark Oak Wax', hex: '#4A2F1B' },
      { name: 'Matte Jet Black', hex: '#171717' },
    ],
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: 'prod-010',
    sku: 'ACC-SUN-02',
    name: 'Architectural Polarized Sunglasses',
    category: 'Accessories',
    price: 145,
    originalPrice: 175,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 89,
    description: 'Handcrafted Mazzucchelli cellulose acetate frames housing crystal polarized CR-39 lenses. 100% UVA/UVB protection with Japanese 5-barrel custom hinges.',
    features: [
      'Hand-polished Italian Mazzucchelli bio-acetate frame',
      'Class 1 optical clarity polarized CR-39 sun lenses',
      '100% UV400 ultraviolet radiation filtration',
      '5-barrel riveted stainless steel hinge system',
      'Includes recycled leather protective sleeve and cleaning cloth'
    ],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    availableColors: [
      { name: 'Havana Amber Tortoise', hex: '#8C5627' },
      { name: 'Gloss Nero Black', hex: '#000000' },
      { name: 'Smoky Olive Crystal', hex: '#556B2F' },
    ],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    isNewArrival: false,
  },
  {
    id: 'prod-011',
    sku: 'HME-LIN-02',
    name: 'Washed French Flax Linen Duvet Set',
    category: 'Home & Lifestyle',
    price: 240,
    originalPrice: 295,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 312,
    description: 'Woven from 170 GSM Normandy flax linen pre-washed with natural pumice stones for that coveted relaxed, lived-in feel. Keeps you cool in summer and cozy in winter.',
    features: [
      '100% certified French flax linen from Normandy farms',
      'Stone-washed for maximum cloud-like softness from day one',
      'Corner tie loops to keep duvet insert anchored in place',
      'Concealed natural shell button enclosure',
      'Set includes 1 Duvet Cover + 2 Matching Pillowcases'
    ],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['Queen Set', 'King Set'],
    availableColors: [
      { name: 'Warm Clay Terracotta', hex: '#C27D60' },
      { name: 'Unbleached Flax', hex: '#DED6C7' },
      { name: 'Washed Fog Gray', hex: '#B8B9B7' },
    ],
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    isBestSeller: false,
    tag: 'Luxury Bedding',
  },
  {
    id: 'prod-012',
    sku: 'BEA-LIP-02',
    name: 'Hydra-Silk Peptide Lip Treatment',
    category: 'Beauty',
    price: 26,
    originalPrice: 32,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 420,
    description: 'A restorative hybrid lip balm and treatment oil infused with biomimetic peptides, cupuaçu butter, and wild blackberry seed oil. Heals dry lips and imparts a sheer glaze without stickiness.',
    features: [
      'Palmitoyl Tripeptide-38 visibly plumps and smoothes fine lines',
      'Cold-pressed Brazilian Cupuaçu butter restores lip barrier',
      'High-refraction plant oils provide a natural glass glaze shine',
      'Cooling zinc alloy applicator tip massages during application',
      'Clean, gluten-free, vegan formulation'
    ],
    images: [
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    availableColors: [
      { name: 'Sheer Rose Dew', hex: '#E8A598' },
      { name: 'Fig Nectar', hex: '#873B4D' },
      { name: 'Clear Glaze', hex: '#F9F9F8' },
    ],
    inStock: true,
    stockCount: 60,
    isFeatured: false,
    isBestSeller: true,
    tag: 'Viral Favorite',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-7291',
    date: '2026-09-27',
    customer: {
      fullName: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      phone: '+1 (555) 234-8901',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
    },
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Headphones
        quantity: 1,
        selectedColor: 'Matte Obsidian',
      },
      {
        product: INITIAL_PRODUCTS[3], // Serum
        quantity: 2,
        selectedSize: '30ml / 1.0 fl oz',
      },
    ],
    subtotal: 415,
    discountAmount: 41.5,
    discountCode: 'WELCOME10',
    shippingFee: 0,
    totalAmount: 373.5,
    paymentMethod: 'Credit / Debit Card',
    status: 'Processing',
    estimatedDelivery: 'Sep 30, 2026',
  },
  {
    id: 'ORD-6814',
    date: '2026-09-25',
    customer: {
      fullName: 'Marcus Vance',
      email: 'marcus.vance@example.com',
      phone: '+1 (555) 789-1234',
      address: '128 Hudson Yards Blvd, Suite 19',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Linen Blazer
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Sand Beige',
      },
      {
        product: INITIAL_PRODUCTS[2], // Sneakers
        quantity: 1,
        selectedSize: 'US 10',
        selectedColor: 'Pure Chalk & Gum',
      },
    ],
    subtotal: 354,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 354,
    paymentMethod: 'UPI / Digital Wallet',
    status: 'Shipped',
    estimatedDelivery: 'Sep 29, 2026',
  },
  {
    id: 'ORD-5402',
    date: '2026-09-22',
    customer: {
      fullName: 'Sophia Lin',
      email: 'sophia.lin@example.com',
      phone: '+1 (555) 345-6789',
      address: '450 Hayes Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'United States',
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Bauhaus Watch
        quantity: 1,
        selectedColor: 'Cognac Leather & Silver',
      },
    ],
    subtotal: 320,
    discountAmount: 48,
    discountCode: 'SHOPEASE15',
    shippingFee: 0,
    totalAmount: 272,
    paymentMethod: 'Credit / Debit Card',
    status: 'Delivered',
    estimatedDelivery: 'Sep 25, 2026',
  },
  {
    id: 'ORD-4119',
    date: '2026-09-20',
    customer: {
      fullName: 'Julian Alvarez',
      email: 'julian.a@example.com',
      phone: '+1 (555) 901-2345',
      address: '880 Biscayne Blvd',
      city: 'Miami',
      state: 'FL',
      postalCode: '33132',
      country: 'United States',
    },
    items: [
      {
        product: INITIAL_PRODUCTS[5], // Ceramic Vessel
        quantity: 1,
        selectedColor: 'Chalk White',
      },
    ],
    subtotal: 94,
    discountAmount: 0,
    shippingFee: 12,
    totalAmount: 106,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    estimatedDelivery: 'Sep 23, 2026',
  },
];

export const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: 'usr-001',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    role: 'customer',
    joinedDate: 'Jan 2025',
    ordersCount: 4,
    totalSpent: 1280,
    phone: '+1 (555) 234-8901',
  },
  {
    id: 'usr-002',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    role: 'customer',
    joinedDate: 'Mar 2025',
    ordersCount: 3,
    totalSpent: 910,
    phone: '+1 (555) 789-1234',
  },
  {
    id: 'usr-003',
    name: 'Sophia Lin',
    email: 'sophia.lin@example.com',
    role: 'customer',
    joinedDate: 'May 2025',
    ordersCount: 5,
    totalSpent: 1450,
    phone: '+1 (555) 345-6789',
  },
  {
    id: 'usr-004',
    name: 'Julian Alvarez',
    email: 'julian.a@example.com',
    role: 'customer',
    joinedDate: 'Jul 2025',
    ordersCount: 2,
    totalSpent: 390,
    phone: '+1 (555) 901-2345',
  },
  {
    id: 'usr-admin',
    name: 'Administrator',
    email: 'admin@shopease.com',
    role: 'admin',
    joinedDate: 'Dec 2024',
    ordersCount: 0,
    totalSpent: 0,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Camilla Thorne',
    role: 'Architect & Interior Designer',
    rating: 5,
    date: 'September 2026',
    title: 'Flawless craftsmanship and tactile feel',
    comment: 'The sand linen blazer has an incredible silhouette. The fabric weight is substantial yet breathes wonderfully. ShopEase delivered in 2 days in minimalist, plastic-free packaging.',
    productName: 'Tailored Sand Linen Blazer',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'David K., Audio Engineer',
    role: 'Sound Designer',
    rating: 5,
    date: 'September 2026',
    title: 'Surpassed my studio expectations',
    comment: 'The acoustic balance on the Studio Pro headphones is genuinely comparable to $600 reference cans. The active noise cancelling is natural without excessive ear pressure.',
    productName: 'Studio Pro ANC Headphones',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Clara Moreau',
    role: 'Creative Director',
    rating: 5,
    date: 'August 2026',
    title: 'Unbelievably comfortable sneaker',
    comment: 'Zero break-in period. The full-grain calfskin feels supple right out of the box, and the gum sole has that understated European luxury aesthetic.',
    productName: 'Crafted Calfskin Low-Top Sneakers',
    verified: true,
  },
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'SHOPEASE15': { discountPercent: 15, description: '15% Off Site-Wide' },
  'WELCOME10': { discountPercent: 10, description: '10% Welcome Discount' },
  'FREESHIP': { discountPercent: 5, description: 'Free Shipping + Extra 5% Off' },
  'FALL20': { discountPercent: 20, description: '20% Autumn Special' },
};
