import { Metadata } from "next"

import FeaturedProducts from "@/features/storefront/modules/home/components/featured-products"
import HeroBanner from "@/features/storefront/modules/home/components/hero-banner"
import { CategoryPillsBar } from "@/features/storefront/modules/home/components/category-pills"
import { PromoCallout } from "@/features/storefront/modules/home/components/promo-callout"
import { MarqueeTicker } from "@/features/storefront/modules/home/components/marquee-ticker"
import { TrustBadges } from "@/features/storefront/modules/home/components/trust-badges"
import { Testimonials } from "@/features/storefront/modules/home/components/testimonials"
import { getCollectionsListByRegion } from "@/features/storefront/lib/data/collections"
import { getRegion } from "@/features/storefront/lib/data/regions"
import { getStore } from "@/features/storefront/lib/data/store"
import type { StoreCollection, StoreRegion } from "@/features/storefront/types/storefront"
import { Flame, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@/features/storefront/modules/common/components/localized-client-link"

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore()

  return {
    title: store?.homepageTitle || "APEX STUDIO - Engineered Performance & Streetwear",
    description: store?.homepageDescription || "Engineered for uncompromised performance and timeless daily wear.",
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
    headline: "ENGINEERED FOR UNCOMPROMISED PERFORMANCE",
    subheadline: "Precision tailoring meets technical fabrics. Designed for durability, movement, and effortless everyday style.",
    badgeText: "SEASON 2026 DROP 01 LIVE",
    primaryCtaText: "Shop New Releases",
    primaryCtaLink: `/${countryCode}/store`,
    secondaryCtaText: "Explore Best Sellers",
    secondaryCtaLink: `/${countryCode}/store`,
    bgImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=85",
    overlayOpacity: 0.6,
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
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* 1. High-Velocity Hero Showcase */}
      <HeroBanner {...heroSettings} />

      {/* 2. Interactive Sticky Category Pills Bar */}
      <CategoryPillsBar />

      {/* 3. Live Urgency Ticker */}
      {marqueeSettings.enabled !== false && (
        <MarqueeTicker />
      )}

      {/* 4. Curated New Drops & Best Sellers Product Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-red-600" />
                <span>LIMITED QUANTITY DROPS</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white uppercase">
                Featured Releases & Best Sellers
              </h2>
            </div>

            <LocalizedClientLink
              href="/store"
              className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white hover:text-blue-600 flex items-center gap-1 group shrink-0"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedClientLink>
          </div>

          <ul className="flex flex-col gap-y-16">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </section>

      {/* 5. Limited Drop VIP Promo Banner */}
      <PromoCallout />

      {/* 6. Community Verified Reviews */}
      {testimonialsSettings.enabled !== false && (
        <Testimonials />
      )}

      {/* 7. 4 Trust & Guarantee Badges */}
      {trustBadgesSettings.enabled !== false && (
        <TrustBadges />
      )}
    </div>
  )
}
