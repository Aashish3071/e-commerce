import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ShieldCheck, Sparkles, Award } from 'lucide-react';

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
  headline = 'Smart, Safe & Science-Backed Skincare',
  subheadline = 'Formulated with clinically proven active concentrations to transform your skin. 100% fragrance-free, cruelty-free, and backed by independent dermatological research.',
  badgeText = 'BEAUTY BEGINS WITH TRUTH',
  primaryCtaText = 'Shop Best Sellers',
  primaryCtaLink = '/store',
  secondaryCtaText = 'Take Routine Quiz',
  secondaryCtaLink = '/store',
  bgImageUrl = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85',
  overlayOpacity = 0.45,
}: HeroBannerProps) {
  return (
    <div className="relative min-h-[75vh] lg:min-h-[82vh] w-full flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      {/* Background Skincare Photography */}
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
          {/* Subtle warm luxury gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-stone-900/40"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Scientific Badge Pill */}
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-[0.18em] bg-white/15 text-stone-100 border border-white/20 backdrop-blur-md uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{badgeText}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-stone-200 max-w-2xl font-normal leading-relaxed">
              {subheadline}
            </p>

            {/* Clinical Evidence Points */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 w-full max-w-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>91% saw visibly minimized pores and clearer skin in 2 weeks</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-100">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>Over 100,000+ 5-Star Verified Customer Reviews Worldwide</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {primaryCtaText && (
                <Link
                  href={primaryCtaLink}
                  className="px-8 py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase bg-white hover:bg-stone-100 active:scale-95 text-stone-900 shadow-xl transition-all duration-150 flex items-center gap-2 group"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink}
                  className="px-8 py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase bg-transparent hover:bg-white/15 text-white border border-white/30 backdrop-blur-md active:scale-95 transition-all duration-150"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Hero Product Spotlight (Paula's Choice Style) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 text-stone-900 dark:text-white">
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Image
                    src="https://images.unsplash.com/photo-1608248597359-2ffb76e10757?auto=format&fit=crop&w=800&q=80"
                    alt="2% BHA Liquid Exfoliant"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    #1 Global Best Seller
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>Allure Best 2025</span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Exfoliants • Unclog Pores & Smooth Texture
                  </span>
                  <h3 className="text-base font-bold">
                    Skin Perfecting 2% BHA Liquid Exfoliant
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold">4.9</span>
                    <span className="text-xs text-stone-500">(14,280 reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xl font-extrabold text-stone-900 dark:text-white">$35.00</span>
                    <span className="text-xs text-stone-500">Full Size (118 ml / 4 fl. oz.)</span>
                  </div>
                </div>

                {/* Instant CTA */}
                <Link
                  href="/store"
                  className="w-full py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Add To Bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
