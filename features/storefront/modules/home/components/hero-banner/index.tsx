import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Star, Zap, ShieldCheck } from 'lucide-react';

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
  headline = 'Premium Modern Commerce Engineered for Quality',
  subheadline = 'Crafted with ethical materials and designed for durability. Discover next-generation essentials with zero compromise.',
  badgeText = 'New Season 2026 Collection',
  primaryCtaText = 'Explore Catalog',
  primaryCtaLink = '/store',
  secondaryCtaText = 'View Collections',
  secondaryCtaLink = '/collections',
  bgImageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80',
  overlayOpacity = 0.65,
}: HeroBannerProps) {
  return (
    <div className="relative min-h-[75vh] lg:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Graphic / Image */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt={headline}
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
          {/* Odoo-style clean multi-stop gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Grid Pattern Overlay for subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Badge Pill */}
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>{badgeText}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {subheadline}
            </p>

            {/* Value Bullets (Odoo Signature) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Express 24h Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Free Returns</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                <span>4.9/5 Rating (10k+)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {primaryCtaText && (
                <Link
                  href={primaryCtaLink}
                  className="px-8 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink}
                  className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/15 active:scale-95 transition-all duration-200"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Floating Featured Product Card (Odoo Signature Showcase) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Decorative Blur Backing */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              {/* Card Container */}
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl space-y-4">
                {/* Product Image Preview */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Product"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-extrabold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    Best Seller
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                    -20% OFF
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                      Sweater & Knitwear
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-white">4.9</span>
                      <span className="text-slate-400 text-[11px]">(482)</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    Paradox Puzzle Knit Sweater
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-white">$35.00</span>
                    <span className="text-sm line-through text-slate-400">$45.00</span>
                  </div>
                </div>

                {/* Instant Action */}
                <Link
                  href="/store"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Quick View Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Floating Social Proof Chip */}
              <div className="absolute -bottom-4 -left-4 bg-slate-950/95 border border-white/15 backdrop-blur-md rounded-xl py-2 px-3 shadow-xl flex items-center gap-2.5 text-xs text-slate-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-medium text-[11px]">
                  <strong className="text-white">128 people</strong> bought this today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
