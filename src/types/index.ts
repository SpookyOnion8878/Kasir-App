export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  isReady: boolean;
  image: string;
  category: Category;
}

export interface CartItem {
  id: number;
  quantity: number;
  totalPrice: number;
  product: Product;
}

export interface Order {
  id?: number;
  totalPrice: number;
  items: CartItem[];
  createdAt?: string;
}

export type { Product as Menu };
