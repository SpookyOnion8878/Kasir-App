import type { CartItem } from '../types';

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

/** Format a number as Indonesian Rupiah, e.g. 16000 -> "Rp 16.000". */
export const formatCurrency = (value: number): string =>
  currencyFormatter.format(value);

/** Build the public asset URL for a product image. */
export const productImageUrl = (categoryName: string, image: string): string =>
  `/assets/images/${categoryName.toLowerCase()}/${image}`;

/** Compute the grand total of a list of cart items. */
export const computeTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.totalPrice, 0);
