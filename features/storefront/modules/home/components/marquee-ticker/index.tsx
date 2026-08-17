import { Flame, Zap, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Flame, text: 'SEASON 2026 DROP 01 LIVE NOW' },
  { icon: Zap, text: '24-HOUR PRIORITY DISPATCH' },
  { icon: Truck, text: 'FREE EXPRESS SHIPPING OVER $50' },
  { icon: RotateCcw, text: '30-DAY HASSLE-FREE RETURNS' },
  { icon: Star, text: '4.9/5 RATING OVER 25,000+ ORDERS' },
  { icon: ShieldCheck, text: 'BANK-GRADE 256-BIT ENCRYPTED CHECKOUT' },
];

export function MarqueeTicker() {
  return (
    <div className="w-full bg-zinc-950 text-white py-3 border-y border-zinc-800 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {[...Array(3)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex items-center gap-10 sm:gap-14 mx-5 sm:mx-7">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-zinc-100">
                  <Icon className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />
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
