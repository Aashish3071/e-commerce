'use client';

import { useEffect } from 'react';
import { Analytics } from '@/features/storefront/lib/analytics/events';
import { StoreProduct, StoreRegion } from '@/features/storefront/types/storefront';

interface TrackProductViewProps {
  product: StoreProduct;
  region: StoreRegion;
}

export function TrackProductView({ product, region }: TrackProductViewProps) {
  useEffect(() => {
    if (product && product.id) {
      // Calculate display price
      const basePrice = product.variants?.[0]?.calculated_price?.calculated_amount || 0;

      Analytics.viewContent({
        id: product.id,
        title: product.title || '',
        category: (product.categories?.[0] as any)?.name || 'General',
        price: basePrice,
        currency: region.currency_code || 'USD',
      });
    }
  }, [product, region]);

  return null;
}
