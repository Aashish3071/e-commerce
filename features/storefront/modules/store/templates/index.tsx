import { Suspense } from "react"
import SkeletonProductGrid from "@/features/storefront/modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@/features/storefront/modules/store/components/refinement-list"
import { SortOptions } from "@/features/storefront/modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"
import LocalizedClientLink from "@/features/storefront/modules/common/components/localized-client-link"
import { ChevronRight, Grid, Sparkles } from "lucide-react"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="min-h-screen bg-background">
      {/* Top Catalog Header Strip (Odoo Style) */}
      <div className="border-b border-border/70 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 space-y-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <LocalizedClientLink href="/" className="hover:text-foreground">
              Home
            </LocalizedClientLink>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-foreground">Catalog & Shop</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground" data-testid="store-page-title">
                All Products
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Explore our full catalogue of ethically engineered essentials.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Free Worldwide Express Shipping Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <RefinementList sortBy={sort} />
          
          <div className="flex-1 min-w-0">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
