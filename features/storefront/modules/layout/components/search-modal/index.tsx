'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Loader2, ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { searchProductsAction } from '@/features/storefront/lib/data/searchAction';

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();
  const countryCode = (params?.countryCode as string) || 'us';

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        const res = await searchProductsAction(query);
        if (res.success && res.data) {
          setResults(res.data);
        } else {
          setResults([]);
        }
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectProduct = (handle: string) => {
    setIsOpen(false);
    router.push(`/${countryCode}/products/${handle}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-border/70 hover:border-border bg-slate-50/50 dark:bg-slate-900/50"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search catalog...</span>
          <kbd className="hidden sm:inline-flex text-[10px] font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-border/80">
            ⌘K
          </kbd>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-background">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="sr-only">Search Store Products</DialogTitle>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, category, or description..."
              className="border-0 shadow-none focus-visible:ring-0 text-sm h-10 px-0 bg-transparent"
              autoFocus
            />
            {isPending && <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />}
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() ? (
            <div className="py-12 text-center text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">Type something to search</p>
              <p>Search across all collections, garments, and accessories.</p>
            </div>
          ) : results.length === 0 && !isPending ? (
            <div className="py-12 text-center text-xs text-muted-foreground space-y-2">
              <Package className="w-8 h-8 opacity-40 mx-auto" />
              <p className="font-semibold text-foreground">No products found for &ldquo;{query}&rdquo;</p>
              <p>Try searching for a different keyword.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                Products ({results.length})
              </div>

              <div className="divide-y divide-border/60">
                {results.map((product) => {
                  const price =
                    product.productVariants?.[0]?.prices?.[0]?.amount ||
                    product.variants?.[0]?.calculated_price?.calculated_amount ||
                    0;
                  const currency =
                    product.productVariants?.[0]?.prices?.[0]?.currency?.code?.toUpperCase() ||
                    'USD';

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSelectProduct(product.handle)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-border/50">
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
                          <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </h4>
                          <span className="text-xs font-bold text-muted-foreground">
                            ${price} {currency}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
