'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flame, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';

const PILLS = [
  { label: 'All Drops', count: '24', icon: Layers, href: '/store' },
  { label: 'Best Sellers', count: 'HOT', icon: Flame, href: '/store', highlight: true },
  { label: 'New Releases', count: 'NEW', icon: Zap, href: '/store' },
  { label: 'Knitwear & Tops', count: '12', href: '/store' },
  { label: 'Outerwear & Layers', count: '8', href: '/store' },
  { label: 'Accessories', count: '6', href: '/store' },
];

export function CategoryPillsBar() {
  const [active, setActive] = useState('All Drops');

  return (
    <section className="py-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2.5 shrink-0">
          {PILLS.map((pill) => {
            const Icon = pill.icon;
            const isSelected = active === pill.label;

            return (
              <Link
                key={pill.label}
                href={pill.href}
                onClick={() => setActive(pill.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-[1.02]'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      pill.highlight ? 'text-amber-500 fill-amber-500' : 'text-zinc-500'
                    }`}
                  />
                )}
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {pill.count}
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/store"
          className="hidden sm:flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white hover:text-blue-600 shrink-0 ml-4 group"
        >
          <span>View All (24)</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
