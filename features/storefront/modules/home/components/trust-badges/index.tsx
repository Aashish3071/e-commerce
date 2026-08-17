import { FlaskConical, Leaf, Heart, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: FlaskConical,
    title: 'Research-Backed Actives',
    description: 'Optimal concentrations of BHA, Niacinamide, Vitamin C, and Retinoids backed by published clinical trials.',
  },
  {
    icon: Leaf,
    title: '100% Fragrance-Free',
    description: 'Formulated without synthetic perfumes, essential oils, or dyes that cause hidden skin damage.',
  },
  {
    icon: Heart,
    title: 'Cruelty-Free Certified',
    description: 'Leaping Bunny certified. We never test on animals or use ingredients from animal testing.',
  },
  {
    icon: ShieldCheck,
    title: 'Dermatologist Tested',
    description: 'Every formula is rigorously tested for irritation and efficacy across sensitive skin types.',
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/40 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2.5">
                <div className="w-11 h-11 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 flex items-center justify-center shadow-sm shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold tracking-tight text-stone-900 dark:text-white uppercase">
                  {pillar.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
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
