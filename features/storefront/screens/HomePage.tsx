import { Metadata } from "next"

import FeaturedProducts from "@/features/storefront/modules/home/components/featured-products"
import HeroBanner from "@/features/storefront/modules/home/components/hero-banner"
import { CategoryShowcase } from "@/features/storefront/modules/home/components/category-showcase"
import { RoutineBuilder } from "@/features/storefront/modules/home/components/routine-builder"
import { BrandPhilosophy } from "@/features/storefront/modules/home/components/brand-philosophy"
import { PromoCallout } from "@/features/storefront/modules/home/components/promo-callout"
import { MarqueeTicker } from "@/features/storefront/modules/home/components/marquee-ticker"
import { TrustBadges } from "@/features/storefront/modules/home/components/trust-badges"
import { Testimonials } from "@/features/storefront/modules/home/components/testimonials"
import { getCollectionsListByRegion } from "@/features/storefront/lib/data/collections"
import { getRegion } from "@/features/storefront/lib/data/regions"
import { getStore } from "@/features/storefront/lib/data/store"
import type { StoreCollection, StoreRegion } from "@/features/storefront/types/storefront"

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore()

  return {
    title: store?.homepageTitle || "Paula's Choice Skincare - Best Science-Backed Beauty & Skin Care",
    description: store?.homepageDescription || "At Paula's Choice beauty begins with truth. You deserve smart skin care choices. Fragrance-free, cruelty-free, and clinically proven.",
  }
}

export async function HomePage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region: StoreRegion | undefined = await getRegion(countryCode)
  const store = await getStore()

  const { collections }: { collections: StoreCollection[] } = region
    ? await getCollectionsListByRegion(0, 4, region.id)
    : { collections: [] }

  if (!collections || !region) {
    return null
  }

  const heroSettings = store?.metadata?.heroBanner || {
    headline: "Smart, Safe & Science-Backed Skincare",
    subheadline: "Formulated with clinically proven active concentrations to transform your skin. 100% fragrance-free, cruelty-free, and backed by independent dermatological research.",
    badgeText: "BEAUTY BEGINS WITH TRUTH",
    primaryCtaText: "Shop Best Sellers",
    primaryCtaLink: `/${countryCode}/store`,
    secondaryCtaText: "Take Routine Quiz",
    secondaryCtaLink: `/${countryCode}/store`,
    bgImageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85",
    overlayOpacity: 0.45,
  }

  const marqueeSettings = store?.metadata?.marquee || {
    enabled: true,
  }

  const testimonialsSettings = store?.metadata?.testimonials || {
    enabled: true,
  }

  const trustBadgesSettings = store?.metadata?.trustBadges || {
    enabled: true,
  }

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* 1. Hero Spotlight */}
      <HeroBanner {...heroSettings} />
      
      {/* 2. Clinical Marquee */}
      {marqueeSettings.enabled !== false && (
        <MarqueeTicker />
      )}

      {/* 3. Shop by Skin Concern */}
      <CategoryShowcase />

      {/* 4. Curated Best Sellers & Award Winners */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Dermatologist Recommended
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Award-Winning Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              Our most celebrated formulas, trusted by millions worldwide to deliver visible results without irritation.
            </p>
          </div>

          <ul className="flex flex-col gap-y-16">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </section>

      {/* 5. 3-Step Daily Routine Builder */}
      <RoutineBuilder />

      {/* 6. Brand Formulation Philosophy ("Beauty Begins with Truth") */}
      <BrandPhilosophy />

      {/* 7. Welcome Promo Offer */}
      <PromoCallout />

      {/* 8. Customer Transformations & Verified Reviews */}
      {testimonialsSettings.enabled !== false && (
        <Testimonials />
      )}

      {/* 9. 4 Clinical Standards & Trust Pillars */}
      {trustBadgesSettings.enabled !== false && (
        <TrustBadges />
      )}
    </div>
  )
}
