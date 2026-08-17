import { Star, CheckCircle2, Award } from 'lucide-react';

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  reviews?: Array<{
    name: string;
    concern?: string;
    productUsed?: string;
    rating: number;
    comment: string;
    verified: boolean;
  }>;
}

const DEFAULT_REVIEWS = [
  {
    name: 'Priya Sharma',
    concern: 'Clogged Pores & Blackheads',
    productUsed: '2% BHA Liquid Exfoliant',
    rating: 5,
    comment: 'Nothing worked on the stubborn blackheads across my nose until this. Within 10 days of night use, my pores look invisible and my skin texture is so smooth.',
    verified: true,
  },
  {
    name: 'Ananya Deshmukh',
    concern: 'Dark Spots & Post-Acne Marks',
    productUsed: 'C15 Super Booster 15% Vitamin C',
    rating: 5,
    comment: 'The fastest fading of acne pigmentation I have ever experienced. It is lightweight, non-sticky, and does not sting sensitive skin. Worth every rupee.',
    verified: true,
  },
  {
    name: 'Rohan Mehta',
    concern: 'Redness & Damaged Skin Barrier',
    productUsed: 'Resist Barrier Repair Moisturizer',
    rating: 5,
    comment: 'I over-exfoliated with harsh scrubs and my barrier was on fire. This ceramide cream calmed down the redness overnight and completely restored my skin.',
    verified: true,
  },
];

export function Testimonials({
  title = 'Real Results From Real People',
  subtitle = 'Over 100,000+ verified 5-star customer reviews worldwide. Read honest experiences from customers with your skin type.',
  reviews = DEFAULT_REVIEWS,
}: TestimonialsProps) {
  return (
    <section className="py-20 bg-stone-50/60 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
        <div className="max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 text-white dark:bg-white dark:text-stone-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Global Rating</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
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
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>

                {rev.productUsed && (
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">
                    Product: <span className="text-stone-900 dark:text-stone-200">{rev.productUsed}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">{rev.name}</h4>
                {rev.concern && (
                  <span className="text-[11px] text-stone-500">Targeted: {rev.concern}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
