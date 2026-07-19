import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => Promise<void>;
  incrementItem: (id: string) => Promise<void>;
  decrementItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Guards against duplicate-creation races: while an add for a product is
  // in flight we optimistically track it so a second rapid click reuses it.
  const pendingAdds = useRef<Set<string>>(new Set());

  const refresh = async () => {
    const cart = await getCart();
    setItems(cart);
  };

  useEffect(() => {
    refresh()
      .catch((err) => {
        console.error('Failed to load cart', err);
        setError('Failed to load cart. Is the API server running?');
      })
      .finally(() => setLoading(false));
  }, []);

  const addProduct = async (product: Product) => {
    setError(null);
    // Already in cart (by product id) -> increment instead of duplicate.
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      await incrementItem(existing.id);
      return;
    }
    // Debounce rapid duplicate clicks for the same product.
    if (pendingAdds.current.has(product.id)) return;
    pendingAdds.current.add(product.id);
    try {
      const created = await addCartItem({
        quantity: 1,
        totalPrice: product.price,
        product,
      });
      // Reconcile with any concurrent server-side state.
      await refresh();
      void created;
    } catch (err) {
      console.error('Failed to add product', err);
      setError('Could not add item to cart.');
    } finally {
      pendingAdds.current.delete(product.id);
    }
  };

  const incrementItem = async (id: string) => {
    const current = items.find((item) => item.id === id);
    if (!current) return;
    const next: Partial<CartItem> = {
      quantity: current.quantity + 1,
      totalPrice: current.totalPrice + current.product.price,
    };
    // Optimistic update for snappy UX; reconcile with server afterward.
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...next } : item)),
    );
    try {
      await updateCartItem(id, next);
    } catch (err) {
      console.error('Failed to increment item', err);
      setError('Could not update item quantity.');
      await refresh();
    }
  };

  const decrementItem = async (id: string) => {
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
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...next } : item)),
    );
    try {
      await updateCartItem(id, next);
    } catch (err) {
      console.error('Failed to decrement item', err);
      setError('Could not update item quantity.');
      await refresh();
    }
  };

  const removeItem = async (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await removeCartItem(id);
    } catch (err) {
      console.error('Failed to remove item', err);
      setError('Could not remove item.');
      await refresh();
    }
  };

  const clearCart = async () => {
    const snapshot = items;
    setItems([]);
    try {
      await Promise.all(snapshot.map((item) => removeCartItem(item.id)));
    } catch (err) {
      console.error('Failed to clear cart', err);
      setError('Could not clear cart.');
      await refresh();
    }
  };

  const checkout = async () => {
    if (items.length === 0) return;
    setError(null);
    const total = computeTotal(items);
    const snapshot = items;
    setItems([]); // optimistic clear so the UI feels instant
    try {
      await createOrder({ totalPrice: total, items: snapshot });
    } catch (err) {
      console.error('Checkout failed', err);
      setError('Checkout failed. Please try again.');
      setItems(snapshot); // rollback
      throw err;
    }
  };

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      total: computeTotal(items),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      loading,
      error,
      addProduct,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      checkout,
    }),
    [items, loading, error],
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
