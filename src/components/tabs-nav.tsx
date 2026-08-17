"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { label: string; href?: string; disabled?: boolean };

export function TabsNav({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();

  return (
    <nav className="scrollbar-thin mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 sm:px-6">
      {tabs.map((tab) => {
        if (tab.disabled || !tab.href) {
          return (
            <span
              key={tab.label}
              title="Em breve"
              className="flex shrink-0 cursor-not-allowed items-center gap-1.5 border-b-2 border-transparent px-3 py-3 text-sm font-medium text-muted/50"
            >
              {tab.label}
              <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] tracking-wide text-muted/70 uppercase">
                em breve
              </span>
            </span>
          );
        }

        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
