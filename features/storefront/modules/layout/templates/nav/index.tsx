import { Suspense } from 'react';
import { listRegions } from '@/features/storefront/lib/data/regions';
import LocalizedClientLink from '@/features/storefront/modules/common/components/localized-client-link';
import CartButton from '@/features/storefront/modules/layout/components/cart-button';
import SideMenu from '@/features/storefront/modules/layout/components/side-menu';
import Logo from '@/features/storefront/modules/layout/components/logo';
import { SearchModal } from '@/features/storefront/modules/layout/components/search-modal';
import { Sparkles, User, ShoppingBag } from 'lucide-react';

export default async function Nav() {
  const { regions } = await listRegions();

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-16 mx-auto border-b bg-background/95 backdrop-blur-md border-border">
        <nav className="max-w-7xl mx-auto px-6 sm:px-12 text-muted-foreground flex items-center justify-between w-full h-full text-xs leading-5">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-4">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} />
            </div>

            <div className="flex items-center">
              <Logo />
            </div>
          </div>

          {/* Center: Desktop Navigation Links (Odoo Style) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
            <LocalizedClientLink
              href="/"
              className="hover:text-blue-600 transition-colors py-1"
            >
              Home
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Catalog</span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded-full">
                New
              </span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/collections"
              className="hover:text-blue-600 transition-colors py-1"
            >
              Collections
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Account, Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            <SearchModal />

            <LocalizedClientLink
              href="/account"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold hover:text-foreground p-2 rounded-xl hover:bg-muted transition-colors"
              data-testid="nav-account-link"
            >
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Account</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-foreground flex items-center gap-2 p-2 rounded-xl bg-muted text-xs font-semibold"
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
