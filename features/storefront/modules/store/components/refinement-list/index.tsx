"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Filter, SlidersHorizontal, RotateCcw, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const CATEGORY_FILTERS = [
  { label: 'All Departments', value: '' },
  { label: 'Sweaters & Knitwear', value: 'sweaters' },
  { label: 'Hoodies & Sweatshirts', value: 'hoodies' },
  { label: 'T-Shirts & Tops', value: 't-shirts' },
  { label: 'Outerwear', value: 'outerwear' },
]

const PRICE_FILTERS = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under $25', min: '0', max: '25' },
  { label: '$25 to $50', min: '25', max: '50' },
  { label: '$50 to $100', min: '50', max: '100' },
  { label: 'Over $100', min: '100', max: '' },
]

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCategory = searchParams?.get('category') || ''
  const currentMinPrice = searchParams?.get('minPrice') || ''
  const currentMaxPrice = searchParams?.get('maxPrice') || ''

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams ?? undefined)
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString({ [name]: value })
    router.push(`${pathname}?${query}`)
  }

  const handlePriceFilter = (min: string, max: string) => {
    const query = createQueryString({ minPrice: min, maxPrice: max })
    router.push(`${pathname}?${query}`)
  }

  const handleClearAll = () => {
    router.push(pathname || '/')
  }

  const hasActiveFilters = Boolean(currentCategory || currentMinPrice || currentMaxPrice || (sortBy && sortBy !== 'created_at'))

  return (
    <div className="w-full lg:w-64 shrink-0 space-y-6 bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Filters</h3>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-[11px] h-7 px-2 text-muted-foreground hover:text-foreground gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Sort Section */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-foreground">Sort By</span>
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </div>

      {/* Categories Accordion Filter (Odoo Style) */}
      <div className="space-y-3 pt-4 border-t border-border">
        <span className="text-xs font-bold text-foreground">Categories</span>
        <div className="space-y-1">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = currentCategory === cat.value
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setQueryParams('category', cat.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Range Filter (Odoo Style) */}
      <div className="space-y-3 pt-4 border-t border-border">
        <span className="text-xs font-bold text-foreground">Price Range</span>
        <div className="space-y-1">
          {PRICE_FILTERS.map((pf) => {
            const isSelected = currentMinPrice === pf.min && currentMaxPrice === pf.max
            return (
              <button
                key={pf.label}
                type="button"
                onClick={() => handlePriceFilter(pf.min, pf.max)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{pf.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Guarantee Badge */}
      <div className="pt-4 border-t border-border">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Buyer Protection</span>
          </div>
          <p className="text-[10px] leading-relaxed">
            All orders qualify for 30-day returns and real-time shipment tracking.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
