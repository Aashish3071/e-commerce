import { Suspense } from 'react';
import { listRegions } from '@/features/storefront/lib/data/regions';
import LocalizedClientLink from '@/features/storefront/modules/common/components/localized-client-link';
import CartButton from '@/features/storefront/modules/layout/components/cart-button';
import SideMenu from '@/features/storefront/modules/layout/components/side-menu';
import Logo from '@/features/storefront/modules/layout/components/logo';
import { SearchModal } from '@/features/storefront/modules/layout/components/search-modal';
import { User, ShoppingBag, Flame, Zap } from 'lucide-react';

export default async function Nav() {
  const { regions } = await listRegions();

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-16 mx-auto border-b bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-zinc-200 dark:border-zinc-800 transition-colors">
        <nav className="max-w-7xl mx-auto px-6 sm:px-12 text-zinc-700 dark:text-zinc-300 flex items-center justify-between w-full h-full text-xs">
          {/* Left: Mobile Menu + Brand Logo */}
          <div className="flex items-center gap-6">
            <div className="lg:hidden h-full flex items-center">
              <SideMenu regions={regions} />
            </div>

            <Logo />
          </div>

          {/* Center: High-Velocity Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-black tracking-wider text-zinc-950 dark:text-zinc-50 uppercase">
            <LocalizedClientLink
              href="/store"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>New Drops</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Best Sellers</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors py-2"
            >
              All Products
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/collections"
              className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors py-2"
            >
              Collections
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SearchModal />

            <LocalizedClientLink
              href="/account"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:text-zinc-950 dark:hover:text-zinc-50 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              data-testid="nav-account-link"
            >
              <User className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>Account</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-foreground flex items-center gap-2 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-xs font-bold"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>0</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}
