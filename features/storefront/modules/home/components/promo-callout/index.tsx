import Link from 'next/link';
import { Flame, ArrowRight, Tag, Zap } from 'lucide-react';

export function PromoCallout() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-8 sm:p-14 shadow-2xl border border-zinc-800">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-red-600/90 text-white">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>LIMITED DROP VIP PROMOTION</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase">
              GET 20% OFF YOUR FIRST DROP ORDER
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              Unlock exclusive member pricing across all new season knitwear, hoodies, and technical layers. Apply code at checkout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Promo Code Chip */}
            <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-sm font-black">
              <Tag className="w-4 h-4 text-amber-400" />
              <span className="text-zinc-400">CODE:</span>
              <span className="text-amber-400 tracking-widest text-base">DROP20</span>
            </div>

            {/* Shop CTA */}
            <Link
              href="/store"
              className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl transition-all active:scale-95 duration-150"
            >
              <span>Shop The Drop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
