import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Seamless Ribbed Sets',
    subtitle: 'High-Waist Sculpting Leggings & Tops',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    tag: 'BEST SELLER',
    href: '/store',
  },
  {
    title: 'Heavyweight Hoodies',
    subtitle: '480 GSM French Terry Cotton',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    tag: 'NEW RELEASE',
    href: '/store',
  },
  {
    title: 'Studio Performance Tees',
    subtitle: 'Moisture-Wicking 4-Way Stretch',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    tag: 'ESSENTIAL',
    href: '/store',
  },
  {
    title: 'Technical Outerwear',
    subtitle: 'Weather-Resistant Layering Jackets',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    tag: 'ALL-WEATHER',
    href: '/store',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-1.5">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-red-500 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-red-500" />
            <span>DISCOVER THE CAPSULE</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white uppercase">
            Shop By Discipline & Category
          </h2>
        </div>

        <Link
          href="/store"
          className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white hover:text-red-500 flex items-center gap-1 transition-colors group"
        >
          <span>View All Drops</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.href}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-zinc-900 flex flex-col justify-end p-6 border border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* Background Image */}
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            {/* Tag Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-zinc-950/90 backdrop-blur-md text-white border border-zinc-700 shadow-sm">
                {cat.tag}
              </span>
            </div>

            {/* Category Content */}
            <div className="relative z-10 space-y-1">
              <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-[11px] text-zinc-300 font-medium">
                {cat.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-white group-hover:translate-x-1 transition-transform">
                <span>Shop Now</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
