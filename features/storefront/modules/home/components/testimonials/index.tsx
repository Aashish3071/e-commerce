import { Star, CheckCircle2, Flame } from 'lucide-react';

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  reviews?: Array<{
    name: string;
    productUsed?: string;
    rating: number;
    comment: string;
    verified: boolean;
  }>;
}

const DEFAULT_REVIEWS = [
  {
    name: 'Marcus Vance',
    productUsed: 'Paradox Knit Heavyweight Sweater',
    rating: 5,
    comment: 'The 450 GSM cotton is insane quality. Heavy drape, zero shrinkage after cold wash, and the fit is tailored perfectly. Best sweater I own.',
    verified: true,
  },
  {
    name: 'Jessica Thorne',
    productUsed: 'Core Oversized French Terry Hoodie',
    rating: 5,
    comment: 'Shipped in under 24 hours and arrived in 2 days. The hood structure actually holds its shape and the ribbed cuffs are super sturdy.',
    verified: true,
  },
  {
    name: 'Liam Zhang',
    productUsed: 'Technical Layering Windbreaker',
    rating: 5,
    comment: 'Flawless water resistance and super clean minimal aesthetics. No loud logos, just pure high-end craftsmanship. Ordering two more colors.',
    verified: true,
  },
];

export function Testimonials({
  title = 'COMMUNITY VERIFIED: 4.9★ OVER 25,000+ DROPS',
  subtitle = 'Real reviews from verified buyers who wear our engineered pieces daily.',
  reviews = DEFAULT_REVIEWS,
}: TestimonialsProps) {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
        <div className="max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Global Rating</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight uppercase">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>

                {rev.productUsed && (
                  <div className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Piece: <span className="text-zinc-950 dark:text-zinc-100">{rev.productUsed}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h4 className="text-xs font-black text-zinc-950 dark:text-white uppercase tracking-wider">{rev.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
