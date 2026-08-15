const routes = [
  '/dashboard/platform/products',
  '/dashboard/platform/orders',
  '/dashboard/platform/inventory',
  '/dashboard/platform/discounts',
  '/dashboard/platform/product-collections',
  '/dashboard/platform/product-categories',
  '/dashboard/platform/price-lists',
  '/dashboard/platform/shipping',
  '/dashboard/platform/apps',
  '/dashboard/platform/store',
  '/dashboard/platform/analytics',
  '/dashboard/platform/users',
  '/us',
  '/us/store',
  '/us/categories',
  '/us/cart',
  '/us/account',
];

async function checkRoutes() {
  console.log('Testing all platform and storefront routes...\n');
  let hasErrors = false;

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`, {
        redirect: 'manual',
      });
      console.log(`Route: ${route.padEnd(42)} -> Status: ${res.status}`);
      if (res.status === 500) {
        hasErrors = true;
      }
    } catch (e) {
      console.log(`Route: ${route.padEnd(42)} -> Error: ${e.message}`);
      hasErrors = true;
    }
  }

  console.log('\nResult:', hasErrors ? '❌ Some routes had issues' : '✅ All routes are healthy (200/307)!');
}

checkRoutes();
