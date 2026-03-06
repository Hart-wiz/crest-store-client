export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  collection: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  isExclusive: boolean;
  isAvailable: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  refNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  items: { productId: string; productName: string; size: string; color: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  orders: string[];
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Crest Sovereign Hoodie',
    price: 45000,
    originalPrice: 55000,
    category: 'Hoodies',
    collection: 'Sovereign Collection',
    description: 'Crafted from premium heavyweight fleece, the Sovereign Hoodie embodies the pinnacle of streetwear luxury. Features gold-embroidered Crest logo, hidden side pockets, and a tailored oversized fit that commands attention.',
    images: ['/images/hoodie.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Midnight Navy', hex: '#1B2A4A' },
      { name: 'Storm Grey', hex: '#3D3D3D' },
    ],
    stock: 24,
    isExclusive: true,
    isAvailable: true,
    createdAt: '2026-01-15',
  },
  {
    id: 'p2',
    name: 'Crest Heritage Tee',
    price: 18000,
    category: 'T-Shirts',
    collection: 'Heritage Collection',
    description: 'The Heritage Tee is a statement of refined minimalism. Made from 100% Egyptian cotton with a signature crown embroidery on the chest. The perfect foundation for any Crest outfit.',
    images: ['/images/tshirt.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Ivory White', hex: '#F5F5DC' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
    ],
    stock: 65,
    isExclusive: false,
    isAvailable: true,
    createdAt: '2026-01-20',
  },
  {
    id: 'p3',
    name: 'Crest Royal Cap',
    price: 12000,
    category: 'Caps',
    collection: 'Heritage Collection',
    description: 'The Royal Cap features a structured six-panel design with premium gold embroidered Crest crown logo. Adjustable strapback closure ensures a perfect fit. Built to crown kings.',
    images: ['/images/cap.png'],
    sizes: ['One Size'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Ivory White', hex: '#F5F5DC' },
    ],
    stock: 40,
    isExclusive: false,
    isAvailable: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'p4',
    name: 'Crest Monarch Jacket',
    price: 85000,
    originalPrice: 95000,
    category: 'Jackets',
    collection: 'Sovereign Collection',
    description: 'The Monarch Jacket is the crown jewel of the Sovereign Collection. Premium Italian leather with gold-plated hardware, quilted satin lining, and signature Crest embossing on the back.',
    images: ['/images/jacket.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Dark Bourbon', hex: '#3E2723' },
    ],
    stock: 8,
    isExclusive: true,
    isAvailable: true,
    createdAt: '2026-02-10',
  },
  {
    id: 'p5',
    name: 'Crest Essential Tee V2',
    price: 15000,
    category: 'T-Shirts',
    collection: 'Essentials',
    description: 'Everyday luxury redefined. The Essential Tee V2 features a relaxed cut from premium Pima cotton blend with tonal Crest branding. Pair with anything for effortless style.',
    images: ['/images/tshirt.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Ash Grey', hex: '#5A5A5A' },
      { name: 'Oat Milk', hex: '#DCCFB8' },
    ],
    stock: 100,
    isExclusive: false,
    isAvailable: true,
    createdAt: '2026-02-05',
  },
  {
    id: 'p6',
    name: 'Crest Shield Hoodie',
    price: 38000,
    category: 'Hoodies',
    collection: 'Essentials',
    description: 'The Shield Hoodie merges comfort with edge. Heavyweight French terry, kangaroo pocket, and bold back print make this a must-have staple for the streets.',
    images: ['/images/hoodie.png'],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Charcoal', hex: '#2D2D2D' },
    ],
    stock: 35,
    isExclusive: false,
    isAvailable: true,
    createdAt: '2026-02-12',
  },
  {
    id: 'p7',
    name: 'Crest Apex Bomber',
    price: 72000,
    category: 'Jackets',
    collection: 'Heritage Collection',
    description: 'The Apex Bomber combines classic silhouette with modern detailing. Featuring premium nylon shell, ribbed knit trim, and interior gold-thread embroidery. Limited quantity.',
    images: ['/images/jacket.png'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Olive Shadow', hex: '#3D4A2E' },
    ],
    stock: 12,
    isExclusive: true,
    isAvailable: true,
    createdAt: '2026-02-18',
  },
  {
    id: 'p8',
    name: 'Crest Crown Snapback',
    price: 14000,
    category: 'Caps',
    collection: 'Sovereign Collection',
    description: 'The Crown Snapback is luxury streetwear accessory at its finest. 3D gold embroidery, premium wool blend, and an exclusive limited run make this a collector\'s item.',
    images: ['/images/cap.png'],
    sizes: ['One Size'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
    ],
    stock: 15,
    isExclusive: true,
    isAvailable: true,
    createdAt: '2026-02-20',
  },
];

export const orders: Order[] = [
  {
    id: 'o1', refNumber: 'CRS-2026-0001',
    customerName: 'Adebayo Ogunlesi', email: 'adebayo@gmail.com', phone: '+2348011234567',
    address: '15 Admiralty Way, Lekki Phase 1', city: 'Lagos', state: 'Lagos',
    items: [{ productId: 'p1', productName: 'Crest Sovereign Hoodie', size: 'L', color: 'Obsidian Black', quantity: 1, price: 45000 }],
    total: 45000, status: 'delivered', paymentStatus: 'completed', createdAt: '2026-02-01',
  },
  {
    id: 'o2', refNumber: 'CRS-2026-0002',
    customerName: 'Chioma Nwosu', email: 'chioma.n@gmail.com', phone: '+2348022345678',
    address: '8 Wuse II', city: 'Abuja', state: 'FCT',
    items: [
      { productId: 'p2', productName: 'Crest Heritage Tee', size: 'M', color: 'Ivory White', quantity: 2, price: 18000 },
      { productId: 'p3', productName: 'Crest Royal Cap', size: 'One Size', color: 'Obsidian Black', quantity: 1, price: 12000 },
    ],
    total: 48000, status: 'shipped', paymentStatus: 'completed', createdAt: '2026-02-15',
  },
  {
    id: 'o3', refNumber: 'CRS-2026-0003',
    customerName: 'Emeka Okafor', email: 'emeka.ok@yahoo.com', phone: '+2348033456789',
    address: '22 GRA Phase 2', city: 'Port Harcourt', state: 'Rivers',
    items: [{ productId: 'p4', productName: 'Crest Monarch Jacket', size: 'XL', color: 'Obsidian Black', quantity: 1, price: 85000 }],
    total: 85000, status: 'processing', paymentStatus: 'completed', createdAt: '2026-02-20',
  },
  {
    id: 'o4', refNumber: 'CRS-2026-0004',
    customerName: 'Fatima Abubakar', email: 'fatima.a@gmail.com', phone: '+2348044567890',
    address: '5 Kano Road', city: 'Kaduna', state: 'Kaduna',
    items: [{ productId: 'p5', productName: 'Crest Essential Tee V2', size: 'S', color: 'Oat Milk', quantity: 3, price: 15000 }],
    total: 45000, status: 'paid', paymentStatus: 'completed', createdAt: '2026-02-25',
  },
  {
    id: 'o5', refNumber: 'CRS-2026-0005',
    customerName: 'Kunle Adeyemi', email: 'kunle.a@gmail.com', phone: '+2348055678901',
    address: '10 Ring Road', city: 'Ibadan', state: 'Oyo',
    items: [
      { productId: 'p6', productName: 'Crest Shield Hoodie', size: 'L', color: 'Obsidian Black', quantity: 1, price: 38000 },
      { productId: 'p8', productName: 'Crest Crown Snapback', size: 'One Size', color: 'Obsidian Black', quantity: 1, price: 14000 },
    ],
    total: 52000, status: 'pending', paymentStatus: 'pending', createdAt: '2026-03-01',
  },
  {
    id: 'o6', refNumber: 'CRS-2026-0006',
    customerName: 'Ngozi Eze', email: 'ngozi.eze@gmail.com', phone: '+2348066789012',
    address: '3 Ogui Road', city: 'Enugu', state: 'Enugu',
    items: [{ productId: 'p7', productName: 'Crest Apex Bomber', size: 'M', color: 'Obsidian Black', quantity: 1, price: 72000 }],
    total: 72000, status: 'delivered', paymentStatus: 'completed', createdAt: '2026-02-10',
  },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Adebayo Ogunlesi', email: 'adebayo@gmail.com', phone: '+2348011234567', totalOrders: 3, totalSpent: 135000, orders: ['o1'] },
  { id: 'c2', name: 'Chioma Nwosu', email: 'chioma.n@gmail.com', phone: '+2348022345678', totalOrders: 2, totalSpent: 96000, orders: ['o2'] },
  { id: 'c3', name: 'Emeka Okafor', email: 'emeka.ok@yahoo.com', phone: '+2348033456789', totalOrders: 1, totalSpent: 85000, orders: ['o3'] },
  { id: 'c4', name: 'Fatima Abubakar', email: 'fatima.a@gmail.com', phone: '+2348044567890', totalOrders: 4, totalSpent: 180000, orders: ['o4'] },
  { id: 'c5', name: 'Kunle Adeyemi', email: 'kunle.a@gmail.com', phone: '+2348055678901', totalOrders: 1, totalSpent: 52000, orders: ['o5'] },
  { id: 'c6', name: 'Ngozi Eze', email: 'ngozi.eze@gmail.com', phone: '+2348066789012', totalOrders: 2, totalSpent: 144000, orders: ['o6'] },
];

// Helper functions
export function formatPrice(amount: number): string {
  return '₦' + amount.toLocaleString();
}

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getOrder(refNumber: string): Order | undefined {
  return orders.find(o => o.refNumber === refNumber);
}

export function getOrdersByPhone(phone: string): Order[] {
  return orders.filter(o => o.phone.includes(phone));
}

export function generateRefNumber(): string {
  const num = String(orders.length + 1).padStart(4, '0');
  return `CRS-2026-${num}`;
}

// Analytics helpers
export function getTotalRevenue(): number {
  return orders.filter(o => o.paymentStatus === 'completed').reduce((sum, o) => sum + o.total, 0);
}

export function getTotalOrders(): number {
  return orders.length;
}

export function getOrdersByStatus(): Record<string, number> {
  const counts: Record<string, number> = {};
  orders.forEach(o => {
    counts[o.status] = (counts[o.status] || 0) + 1;
  });
  return counts;
}

export function getRevenueByMonth(): { month: string; revenue: number }[] {
  return [
    { month: 'Sep', revenue: 280000 },
    { month: 'Oct', revenue: 420000 },
    { month: 'Nov', revenue: 350000 },
    { month: 'Dec', revenue: 580000 },
    { month: 'Jan', revenue: 445000 },
    { month: 'Feb', revenue: 520000 },
    { month: 'Mar', revenue: 347000 },
  ];
}

export function getBestSellers(): { product: Product; unitsSold: number }[] {
  return [
    { product: products[0], unitsSold: 142 },
    { product: products[1], unitsSold: 328 },
    { product: products[3], unitsSold: 67 },
    { product: products[5], unitsSold: 198 },
    { product: products[2], unitsSold: 215 },
  ];
}

export const categories = ['Hoodies', 'T-Shirts', 'Caps', 'Jackets'];
export const collections = ['Sovereign Collection', 'Heritage Collection', 'Essentials'];
