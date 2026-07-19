// NOTE: json-server v1 returns all `id` fields as strings, so we type them as
// strings here to avoid silent number/string comparison bugs at runtime.
export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  isReady: boolean;
  image: string;
  category: Category;
}

export interface CartItem {
  id: string;
  quantity: number;
  totalPrice: number;
  product: Product;
}

export interface Order {
  id?: string;
  totalPrice: number;
  items: CartItem[];
  createdAt?: string;
}

export type { Product as Menu };
