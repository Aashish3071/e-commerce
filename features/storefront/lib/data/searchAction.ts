'use server';

import { searchProducts } from './products';

export async function searchProductsAction(query: string) {
  try {
    const results = await searchProducts({ query, limit: 6 });
    return { success: true, data: results };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to search products' };
  }
}
