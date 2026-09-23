"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-8">
      {mainNavigation.map((item) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() =>
            item.children ? setOpenDropdown(item.href) : undefined
          }
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <Link
            href={item.href}
            className="group relative inline-flex items-center py-2 uppercase text-[11px] tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-fg)] transition-colors"
          >
            <span>{item.label}</span>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-fg)] transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:scale-x-100" />
          </Link>

          {item.children && openDropdown === item.href && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
              <div className="min-w-[200px] border border-[var(--color-border)] bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="px-2 py-1.5 text-[11px] uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] transition-colors hover:text-[var(--color-fg)]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
