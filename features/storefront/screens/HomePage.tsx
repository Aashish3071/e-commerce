import { Metadata } from "next"

import FeaturedProducts from "@/features/storefront/modules/home/components/featured-products"
import HeroBanner from "@/features/storefront/modules/home/components/hero-banner"
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
    headline: store?.homepageTitle || "Modern Commerce Engineered for Performance",
    subheadline: store?.homepageDescription || "Explore our latest collection crafted with premium materials and sustainable design.",
    badgeText: "New Season Collection 2026",
    primaryCtaText: "Explore Catalog",
    primaryCtaLink: `/${countryCode}/store`,
    secondaryCtaText: "View Categories",
    secondaryCtaLink: `/${countryCode}/categories`,
    bgImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
    overlayOpacity: 0.55,
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
    <>
      <HeroBanner {...heroSettings} />
      
      {marqueeSettings.enabled !== false && (
        <MarqueeTicker />
      )}

      <div className="py-16 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Curated Selection
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Featured Collections
            </h2>
          </div>

          <ul className="flex flex-col gap-y-16">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </div>

      {testimonialsSettings.enabled !== false && (
        <Testimonials />
      )}

      {trustBadgesSettings.enabled !== false && (
        <TrustBadges />
      )}
    </>
  )
}
