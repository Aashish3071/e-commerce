import { getProductPrice } from "@/features/storefront/lib/util/get-product-price"
import LocalizedClientLink from "@/features/storefront/modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { retrievePricedProductById } from "@/features/storefront/lib/data/products"
import { StoreRegion } from "@/features/storefront/types/storefront";
import { Star, ShoppingBag, Zap, Flame } from "lucide-react";

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

  const variants = product.productVariants || []
  const firstVariantId = variants[0]?.id || null
  const { cheapestPrice } = getProductPrice({
    product,
    variantId: firstVariantId,
    region,
  })

  return (
    <div className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-2xl hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-300 h-full">
      {/* Product Image Area */}
      <LocalizedClientLink
        href={`/products/${productPreview.handle}`}
        className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/60 block"
      >
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
          className="group-hover:scale-105 transition-transform duration-500 rounded-none bg-transparent p-0"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-zinc-950 text-white shadow-sm flex items-center gap-1">
            <Flame className="w-3 h-3 text-red-500 fill-red-500" />
            <span>Trending</span>
          </span>
        </div>

        {/* Tactile On-Card Size Matrix Bar (Gymshark / Alo Signature) */}
        <div className="absolute inset-x-2 bottom-2 z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <div className="p-2 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 text-white shadow-2xl flex items-center justify-between gap-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 pl-1">
              Sizes:
            </span>
            <div className="flex items-center gap-1">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <span
                  key={size}
                  className="px-2 py-1 rounded-md bg-zinc-800 hover:bg-white hover:text-zinc-950 text-[11px] font-extrabold transition-colors cursor-pointer"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </LocalizedClientLink>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
        <LocalizedClientLink href={`/products/${productPreview.handle}`} className="space-y-1.5 block">
          {/* Review Score */}
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-zinc-900 dark:text-white">4.9</span>
            <span className="text-[11px] text-zinc-500">(184)</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-extrabold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {productPreview.title}
          </h3>

          <p className="text-[11px] font-medium text-zinc-500">
            Standard Fit • Pre-Shrunk Organic Cotton
          </p>
        </LocalizedClientLink>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            {cheapestPrice ? (
              <div className="text-base font-black text-zinc-950 dark:text-white">
                <PreviewPrice price={cheapestPrice} region={region} />
              </div>
            ) : (
              <p className="text-xs text-zinc-500">Contact for price</p>
            )}
          </div>

          <LocalizedClientLink
            href={`/products/${productPreview.handle}`}
            className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select</span>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
