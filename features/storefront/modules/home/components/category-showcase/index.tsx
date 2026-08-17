import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Sweaters & Knitwear',
    subtitle: 'Cozy, breathable, ethically sourced',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    itemCount: '12 Items',
    href: '/store',
  },
  {
    title: 'Hoodies & Sweatshirts',
    subtitle: 'Heavyweight organic cotton staples',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    itemCount: '8 Items',
    href: '/store',
  },
  {
    title: 'T-Shirts & Essentials',
    subtitle: 'Everyday minimalist basics',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    itemCount: '16 Items',
    href: '/store',
  },
  {
    title: 'Outerwear & Jackets',
    subtitle: 'All-weather performance layers',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80',
    itemCount: '6 Items',
    href: '/store',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Browse by Department
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Featured Categories
          </h2>
        </div>

        <Link
          href="/store"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
        >
          <span>View all categories</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-foreground border border-border shadow-sm">
                {cat.itemCount}
              </div>
            </div>

            {/* Content Box */}
            <div className="p-5 flex flex-col justify-between flex-1 space-y-2">
              <div>
                <h3 className="text-base font-bold text-foreground group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cat.subtitle}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>Shop Category</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
