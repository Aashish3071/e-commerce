import { getProductPrice } from "@/features/storefront/lib/util/get-product-price"
import LocalizedClientLink from "@/features/storefront/modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { retrievePricedProductById } from "@/features/storefront/lib/data/products"
import { StoreRegion } from "@/features/storefront/types/storefront";
import { Star, ShoppingBag, Eye } from "lucide-react";

interface ProductPreviewProps {
  productPreview: {
    id: string
    handle: string
    thumbnail: any
    title: string
  }
  isFeatured?: boolean
  region: StoreRegion;
}

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region
}: ProductPreviewProps) {
  const product = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((response) => response.product)

  if (!product) {
    return null
  }

  const firstVariantId = product.productVariants?.[0]?.id || null
  const { cheapestPrice } = getProductPrice({
    product,
    variantId: firstVariantId,
    region,
  })

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 h-full"
    >
      {/* Product Image Box */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
          className="group-hover:scale-105 transition-transform duration-500 rounded-none bg-transparent p-0"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-md shadow-sm">
            Featured
          </span>
        </div>

        {/* Hover Quick Action Pill */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <div className="w-full py-2.5 px-4 rounded-xl bg-background/95 backdrop-blur-md border border-border text-foreground text-xs font-semibold shadow-lg flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors">
            <Eye className="w-3.5 h-3.5" />
            <span>View Product</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-foreground ml-1">4.9</span>
            <span className="text-[11px] text-muted-foreground">(24)</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {productPreview.title}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <div>
            {cheapestPrice ? (
              <div className="text-sm font-extrabold text-foreground">
                <PreviewPrice price={cheapestPrice} region={region} />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Contact for price</p>
            )}
          </div>

          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-muted-foreground group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
