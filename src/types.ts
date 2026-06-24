export type Category = 'Pizza' | 'Burger' | 'Sandwich' | 'French Fries' | 'Coffee' | 'Tea' | 'Cold Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: 'Cash' | 'UPI' | 'Card';
  subtotal: number;
  gst: number;
  delivery: number;
  discount: number;
  total: number;
  rewardUsed: boolean;
  rewardEarnedProduct?: 'FREE Coffee' | 'FREE Garlic Bread' | null;
  time: string;
  status: 'Pending' | 'Completed';
  orderIndexAtTime: number; // to keep track of rewards counts
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
  image: string;
}

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  ownerEmail: string;
  enabled: boolean;
}
