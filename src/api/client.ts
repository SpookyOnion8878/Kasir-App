import axios from 'axios';

// In development the Vite dev server proxies "/api" -> VITE_API_TARGET,
// so the browser only ever talks to same-origin "/api".
const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const ENDPOINTS = {
  categories: '/categories',
  products: '/products',
  cart: '/carts',
  orders: '/orders',
} as const;
