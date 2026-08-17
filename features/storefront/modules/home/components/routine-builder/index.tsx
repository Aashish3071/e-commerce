import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ROUTINE_STEPS = [
  {
    step: '01',
    phase: 'CLEANSE',
    title: 'Optimal Results Balancing Cleanser',
    action: 'Removes impurities without stripping lipid moisture barrier',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
    keyBenefit: 'pH 5.5 Balanced • Non-Foaming',
    price: '$22.00',
  },
  {
    step: '02',
    phase: 'EXFOLIATE',
    title: 'Skin Perfecting 2% BHA Liquid',
    action: 'Unclogs deep pores and evens stubborn texture',
    image: 'https://images.unsplash.com/photo-1608248597359-2ffb76e10757?auto=format&fit=crop&w=500&q=80',
    keyBenefit: '2% Salicylic Acid • Green Tea',
    price: '$35.00',
  },
  {
    step: '03',
    phase: 'HYDRATE & SPF',
    title: 'Resist Barrier Repair SPF 50',
    action: 'Defends against UVA/UVB damage and locks in all-day moisture',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
    keyBenefit: 'Broad Spectrum • 5 Ceramides',
    price: '$38.00',
  },
];

export function RoutineBuilder() {
  return (
    <section className="py-16 sm:py-24 bg-stone-100/70 dark:bg-stone-900/60 border-y border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              The Fundamental Core
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              The Essential 3-Step Daily Routine
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
              Consistent daily skincare built on clinical active layers delivers visible transformation in 30 days.
            </p>
          </div>

          <Link
            href="/store"
            className="px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0"
          >
            <span>Shop Complete Routine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROUTINE_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              {/* Top Step Banner */}
              <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                  STEP {item.step}: {item.phase}
                </span>
                <span className="text-xs font-bold text-stone-500">{item.price}</span>
              </div>

              {/* Product Photo */}
              <div className="relative aspect-square w-full bg-stone-50 dark:bg-stone-800 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {item.keyBenefit}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {item.action}
                  </p>
                </div>

                <Link
                  href="/store"
                  className="w-full py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 text-xs font-bold uppercase tracking-wider text-center block transition-all"
                >
                  Quick Add
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
