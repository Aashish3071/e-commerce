import Link from 'next/link';
import Image from 'next/image';

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
  headline = 'Modern Commerce Engineered for Performance',
  subheadline = 'Explore our latest collection crafted with premium materials and sustainable design.',
  badgeText = 'New Season Collection 2026',
  primaryCtaText = 'Explore Products',
  primaryCtaLink = '/store',
  secondaryCtaText = 'View Categories',
  secondaryCtaLink = '/categories',
  bgImageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80',
  overlayOpacity = 0.55,
}: HeroBannerProps) {
  return (
    <div className="relative min-h-[70vh] sm:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Image */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt={headline}
            fill
            priority
            className="object-cover object-center scale-105 animate-fade-in"
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 py-24 text-center flex flex-col items-center gap-6">
        {/* Badge Pill */}
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/10 text-white backdrop-blur-md border border-white/15 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            {badgeText}
          </div>
        )}

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance max-w-4xl">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-200/90 max-w-2xl text-balance font-normal leading-relaxed">
          {subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {primaryCtaText && (
            <Link
              href={primaryCtaLink}
              className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-white text-slate-950 hover:bg-slate-100 active:scale-95 transition-all shadow-lg hover:shadow-xl duration-200"
            >
              {primaryCtaText}
            </Link>
          )}

          {secondaryCtaText && (
            <Link
              href={secondaryCtaLink}
              className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 active:scale-95 transition-all duration-200"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
