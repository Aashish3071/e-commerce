import Footer from "@/features/storefront/modules/layout/templates/footer"
import Nav from "@/features/storefront/modules/layout/templates/nav"
import OpenfrontCTA from "@/features/storefront/modules/layout/components/openfront-cta"
import { Metadata } from "next"
import InteractiveLink from "@/features/storefront/modules/common/components/interactive-link"
import StorefrontServer from "./StorefrontServer"
import { getStore } from "@/features/storefront/lib/data/store"
import { AnnouncementBar } from "@/features/storefront/modules/layout/components/announcement-bar"
import { AnalyticsScripts } from "@/features/storefront/lib/analytics/AnalyticsScripts"

export async function MainLayout({ children }: { children: React.ReactNode }) {
  const hideBranding = process.env.HIDE_OPENFRONT_BRANDING === 'true'
  const store = await getStore()

  const announcementConfig = store?.metadata?.announcementBar || {
    enabled: true,
    text: "✨ Free express shipping on orders over $50 | 30-Day Money-Back Guarantee",
    bgColor: "#0f172a",
    textColor: "#ffffff",
  }

  const analyticsConfig = store?.metadata?.analyticsConfig || {}
  const metaPixelId = analyticsConfig.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID || null
  const googleAnalyticsId = analyticsConfig.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_ID || null

  return (
    <StorefrontServer
      prefetchUser={true}
      prefetchCart={true}
      prefetchCollections={true}
      prefetchCategories={true}
    >
      <AnalyticsScripts
        metaPixelId={metaPixelId}
        googleAnalyticsId={googleAnalyticsId}
      />
      <AnnouncementBar config={announcementConfig} />
      <Nav />
      {children}
      <Footer />
      {!hideBranding && <OpenfrontCTA />}
    </StorefrontServer>
  )
}

export const MainNotFoundMetadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export function MainNotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="text-xs font-normal text-foreground">
        The page you tried to access does not exist.
      </p>
      <InteractiveLink href="/">Go to frontpage</InteractiveLink>
    </div>
  )
}
