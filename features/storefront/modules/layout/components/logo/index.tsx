import LocalizedClientLink from '@/features/storefront/modules/common/components/localized-client-link';
import { getStore } from '@/features/storefront/lib/data/store';

export default async function Logo() {
  const store = await getStore();
  const storeName = store?.name || "APEX STUDIO";

  return (
    <LocalizedClientLink
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer group"
      data-testid="nav-store-link"
    >
      <div className="flex flex-col items-start">
        <span className="font-black tracking-[-0.04em] text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 uppercase font-sans leading-none">
          {storeName}
        </span>
        <span className="text-[9px] tracking-[0.25em] text-zinc-500 font-extrabold uppercase mt-0.5">
          ENGINEERED ESSENTIALS
        </span>
      </div>
    </LocalizedClientLink>
  );
}
