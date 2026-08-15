'use client';

import { useEffect } from 'react';
import { Analytics } from '@/features/storefront/lib/analytics/events';
import type { StoreOrder } from '@/features/storefront/types/storefront';

interface TrackPurchaseProps {
  order: StoreOrder;
}

export function TrackPurchase({ order }: TrackPurchaseProps) {
  useEffect(() => {
    if (order && order.id) {
      const items = (order.items || []).map((item: any) => ({
        id: item.variant?.product?.id || item.id,
        name: item.title || item.variant?.title || 'Product',
        variantId: item.variant?.id,
        price: item.unit_price || item.total || 0,
        quantity: item.quantity || 1,
      }));

      Analytics.purchase({
        orderId: order.id,
        totalValue: order.total || 0,
        currency: order.currency_code || 'USD',
        items,
        tax: order.tax_total || 0,
        shipping: order.shipping_total || 0,
      });
    }
  }, [order]);

  return null;
}
