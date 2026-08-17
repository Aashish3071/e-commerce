import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';

export function BrandPhilosophy() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Scientific Brand Imagery */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-stone-100 dark:bg-stone-800">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
              alt="Clinical Formulation Lab"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Floating Clinical Quote Chip */}
          <div className="absolute -bottom-6 -right-6 bg-stone-900 text-white p-5 rounded-2xl shadow-xl max-w-xs border border-stone-800 hidden sm:block">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <FlaskConical className="w-4 h-4" />
              <span>Independent Research</span>
            </div>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
              "We uncover what truly works for your skin based strictly on peer-reviewed dermatological science."
            </p>
          </div>
        </div>

        {/* Right: Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Our Formulation Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
              Beauty Begins With Truth.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            Skincare shouldn’t be a guessing game of trendy buzzwords and overpriced packaging. Since day one, we have formulated exclusively with proven active ingredients at the exact percentages shown to transform skin texture, unclog pores, and restore barrier health.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider block">
                  Transparency in Every Bottle
                </strong>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Every active percentage and pH level is published openly with no hidden proprietary blends.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider block">
                  Zero Sensitizing Additives
                </strong>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Formulated without drying alcohols, essential oils, or synthetic fragrances that cause micro-inflammation.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group"
            >
              <span>Explore Our Clinical Standards</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
