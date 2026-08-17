import { cn } from "@/lib/utils";
import LocalizedClientLink from "@/features/storefront/modules/common/components/localized-client-link";
import Logo from "@/features/storefront/modules/layout/components/logo";
import { getStore } from "@/features/storefront/lib/data/store";
import { Mail, ArrowRight, ShieldCheck, Zap, RotateCcw } from "lucide-react";

export default async function Footer() {
  const store = await getStore();
  const storeName = store?.name || "APEX STUDIO";

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-300 w-full">
      {/* Top VIP Drop Alerts Bar */}
      <div className="border-b border-zinc-800 py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500">
              VIP EARLY ACCESS
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              GET 20% OFF YOUR FIRST DROP ORDER
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
              Subscribe to unlock member-only capsule releases, restock alerts, and secret sales.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-black uppercase tracking-widest transition-colors shrink-0"
            >
              Join VIP
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-medium">
              Engineered performance and luxury streetwear. Built with high-density technical fabrics for movement, durability, and daily comfort.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>24h Dispatch</span>
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>30-Day Returns</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>SSL Encrypted</span>
              </span>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Shop Drops
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  New Releases 🔥
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Best Sellers ⚡
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Outerwear & Jackets
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Heavyweight Knitwear
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Accessories & Headwear
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <LocalizedClientLink href="/account" className="hover:text-white transition-colors">
                  Track My Order
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  30-Day Easy Returns
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Help Center & FAQs
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Brand & Sizing
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Fabric Innovation
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Interactive Sizing Guide
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Sustainability Standards
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-white transition-colors">
                  Store Locator
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} {storeName}. All rights reserved. Engineered for Performance.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
