'use client';

// Declarations for global tracking objects
declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    gtag?: any;
    dataLayer?: any[];
  }
}

export interface AnalyticsItem {
  id: string;
  name: string;
  variantId?: string;
  category?: string;
  price: number;
  quantity?: number;
}

/**
 * Standard Meta Pixel & Google Analytics 4 Event Dispatcher
 * Tracks the complete e-commerce funnel seamlessly.
 */
export const Analytics = {
  /**
   * Track Page View
   */
  pageView: (url?: string) => {
    if (typeof window === 'undefined') return;

    // Meta Pixel PageView
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Google Analytics PageView
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_location: url || window.location.href,
      });
    }
  },

  /**
   * Track Product Detail View (ViewContent)
   */
  viewContent: (product: {
    id: string;
    title: string;
    category?: string;
    price: number;
    currency: string;
  }) => {
    if (typeof window === 'undefined') return;

    // Meta Pixel ViewContent
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: product.title,
        content_category: product.category || 'General',
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: product.currency.toUpperCase(),
      });
    }

    // Google Analytics ViewItem
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: product.currency.toUpperCase(),
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            item_category: product.category,
            price: product.price,
          },
        ],
      });
    }
  },

  /**
   * Track Add To Cart
   */
  addToCart: (item: {
    id: string;
    title: string;
    variantId?: string;
    category?: string;
    price: number;
    quantity: number;
    currency: string;
  }) => {
    if (typeof window === 'undefined') return;

    const totalValue = item.price * (item.quantity || 1);

    // Meta Pixel AddToCart
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: item.title,
        content_category: item.category || 'General',
        content_ids: [item.variantId || item.id],
        content_type: 'product',
        value: totalValue,
        currency: item.currency.toUpperCase(),
      });
    }

    // Google Analytics AddToCart
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: item.currency.toUpperCase(),
        value: totalValue,
        items: [
          {
            item_id: item.id,
            item_name: item.title,
            item_variant: item.variantId,
            price: item.price,
            quantity: item.quantity,
          },
        ],
      });
    }
  },

  /**
   * Track Initiate Checkout
   */
  initiateCheckout: (data: {
    items: AnalyticsItem[];
    totalValue: number;
    currency: string;
    itemCount: number;
  }) => {
    if (typeof window === 'undefined') return;

    const contentIds = data.items.map((i) => i.variantId || i.id);

    // Meta Pixel InitiateCheckout
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: contentIds,
        content_type: 'product',
        value: data.totalValue,
        currency: data.currency.toUpperCase(),
        num_items: data.itemCount,
      });
    }

    // Google Analytics BeginCheckout
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: data.currency.toUpperCase(),
        value: data.totalValue,
        items: data.items.map((i) => ({
          item_id: i.id,
          item_name: i.name,
          price: i.price,
          quantity: i.quantity || 1,
        })),
      });
    }
  },

  /**
   * Track Complete Purchase
   */
  purchase: (data: {
    orderId: string;
    totalValue: number;
    currency: string;
    items: AnalyticsItem[];
    tax?: number;
    shipping?: number;
  }) => {
    if (typeof window === 'undefined') return;

    const contentIds = data.items.map((i) => i.variantId || i.id);

    // Meta Pixel Purchase
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_ids: contentIds,
        content_type: 'product',
        value: data.totalValue,
        currency: data.currency.toUpperCase(),
        num_items: data.items.reduce((acc, i) => acc + (i.quantity || 1), 0),
      });
    }

    // Google Analytics Purchase
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: data.orderId,
        value: data.totalValue,
        currency: data.currency.toUpperCase(),
        tax: data.tax || 0,
        shipping: data.shipping || 0,
        items: data.items.map((i) => ({
          item_id: i.id,
          item_name: i.name,
          price: i.price,
          quantity: i.quantity || 1,
        })),
      });
    }
  },
};
