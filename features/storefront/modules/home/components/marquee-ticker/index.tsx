import { Sparkles, Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

interface MarqueeTickerProps {
  items?: string[];
  bgColor?: string;
  textColor?: string;
}

export function MarqueeTicker({
  items = [
    'Fast Global Delivery on All Orders',
    '30-Day Hassle-Free Returns',
    '100% Authentic Guaranteed Products',
    'Bank-Grade 256-Bit SSL Encrypted Checkout',
    '24/7 Dedicated Customer Care',
  ],
  bgColor = '#0f172a',
  textColor = '#f8fafc',
}: MarqueeTickerProps) {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-3 border-y border-border/40 select-none"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex w-max animate-marquee gap-8 items-center text-xs sm:text-sm font-semibold tracking-wide uppercase">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 opacity-90" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
