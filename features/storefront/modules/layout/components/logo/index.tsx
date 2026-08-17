import LocalizedClientLink from '@/features/storefront/modules/common/components/localized-client-link';
import { getStore } from '@/features/storefront/lib/data/store';

export default async function Logo() {
  const store = await getStore();
  const storeName = store?.name || "PAULA'S CHOICE";

  return (
    <LocalizedClientLink
      href="/"
      className="flex flex-col items-start hover:opacity-90 transition-opacity cursor-pointer group"
      data-testid="nav-store-link"
    >
      <div className="flex items-center gap-1.5">
        <span className="font-extrabold tracking-[0.18em] text-sm sm:text-base text-zinc-900 dark:text-zinc-50 uppercase font-sans">
          {storeName}
        </span>
      </div>
      <span className="text-[9px] tracking-[0.25em] text-zinc-500 font-semibold uppercase -mt-0.5">
        SKINCARE & CLINICAL SCIENCE
      </span>
    </LocalizedClientLink>
  );
}
