import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Zap, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  headline?: string;
  subheadline?: string;
  badgeText?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  bgImageUrl?: string;
  overlayOpacity?: number;
}

export default function HeroBanner({
  headline = 'ENGINEERED FOR UNCOMPROMISED PERFORMANCE',
  subheadline = 'Precision tailoring meets technical fabrics. Designed for durability, movement, and effortless everyday style.',
  badgeText = 'SEASON 2026 DROP 01 LIVE',
  primaryCtaText = 'Shop New Releases',
  primaryCtaLink = '/store',
  secondaryCtaText = 'Explore Best Sellers',
  secondaryCtaLink = '/store',
  bgImageUrl = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=85',
  overlayOpacity = 0.6,
}: HeroBannerProps) {
  return (
    <div className="relative min-h-[75vh] lg:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Background Photography */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt={headline}
            fill
            priority
            className="object-cover object-center scale-100"
            sizes="100vw"
          />
          {/* High-contrast multi-stop dark gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/40"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Grid Mesh Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Live Drop Badge */}
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest bg-red-600/90 text-white shadow-lg uppercase animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>{badgeText}</span>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white uppercase font-sans">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
              {subheadline}
            </p>

            {/* High-Velocity Proof Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-1">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24h Express Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 uppercase tracking-wider">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>4.9★ (25k+ Reviews)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {primaryCtaText && (
                <Link
                  href={primaryCtaLink}
                  className="px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase bg-white hover:bg-zinc-100 active:scale-95 text-zinc-950 shadow-2xl transition-all duration-150 flex items-center gap-2 group"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink}
                  className="px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 backdrop-blur-md active:scale-95 transition-all duration-150"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Hero Spotlight Product Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-4 text-white">
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-800">
                  <Image
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Drop"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                    SELLING FAST
                  </div>
                  <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-zinc-700">
                    -20% OFF
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    LIMITED DROP • ONLY 14 UNITS LEFT
                  </span>
                  <h3 className="text-base font-extrabold uppercase tracking-tight">
                    Paradox Knit Heavyweight Sweater
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-white">$35.00</span>
                    <span className="text-xs line-through text-zinc-500">$45.00</span>
                  </div>
                </div>

                {/* Instant Quick Buy Button */}
                <Link
                  href="/store"
                  className="w-full py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <span>Quick Add To Bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Floating Social Proof Pill */}
              <div className="absolute -bottom-4 -left-4 bg-zinc-900 border border-zinc-700 backdrop-blur-md rounded-xl py-2 px-3 shadow-xl flex items-center gap-2.5 text-xs text-zinc-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-bold text-[11px]">
                  <strong className="text-white">42 people</strong> bought this in the last hour
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
