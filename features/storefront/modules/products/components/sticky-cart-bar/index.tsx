'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { addToCart } from '@/features/storefront/lib/data/cart';
import { Analytics } from '@/features/storefront/lib/analytics/events';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

interface StickyCartBarProps {
  product: any;
  selectedVariant: any;
  region: any;
}

export function StickyCartBar({
  product,
  selectedVariant,
  region,
}: StickyCartBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const countryCode = (params?.countryCode as string) || 'us';

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 400px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || !product) return null;

  const variantToUse = selectedVariant || product.productVariants?.[0] || product.variants?.[0];
  const price =
    variantToUse?.calculated_price?.calculated_amount ||
    variantToUse?.prices?.[0]?.amount ||
    0;
  const currency = region?.currency_code?.toUpperCase() || 'USD';

  const handleStickyAdd = async () => {
    if (!variantToUse?.id) {
      toast.error('Please select all required options');
      return;
    }

    setIsLoading(true);
    try {
      await addToCart({
        variantId: variantToUse.id,
        quantity: 1,
        countryCode,
      });

      // Fire AddToCart pixel
      Analytics.addToCart({
        id: product.id,
        title: product.title,
        variantId: variantToUse.id,
        price,
        quantity: 1,
        currency,
      });

      toast.success('Added to shopping bag!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add item to bag');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl transition-all duration-300 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Thumbnail & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-border/60">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                Item
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-foreground truncate max-w-[200px] sm:max-w-md">
              {product.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {variantToUse?.title && (
                <span className="truncate">{variantToUse.title} &bull;</span>
              )}
              <span className="font-bold text-foreground">
                ${price} {currency}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Add Button */}
        <Button
          onClick={handleStickyAdd}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-5 rounded-xl shadow-md shrink-0 gap-2 active:scale-95 transition-transform"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
          <span>Add to Bag</span>
        </Button>
      </div>
    </div>
  );
}
