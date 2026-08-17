import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const CONCERNS = [
  {
    title: 'Pores & Blackheads',
    subtitle: 'Clear clogged pores and smooth rough bumps',
    activeKey: '2% BHA Salicylic Acid',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    href: '/store',
  },
  {
    title: 'Fine Lines & Wrinkles',
    subtitle: 'Restore firmness and cellular skin turnover',
    activeKey: '1% Retinol + Multi-Peptides',
    image: 'https://images.unsplash.com/photo-1608248597359-2ffb76e10757?auto=format&fit=crop&w=600&q=80',
    href: '/store',
  },
  {
    title: 'Dark Spots & Dullness',
    subtitle: 'Fade hyperpigmentation and brighten tone',
    activeKey: '15% Pure Vitamin C + Ferulic',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    href: '/store',
  },
  {
    title: 'Barrier Repair & Redness',
    subtitle: 'Soothe sensitivity and strengthen lipid barrier',
    activeKey: '5 Ceramides + Hyaluronic Acid',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    href: '/store',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Targeted Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Shop by Skin Concern
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
            Choose your primary skincare goal to find clinically proven formulas tailored to your routine.
          </p>
        </div>

        <Link
          href="/store"
          className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white hover:underline flex items-center gap-1.5 group shrink-0"
        >
          <span>Explore All Concerns</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CONCERNS.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group relative overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-stone-900/90 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow">
                {item.activeKey}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white gap-1 group-hover:text-emerald-700 transition-colors">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
