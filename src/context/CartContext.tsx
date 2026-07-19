import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';
import {
  addCartItem,
  createOrder,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../api/pos';
import { computeTotal } from '../utils/format';

interface CartContextValue {
  items: CartItem[];
  total: number;
  count: number;
  addProduct: (product: Product) => Promise<void>;
  incrementItem: (id: number) => Promise<void>;
  decrementItem: (id: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  checkout: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const cart = await getCart();
    setItems(cart);
  };

  useEffect(() => {
    refresh()
      .catch((err) => console.error('Failed to load cart', err))
      .finally(() => setLoading(false));
  }, []);

  const addProduct = async (product: Product) => {
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      await incrementItem(existing.id);
      return;
    }
    const created = await addCartItem({
      quantity: 1,
      totalPrice: product.price,
      product,
    });
    setItems((prev) => [...prev, created]);
  };

  const incrementItem = async (id: number) => {
    const current = items.find((item) => item.id === id);
    if (!current) return;
    const next: Partial<CartItem> = {
      quantity: current.quantity + 1,
      totalPrice: current.totalPrice + current.product.price,
    };
    const updated = await updateCartItem(id, next);
    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const decrementItem = async (id: number) => {
    const current = items.find((item) => item.id === id);
    if (!current) return;
    if (current.quantity <= 1) {
      await removeItem(id);
      return;
    }
    const next: Partial<CartItem> = {
      quantity: current.quantity - 1,
      totalPrice: current.totalPrice - current.product.price,
    };
    const updated = await updateCartItem(id, next);
    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const removeItem = async (id: number) => {
    await removeCartItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const checkout = async () => {
    if (items.length === 0) return;
    await createOrder({ totalPrice: computeTotal(items), items });
    setItems([]);
  };

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      total: computeTotal(items),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      addProduct,
      incrementItem,
      decrementItem,
      removeItem,
      checkout,
      loading,
    }),
    [items, loading],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
