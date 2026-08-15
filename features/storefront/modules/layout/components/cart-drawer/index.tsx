'use client';

import { useState, useTransition } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { deleteLineItem, updateLineItem } from '@/features/storefront/lib/data/cart';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  quantity: number;
  thumbnail?: string;
  title: string;
  variantTitle?: string;
  unitPrice?: string | number;
  total?: string | number;
  formattedTotal?: string;
  formattedUnitPrice?: string;
  productVariant?: {
    title?: string;
    product?: {
      handle: string;
    };
  };
}

interface CartDrawerProps {
  cart: {
    id?: string;
    lineItems?: CartItem[];
    subtotal?: string | number;
    formattedSubtotal?: string;
    currencyCode?: string;
  } | null;
  trigger?: React.ReactNode;
}

export function CartDrawer({ cart, trigger }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const countryCode = (params?.countryCode as string) || 'us';

  const lineItems = cart?.lineItems || [];
  const totalItems = lineItems.reduce((acc, item) => acc + item.quantity, 0);

  // Parse raw numeric subtotal for free shipping threshold calculations
  const rawSubtotal = typeof cart?.subtotal === 'number'
    ? cart.subtotal
    : parseFloat(String(cart?.subtotal || '0').replace(/[^0-9.]/g, '')) || 0;

  // Free shipping threshold at $75
  const freeShippingThreshold = 75;
  const progressPercent = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const handleUpdateQuantity = (lineItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(lineItemId);
      return;
    }

    startTransition(async () => {
      try {
        await updateLineItem({
          lineId: lineItemId,
          quantity: newQuantity,
        });
      } catch (err: any) {
        toast.error(err.message || 'Failed to update quantity');
      }
    });
  };

  const handleRemoveItem = (lineItemId: string) => {
    startTransition(async () => {
      try {
        await deleteLineItem(lineItemId);
        toast.success('Item removed from bag');
      } catch (err: any) {
        toast.error(err.message || 'Failed to remove item');
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <button
            type="button"
            className="flex items-center gap-2 text-xs font-semibold hover:text-foreground transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({totalItems})</span>
          </button>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-background z-50">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-border text-left">
          <SheetTitle className="text-lg font-bold flex items-center justify-between">
            <span>Your Shopping Bag</span>
            <span className="text-xs font-normal text-muted-foreground">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>

          {/* Free Shipping Progress Meter */}
          <div className="pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              {remainingForFreeShipping > 0 ? (
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  Add <strong className="text-foreground">${remainingForFreeShipping.toFixed(2)}</strong> more for Free Shipping
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  🎉 You unlocked Free Express Shipping!
                </span>
              )}
              <span className="font-semibold text-muted-foreground">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  progressPercent >= 100 ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-border">
          {lineItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-muted-foreground">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">Your bag is currently empty</h3>
                <p className="text-xs text-muted-foreground">
                  Discover our best-selling products and add your favorites.
                </p>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                asChild
                className="mt-2 text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                <Link href={`/${countryCode}/store`}>Start Shopping</Link>
              </Button>
            </div>
          ) : (
            lineItems.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-border/60">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                  {item.variantTitle && (
                    <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                  )}

                  <div className="text-sm font-bold text-foreground pt-1">
                    {item.formattedUnitPrice || `$${item.unitPrice || '0.00'}`}
                  </div>

                  {/* Quantity and Delete Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {lineItems.length > 0 && (
          <SheetFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-slate-900/30 flex-col gap-4 sm:flex-col">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">
                  {cart?.formattedSubtotal || `$${rawSubtotal.toFixed(2)}`}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground text-left">
                Taxes and shipping calculated at checkout.
              </p>
            </div>

            <div className="w-full space-y-2">
              <Button
                asChild
                className="w-full py-6 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/${countryCode}/checkout`}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full text-xs font-semibold rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/${countryCode}/cart`}>View Detailed Cart</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
