import { cn } from "@/lib/utils";
import LocalizedClientLink from "@/features/storefront/modules/common/components/localized-client-link";
import Logo from "@/features/storefront/modules/layout/components/logo";
import { getStore } from "@/features/storefront/lib/data/store";
import { Mail, ArrowRight, ShieldCheck, Heart, Leaf } from "lucide-react";

export default async function Footer() {
  const store = await getStore();
  const storeName = store?.name || "PAULA'S CHOICE";

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 w-full">
      {/* Top Newsletter & Club Section (Paula's Choice Style) */}
      <div className="border-b border-stone-200 dark:border-stone-800 py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Join Our Skincare Community
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Get 10% Off Your First Purchase + Science-Backed Advice
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg">
              Receive expert skincare tips, routine guides, and VIP access to new clinical launches.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              Sign Up
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
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              Formulated with clinically proven active concentrations to transform skin health. 100% fragrance-free, cruelty-free, and non-irritating.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fragrance-Free</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-emerald-600" />
                <span>Leaping Bunny</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Non-Irritating</span>
              </span>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-900 dark:text-white">
              Shop Skincare
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Best Sellers
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Exfoliants & Peels
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Serums & Boosters
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Moisturizers & SPF
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Cleansers & Toners
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-900 dark:text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <LocalizedClientLink href="/account" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Track My Order
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Shipping & Delivery
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  30-Day Money Back Guarantee
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Contact Skincare Experts
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  FAQs & Help Center
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Science & Truth */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-900 dark:text-white">
              Science & Research
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Our Formulation Philosophy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Ingredient Dictionary
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Clinical Trial Results
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  Sustainability Standards
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {storeName}. All rights reserved. Beauty Begins With Truth.</p>
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
