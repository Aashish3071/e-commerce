import Link from 'next/link';
import { Sparkles, ArrowRight, Tag, Gift } from 'lucide-react';

export function PromoCallout() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 sm:p-12 shadow-xl border border-stone-800">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>Welcome New Member Offer</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Get 10% Off Your First Order + 3 Free Deluxe Samples
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Start your science-backed skincare journey. Enter promo code at checkout on any order over $30.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Promo Code Chip */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-sm font-bold">
              <Tag className="w-4 h-4 text-emerald-400" />
              <span className="text-stone-300">CODE:</span>
              <span className="text-white tracking-widest font-extrabold">WELCOME10</span>
            </div>

            {/* Shop CTA */}
            <Link
              href="/store"
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95 duration-150"
            >
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
