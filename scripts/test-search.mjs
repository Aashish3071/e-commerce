import { searchProducts } from '../features/storefront/lib/data/products.ts';

async function test() {
  console.log('Testing search for "Sweater"...');
  const results = await searchProducts({ query: 'Sweater' });
  console.log('Search Results:', JSON.stringify(results, null, 2));
}

test().catch(console.error);
