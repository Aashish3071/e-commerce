import { Metadata } from "next"

import FeaturedProducts from "@/features/storefront/modules/home/components/featured-products"
import HeroBanner from "@/features/storefront/modules/home/components/hero-banner"
import { CategoryShowcase } from "@/features/storefront/modules/home/components/category-showcase"
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
    title: store?.homepageTitle || "Modern Commerce Store",
    description: store?.homepageDescription || "A high-performance e-commerce experience powered by Next.js and Openfront.",
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
    headline: store?.homepageTitle || "Premium Modern Commerce Engineered for Quality",
    subheadline: store?.homepageDescription || "Crafted with ethical materials and designed for durability. Discover next-generation essentials with zero compromise.",
    badgeText: "New Season 2026 Collection",
    primaryCtaText: "Explore Catalog",
    primaryCtaLink: `/${countryCode}/store`,
    secondaryCtaText: "View Collections",
    secondaryCtaLink: `/${countryCode}/collections`,
    bgImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
    overlayOpacity: 0.65,
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
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* 1. Odoo-Style Split Hero Section */}
      <HeroBanner {...heroSettings} />
      
      {/* 2. Infinite Marquee USP Ticker */}
      {marqueeSettings.enabled !== false && (
        <MarqueeTicker />
      )}

      {/* 3. Odoo-Style Category Showcase Tiles */}
      <CategoryShowcase />

      {/* 4. Curated Featured Products Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Featured Products & Best Sellers
            </h2>
          </div>

          <ul className="flex flex-col gap-y-16">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </section>

      {/* 5. Odoo-Style Promotional Callout Banner */}
      <PromoCallout />

      {/* 6. Customer Testimonials & Reviews */}
      {testimonialsSettings.enabled !== false && (
        <Testimonials />
      )}

      {/* 7. Trust & Guarantees */}
      {trustBadgesSettings.enabled !== false && (
        <TrustBadges />
      )}
    </div>
  )
}
