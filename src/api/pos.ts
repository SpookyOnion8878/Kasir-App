import { api, ENDPOINTS } from './client';
import type { Category, Product, CartItem, Order } from '../types';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>(ENDPOINTS.categories);
  return data;
};

export const getProductsByCategory = async (
  categoryName: string,
): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(ENDPOINTS.products, {
    params: { 'category.name': categoryName },
  });
  return data;
};

export const getCart = async (): Promise<CartItem[]> => {
  const { data } = await api.get<CartItem[]>(ENDPOINTS.cart);
  return data;
};

export const addCartItem = async (
  item: Omit<CartItem, 'id'>,
): Promise<CartItem> => {
  const { data } = await api.post<CartItem>(ENDPOINTS.cart, item);
  return data;
};

export const updateCartItem = async (
  id: string,
  item: Partial<CartItem>,
): Promise<CartItem> => {
  const { data } = await api.put<CartItem>(`${ENDPOINTS.cart}/${id}`, item);
  return data;
};

export const removeCartItem = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINTS.cart}/${id}`);
};

export const createOrder = async (order: Order): Promise<Order> => {
  const { data } = await api.post<Order>(ENDPOINTS.orders, {
    ...order,
    createdAt: new Date().toISOString(),
  });
  return data;
};
