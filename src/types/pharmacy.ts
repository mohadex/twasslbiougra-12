export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  image?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
}

export interface ForumPost {
  id: string;
  name: string;
  phone: string;
  request: string;
  createdAt: Date;
}