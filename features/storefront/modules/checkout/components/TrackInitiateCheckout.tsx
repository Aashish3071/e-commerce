'use client';

import { useEffect } from 'react';
import { Analytics } from '@/features/storefront/lib/analytics/events';

interface TrackInitiateCheckoutProps {
  cart: any;
}

export function TrackInitiateCheckout({ cart }: TrackInitiateCheckoutProps) {
  useEffect(() => {
    if (cart && cart.id) {
      const items = (cart.items || []).map((item: any) => ({
        id: item.variant?.product?.id || item.id,
        name: item.title || item.variant?.title || 'Product',
        variantId: item.variant?.id,
        price: item.unit_price || item.total || 0,
        quantity: item.quantity || 1,
      }));

      Analytics.initiateCheckout({
        items,
        totalValue: cart.total || cart.subtotal || 0,
        currency: cart.currency_code || 'USD',
        itemCount: items.reduce((acc: number, i: any) => acc + (i.quantity || 1), 0),
      });
    }
  }, [cart]);

  return null;
}
