import { Sparkles, ShieldCheck, Truck, RotateCcw, Heart, FlaskConical } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: FlaskConical, text: 'Clinically Proven Active Concentrations' },
  { icon: Heart, text: '100% Fragrance-Free & Non-Irritating' },
  { icon: ShieldCheck, text: 'Leaping Bunny Cruelty-Free Certified' },
  { icon: Truck, text: 'Free Standard Shipping Over $50' },
  { icon: RotateCcw, text: '30-Day Money-Back Guarantee' },
  { icon: Sparkles, text: 'Over 100,000+ 5-Star Verified Customer Reviews' },
];

export function MarqueeTicker() {
  return (
    <div className="w-full bg-stone-900 dark:bg-stone-950 text-stone-100 py-3 border-y border-stone-800 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {[...Array(3)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex items-center gap-10 sm:gap-14 mx-5 sm:mx-7">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-200">
                  <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
