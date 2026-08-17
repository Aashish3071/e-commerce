import { Zap, RotateCcw, ShieldCheck, Star } from 'lucide-react';

const PILLARS = [
  {
    icon: Zap,
    title: 'Lightning 24h Dispatch',
    description: 'Orders placed before 2 PM ship the same business day with real-time tracking.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Easy Returns',
    description: 'Hassle-free automated return portal. Free size exchanges on all domestic orders.',
  },
  {
    icon: ShieldCheck,
    title: '256-Bit SSL Checkout',
    description: 'Bank-grade encryption supporting Apple Pay, Google Pay, Visa, Mastercard, and Amex.',
  },
  {
    icon: Star,
    title: '25,000+ 5-Star Reviews',
    description: 'Trusted by athletes and creators worldwide for premium fit and durability.',
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shadow-md shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black tracking-tight text-zinc-950 dark:text-white uppercase">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
