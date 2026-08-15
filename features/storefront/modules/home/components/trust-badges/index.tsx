import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

interface TrustBadgesProps {
  title?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

const DEFAULT_BADGES = [
  {
    icon: 'truck',
    title: 'Free Worldwide Shipping',
    description: 'On all orders exceeding threshold with direct tracking',
  },
  {
    icon: 'shield',
    title: 'Secure Payment Gateway',
    description: 'Stripe, Apple Pay, Google Pay & 256-bit encrypted checkout',
  },
  {
    icon: 'refresh',
    title: '30-Day Easy Returns',
    description: 'Guaranteed satisfaction or hassle-free replacement',
  },
  {
    icon: 'support',
    title: '24/7 Priority Support',
    description: 'Expert customer support team ready to assist you anytime',
  },
];

export function TrustBadges({ items = DEFAULT_BADGES }: TrustBadgesProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'truck':
        return <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'refresh':
        return <RefreshCw className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Headphones className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <section className="py-12 border-t border-border bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                {getIcon(badge.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground">{badge.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
