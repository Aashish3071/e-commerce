import Link from 'next/link';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

export function PromoCallout() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        {/* Background Subtle Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/20 text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Limited Time Seasonal Launch Offer</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Get 20% Off Your Entire First Order
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl">
              Unlock instant savings on all new season knitwear, hoodies, and essentials. Use promo code at checkout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Promo Code Chip */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-white font-mono text-sm font-bold">
              <Tag className="w-4 h-4 text-amber-300" />
              <span>CODE:</span>
              <span className="text-amber-300 tracking-wider">OPENGEMS20</span>
            </div>

            {/* Shop CTA */}
            <Link
              href="/store"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 duration-150"
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
