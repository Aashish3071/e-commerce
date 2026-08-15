import { Star, CheckCircle2 } from 'lucide-react';

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  reviews?: Array<{
    name: string;
    role?: string;
    rating: number;
    comment: string;
    verified: boolean;
  }>;
}

const DEFAULT_REVIEWS = [
  {
    name: 'Sarah Jenkins',
    role: 'Verified Buyer',
    rating: 5,
    comment: 'The quality of the products exceeded all expectations. Fast shipping and the packaging was immaculate!',
    verified: true,
  },
  {
    name: 'David Miller',
    role: 'Verified Buyer',
    rating: 5,
    comment: 'Customer support answered my sizing questions within minutes. The fit is absolute perfection.',
    verified: true,
  },
  {
    name: 'Elena Rostova',
    role: 'Verified Buyer',
    rating: 5,
    comment: 'Seamless checkout and love the transparent shipping updates. Will definitely be ordering again.',
    verified: true,
  },
];

export function Testimonials({
  title = 'Loved by Over 10,000+ Customers Worldwide',
  subtitle = 'Real reviews from verified buyers who trust our products every single day.',
  reviews = DEFAULT_REVIEWS,
}: TestimonialsProps) {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
        <div className="max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Rating</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{rev.name}</h4>
                  <span className="text-xs text-muted-foreground">{rev.role || 'Verified Customer'}</span>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
