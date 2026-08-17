import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers, Sparkles, Feather, ShieldCheck } from 'lucide-react';

const INNOVATIONS = [
  {
    icon: Layers,
    title: '480 GSM Heavyweight French Terry',
    description: 'Custom-milled organic cotton engineered for maximum structural drape, zero pilling, and enduring shape retention.',
  },
  {
    icon: Sparkles,
    title: 'Seamless Ribbed Sculpt Weave',
    description: 'Multi-directional compressive elasticity that provides medium support, smoothing contours, and zero chafing.',
  },
  {
    icon: Feather,
    title: 'Aerotex Moisture-Wicking Weft',
    description: 'Micro-perforated yarn channels that pull sweat away from skin and evaporate heat 3x faster than standard cotton.',
  },
  {
    icon: ShieldCheck,
    title: '100% ZQ Merino & Renewable Fibers',
    description: 'Sustainably sourced natural fibers that regulate body temperature across high-intensity training and cold weather layering.',
  },
];

export function FabricInnovation() {
  return (
    <section className="py-20 bg-zinc-950 text-white border-t border-zinc-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Technical Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80"
                alt="Fabric Innovation Studio"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Spec Badge */}
            <div className="absolute -bottom-6 -right-6 bg-zinc-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-zinc-700 max-w-xs hidden sm:block">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block">
                ENGINEERED TEXTILE LAB
              </span>
              <p className="text-xs text-zinc-300 mt-1 font-medium leading-relaxed">
                Tested across 1,000+ hours of studio training, running, and heavy daily wear.
              </p>
            </div>
          </div>

          {/* Right Column: Innovation Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                PROPRIETARY MATERIAL SCIENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
                ENGINEERED FOR PEAK MOVEMENT
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
                We combine architectural precision tailoring with cutting-edge active textiles to eliminate compromises between performance and style.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INNOVATIONS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-red-400 transition-colors group"
              >
                <span>Shop All Engineered Pieces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
